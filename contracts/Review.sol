// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./JobPlatform.sol";

contract Review {
    JobPlatform  public jobPlatform; 

    struct ReviewStruct {
        address reviewer;
        address reviewee;
        string comments;
        uint8 rating; 
        uint256 timestamp;
    }

    mapping(address => mapping(address => ReviewStruct)) public reviews; 

    event ReviewSubmitted(address indexed reviewer, address indexed reviewee, uint8 rating, string comments, uint256 jobId);

    constructor(address  payable _jobPlatformAddress) {
        jobPlatform = JobPlatform(_jobPlatformAddress);
    }

    modifier onlyValidRelationship(uint256 jobId, address reviewee) {
        (, , , address employer, address[] memory applicants) = jobPlatform.getJob(jobId);

        require(
            (msg.sender == employer && isApplicant(applicants, reviewee)) || 
            (reviewee == employer && isApplicant(applicants, msg.sender)) ||
             (jobPlatform.isFired(jobId, msg.sender)),
            "No valid employment relationship found"
        );
        _;
    }

    function isApplicant(address[] memory applicants, address user) internal pure returns (bool) {
        for (uint256 i = 0; i < applicants.length; i++) {
            if (applicants[i] == user) {
                return true;
            }
        }
        return false;
    }

    function leaveReview(uint256 jobId, address reviewee, uint8 rating, string memory comments) 
        public 
        onlyValidRelationship(jobId, reviewee) 
    {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        require(bytes(comments).length > 0, "Comments cannot be empty");

        reviews[msg.sender][reviewee] = ReviewStruct({
            reviewer: msg.sender,
            reviewee: reviewee,
            comments: comments,
            rating: rating,
            timestamp: block.timestamp
        });

        emit ReviewSubmitted(msg.sender, reviewee, rating, comments,jobId);
    }

    function getReview(address reviewer, address reviewee) 
        public 
        view 
        returns (ReviewStruct memory) 
    {
        return reviews[reviewer][reviewee];
    }
}
