import { web3 } from "./web3";
// import web3 from "./web3";
import agromartContractAbi from "./agromartContractAbi";

//  Contract Address of the contract in the blockchain
const contractAddress = "0x62A3768C40B2c3241119b1C465DF5468712115c7";

// Function to create and instance of the contract
export default function createContract() {
  return new web3.eth.Contract(agromartContractAbi, contractAddress);
}
