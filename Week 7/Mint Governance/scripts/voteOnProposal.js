// const { ethers } = require("hardhat");

// async function proposalVote() {
//     const [owner] = await ethers.getSigners();

//     const MyGovernor = await ethers.getContractFactory("MyGovernor");
//     const governor = await MyGovernor.attach("0x8114422566825C109c19012857E878349C4280E6");

//     const proposalId = "24238919150728286676141702368738013496661076685741464856885902553741381708871";
//     const tx = await governor.castVote(proposalId, 1);

//     console.log("Vote casted for proposal ID:", proposalId);
// }

// proposalVote().catch((error) => {
//     console.error(error);
//     process.exitCode = 1;
// });

const { ethers } = require("hardhat");

async function proposalVote() {
    const [owner] = await ethers.getSigners();

    const MyGovernor = await ethers.getContractFactory("MyGovernor");
    const governor = await MyGovernor.attach("0x813A0DBDC7428DC351d71ec249E9E2dB79294660");

    const proposalId = "22116835708699183296308335467317109082281114651147722544686799031718959939267";


    // const proposalState = await governor.state(proposalId);
    // if (proposalState !== 1) {
    //     console.log("Proposal is not in an active state. Vote cannot be casted.");
    //     return;
    // }

    // const tx = await governor.castVote(proposalId, 1);

    // console.log("Vote casted for proposal ID:", proposalId);


    try {
        const tx = await governor.castVote(proposalId, 1, { gasLimit: 30000 }); // Adjust the gas limit if needed
        console.log("Vote casted for proposal ID:", proposalId);
        console.log("Transaction hash:", tx.hash);
    } catch (error) {
        console.error("Error casting vote:", error);
    }
}

proposalVote().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// Vote casted for proposal ID: 22116835708699183296308335467317109082281114651147722544686799031718959939267
// Transaction hash: 0x5e8fb8653ef10126eb5c3a5e95f321eab4a901ca840ea3f4a5e0db60155bfcec