//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AlchemyW6Token is ERC20 {
    uint constant _initial_supply = 100 * (10 ** 18);

    constructor() ERC20("AlchemyW6Token", "AWT") {
        _mint(msg.sender, _initial_supply);
    }
}

// Deploying contracts with the account: 0x4bb5f40a6B933417c12E6F7A5398F48AABAeac58
// Account balance: 0.088803469510769339
// Token address: 0xf981AEaD6c9Bc77AbC5754065a6C4295b8994c2A
