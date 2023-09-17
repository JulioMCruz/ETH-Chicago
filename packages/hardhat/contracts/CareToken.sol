// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@api3/contracts/v0.8/interfaces/IProxy.sol";

interface IAPI3Oracle {
    function getPrice() external view returns (uint256);
}

contract CareToken is ERC20, Ownable {
    mapping(Currency => address) public priceFeeds;

    // A diverse group of assets that the people of Chicago, and others around the world, might need.
    // Currently supports US Dollar, MXN Peso, Aussie Dollar, and Indian Rupee.
    enum Currency {
        USD,
        MXN,
        AUD,
        INR
    }

    event RequestedTokens(uint256 amountInNativeCurrency, uint256 usdEquivalent, uint256 careTokenAmount, Currency indexed nativeCurrency, address indexed recipient);

    constructor(
        address _api3ETHUSD,
        address _api3MXNUSD,
        address _api3AUDUSD,
        address _api3INRUSD
    ) ERC20("Care", "CARE") {
        priceFeeds[Currency.USD] = _api3ETHUSD;
        priceFeeds[Currency.MXN] = _api3MXNUSD;
        priceFeeds[Currency.AUD] = _api3AUDUSD;
        priceFeeds[Currency.INR] = _api3INRUSD;
    }

    // Mints the specified amount of tokens to the contract's balance
    function mint(uint256 usdAmount) external onlyOwner {
        require(usdAmount > 0, "Amount should be greater than zero.");
        _mint(address(this), usdAmount * 10**18);
    }

    // Deposits specified amount of tokens into the contract's balance
    // Real ETH deposits would require access control
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount should be greater than zero.");
        _mint(address(this), amount * 10**18);
    }

    // Retrieves the current price of the specified currency in USD
    function getCurrencyPriceInUSD(Currency currency) public view returns (uint256) {
        (int224 value, ) = IProxy(priceFeeds[currency]).read();
        return uint224(value);
    }

    // Converts the specified amount in a native currency to its USD equivalent and transfers the equivalent amount of CARE to the recipient
    function requestTokens(uint256 amountInNativeCurrency, Currency nativeCurrency, address recipient) external {
        require(amountInNativeCurrency > 0, "Requested amount should be greater than zero.");
        uint256 conversionRateToUSD = getCurrencyPriceInUSD(nativeCurrency);
        require(conversionRateToUSD > 0, "Currency price is zero or not available.");
        uint256 intermediateValue = amountInNativeCurrency * conversionRateToUSD;
        uint256 usdEquivalent = intermediateValue / 1**18;
        require(usdEquivalent > 0, "USD equivalent amount is zero or too low.");
        uint256 currentBalance = balanceOf(address(this));
        require(currentBalance >= usdEquivalent, "Treasury balance is insufficient.");
        _transfer(address(this), recipient, usdEquivalent * 1**18);
        emit RequestedTokens(amountInNativeCurrency, usdEquivalent, usdEquivalent * 1**18, nativeCurrency, recipient);
    }

    // Returns the contract's token balance in a human-readable format
    function contractBalance() public view returns (uint256) {
        return balanceOf(address(this)) / 10**18 ;
    }



}
