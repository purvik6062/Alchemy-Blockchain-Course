const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer1 = ethers.provider.getSigner(0);
    const signer2 = ethers.provider.getSigner(1);
    const signer3 = ethers.provider.getSigner(2);

    const address1 = signer1.getAddress();
    const address2 = signer2.getAddress();
    const address3 = signer3.getAddress();

    return { game, signer1, signer2, signer3, address1, address2, address3 };
  }
  it('should be a winner', async function () {
    const { game, signer1, signer2, signer3, address1, address2, address3 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}

    await game.connect(signer1).write(address2);
    await game.connect(signer2).win(address1);
    // await game.connect(signer3).win(address2);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
