import React, { useEffect, useState } from "react";
import "./styles/Review.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
    Card,
    CardContent,
} from "@mui/material";

const Reviews = ({ reviewContract, jobPlatformContract, account, isEmployer, provider }) => {
    const [acceptedJobs, setAcceptedJobs] = useState([]); 
    const [acceptedApplicants, setAcceptedApplicants] = useState([]); 
    const [allReviews, setAllReviews] = useState([]); 
    const [currentReviewee, setCurrentReviewee] = useState(null); 
    const [currentJobId, setCurrentJobId] = useState(null); 
    const [currentJobTitle, setCurrentJobTitle] = useState(""); 
    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");
    const [openDialog, setOpenDialog] = useState(false); 
    const fetchAcceptedJobs = async () => {
        try {
            const jobCount = await jobPlatformContract.getJobCount();
            const uniqueApplicantsSet = new Set(); // set pentru a evita duplicarea datelor

            const userJobs = [];
            const employerApplicants = [];
    
            for (let i = 0; i < jobCount; i++) {
                const job = await jobPlatformContract.getJob(i);
                const applicants = await jobPlatformContract.getApplicants(i);
                const jobTitle = job.title;
    
                const isAccepted = await jobPlatformContract.isAcceptedEmployee(i, account);
                const isFired = await jobPlatformContract.isFired(i, account);
    
                if ((isAccepted || isFired ) && !uniqueApplicantsSet.has(`${i}-${account}`)) {
                    uniqueApplicantsSet.add(`${i}-${account}`);
                    userJobs.push({ jobId: i, jobTitle: jobTitle, employer: job.employer });
                }
    
                if (job.employer.toLowerCase() === account.toLowerCase()) {
                    for (const applicant of applicants) {
                        const applicantAccepted = await jobPlatformContract.isAcceptedEmployee(i, applicant);
                        const applicantFired = await jobPlatformContract.isFired(i, applicant);
                        if ((applicantAccepted || applicantFired) && !uniqueApplicantsSet.has(`${i}-${applicant}`)) {
                            uniqueApplicantsSet.add(`${i}-${applicant}`);
                            employerApplicants.push({ jobId: i, jobTitle: jobTitle, applicant });
                        }
                    }
                }
    
                // Check if employer can review fired employees
                if (job.employer.toLowerCase() === account.toLowerCase()) {
                    for (const applicant of applicants) {
                        const applicantFired = await jobPlatformContract.isFired(i, applicant);
                        if (applicantFired) {
                            employerApplicants.push({ jobId: i, jobTitle: jobTitle, applicant });
                        }
                    }
                }
            }
    
            setAcceptedJobs(userJobs);
            setAcceptedApplicants(employerApplicants);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };
    
    
 
    const fetchAllReviews = async () => {
        try {
            const reviews = [];
            const events = await reviewContract.queryFilter("ReviewSubmitted");
    
            for (let event of events) {
                const { reviewer, reviewee, rating, comments, jobId } = event.args;
    
                let jobTitle = "Not Specified";
                if (jobId !== undefined) {
                    try {
                       
                        const jobData = await jobPlatformContract.getJob(jobId);
                        jobTitle = jobData[0]; 
                    } catch (error) {
                        console.warn(`Error fetching job title for jobId: ${jobId}`);
                    }
                }
    
                const isEmployerReviewer = await jobPlatformContract.isEmployer(reviewer);
                const isEmployerReviewee = await jobPlatformContract.isEmployer(reviewee);
    
                const reviewerRole = isEmployerReviewer ? "(Employer)" : "(Employee)";
                const revieweeRole = isEmployerReviewee ? "(Employer)" : "(Employee)";
    
                reviews.push({
                    jobTitle: jobTitle,
                    reviewer: `${reviewer} ${reviewerRole}`,
                    reviewee: `${reviewee} ${revieweeRole}`,
                    rating: rating.toString(),
                    comments: comments,
                });
            }
    
            setAllReviews(reviews);
        } catch (err) {
            console.error("Error fetching all reviews:", err);
        }
    };
    

    const handleLeaveReview = async () => {
        if (!rating || !comments) {
            alert("Please fill out both rating and comments.");
            return;
        }

        const numericRating = parseInt(rating);
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            alert("Rating must be a number between 1 and 5.");
            return;
        }

        try {
            console.log("Submitting review for:", currentReviewee, currentJobId);
            const tx = await reviewContract.leaveReview(
                Number(currentJobId),
                currentReviewee,
                numericRating,
                comments
            );
            await provider.waitForTransaction(tx.hash);
            alert("Review submitted successfully!");
            fetchAcceptedJobs();
            fetchAllReviews();
            setRating("");
            setComments("");
            setOpenDialog(false);
        } catch (err) {
            console.error("Error submitting review:", err);
            alert("Error submitting review. Check the console for details.");
        }
    };

   
    useEffect(() => {
        if (reviewContract && jobPlatformContract && account) {
            fetchAcceptedJobs();
            fetchAllReviews();
        }
    }, [reviewContract, jobPlatformContract, account]);

    return (
        <Box>
            <Typography variant="h4">Reviews</Typography>

            {/*  Sectiune pentru angajati */}
            {!isEmployer && (
                <Box>
                    <Typography variant="h6">Jobs You Can Review</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Employer</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {acceptedJobs.map((job, index) => (
                                <TableRow key={index}>
                                    <TableCell>{job.jobTitle}</TableCell>
                                    <TableCell>{job.employer}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setCurrentReviewee(job.employer);
                                                setCurrentJobId(job.jobId);
                                                setCurrentJobTitle(job.jobTitle);
                                                setOpenDialog(true);
                                            }}
                                        >
                                            Leave Review
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}

            
               <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Leave a Review</DialogTitle>
                <DialogContent>
                    <Typography>
                        Reviewing: {currentReviewee} for Job: {currentJobTitle}
                    </Typography>
                    <Rating
    name="rating"
    value={rating ? parseInt(rating) : 0}
    onChange={(event, newValue) => {
        if (newValue !== null) {
            setRating(newValue.toString());
        }
    }}
/>

                    <TextField
                        label="Comments"
                        variant="outlined"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleLeaveReview} color="primary">
                        Submit Review
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ✅ Sectiune pentru angajatori */}
            {isEmployer && (
                <Box>
                    <Typography variant="h6">Accepted Applicants for Your Jobs</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Applicant</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {acceptedApplicants.map((applicant, index) => (
                                <TableRow key={index}>
                                    <TableCell>{applicant.jobTitle}</TableCell>
                                    <TableCell>{applicant.applicant}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setCurrentReviewee(applicant.applicant);
                                                setCurrentJobId(applicant.jobId);
                                                setCurrentJobTitle(applicant.jobTitle);
                                                setOpenDialog(true);
                                            }}
                                        >
                                            Leave Review
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            )}

            
            <Box className="review-cards-container">
    {allReviews.map((review, index) => (
        <Card key={index} className="review-card">
            <CardContent>
                <Typography className="card-title" variant="h6">           
                     Job: {review.jobTitle ? review.jobTitle : "Not Specified"}
                </Typography>
                <Typography className="truncate-address">{review.reviewee}</Typography>
                
                
                <div className="star-rating">
                    <Rating value={parseInt(review.rating)} readOnly />
                </div>
                
                <Typography variant="body1" sx={{ mt: 2 }}>
                    "{review.comments}"
                </Typography>
            </CardContent>
        </Card>
    ))}
</Box>
        </Box>
    );
};
// adsadsadssad
export default Reviews;
