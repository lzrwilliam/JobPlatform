import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { ethers } from "ethers";

const EmployerDashboard = ({ contract, account, provider }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState({});

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const jobCount = await contract.getJobCount();
      const employerJobs = [];

      for (let i = 0; i < jobCount; i++) {
        const job = await contract.getJob(i);
        if (job.employer.toLowerCase() === account.toLowerCase()) {
          const acceptedApplicants = new Set();
          for (const applicant of job.applicants) {
            const isAccepted = await contract.isAcceptedEmployee(i, applicant);
            const isFired = await contract.isFired(i, applicant);
            if (isAccepted && !isFired) {
              acceptedApplicants.add(applicant);
            }
          }
          employerJobs.push({
            id: i,
            title: job.title,
            description: job.description,
            salary: job.salary ? job.salary.toString() : "0", 
            acceptedApplicants: Array.from(acceptedApplicants),
          });
        }
      }

      setJobs(employerJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fireEmployee = async (jobId, employee) => {
          const key = `${jobId}-${employee}`;
try {
      setProcessing((prev) => ({ ...prev, [key]: true }));
      const tx = await contract.fireEmployee(jobId, employee);
      await tx.wait();
      alert("Employee fired successfully.");
      fetchJobs();
    } catch (error) {
      console.error("Failed to fire employee:", error);
    }
    finally {
      setProcessing((prev) => ({ ...prev, [key]: false }));
    }

  };

  const payEmployee = async (jobId, employee, salary) => {
         const key = `${jobId}-${employee}`;
 try {
      setProcessing((prev) => ({ ...prev, [key]: true }));
      const salaryValue = ethers.parseUnits(salary, "wei");
      const tx = await contract.payEmployee(jobId, employee, { value: salaryValue });
      console.log("Transaction sent, waiting for confirmation:", tx);
      const txReceipt = await provider.waitForTransaction(tx.hash);
      console.log("Transaction confirmed:", txReceipt);

      if (txReceipt.status === 1) {
        alert("Employee paid!");
      }
     
    } catch (error) {
      console.error("Failed to pay employee:", error);
    }
    finally {
      setProcessing((prev) => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    if (contract) fetchJobs();
  }, [contract]);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4">Employer Dashboard</Typography>
      {jobs.map((job) => (
        <Box key={job.id} mb={4}>
          <Typography variant="h6">{job.title}</Typography>
          <Typography>Description: {job.description}</Typography>
          <Typography>
            Salary: {job.salary ? ethers.formatEther(job.salary) + " ETH" : "N/A"}
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {job.acceptedApplicants.length > 0 ? (
                job.acceptedApplicants.map((applicant) => {
                  const key = `${job.id}-${applicant}`;
                  return (
                    <TableRow key={applicant}>
                      <TableCell>{applicant}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => fireEmployee(job.id, applicant)}
                          disabled={processing[key]}
                        >

            {processing[key] ? "Processing..." : "Fire"}
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: "10px" }}
                          onClick={() => payEmployee(job.id, applicant, job.salary)}
                          disabled={processing[key]}
                        >
                          {processing[key] ? "Processing..." : "Pay"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>No accepted employees.</TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>

        </Box>
      ))}

    </Container>

  );
};

export default EmployerDashboard;
