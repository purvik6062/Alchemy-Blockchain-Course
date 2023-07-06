const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0x47a56783380dD33546048697a8768d95ee657717';

async function main() {
    const VendingMachineV3 = await ethers.getContractFactory('VendingMachineV3');
    const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV3);

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(
        proxyAddress
    );

    console.log("The current contract owner is: " + upgraded.owner());
    console.log('Implementation contract address: ' + implementationAddress);
}

main();

// Implementation contract address: 0xf6E86287243Afe2B443b95Ec07c00782e5179Aa5