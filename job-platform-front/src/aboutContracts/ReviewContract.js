export const ReviewAddress = "0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00";
export const ReviewABI = 
 [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_jobPlatformAddress",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "payable": false,
    "gas": null
  },
  {
    "type": "event",
    "inputs": [
      {
        "name": "reviewer",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "reviewee",
        "type": "address",
        "baseType": "address",
        "indexed": true,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "rating",
        "type": "uint8",
        "baseType": "uint8",
        "indexed": false,
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "comments",
        "type": "string",
        "baseType": "string",
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
    "name": "ReviewSubmitted",
    "anonymous": false
  },
  {
    "type": "function",
    "inputs": [
      {
        "name": "reviewer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "reviewee",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "getReview",
    "constant": true,
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "baseType": "tuple",
        "components": [
          {
            "name": "reviewer",
            "type": "address",
            "baseType": "address",
            "components": null,
            "arrayLength": null,
            "arrayChildren": null
          },
          {
            "name": "reviewee",
            "type": "address",
            "baseType": "address",
            "components": null,
            "arrayLength": null,
            "arrayChildren": null
          },
          {
            "name": "comments",
            "type": "string",
            "baseType": "string",
            "components": null,
            "arrayLength": null,
            "arrayChildren": null
          },
          {
            "name": "rating",
            "type": "uint8",
            "baseType": "uint8",
            "components": null,
            "arrayLength": null,
            "arrayChildren": null
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "baseType": "uint256",
            "components": null,
            "arrayLength": null,
            "arrayChildren": null
          }
        ],
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
    "name": "jobPlatform",
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
        "name": "reviewee",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "rating",
        "type": "uint8",
        "baseType": "uint8",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "comments",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "leaveReview",
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
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      }
    ],
    "name": "reviews",
    "constant": true,
    "outputs": [
      {
        "name": "reviewer",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "reviewee",
        "type": "address",
        "baseType": "address",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "comments",
        "type": "string",
        "baseType": "string",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "rating",
        "type": "uint8",
        "baseType": "uint8",
        "components": null,
        "arrayLength": null,
        "arrayChildren": null
      },
      {
        "name": "timestamp",
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
  }
] 
