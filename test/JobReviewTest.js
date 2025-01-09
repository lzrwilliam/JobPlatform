const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("JobPlatform & Review Contracts", function () {
  let JobPlatform, jobPlatform;
  let Review, review;
  let owner, addr1, addr2, addr3;

  before(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    // owner va fi "admin" în JobPlatform
  });

  beforeEach(async function () {
    // 1) Deploy JobPlatform
    JobPlatform = await ethers.getContractFactory("JobPlatform");
    jobPlatform = await JobPlatform.deploy();
    await jobPlatform.waitForDeployment();

    // 2) Deploy Review, cu adresa jobPlatform
    Review = await ethers.getContractFactory("Review");
    review = await Review.deploy(jobPlatform.getAddress());
    await review.waitForDeployment();
  });

  describe("JobPlatform basic tests", function () {
    it("Should set the admin to be the deployer (owner)", async function () {
      const admin = await jobPlatform.getAdminAddress();
      expect(admin).to.equal(owner.address);
    });

    it("Should allow admin to add an employer", async function () {
      // addEmployer trebuie chemat de admin (owner)
      await jobPlatform.addEmployer(addr1.address);
      const isEmp = await jobPlatform.isEmployer(addr1.address);
      expect(isEmp).to.be.true;
    });

    it("Should not allow duplicate employers", async function () {
      await jobPlatform.addEmployer(addr1.address);
      await expect(
          jobPlatform.addEmployer(addr1.address)
      ).to.be.revertedWith("Employer is already validated");
  });
    it("Should fail if non-admin tries to add an employer", async function () {
      // apelăm addEmployer cu alt cont (addr1), ar trebui să dea revert
      await expect(
        jobPlatform.connect(addr1).addEmployer(addr2.address)
      ).to.be.revertedWith("Caller is not the admin");
    });

    it("Should allow an employer to post a job", async function () {
      // Mai întâi îl facem employer
      await jobPlatform.addEmployer(addr1.address);

      // Apoi, postăm job-ul cu addr1
      const tx = await jobPlatform
        .connect(addr1)
        .postJob("Frontend Dev", "React developer", ethers.parseEther("2"));
      await tx.wait();

      const jobCount = await jobPlatform.getJobCount();
      expect(jobCount).to.equal(1);

      // Verificăm datele job-ului
      const jobData = await jobPlatform.getJob(0);
      expect(jobData.title).to.equal("Frontend Dev");
      expect(jobData.employer).to.equal(addr1.address);
      expect(jobData.salary).to.equal(ethers.parseEther("2"));
    });

    it("Should let a normal user register automatically", async function () {
      // În cod: "registerUser()" -> if (!isUserRegistered[msg.sender]) ...
      await jobPlatform.connect(addr2).registerUser();
      const isReg = await jobPlatform.isRegistered(addr2.address);
      expect(isReg).to.be.true;
    });

    it("Should let a normal user apply for job if valid", async function () {
      // 1) Facem un employer
      await jobPlatform.addEmployer(addr1.address);

      // 2) Employerul postează job-ul
      await jobPlatform
        .connect(addr1)
        .postJob("Backend Dev", "NodeJS developer", ethers.parseEther("3"));

      // jobId = 0
      // 3) addr2 se înregistrează mai întâi (opțional, nu-i musai dacă n-ai require)
      await jobPlatform.connect(addr2).registerUser();

      // 4) addr2 aplică la job cu 0.01 ETH
      const jobId = 0;
      await expect(
        jobPlatform.connect(addr2).applyForJob(jobId, {
          value: ethers.parseEther("0.01"),
        })
      ).to.emit(jobPlatform, "JobApplied")
        .withArgs(jobId, addr2.address);

      // Verificăm că fee-ul a fost transferat la employer
      // => Nu e simplu de verificat direct, dar putem verifica balanțele
      // De exemplu:
      const oldBalance = await ethers.provider.getBalance(addr1.address);
      // facem alt job & app pt a produce o dif, sau preluăm direct 
      // – e tricky fiindcă e gas cost, dar ar trebui să crească un pic 
      // Aici, ne mulțumim doar cu succesul evenimentului si zero revert
    });

    it("Should fail if user tries to apply with not enough ETH", async function () {
      await jobPlatform.addEmployer(addr1.address);
      await jobPlatform.connect(addr1)
        .postJob("Smart Contract Dev", "Solidity dev", ethers.parseEther("5"));

      await expect(
        jobPlatform.connect(addr2).applyForJob(0, { value: ethers.parseEther("0.001") })
      ).to.be.revertedWith("Minimum application fee is 0.01 ETH");
    });

    it("Should allow employer to approve a request", async function () {
      // create employer + job
      await jobPlatform.addEmployer(addr1.address);
      await jobPlatform
        .connect(addr1)
        .postJob("QA Engineer", "Automation QA", ethers.parseEther("2"));

      // apply
      await jobPlatform.connect(addr2).applyForJob(0, {
        value: ethers.parseEther("0.01"),
      });

      // now employer can approve
      const requestId = 1; 
      await jobPlatform.connect(addr1).approveRequest(0, addr2.address,requestId);

      // check in the employerRequests array
      const [jobIds, applicants, approved, rejected] = await jobPlatform.getRequests(addr1.address);
      expect(jobIds[0]).to.equal(0);
      expect(applicants[0]).to.equal(addr2.address);
      expect(approved[0]).to.equal(true);
      expect(rejected[0]).to.equal(false);
    });
  });

  describe("Review Contract tests", function () {
    it("Should let employer review applicant if valid relationship", async function () {
      // 1) Creăm employer + job + applicant
      await jobPlatform.addEmployer(addr1.address);
      // Employer (addr1) postează job-ul
      await jobPlatform
        .connect(addr1)
        .postJob("UI/UX Designer", "Design system", ethers.parseEther("1"));

      // alt user (addr2) aplică
      await jobPlatform.connect(addr2).applyForJob(0, {
        value: ethers.parseEther("0.01"),
      });

      // 2) Employer (addr1) lasă review la adresa lui addr2
      // => jobId = 0, reviewee = addr2
      await expect(review.connect(addr1).leaveReview(0, addr2.address, 5, "Great work!"))
      .to.emit(review, "ReviewSubmitted")
      .withArgs(addr1.address, addr2.address, 5, "Great work!", 0);
  

      // verificăm stocarea
      const r = await review.getReview(addr1.address, addr2.address);
      expect(r.rating).to.equal(5);
      expect(r.comments).to.equal("Great work!");
      expect(r.reviewer).to.equal(addr1.address);
      expect(r.reviewee).to.equal(addr2.address);
    });

    it("Should revert if no valid relationship found", async function () {
        // 1) Creăm un employer
        await jobPlatform.addEmployer(addr1.address);
      
        // 2) Employer (addr1) postează un job (jobId = 0)
        await jobPlatform
          .connect(addr1)
          .postJob("Any Title", "Any Description", ethers.parseEther("1"));
      
        // 3) Fără ca nimeni să fi aplicat, addr1 încearcă să lase un review pentru addr2
        //   => Nu există nicio relație (addr2 nu e aplicant), deci ar trebui revert cu
        //      "No valid employment relationship found".
        await expect(
          review.connect(addr1).leaveReview(0, addr2.address, 4, "Ok job")
        ).to.be.revertedWith("No valid employment relationship found");
      });
      

    it("Should revert if rating is out of range", async function () {
      // setăm relația rapid
      await jobPlatform.addEmployer(addr1.address);
      await jobPlatform.connect(addr1).postJob("Demo", "Test", ethers.parseEther("1"));
      await jobPlatform.connect(addr2).applyForJob(0, {
        value: ethers.parseEther("0.01"),
      });

      // rating 6 => revert
      await expect(
        review.connect(addr1).leaveReview(0, addr2.address, 6, "Too high rating")
      ).to.be.revertedWith("Rating must be between 1 and 5");
    });

    it("Should revert if comments is empty", async function () {
      // relație validă
      await jobPlatform.addEmployer(addr1.address);
      await jobPlatform.connect(addr1).postJob("Demo", "Test", ethers.parseEther("1"));
      await jobPlatform.connect(addr2).applyForJob(0, {
        value: ethers.parseEther("0.01"),
      });

      // comments = ""
      await expect(
        review.connect(addr1).leaveReview(0, addr2.address, 3, "")
      ).to.be.revertedWith("Comments cannot be empty");
    });
  });

  it("Should allow employer to reject a request", async function () {
    await jobPlatform.addEmployer(addr1.address);
    await jobPlatform.connect(addr1).postJob("Tester", "QA Testing", ethers.parseEther("1"));
    await jobPlatform.connect(addr2).applyForJob(0, { value: ethers.parseEther("0.01") });

    const requestId = 1; 
    await jobPlatform.connect(addr1).rejectRequest(0, addr2.address, requestId);

    const [jobIds, applicants, approved, rejected] = await jobPlatform.getRequests(addr1.address);
    expect(rejected[0]).to.be.true;
    expect(approved[0]).to.be.false;
});

it("Should allow employer to fire an employee", async function () {
    await jobPlatform.addEmployer(addr1.address);
    await jobPlatform.connect(addr1).postJob("Blockchain Dev", "Smart Contract Developer", ethers.parseEther("2"));
    await jobPlatform.connect(addr2).applyForJob(0, { value: ethers.parseEther("0.01") });

    const requestId = 1; 
    await jobPlatform.connect(addr1).approveRequest(0, addr2.address, requestId);

    await jobPlatform.connect(addr1).fireEmployee(0, addr2.address);

    const isFired = await jobPlatform.isFired(0, addr2.address);
    expect(isFired).to.be.true;
});

it("Should allow employer to pay an accepted employee", async function () {
  await jobPlatform.addEmployer(addr1.address);
  await jobPlatform.connect(addr1).postJob("Full Stack Dev", "Web Developer", ethers.parseEther("3"));
  await jobPlatform.connect(addr2).applyForJob(0, { value: ethers.parseEther("0.01") });

  const requestId = 1; 
  await jobPlatform.connect(addr1).approveRequest(0, addr2.address, requestId);

  const initialBalance = await ethers.provider.getBalance(addr2.address);

  await jobPlatform.connect(addr1).payEmployee(0, addr2.address, { value: ethers.parseEther("3") });

  const finalBalance = await ethers.provider.getBalance(addr2.address);

  expect(finalBalance).to.be.above(initialBalance);
});

it("Should not allow an employer to fire a non-accepted employee", async function () {
    await jobPlatform.addEmployer(addr1.address);
    await jobPlatform.connect(addr1).postJob("UI Designer", "UI/UX Developer", ethers.parseEther("1"));
    
    await expect(
        jobPlatform.connect(addr1).fireEmployee(0, addr2.address)
    ).to.be.revertedWith("Employee was not accepted for this job.");
});

it("Should not allow employer to pay a fired employee", async function () {
  await jobPlatform.addEmployer(addr1.address);
  await jobPlatform.connect(addr1).postJob("UI Designer", "Figma Expert", ethers.parseEther("2"));
  await jobPlatform.connect(addr2).applyForJob(0, { value: ethers.parseEther("0.01") });
  await jobPlatform.connect(addr1).approveRequest(0, addr2.address, 1);
  await jobPlatform.connect(addr1).fireEmployee(0, addr2.address);

  await expect(
      jobPlatform.connect(addr1).payEmployee(0, addr2.address, { value: ethers.parseEther("2") })
  ).to.be.revertedWith("Employee was not accepted for this job.");
});

it("Should not allow payment with incorrect salary", async function () {
  await jobPlatform.addEmployer(addr1.address);
  await jobPlatform.connect(addr1).postJob("Solidity Dev", "Smart Contract Developer", ethers.parseEther("3"));
  await jobPlatform.connect(addr2).applyForJob(0, { value: ethers.parseEther("0.01") });
  await jobPlatform.connect(addr1).approveRequest(0, addr2.address, 1);

  await expect(
      jobPlatform.connect(addr1).payEmployee(0, addr2.address, { value: ethers.parseEther("1") })
  ).to.be.revertedWith("Incorrect salary amount sent.");
});

});
