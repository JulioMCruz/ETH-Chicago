// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@api3/contracts/v0.8/interfaces/IProxy.sol";

interface IAPI3Oracle {
    function getPrice() external view returns (uint256);
}

contract CareToken is ERC20, Ownable {
   address public api3Oracle;


    constructor(address _api3Oracle) ERC20("Care", "CARE") {
        api3Oracle = _api3Oracle;

    }

    function setPricefeed(address _feed) external onlyOwner{
        api3Oracle = _feed;
    }

    function mint() external onlyOwner{
        (uint256 currentEthPrice, uint256 timestamp) = readDataFeed();
    uint256 desiredETHValue = 10000000000000000000000 * 10**18 / currentEthPrice; // This will give you the equivalent ETH value for $10,000
    uint256 amountToMint = desiredETHValue; // Since 1 token represents 1 ETH in your design
    _mint(msg.sender, amountToMint);
    }

     function readDataFeed() public view returns (uint256, uint256) {
        (int224 value, uint256 timestamp) = IProxy(api3Oracle).read();
        //convert price to UINT256
        uint256 price = uint224(value);
        return (price, timestamp);
    }


}
