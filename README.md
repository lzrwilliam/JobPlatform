# Job Platform Project Setup Guide

## Prerequisites
Ensure you have Node.js installed on your system.

## Installation Steps

### Frontend Setup
1. Navigate to the `job-platform-front` folder.
2. Run:
   ```bash
   npm install
   ```

### Backend Setup
1. Navigate to the `backend` folder.
2. Run:
   ```bash
   npm install
   npm install --save-dev \
   @nomicfoundation/hardhat-chai-matchers@^2.0.0 \
   @nomicfoundation/hardhat-ethers@^3.0.0 \
   @nomicfoundation/hardhat-ignition-ethers@^0.15.0 \
   @nomicfoundation/hardhat-network-helpers@^1.0.0 \
   @nomicfoundation/hardhat-verify@^2.0.0 \
   @typechain/ethers-v6@^0.5.0 \
   @typechain/hardhat@^9.0.0 \
   @types/chai@^4.2.0 \
   @types/mocha@>=9.1.0 \
   solidity-coverage@^0.8.1 \
   ts-node@>=8.0.0 \
   typechain@^8.3.0 \
   typescript@>=4.5.0
   ```
3. Install Hardhat and Ethers globally:
   ```bash
   npm install --global hardhat
   npm install --global ethers
   npm install --global @nomiclabs/hardhat-ethers
   ```

## Compile and Deploy Smart Contracts
1. Compile smart contracts:
   ```bash
   npx hardhat compile
   ```
2. Launch a local Hardhat node to generate test accounts:
   ```bash
   npx hardhat node
   ```
3. Deploy smart contracts to the local network:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

## Running the Frontend
1. Navigate to the `job-platform-front` folder.
2. Run:
   ```bash
   npm start
   ```

## Troubleshooting JSON RPC Provider Errors
If you encounter JSON RPC provider errors, clear all old transactions from MetaMask:
- Go to **Settings > Clear Activity**

## Smart Contract Changes
If you modify any contract files in the `contracts` folder:
1. Compile the contracts again:
   ```bash
   npx hardhat compile
   ```
2. Redeploy the contracts:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

Deployed addresses will update automatically in the frontend.

## MetaMask Configuration
1. Install the MetaMask browser extension.
2. Create a new network with the following details:
   - **Chain ID:** `1337`
   - **RPC URL:** `http://127.0.0.1:8545`
   - **Symbol:** `ETH`
3. Import the generated accounts using the private keys displayed in the `npx hardhat node` console.

## Unit Testing
To run unit tests:
1. Navigate to the `backend` folder.
2. Run:
   ```bash
   npx hardhat test test/JobReviewTest.js
   ```

## Environment Setup
- The **deployer** (contract owner) private key should be added to the `.env` file. This key acts as the admin.

