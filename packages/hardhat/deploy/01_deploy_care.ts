import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCareToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Define the API3 Oracle addresses here
  const API3_ETHUSD = "0x26690F9f17FdC26D419371315bc17950a0FC90eD"; 
  const API3_MXNUSD = "0xBe6F364CBCC9d0299852e25CfA97c556944AFaeA"; 
  const API3_AUDUSD = "0x313334Fd4b69E27c3b4a6cF46CEfe8EEA7cb8D7c"; 
  const API3_INRUSD = "0x4852a371DbF40cC9F97Cc0489502071Fe42270A2"; 

  await deploy("CareToken", {
    from: deployer,
    args: [API3_ETHUSD, API3_MXNUSD, API3_AUDUSD, API3_INRUSD], // Passing all the API3 Oracle addresses as constructor arguments
    log: true,
    autoMine: true,
  });


};

export default deployCareToken;

deployCareToken.tags = ["CareToken"];
