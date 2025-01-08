export const JPAddress = "0x9d4454B023096f34B160D6B654540c56A1F81688";
export const JPABI = 
 [
  {
    "type": "constructor",
    "inputs": [],
    "payable": false,
    "gas": null
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "amount",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "ApplicationFeeReceived",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "requestCount",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "Debug",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "totalApplications",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "DebugApplication",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "isEmployer",
        "type": "bool",
        "baseType": "bool",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "DebugEmployer",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "sender",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "value",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "data",
        "type": "bytes",
        "baseType": "bytes",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "DebugFallback",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "message",
        "type": "string",
        "baseType": "string",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "sender",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "value",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "DebugInfo",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "DebugJobPosted",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "requestCount",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "DebugRequests",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "EmployerAdded",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "EmployerRemoved",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "JobApplied",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "title",
        "type": "string",
        "baseType": "string",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "JobPosted",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "RequestApproved",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "RequestCreated",
    "anonymous": false
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "RequestRejected",
    "anonymous": false
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "addEmployer",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "admin",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "allUsers",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "applyForJob",
    "constant": false,
    "outputs": [],
    "stateMutability": "payable",
    "payable": true,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "requestId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "approveRequest",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "employerRequests",
    "constant": true,
    "outputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "approved",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "rejected",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "requestId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "employers",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employee",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "fireEmployee",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "getAdminAddress",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "getAllEmployers",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "address",
          "baseType": "address",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "getAllUsers",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "address",
          "baseType": "address",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "getApplicants",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "address",
          "baseType": "address",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "getJob",
    "constant": true,
    "outputs": [
      {
        "name": "title",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "description",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "salary",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicants",
        "type": "address[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "address",
          "baseType": "address",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "getJobCount",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "getJobEmployer",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "getRequests",
    "constant": true,
    "outputs": [
      {
        "name": "jobIds",
        "type": "uint256[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "uint256",
          "baseType": "uint256",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      },
      {
        "name": "applicants",
        "type": "address[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "address",
          "baseType": "address",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      },
      {
        "name": "approved",
        "type": "bool[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "bool",
          "baseType": "bool",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      },
      {
        "name": "rejected",
        "type": "bool[]",
        "baseType": "array",
        "components": null,
        "arrayLength": -1,
        "arrayChildren": {
          "name": "",
          "type": "bool",
          "baseType": "bool",
          "components": null,
          "arrayLength": null,
          "arrayChildren": null
        }
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "hasApplied",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "isAcceptedEmployee",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "isEmployer",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "isFired",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "isRegistered",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "isUserRegistered",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "baseType": "bool",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "jobCount",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "jobs",
    "constant": true,
    "outputs": [
      {
        "name": "title",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "description",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "salary",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "stateMutability": "view",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "employee",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "payEmployee",
    "constant": false,
    "outputs": [],
    "stateMutability": "payable",
    "payable": true,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "description",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "salary",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "postJob",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [],
    "name": "registerUser",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "jobId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "applicant",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "requestId",
        "type": "uint256",
        "baseType": "uint256",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "rejectRequest",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "employer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "removeEmployer",
    "constant": false,
    "outputs": [],
    "stateMutability": "nonpayable",
    "payable": false,
    "gas": null
  },
  {
    "type": "fallback",
    "inputs": [],
    "payable": true
  }
] 
