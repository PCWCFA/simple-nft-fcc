const networkConfig = {
  31337: {
    name: "mainnet_fork",
    wethTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    daiEthPriceFeedAddress: "0x773616E4d11A78F511299002da57A0a94577F1f4",
    daiTokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    ILendingPoolAddressesProvider: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
    vrfCoordinatorV2: "0x6168499c0cffcacd319c818142124b7a15e857ab",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    subscriptionId: "0",
    callbackGasLimit: "500000",
    interval: "30",
    mintFee: "10000000000000000",
  },
  4: {
    name: "rinkeby",
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    vrfCoordinatorV2: "0x6168499c0cffcacd319c818142124b7a15e857ab",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    subscriptionId: "7537",
    callbackGasLimit: "500000",
    interval: "30",
    mintFee: "10000000000000000",
  },
  137: {
    name: "polygon",
    // Note that I put in the Mumbai Test Net
    ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
  },
  // 31337
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
