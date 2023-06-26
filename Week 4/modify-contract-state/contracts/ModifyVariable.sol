//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ModifyVariable {
    uint public x;
    string public message;

    // constructor(uint _x) {
    //     x = _x;
    // }

    constructor(string memory _msg) {
        message = _msg;
    }

    function modifyToLeet() public {
        x = 1337;
    }

    function modifyMsg(string memory _message) public {
        message = _message;
    }
}
