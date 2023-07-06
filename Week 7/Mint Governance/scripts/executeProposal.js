const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther } = ethers.utils;

async function executeProposal() {
    const [owner] = await ethers.getSigners();

    const MyGovernor = await ethers.getContractFactory("MyGovernor");
    const governor = await MyGovernor.attach("0x813A0DBDC7428DC351d71ec249E9E2dB79294660");

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.attach("0x6431Ab17C686FBF092dDEf83a1BcDef75ad603CE");

    const proposalId = "22116835708699183296308335467317109082281114651147722544686799031718959939267";
    const gasLimit = 500000;
    //   console.log("error---");
    await governor.execute(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        keccak256(toUtf8Bytes("Give the owner more tokens!")),
        { gasLimit }
    );

    console.log("Proposal executed successfully.");
}

executeProposal().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});