import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const AddEmployer = ({ contract, account, adminAddress, provider , eventManager}) => {
  const [users, setUsers] = useState([]); // Lista tuturor utilizatorilor
  const [employers, setEmployers] = useState([]); // Lista angajatorilor existenți
  const [nonEmployers, setNonEmployers] = useState([]); // Lista utilizatorilor care nu sunt angajatori
  const [selectedUser, setSelectedUser] = useState(""); // Utilizatorul selectat din dropdown
  const [isLoading, setIsLoading] = useState(false); // Starea pentru blocarea butonului



  const fetchUsersAndEmployers = async () => {
    if (!contract) return;

    try {
      const allUsers = await contract.getAllUsers();
      const employerAddresses = await contract.getAllEmployers();

      setEmployers(employerAddresses);

      const nonEmployerUsers = allUsers.filter(
        (user) => !employerAddresses.includes(user)
      );
      setNonEmployers(nonEmployerUsers);
    } catch (err) {
      console.error("Error fetching users and employers:", err);
    }
  };

  const handleAddEmployer = async () => {
    if (!contract || !selectedUser) {
      alert("Please select a valid user.");
      return;
    }

    if (!provider) {
      console.error("Provider is undefined.");
      alert("Provider is not available. Please check your wallet connection.");
      return;
    }

    if (account.toLowerCase() !== adminAddress.toLowerCase()) {
      alert("Only the admin can add employers!");
      return;
    }

    try {
      setIsLoading(true); 
      const txResponse = await contract.addEmployer(selectedUser);
      const txReceipt = await provider.waitForTransaction(txResponse.hash);
      console.log("Transaction confirmed:", txReceipt);
  

      if (txReceipt.status === 1) {
        alert(`Employer ${selectedUser} added successfully!`);
      }
      setSelectedUser("");
      fetchUsersAndEmployers(); 
    } catch (err) {
      console.error("Error adding employer:", err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleRemoveEmployer = async (employer) => {
    if (!contract || !employer) {
      alert("Invalid employer address.");
      return;
    }

    if (!provider) {
      console.error("Provider is undefined.");
      alert("Provider is not available. Please check your wallet connection.");
      return;
    }

    if (account.toLowerCase() !== adminAddress.toLowerCase()) {
      alert("Only the admin can remove employers!");
      return;
    }

    try {
      setIsLoading(true); 
      const txResponse = await contract.removeEmployer(employer);
      const txReceipt = await provider.waitForTransaction(txResponse.hash);
      console.log("Transaction confirmed:", txReceipt);

      if (txReceipt.status === 1) {
        alert(`Employer ${employer} removed successfully!`);
      }
      fetchUsersAndEmployers(); 
    } catch (err) {
      console.error("Error removing employer:", err);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchUsersAndEmployers();
    }
  }, [contract]);
  return (
    <Box className="add-employer-container">
      <Typography variant="h4" className="title">Manage Employers</Typography>

      {/* Dropdown Utilizatori */}
      <Box className="form-section">
        <Typography variant="h6" className="section-title">Add a New Employer</Typography>
        <Select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="dropdown"
        >
          <MenuItem value="" disabled>Select a User</MenuItem>
          {nonEmployers.map((user, index) => (
            <MenuItem key={index} value={user}>
              {user}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddEmployer}
          disabled={!selectedUser || isLoading}
          className="action-button"
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Add Employer"}
        </Button>
      </Box>

      {/* Tabel Angajatori */}
      <Box className="form-section">
        <Typography variant="h6" className="section-title">Existing Employers</Typography>
        <Table className="styled-table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Employer Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employers.map((employer, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{employer}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveEmployer(employer)}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={20} color="inherit" /> : "Remove"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AddEmployer;