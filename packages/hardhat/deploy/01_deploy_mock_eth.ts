import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMockERC20: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Define the API3 Oracle address here
  const API3_ETHUSD = "0x26690F9f17FdC26D419371315bc17950a0FC90eD"; // Replace with the correct address if it changes

  await deploy("ETHforCHI", {
    from: deployer,
    args: [API3_ETHUSD], // Passing the API3 Oracle address as a constructor argument
    log: true,
    autoMine: true,
  });

  // If you want to interact with the deployed contract immediately after deployment, you can do so:
  // const mockERC20 = await hre.ethers.getContract("MockERC20", deployer);
  // ... any interactions you want to do with mockERC20
};

export default deployMockERC20;

deployMockERC20.tags = ["ETHforCHI"];
