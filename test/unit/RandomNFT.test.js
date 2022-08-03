const { inputToConfig } = require("@ethereum-waffle/compiler");
const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const {
  experimentalAddHardhatNetworkMessageTraceHook,
} = require("hardhat/config");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
const TOKEN_URI =
  "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Random NFT", async function () {
      let randomNFT;
      let deployer;
      let notOwner;
      const chainId = network.config.chainId;
      //const sendValue = ethers.utils.parseEther("1");

      before(async function () {
        // deployer is the account
        // const accounts = await eithers.getSingers();
        // const accountZero = accounts[0];
        deployer = (await getNamedAccounts()).deployer;
        notOwner = (await getNamedAccounts()).notowner;
        await deployments.fixture(["all"]);
        //const VRFCoordinatorV2Mock = await ethers.getContract(
        //  "VRFCoordinatorV2Mock"
        randomNFT = await ethers.getContract("RandomIpfsNft", deployer);
        randomNFTNotOwner = await ethers.getContract("RandomIpfsNft", notOwner);
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );
      });

      describe("RandomNFT Mint", async function () {
        it("RandomNFT UT01: Mint failure due to insufficient fee", async function () {
          //const response = await randomNFT.requestNFT();
          await expect(randomNFT.requestNFT()).to.be.revertedWith(
            "RandomIpfsNft__NeedMoreMintFee"
          );
        });

        it("RandomNFT UT02: Mint success if given sufficient mint fee", async function () {
          const fee = await randomNFT.getMintFee();
          const requestNftResponse = await randomNFT.requestNFT({
            value: fee.toString(),
          });
          const requestNftReceipt = await requestNftResponse.wait(1);
          await expect(
            vrfCoordinatorV2Mock.fulfillRandomWords(
              requestNftReceipt.events[1].args.requestId,
              randomNFT.address
            )
          ).to.emit(randomNFT, "NftMinted");
        });
      });

      describe("RandomNFT withdraw", async function () {
        it("Random NFT UT03: Unsuccessful withdraw", async function () {
          await expect(randomNFTNotOwner.withdraw()).to.be.revertedWith(
            "caller is not the owner"
          );
        });

        it("Random NFT UT04: Successful withdraw", async function () {
          await expect(randomNFT.withdraw()).to.emit(randomNFT, "NftWithdrawn");
        });
      });

      describe("RandomNFT Get breeds & chances", async function () {
        it("RandomNFT UT05: getBreedFromModdedRng Pug 0", async function () {
          const dogBreed = await randomNFT.getBreedFromModdedRng(9);
          assert.equal(dogBreed, 0);
        });

        it("RandomNFT UT06: getBreedFromModdedRng Shiba 1", async function () {
          const dogBreed = await randomNFT.getBreedFromModdedRng(20);
          assert.equal(dogBreed, 1);
        });

        it("RandomNFT UT07: getBreedFromModdedRng St Bernard 2", async function () {
          const dogBreed = await randomNFT.getBreedFromModdedRng(50);
          assert.equal(dogBreed, 2);
        });

        it("RandomNFT UT08: getChanceArray", async function () {
          const chanceArray = await randomNFT.getChanceArray();
          assert.equal(parseInt(chanceArray[0]._hex), 10);
          assert.equal(parseInt(chanceArray[1]._hex), 30);
          assert.equal(parseInt(chanceArray[2]._hex), 100);
        });
      });

      describe("RandomNFT Getters", async function () {
        it("RandomNFT UT09: getMintFee", async function () {
          const mintFee = await randomNFT.getMintFee();
          assert.equal(parseInt(mintFee._hex).toString(), "10000000000000000");
        });

        it("RandomNFT UT10: getDogTokenURIs", async function () {
          let tokenURI = await randomNFT.getDogTokenURIs(0);
          assert.equal(
            tokenURI,
            "ipfs://QmPsddgwx2s4HE5V9so61eSR3NfGgJMkHgpTRBw1jnmTrH"
          );

          tokenURI = await randomNFT.getDogTokenURIs(1);
          assert.equal(
            tokenURI,
            "ipfs://QmYzrvrN5pSqx19qXUCvJm4uau1rcpytPJGzzBkJQDdv82"
          );

          tokenURI = await randomNFT.getDogTokenURIs(2);
          assert.equal(
            tokenURI,
            "ipfs://QmPU6NzQQFJKWJ6MukigvnU4D2GWTvcTtSqQu1U735UNqV"
          );
        });

        it("RandomNFT UT11: Get token counter", async function () {
          const tokenCounter = await randomNFT.getTokenCounter();
          assert.equal(parseInt(tokenCounter._hex), 1);
        });
      });
    });
