const { ethers } = require("hardhat");

async function delegateVotes() {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.attach("0x6431Ab17C686FBF092dDEf83a1BcDef75ad603CE");

    await token.delegate(owner.address);

    console.log("Votes delegated to owner.");
}

delegateVotes().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});