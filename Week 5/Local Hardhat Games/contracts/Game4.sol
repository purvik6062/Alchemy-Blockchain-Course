//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Game4 {
    int y = 210;

    event Winner(address winner);

    function win(int x) public {
        unchecked {
            int sum = x + y;
            require(sum == 10, "Incorrect argument passed in!");
        }
        emit Winner(msg.sender);
    }
}
