// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@api3/contracts/v0.8/interfaces/IProxy.sol";

interface IAPI3Oracle {
    function getPrice() external view returns (uint256);
}

contract CareToken is ERC20, Ownable {
    address public api3ETHUSD;
    address public api3MXNUSD;
    address public api3AUDUSD;
    address public api3INRUSD;

    enum Currency {
        ETH, //0
        MXN, //1
        AUD, //2
        INR  //3
    }

    mapping(Currency => address) public priceFeeds;

    event RequestedTokens(uint256 usdAmount, uint256 currentCurrencyPrice, uint256 careTokenAmount, address recipient);

    constructor(
        address _api3ETHUSD,
        address _api3MXNUSD,
        address _api3AUDUSD,
        address _api3INRUSD
    ) ERC20("Care", "CARE") {
        priceFeeds[Currency.ETH] = _api3ETHUSD;
        priceFeeds[Currency.MXN] = _api3MXNUSD;
        priceFeeds[Currency.AUD] = _api3AUDUSD;
        priceFeeds[Currency.INR] = _api3INRUSD;
    }

    function mint() external onlyOwner {
    uint256 currentEthPrice = readDataFeed(Currency.ETH);
    uint256 desiredETHValue = 10000000000000000000000 * 10**18 / currentEthPrice;
    _mint(address(this), desiredETHValue);
    }


    function readDataFeed(Currency currency) public view returns (uint256) {
        (int224 value, ) = IProxy(priceFeeds[currency]).read();
        return uint224(value);
    }

    function requestTokens(uint256 amountInNativeCurrency, Currency currency, address recipient) external {
        require(amountInNativeCurrency > 0, "Requested amount should be greater than zero");
        uint256 conversionRateToUSD = readDataFeed(currency); // This gives the conversion rate from the native currency to USD.
        require(conversionRateToUSD > 0, "Currency price is zero");
        // Convert the amount in the native currency to its USD equivalent.
        uint256 usdEquivalent = (amountInNativeCurrency * conversionRateToUSD + 10**18 - 1) / 10**18;
        uint256 ethPriceInUSD = readDataFeed(Currency.ETH);
        require(ethPriceInUSD > 0, "ETH price is zero");
        // Convert the USD equivalent to CARE token amount.
        uint256 careTokenAmount = (usdEquivalent * 10**18 + ethPriceInUSD - 1) / ethPriceInUSD;
        require(careTokenAmount > 0, "Calculated CARE token amount is zero");
        require(balanceOf(address(this)) >= careTokenAmount, "Not enough CARE tokens in the treasury");
        _transfer(address(this), recipient, careTokenAmount);
        emit RequestedTokens(amountInNativeCurrency, conversionRateToUSD, careTokenAmount, recipient);
    }
}