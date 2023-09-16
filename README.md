# Chi Care: Bridging the Gap between Donors and Those in Need

This is a team submission for ETHChicago 2023 Hackathon. With this project, we aim to bridge the gap between donors and those in need of cash, catering to the diverse community of Chicago and ultimately the world.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

## Network

Chi Care is deployed on the Arbitrum Goerli Testnet.

## Contracts

- **CARE Token:** [0xF21b70D211e00b3Cf5525Db103bf61E4f63D9bae](https://explorer.goerli.arbitrum.io/address/0xF21b70D211e00b3Cf5525Db103bf61E4f63D9bae)

## Faucet

Need test tokens? Use the [Arbitrum Goerli Testnet Faucet](https://faucet.quicknode.com/arbitrum/goerli).

## Features

- **Multi-Currency Support:** Catering to the diverse community, Chi Care supports various currencies, ensuring inclusivity for users worldwide.
  
- **Seamless Account Abstraction:** Users don't need to worry about complex crypto wallet setups. With our platform, a wallet is automatically created which they can access using familiar web2 methods such as email or social logins.

- **Gasless Transactions:** Our relayer ensures users don't have to fret over gas fees. We sponsor all transactions to make the process seamless.

- **Direct Fund Transfers:** Donors can directly send funds to the platform. Recipients can then easily cash out with their favorite off-ramp.

- **API3 Integration for Price Conversions:** Real-time and accurate price conversions for fiat currencies. 

## How It Works

1. **Set Up a Donation:** Donors contribute to the fund.
2. **Send Money:** Funds are sent to the platform.
3. **Recipient Notification:** The recipient gets notified of the received funds.
4. **Easy Cash Out:** Recipients can easily cash out with any off-ramp.

## Build Locally

To build the project locally:

1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Start the local development server using `yarn start`.

## FAQ

**Q: How do I access my funds?**  
A: Just log in using your email or social media account. Your funds are linked to your login method.

**Q: Who covers the transaction fees?**  
A: Our dedicated relayer sponsors all transactions, ensuring a smooth experience for both donors and recipients.

**Q: How does the API3 integration work?**  
A: We use API3 for real-time price conversions. When you receive funds, the value is converted using the most up-to-date and accurate rates provided by API3, ensuring the money is denominated in fiat.
