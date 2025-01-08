import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Button } from "@mui/material";
import { getAddress, isAddress } from "ethers";

const Requests = ({ contract, account }) => {
    const [requests, setRequests] = useState([]);
    const [processing, setProcessing] = useState({}); 

    const fetchRequests = async () => {
        if (!contract || !account) {
            console.warn("Contract or account not connected.");
            return;
        }

        if (!isAddress(account)) {
            console.error("Invalid Ethereum address:", account);
            return;
        }

        const accountAddress = getAddress(account);

        try {
            const isEmployer = await contract.isEmployer(accountAddress);
            if (!isEmployer) {
                console.error("Account is not a valid employer.");
                return;
            }

            const [jobIds, applicants, approved, rejected] = await contract.getRequests(accountAddress);

            const fetchedRequests = jobIds.map((_, index) => ({
                jobId: jobIds[index].toString(),
                applicant: applicants[index],
                approved: approved[index],
                rejected: rejected[index],
                requestId: index + 1 
            }));

            setRequests(fetchedRequests);
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };

   
    const approveRequest = async (jobId, applicant, requestId) => {
        try {
            setProcessing((prev) => ({ ...prev, [`${jobId}-${applicant}-${requestId}`]: true })); 
            console.log(`Approving request for Job ID: ${jobId}, Applicant: ${applicant}, Request ID: ${requestId}`);
            const tx = await contract.approveRequest(jobId, applicant, requestId);
            await tx.wait();
            alert("Request approved successfully!");
            fetchRequests();
        } catch (error) {
            console.error("Error approving request:", error);
        } finally {
            setProcessing((prev) => ({ ...prev, [`${jobId}-${applicant}-${requestId}`]: false })); //deblocheaza butoanele approve/reject
        }
    };

    
    const rejectRequest = async (jobId, applicant, requestId) => {
        try {
            setProcessing((prev) => ({ ...prev, [`${jobId}-${applicant}-${requestId}`]: true }));
            console.log(`Rejecting request for Job ID: ${jobId}, Applicant: ${applicant}, Request ID: ${requestId}`);
            const tx = await contract.rejectRequest(jobId, applicant, requestId);
            await tx.wait();
            alert("Request rejected successfully!");
            fetchRequests();
        } catch (error) {
            console.error("Error rejecting request:", error);
        } finally {
            setProcessing((prev) => ({ ...prev, [`${jobId}-${applicant}-${requestId}`]: false }));
        }
    };

   
    useEffect(() => {
        fetchRequests();
    }, [contract, account]);

    return (
        <Box>
            <h2>Job Requests</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Job ID</TableCell>
                        <TableCell>Applicant</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No requests found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        requests.map((req, index) => (
                            <TableRow key={`${req.jobId}-${req.applicant}-${req.requestId}`}>
                                <TableCell>{req.jobId}</TableCell>
                                <TableCell>{req.applicant}</TableCell>
                                <TableCell>
                                    {req.approved
                                        ? "Approved"
                                        : req.rejected
                                        ? "Rejected"
                                        : "Pending"}
                                </TableCell>
                                <TableCell>
                                    {!req.approved && !req.rejected && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => approveRequest(req.jobId, req.applicant, req.requestId)}
                                                disabled={processing[`${req.jobId}-${req.applicant}-${req.requestId}`]}
                                            >
                                                {processing[`${req.jobId}-${req.applicant}-${req.requestId}`]
                                                    ? "Processing..."
                                                    : "Approve"}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => rejectRequest(req.jobId, req.applicant, req.requestId)}
                                                disabled={processing[`${req.jobId}-${req.applicant}-${req.requestId}`]}
                                            >
                                                {processing[`${req.jobId}-${req.applicant}-${req.requestId}`]
                                                    ? "Processing..."
                                                    : "Reject"}
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Requests;
