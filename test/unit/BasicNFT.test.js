const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const {
  experimentalAddHardhatNetworkMessageTraceHook,
} = require("hardhat/config");
const { developmentChains } = require("../../helper-hardhat-config");
const TOKEN_URI =
  "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT", async function () {
      let basicNFT;
      let deployer;
      const sendValue = ethers.utils.parseEther("1");

      before(async function () {
        // deployer is the account
        // const accounts = await eithers.getSingers();
        // const accountZero = accounts[0];
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        basicNFT = await ethers.getContract("BasicNFT", deployer);
        const response = await basicNFT.mintNFT();
        response.wait(1);
      });

      describe("Mint", async function () {
        it("UT01: URI", async function () {
          const response = await basicNFT.tokenURI(1);
          assert.equal(response, TOKEN_URI);
        });

        it("UT02: Count", async function () {
          const response = await basicNFT.getTokenCounter();
          assert.equal(response.toString(), "1");
        });
      });
    });
