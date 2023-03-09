import { ethers } from "hardhat";



async function main() {
  
  // setting contract factory from artifacts
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  //deploying contract
  const helloWorld = await HelloWorld.deploy();

  await helloWorld.deployed();

  console.log(`HelloWorld Contract deployed to ${helloWorld.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
