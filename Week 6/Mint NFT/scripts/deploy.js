async function main() {
  // if you changed the name of the contract, be sure to update this here!
  const MyToken = await hre.ethers.getContractFactory("MyToken");

  const nft = await MyToken.deploy();

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);

  // mint one to yourself!
  const signer0 = await ethers.provider.getSigner(0);
  // update the IPFS CID to be your metadata CID
  await nft.safeMint(await signer0.getAddress(), "ipfs://QmVoa9dqLH9L7fguv5BKifyTQoRwckzCizYsd3xxn9LHr1");

  console.log("NFT Minted!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  // {
  //   path: 'QmVoa9dqLH9L7fguv5BKifyTQoRwckzCizYsd3xxn9LHr1',
  //   cid: CID(QmVoa9dqLH9L7fguv5BKifyTQoRwckzCizYsd3xxn9LHr1),
  //   size: 266
  // }



  // NFT deployed to: 0xf2cA8b6faf2Fe29c143EDD00e4975f1501539E4B