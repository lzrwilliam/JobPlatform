import React, { useState } from "react";
import { TextField, Button, Box , Typography, CircularProgress } from "@mui/material";
import { ethers } from "ethers";
import "./styles/AddJob.css";


const AddJob = ({ contract,provider }) => {
  const [newJob, setNewJob] = useState({ title: "", description: "", salary: "" });
  const [isLoading, setIsLoading] = useState(false);


  
  const checkNetworkAndAccount = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    console.log("Current Chain ID:", chainId);
    
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected Account:", accounts[0]);

    if (chainId !== '0x539') {  // Chain ID 1337 pentru Hardhat localhost
        alert("Please connect to the Hardhat local network (Chain ID 1337)");
        return false;
    }
    return accounts[0];
};

  const addJob = async () => {

    if (!contract) return alert("Contract not loaded!");

checkNetworkAndAccount();
    console.log("Verifying employer...");

try{
  const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
  console.log("Verifying if the user is a validated employer with account:", account);
  const isEmployer = await contract.isEmployer(account);
    if (!isEmployer) {
      alert("Only validated employers can add jobs.");
      console.error("User is not a validated employer.");
        return;
    }
  }
  catch(err){ 
    console.error("Error verifying employer:", err.message);
    alert("An error occurred while verifying employer.");
  }


    const { title, description, salary } = newJob;

    if (!title || !description || !salary) {
      return alert("All fields are required!");
      
    }


    try {
      setIsLoading(true);
      console.log("Sending transaction...");
      const tx = await contract.postJob(
        title,
        description,
        ethers.parseEther(salary.toString()),
        { gasLimit: 3000000 }
      );

      console.log("Transaction sent, waiting for confirmation:", tx);
      const txReceipt = await provider.waitForTransaction(tx.hash);
      console.log("Transaction confirmed:", txReceipt);

      if (txReceipt.status === 1) {
        alert("Job successfully added!");
      }
      else{
        alert("Transaction failed!");
        console.warn("Transaction failed, check the transaction details:", txReceipt);
      }
     

      setNewJob({ title: "", description: "", salary: "" }); 
    } catch (err) {
      console.error("Error adding job:", err.message); 
      alert("An error occurred while adding the job.");
      if (err.reason) {
        console.error("Error reason provided by the smart contract:", err.reason);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="add-job-container">
      <Typography variant="h4" className="title">Add a New Job</Typography>
      
      <TextField
        label="Title"
        value={newJob.title}
        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        className="input-field"
      />
      
      <TextField
        label="Description"
        value={newJob.description}
        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
        multiline
        rows={3}
        className="input-field"
      />
      
      <TextField
        label="Salary (ETH)"
        value={newJob.salary}
        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
        className="input-field"
      />
      
      <Button
        variant="contained"
        color="primary"
        className="submit-button"
        onClick={addJob}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Add Job"}
      </Button>
    </Box>
  );
};

export default AddJob;