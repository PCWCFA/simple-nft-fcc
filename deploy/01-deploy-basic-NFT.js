const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log("-------------------");
  const args = [];
  const basicNft = await deploy("BasicNFT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[chainId]["blockConfirmations"],
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(basicNft.address, arguments);
  }
};

module.exports.tags = ["all", "basicnft", "main"];
