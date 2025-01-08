import React, { useState, useEffect } from "react";
import { Container, Button, Box, Typography, Table, TableBody, TableRow, TableCell, TableHead, TextField, TableContainer } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link,Navigate, useLocation } from "react-router-dom";


import { JPAddress, JPABI } from "./aboutContracts/JobPlatformContract";
import { ReviewAddress, ReviewABI } from "./aboutContracts/ReviewContract";
import { Contract, ethers, formatEther, BrowserProvider } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers";
import ViewJobs from "./ViewJobs";
import AddJob from "./AddJob";
import Requests from "./Requests";
import AddEmployer from "./AddEmployer";
import Review from "./Reviews";
import Transactions from "./Transactions";
import NotificationsBar from "./NotificationsBar"; 
import EventManager from "./EventManager";
import EmployerDashboard from "./EmployerDashboard";
import "./styles/App.css";





const ProtectedRoute = ({ account, children }) => {
  const location = useLocation();
  if (!account) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  const [account, setAccount] = useState(localStorage.getItem("connectedAccount") || null);  

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [reviewContract, setReviewContract] = useState(null);
  const [adminAddress, setAdminAddress] = useState(null);
  const [balance, setBalance] = useState(null); 
  const [isEmployer, setIsEmployer] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationHashes, setNotificationHashes] = useState(new Set());
  const [deletedHashes, setDeletedHashes] = useState(new Set());
  const [eventManager, setEventManager] = useState(null);

  const generateHash = (message) => keccak256(toUtf8Bytes(message));




  const fetchAdminAddress = async () => {
    if (contract) {
      try {
        const admin = await contract.admin();
        setAdminAddress(admin);
      } catch (error) {
        console.error("Error fetching admin address:", error);
      }
    }
  };



  const fetchBalance = async () => {
    if (!provider || !account) {
      console.error("Provider or account is not set.");
      return;}
  
    try {
      // "env": {
      //   "es2020": true
      // }
       //ADAUGAM LINIILE ACELEA IN package.json la eslintconfig pentru a merge BigInt
      const balance = await provider.getBalance(account); // Returneaza BigNumber
      const balanceBigInt = BigInt(balance.toString()); // Conversie explicita in BigInt
      setBalance(formatEther(balanceBigInt)); // Conversie in Ether
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };



  
  useEffect(() => {
    if (contract && account) {
      fetchBalance();
    }
    fetchAdminAddress();
  }, [contract, account]);




  const addNotification = (message) => {
    const hash = generateHash(message);
    if (notificationHashes.has(hash)) return; // Evita duplicările
    setNotificationHashes((prev) => new Set(prev).add(hash));
    setNotifications((prev) => [...prev, { message, hash }]);
  };
  


    // **Persistenta notificari**
    useEffect(() => {
      const savedHashes = JSON.parse(localStorage.getItem("deletedHashes")) || [];
      setDeletedHashes(new Set(savedHashes));
  
      const savedNotifications = JSON.parse(localStorage.getItem(`notifications-${account}`)) || [];
      setNotifications(savedNotifications);
    }, [account]);
  
    useEffect(() => {
      localStorage.setItem("deletedHashes", JSON.stringify([...deletedHashes]));
      localStorage.setItem(`notifications-${account}`, JSON.stringify(notifications));
    }, [deletedHashes, notifications, account]);
  

    useEffect(() => {
      if (contract && eventManager === null) {
          const eventManagerInstance = new EventManager(contract);
          setEventManager(eventManagerInstance);
  
          eventManagerInstance.on("EmployerAdded", (employer) => {
              addNotification(`A new employer was added: ${employer}`);
          });

          eventManagerInstance.on("EmployerRemoved", (employer) => {
            addNotification(`An employer has been removed ${employer}`);
        });
        eventManagerInstance.on("JobPosted", (employer, title) => {
          addNotification(`🎉 New job created: "${title}" by ${employer}`);
      });

      }
  }, [contract], eventManager);
  


  const deleteNotification = (hash) => {
    setDeletedHashes((prev) => new Set(prev).add(hash));
    setNotifications((prev) => prev.filter((notif) => notif.hash !== hash));
  };

  const clearAllNotifications = () => {
    setDeletedHashes((prev) => new Set([...prev, ...notifications.map((n) => n.hash)]));
    setNotifications([]);
  };



    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        await initializeContracts(accounts[0]);
        localStorage.setItem("connectedAccount", accounts[0]);  
      } else {
        disconnectWallet();
      }
    };
  
    const handleChainChanged = () => {
      window.location.reload();
    };
  
    const disconnectWallet = () => {
      setAccount(null);
      setContract(null);
      setIsEmployer(false);
      localStorage.removeItem("connectedAccount");
    };
  
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          if (accounts.length > 0) {
            await initializeContracts(accounts[0]);
            localStorage.setItem("connectedAccount", accounts[0]);  

          }
        } catch (err) {
          console.error("Error connecting to MetaMask:", err);
          alert("Error connecting to MetaMask. Check permissions.");
        }
      } else {
        alert("Please install MetaMask!");
      }
    };
  
    const initializeContracts = async (selectedAccount) => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setProvider(provider);
        setSigner(signer);
  
        const contract = new Contract(JPAddress, JPABI, signer);
        const reviewContract = new Contract(ReviewAddress, ReviewABI, signer);
        setContract(contract);
        setReviewContract(reviewContract);
        setAccount(selectedAccount);
  
        const balance = await provider.getBalance(selectedAccount);
        setBalance(formatEther(balance.toString()));
  
        const isRegistered = await contract.isRegistered(selectedAccount);
        const employerStatus = await contract.isEmployer(selectedAccount);
        setIsEmployer(employerStatus);
  
        if (!isRegistered) {
          const txResponse = await contract.registerUser();
          await provider.waitForTransaction(txResponse.hash);
          alert("Your account has been registered!");
        } else {
          alert("You are logged in!");
        }
      } catch (error) {
        console.error("Error initializing contracts:", error);
      }
    };
  
    useEffect(() => {
      const savedAccount = localStorage.getItem("connectedAccount");
      if (savedAccount && window.ethereum) {
        initializeContracts(savedAccount); 
      }
    }, []);
    
    useEffect(() => {
      const init = async () => {
        
        window.ethereum?.on("accountsChanged", handleAccountsChanged);
        window.ethereum?.on("chainChanged", handleChainChanged);
  
        return () => {
          window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
          window.ethereum?.removeListener("chainChanged", handleChainChanged);
        };
      };
      init();
    }, []);
  
    return (
      <Router>

 <Box className="navbar">
        <Typography variant="h5" className="navbar-logo">Job Platform</Typography>
        <div className="navbar-links">
          <Link to="/view-jobs">View Jobs</Link>
          {isEmployer && <Link to="/add-job">Add Job</Link>}
          <Link to="/add-employer">Add Employer</Link>
          <Link to="/see-reviews">See Reviews</Link>
          <Link to="/transactions">Transactions</Link>
          {isEmployer && <Link to="/requests">Requests</Link>}
          {isEmployer && <Link to="/employer-dashboard">Employer Dashboard</Link>}
        </div>
       
        <div className="navbar-right">
          {account && (
            <Typography variant="body1" className="balance">
              Balance: {balance} ETH
            </Typography>
          )}
          {account ? (
            <Button onClick={disconnectWallet} variant="contained" color="error">
              Disconnect Wallet
            </Button>
          ) : (
            <Button onClick={connectWallet} variant="contained" color="primary">
              Connect Wallet
            </Button>
          )}
        </div>
      </Box>


          
          
          
  <div>        <NotificationsBar
            notifications={notifications}
            deleteNotification={deleteNotification}
            clearAllNotifications={clearAllNotifications}
          />
  </div> 
               <Container className="main-container">

  
          <Routes>
  
  
          <Route
    path="/employer-dashboard"
    element={
      <ProtectedRoute account={account}>
        <EmployerDashboard contract={contract} account={account} provider={provider} />
      </ProtectedRoute>
    }
  />
  
  
          <Route
              path="/"
              element={
                account ? (
                  <Navigate to="/view-jobs" />
                ) : (
                  <Typography variant="h6">Please connect your wallet to continue.</Typography>
                )
              }
            />
            
  
  
            <Route
              path="/add-job"
              element={
                <ProtectedRoute account={account}>
  
                <AddJob contract={contract} provider={provider} account={account} adminAddress={adminAddress} />
  
                </ProtectedRoute>
              }
            />
  
  <Route
    path="/add-employer"
    element={
      <ProtectedRoute account={account}>
  
      <AddEmployer
        contract={contract}
        account={account}
        adminAddress={adminAddress}
        provider = {provider}
        eventManager={eventManager}
      />
      </ProtectedRoute>
    }
  />
  <Route
    path="/see-reviews"
    element={
      <ProtectedRoute account={account}>
  
    <Review  reviewContract={reviewContract} jobPlatformContract={contract}  account={account} isEmployer={isEmployer}  provider = {provider} />
      </ProtectedRoute>
    }
    
  />
  
  
  <Route
    path="/requests"
    element={
    //  <ProtectedRoute account={account}>
  <Requests contract={contract} account={account} />
      //</ProtectedRoute>
    }
  />
  <Route
    path="/transactions"
    element={
      <ProtectedRoute account={account}>
  
    <Transactions  account={account}    contract={contract} provider={provider}  />
      </ProtectedRoute>
    }
  />
  
  
  
            <Route
              path="/view-jobs"
              element={
                <ProtectedRoute account={account}>
  
                <ViewJobs contract={contract} account={account}  provider = {provider}
                />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    );
  };
  
  export default App;
  