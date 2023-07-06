const { ethers, upgrades } = require('hardhat');

async function main() {
    const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
    const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
    await proxy.deployed();

    const implementationAddress = await upgrades.erc1967.getImplementationAddress(
        proxy.address
    );

    console.log('Proxy contract address: ' + proxy.address);

    console.log('Implementation contract address: ' + implementationAddress);
}

main();

// Proxy contract address: 0x47a56783380dD33546048697a8768d95ee657717
// Implementation contract address: 0xf6E86287243Afe2B443b95Ec07c00782e5179Aa5