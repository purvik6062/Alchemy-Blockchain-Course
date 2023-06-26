// const { ethers } = require("ethers");
const hre = require("hardhat");
async function main() {

  const example = await ethers.getContractFactory("Counter")
  const counter = await example.deploy();

  await counter.deployed();

  console.log(`Counter deployed to : ${counter.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});