import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Button, Typography } from "@mui/material";
import { ethers } from "ethers";
import "./styles/ViewJobs.css";

const ViewJobs = ({ contract, account, provider }) => {
    const [jobs, setJobs] = useState([]);
    const [isEmployer, setIsEmployer] = useState(false);
    const [loadingJobs, setLoadingJobs] = useState({});

    const fetchJobs = async () => {
        if (!contract) {
            console.warn("Contract not connected.");
            return;
        }
        try {
            const jobCount = await contract.getJobCount();
            const jobsData = [];

            for (let i = 0; i < jobCount; i++) {
                const job = await contract.jobs(i);
                
                const hasApplied = await contract.hasApplied(account, i);
                const isAcceptedEmployee = await contract.isAcceptedEmployee(i, account);

                const employerRequests = await contract.getRequests(job.employer);
                let isRejected = false;
                for (let j = 0; j < employerRequests.jobIds.length; j++) {
                    if (
                        employerRequests.jobIds[j] == i &&
                        employerRequests.applicants[j].toLowerCase() === account.toLowerCase() &&
                        employerRequests.rejected[j]
                    ) {
                        isRejected = true;
                    }
                }

                jobsData.push({
                    id: i,
                    title: job.title,
                    description: job.description,
                    salary: job.salary.toString(),
                    employer: job.employer,
                    hasApplied: hasApplied,
                    isHired: isAcceptedEmployee, 
                    isRejected: isRejected,
                    isFired: await contract.isFired(i,account)
                });
            }

            setJobs(jobsData);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };

    const applyForJob = async (jobId) => {
        if (!contract || !account) {
            alert("Contract or account not connected.");
            return;
        }

        try {
            setLoadingJobs((prev) => ({ ...prev, [jobId]: true })); 
            const tx = await contract.applyForJob(jobId, {
                value: ethers.parseEther("0.01")
            });
            await provider.waitForTransaction(tx.hash);
            alert(`Applied successfully for job ${jobId}!`);
            fetchJobs(); 
        } catch (err) {
            console.error("Error applying for job:", err);
            alert("Error while applying for the job.");
        }
        finally {
            setLoadingJobs((prev) => ({ ...prev, [jobId]: false })); 
        }
    };

    
    const checkIsEmployer = async () => {
        if (!contract || !account) return;
        try {
            const result = await contract.isEmployer(account);
            setIsEmployer(result);
        } catch (err) {
            console.error("Error checking if employer:", err);
        }
    };

    useEffect(() => {
        if (contract && account) {
            fetchJobs();
            checkIsEmployer();
        }
    }, [contract, account]);

    return (
        <Box className="view-jobs-container">
            <Typography variant="h4" className="section-title">Available Jobs</Typography>
            <Table className="jobs-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Salary</TableCell>
                        <TableCell>Employer</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id} className="job-row">
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.description}</TableCell>
                            <TableCell>{ethers.formatEther(job.salary)} ETH</TableCell>
                            <TableCell>{job.employer}</TableCell>
                            <TableCell>
                                
                                {!isEmployer && (
                                    <>
                                       {job.isHired ? (
    <Button variant="contained" color="success" disabled>
        You are hired!
    </Button>
) : (job.isRejected || job.isFired) && !job.hasApplied ? (
    <>
        <Typography color="error">You were rejected or fired</Typography>
        <Button variant="contained" color="primary" onClick={() => applyForJob(job.id)}
         disabled={loadingJobs[job.id]}>
            {loadingJobs[job.id] ? "Applying..." : "Apply"}
          
        </Button>
    </>
) : job.hasApplied ? (
    <Button variant="contained" disabled>
        Applied (Pending)
    </Button>
) : (
    <Button variant="contained" color="primary" onClick={() => applyForJob(job.id)}
        disabled={loadingJobs[job.id]}
        className="apply-button"
    
    >
        {loadingJobs[job.id] ? "Applying..." : "Apply"}
    </Button>
)}
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default ViewJobs;
