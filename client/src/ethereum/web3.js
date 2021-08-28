import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { mnemonic } from "./env";
// Provider used by Web3.js to connect with the private Blockchain process
let web3;
if (typeof window.web3 === "undefined") {
  // On live server, change === to !===
  const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonic,
    },
    providerOrUrl:
      "https://rinkeby.infura.io/v3/363ea9633bcb40bc8a857d908ee27094",
  });
  web3 = new Web3(provider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  web3 = new Web3(web3Provider);
}

export default web3;
