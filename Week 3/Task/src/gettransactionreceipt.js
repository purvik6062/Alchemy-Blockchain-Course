const { Alchemy, Network } = require("alchemy-sdk");

const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(config);

const main = async () => {
    const tx = "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"

    let response = await alchemy.core.getTransactionReceipt(tx);

    console.log(response);
}

main();