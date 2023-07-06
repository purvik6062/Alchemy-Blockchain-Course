const { ethers } = require("hardhat");
const { parseEther } = ethers.utils;

async function proposalCreation() {
    const [owner] = await ethers.getSigners();

    const MyGovernor = await ethers.getContractFactory("MyGovernor");
    const governor = await MyGovernor.attach("0x813A0DBDC7428DC351d71ec249E9E2dB79294660");

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.attach("0x6431Ab17C686FBF092dDEf83a1BcDef75ad603CE");

    const tx = await governor.propose(
        [token.address],
        [0],
        [token.interface.encodeFunctionData("mint", [owner.address, parseEther("25000")])],
        "Give the owner more tokens!"
    );
    const receipt = await tx.wait();
    const event = receipt.events.find(x => x.event === 'ProposalCreated');
    const { proposalId } = event.args;

    console.log("Proposal created with ID:", proposalId.toString());
}

proposalCreation().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// Proposal created with ID: 22116835708699183296308335467317109082281114651147722544686799031718959939267