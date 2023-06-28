// const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
// const { assert } = require('chai');

// describe('Game5', function () {
//   async function deployContractAndSetVariables() {
//     const Game = await ethers.getContractFactory('Game5');
//     const game = await Game.deploy();

//     const signer = ethers.provider.getSigner(0);

//     const address = signer.getAddress();

//     // const senderAddressBytes20 = ethers.utils.hexZeroPad(address, 32);

//     // console.log("senderAddressBytes20:- ", senderAddressBytes20)

//     return { game, signer, address };
//     // return { game, signer, address, senderAddressBytes20 };
//   }
//   it('should be a winner', async function () {
//     const { game, signer, address } = await loadFixture(deployContractAndSetVariables);
//     const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";

//     // const thresholdAddressBytes20 = ethers.utils.hexZeroPad(threshold, 32);
//     // assert(first20BytesOfAddress < first20BytesOfthreshold, "Sender address doesn't satisfy the condition");
//     // good luck

//     await game.connect(signer).win();

//     // leave this assertion as-is
//     assert(await game.isWon(), 'You did not win the game');
//   });
// });
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }

  beforeEach(async function () {
    const threshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;

    let addrFound = false;
    let addr1;

    while (addrFound === false) {
      const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
      const address = await wallet.getAddress();

      if (threshold > address) {
        addrFound = true
        addr1 = wallet;

        const signer = ethers.provider.getSigner(0);
        await signer.sendTransaction({
          to: address,
          value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
        });
      }

      this.addr1 = addr1;
    }
  })

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
    await game.connect(this.addr1).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});