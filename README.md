# Basic NFT & Random NFT

This project tests deploying a simple NFT of a single dog picture served from IPFS and a Random NFT that uses Chainlink VRF to select one of three possible NFTs.

For the Random NFT that uses Chainlink VRF, note to use v4.0.1 of Chainlink Contracts. See this github [discussion](https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/1468#discussion-4272252) and this [Ethereum Stack Exchange Issue](https://ethereum.stackexchange.com/questions/131426/chainlink-keepers-getting-invalidconsumer/132809).

To test & deploy the project:

```bash
hh test --grep "BasicNFT" to run the BasicNFT unit tests
hh test --grep "RandomNFT" to run the RandomNFT unit tests
hh deploy
```

# License

Distributed under the MIT License. See LICENSE.txt for more information.
