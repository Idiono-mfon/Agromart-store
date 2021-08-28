import Web3 from "web3";

// Provider used by Web3.js to connect with the private Blockchain process
export const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:7545")
);
