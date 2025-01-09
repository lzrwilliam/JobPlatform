const fs = require('fs');

async function main() {


  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Configurează provider-ul pentru a te conecta la rețeaua Hardhat locală cu chainId 1337
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // Asigură-te că semnatarul (deployer) folosește provider-ul corect
  const deployerWithProvider = deployer.connect(provider);

  // Obține contractul JobPlatform
  const JobPlatform = await ethers.getContractFactory("JobPlatform", deployerWithProvider);
  const Review = await ethers.getContractFactory("Review", deployerWithProvider);
  
  
  // Implementează contractul
  const jobPlatform = await JobPlatform.deploy();
  console.log("JobPlatform contract deployed to:", jobPlatform.target);

  const Reviewer = await Review.deploy(jobPlatform.target);
  console.log("Review contract deployed to:", Reviewer.target);

  // Scrie adresa contractului și ABI-ul într-un fișier pentru frontend
  var text1 = `export const JPAddress = "${jobPlatform.target}";\n`;
  var text2 = `export const JPABI = \n ${JSON.stringify(jobPlatform.interface.fragments, null, 2)} \n`;
  var text = text1 + text2;
  fs.writeFileSync('./job-platform-front/src/aboutContracts/JobPlatformContract.js', text);


   text1 = `export const ReviewAddress = "${Reviewer.target}";\n`;
  text2= `export const ReviewABI = \n ${JSON.stringify(Reviewer.interface.fragments, null, 2)} \n`;
   text = text1 + text2;
  fs.writeFileSync('./job-platform-front/src/aboutContracts/ReviewContract.js', text);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
