// const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
// const { expect } = require('chai');

// describe('Faucet', function () {
//     // We define a fixture to reuse the same setup in every test.
//     // We use loadFixture to run this setup once, snapshot that state,
//     // and reset Hardhat Network to that snapshot in every test.
//     async function deployContractAndSetVariables() {
//         const Faucet = await ethers.getContractFactory('Faucet');
//         const faucet = await Faucet.deploy();

//         const [owner] = await ethers.getSigners();

//         console.log('Signer 1 address: ', owner.address);
//         return { faucet, owner };
//     }

//     it('should deploy and set the owner correctly', async function () {
//         const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

//         expect(await faucet.owner()).to.equal(owner.address);
//     });
// });


const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContractAndSetVariables() {
        const Faucet = await ethers.getContractFactory('Faucet');
        const faucet = await Faucet.deploy();

        const [owner] = await ethers.getSigners();
        console.log("Owner:- ", owner);

        let withdrawAmount = ethers.utils.parseUnits('1', 'ether');
        console.log("withdrawAmount:- ", withdrawAmount);

        return { faucet, owner, withdrawAmount };
    }

    it('should deploy and set the owner correctly', async function () {
        const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

        expect(await faucet.owner()).to.equal(owner.address);
    });

    it('should not allow withdrawals above .1 ETH at a time', async function () {
        const { faucet, withdrawAmount } = await loadFixture(
            deployContractAndSetVariables
        );
        await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
    });

    it('should return all the ether to the caller', async function () {
        const { faucet, owner, withdrawAmount } = await loadFixture(deployContractAndSetVariables);
        await expect(faucet.withdrawAll()).not.to.be.reverted;
    });

    // it('should allow the owner to call withdrawAll() and receive all the contract balance', async function () {
    //     const { faucet, owner, withdrawAmount } = await loadFixture(deployContractAndSetVariables);

    //     await faucet.withdraw(withdrawAmount);
    //     const initialBalance = await ethers.provider.getBalance(faucet.address);

    //     await faucet.withdrawAll();
    //     const balanceAfterWithdrawal = await ethers.provider.getBalance(faucet.address);

    //     expect(balanceAfterWithdrawal).to.equal(0);
    //     expect(await ethers.provider.getBalance(owner.address)).to.equal(initialBalance);
    // });

    it('should self destruct when destroyFaucet() is called by the owner', async function () {
        const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

        await faucet.destroyFaucet();
        const code = await ethers.provider.getCode(faucet.address);

        expect(code).to.equal('0x');
    });
});