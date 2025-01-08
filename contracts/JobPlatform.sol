// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobPlatform {
  struct Job {
    string title;
    string description;
    uint256 salary;
    address employer;
    address[] applicants; 
  }


    struct Request {
        uint256 jobId;
        address applicant;
        bool approved;
        bool rejected;
         uint256 requestId;
    }


  mapping(uint256 => Job) public jobs;  
  mapping(address => bool) public isEmployer;   
  mapping(address => mapping(uint256 => bool)) public hasApplied;   
  mapping(address => Request[]) public employerRequests;
  mapping(address => bool) public isUserRegistered; 
  mapping(uint256 => mapping(address => bool)) public isAcceptedEmployee;
  mapping(uint256 => mapping(address => bool)) public isFired;

  uint256 public jobCount;

  address[] public employers; 
  address[] public allUsers; 
  
  address public admin;




  event JobPosted(uint256 jobId, address indexed employer, string title);
  event JobApplied(uint256 jobId, address indexed applicant);
  event EmployerAdded(address indexed employer);
  event EmployerRemoved(address indexed employer);
  event DebugJobPosted(uint256 jobId, address employer);
   event RequestCreated(uint256 jobId, address indexed employer, address indexed applicant);
    event RequestApproved(uint256 jobId, address indexed employer, address indexed applicant);
    event RequestRejected(uint256 jobId, address indexed employer, address indexed applicant);

    event ApplicationFeeReceived( uint256  indexed jobId, address indexed applicant, uint256 amount);



  constructor() {
    admin = msg.sender;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, "Caller is not the admin");
    _;
  }

 
 modifier onlyEmployer() {
    require(isEmployer[msg.sender], "Caller is not a validated employer");
    _;
}


function getJobEmployer(uint256 jobId) public view jobExists(jobId) returns (address) {
    return jobs[jobId].employer;
}


  modifier jobExists(uint256 jobId) {
    require(jobId < jobCount, "Job does not exist.");
    _;
  }

  
  function getAdminAddress() public view returns (address) {
    return admin;
  }

  function getJobCount() public view returns (uint256) {
    return jobCount;
  }




function postJob(string memory title, string memory description, uint256 salary) public onlyEmployer {


      require(isEmployer[msg.sender], "Caller is not a validated employer");
require(bytes(title).length > 0, "Title cannot be empty");
require(bytes(description).length > 0, "Description cannot be empty");
require(salary > 0, "Salary must be greater than zero");


        jobs[jobCount] = Job({
            title: title,
            description: description,
            salary: salary,
            employer: msg.sender,
            applicants: new address[](0) });

        emit JobPosted(jobCount, msg.sender, title);
        jobCount++;
    }
   





function applyForJob(uint256 jobId) public  payable jobExists(jobId) {
    require(msg.sender != jobs[jobId].employer, "Employer cannot apply to their own job.");
    require(msg.value == 0.01 ether, "Minimum application fee is 0.01 ETH");
    require(!hasApplied[msg.sender][jobId], "You have already applied for this job.");

        uint256 newRequestId = employerRequests[jobs[jobId].employer].length + 1; 


    jobs[jobId].applicants.push(msg.sender);
    hasApplied[msg.sender][jobId] = true;
    isFired[jobId][msg.sender] = false;

    
  
    // Transferam taxa de aplicare direct catre angajator

    (bool sent, ) = payable(jobs[jobId].employer).call{value: msg.value}("");
    require(sent, "Failed to transfer ETH to employer");

  
    employerRequests[jobs[jobId].employer].push(Request({
        jobId: jobId,
        applicant: msg.sender,
        approved: false,
        rejected: false,
        requestId: newRequestId
    }));

 
    emit JobApplied(jobId, msg.sender);
    emit ApplicationFeeReceived(jobId, msg.sender, msg.value);

}

  

function getRequests(address employer) 
    public 
    view 
    returns (
        uint256[] memory jobIds,
        address[] memory applicants,
        bool[] memory approved,
        bool[] memory rejected
    ) 
{
    require(isEmployer[employer], "Address is not a valid employer");

    uint256 length = employerRequests[employer].length;

    jobIds = new uint256[](length);
    applicants = new address[](length);
    approved = new bool[](length);
    rejected = new bool[](length);

    for (uint256 i = 0; i < length; i++) {
        Request storage req = employerRequests[employer][i];
        jobIds[i] = req.jobId;
        applicants[i] = req.applicant;
        approved[i] = req.approved;
        rejected[i] = req.rejected;
    }

    return (jobIds, applicants, approved, rejected);
}


function getAllUsers() public view onlyAdmin returns (address[] memory) {
    return allUsers;
}
function isRegistered(address user) public view returns (bool) {
    return isUserRegistered[user];
}


function registerUser() public {
    require(!isUserRegistered[msg.sender], "You are already registered!");
    isUserRegistered[msg.sender] = true;
    allUsers.push(msg.sender);
}






function approveRequest(uint256 jobId, address applicant, uint256 requestId) public {
    Job memory job = jobs[jobId];
    require(msg.sender == job.employer, "Only employer can approve requests.");

    Request[] storage requests = employerRequests[msg.sender];
    bool requestFound = false;

    for (uint256 i = 0; i < requests.length; i++) {
        if (requests[i].jobId == jobId && requests[i].applicant == applicant && requests[i].requestId == requestId) {
            requests[i].approved = true;
            isAcceptedEmployee[jobId][applicant] = true;
            isFired[jobId][applicant] = false;
            emit RequestApproved(jobId, msg.sender, applicant);
            requestFound = true;
            break;
        }
    }
    require(requestFound, "Request not found or already processed.");
}

function rejectRequest(uint256 jobId, address applicant, uint256 requestId) public {
    Job memory job = jobs[jobId];
    require(msg.sender == job.employer, "Only employer can reject requests.");

    Request[] storage requests = employerRequests[msg.sender];
    bool requestFound = false;

    for (uint256 i = 0; i < requests.length; i++) {
        if (requests[i].jobId == jobId && requests[i].applicant == applicant && requests[i].requestId == requestId) {
            requests[i].rejected = true;
            hasApplied[applicant][jobId] = false;
            emit RequestRejected(jobId, msg.sender, applicant);
            requestFound = true;
            break;
        }
    }
    require(requestFound, "Request not found or already processed.");
}


  

    function getApplicants(uint256 jobId) public view jobExists(jobId) returns (address[] memory) {
        return jobs[jobId].applicants;
    }

  



function addEmployer(address employer) public onlyAdmin {
    require(!isEmployer[employer], "Employer is already validated");
    employers.push(employer);
    isEmployer[employer] = true;

    emit EmployerAdded(employer);
}

  function removeEmployer(address employer) public onlyAdmin {
    require(isEmployer[employer], "Employer is not validated");
    isEmployer[employer] = false;

    for (uint256 i = 0; i < employers.length; i++) {
        if (employers[i] == employer) {
            employers[i] = employers[employers.length - 1]; 
            employers.pop(); 
            break;
        }
      }
    emit EmployerRemoved(employer);
  }

   
  function getAllEmployers() public view returns (address[] memory) {
    return employers;
  }

  
  function getJob(uint256 jobId) public view jobExists(jobId) returns (string memory title,string memory description,uint256 salary,address employer, address[] memory applicants){
    Job memory job = jobs[jobId];
    return (job.title, job.description, job.salary, job.employer, job.applicants);
  }


    receive() external payable {
        //pentru a putea accepta ETH direct
    }

    

function fireEmployee(uint256 jobId, address employee) public jobExists(jobId) {
    Job storage job = jobs[jobId];
    require(msg.sender == job.employer, "Only employer can fire employees.");
    require(isAcceptedEmployee[jobId][employee], "Employee was not accepted for this job.");

   
    isAcceptedEmployee[jobId][employee] = false;
        isFired[jobId][employee] = true;
        hasApplied[employee][jobId] = false;


    for (uint256 i = 0; i < job.applicants.length; i++) {
        if (job.applicants[i] == employee) {
            job.applicants[i] = job.applicants[job.applicants.length - 1];
            job.applicants.pop();
            break;
        }
    }
}


function payEmployee(uint256 jobId, address employee) public payable jobExists(jobId) {
    Job storage job = jobs[jobId];
    require(msg.sender == job.employer, "Only employer can pay employees.");
    require(isAcceptedEmployee[jobId][employee], "Employee was not accepted for this job.");
    require(msg.value == job.salary, "Incorrect salary amount sent.");

    (bool sent, ) = payable(employee).call{value: msg.value}("");
    require(sent, "Failed to send salary.");
}

  
}
