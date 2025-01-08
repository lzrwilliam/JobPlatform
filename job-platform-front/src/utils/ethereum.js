import { ethers } from "ethers";

// Funcția pentru a obține un provider pentru blockchain-ul local (Hardhat)
export const getEthereumProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider("http://127.0.0.1:8545/ ");
  } else {
    alert("MetaMask nu este instalat!");
    return null;
  }
};