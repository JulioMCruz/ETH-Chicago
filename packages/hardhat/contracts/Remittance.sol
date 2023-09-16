// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Remittance {
    address public owner;
    mapping(address => uint256) public balances;

    event Deposited(address indexed sender, address indexed recipient, uint256 amount);
    event Withdrawn(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit(address recipient) external payable {
        require(msg.value > 0, "Amount should be greater than 0");
        require(recipient != address(0), "Invalid recipient");

        balances[recipient] += msg.value;

        emit Deposited(msg.sender, recipient, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(amount <= balances[msg.sender], "Insufficient funds");

        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit Withdrawn(msg.sender, amount);
    }
}
