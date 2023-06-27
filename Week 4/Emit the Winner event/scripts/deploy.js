const hre = require("hardhat");
const { ethers } = require("ethers")

require('dotenv').config();

async function main() {
  const url = process.env.ALCHEMY_TESTNET_RPC_URL;
  const privateKey = process.env.TESTNET_PRIVATE_KEY;

  const provider = new hre.ethers.providers.JsonRpcProvider(url);
  let wallet = new hre.ethers.Wallet(privateKey, provider);

  let artifacts = await hre.artifacts.readArtifact("ContractCall");

  console.log(artifacts)

  let Contract = new hre.ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
  console.log("Contract:-", Contract)
  const contract = await Contract.deploy();
  const instanceContract = await contract.deployed();
  console.log("Instance Contract: ", instanceContract.address)

  await instanceContract.callAttempt("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502")
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});