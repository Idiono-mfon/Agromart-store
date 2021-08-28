//import { web3 } from "./web3";
import web3 from "./web3";
import agromartContractAbi from "./agromartContractAbi";

//  Contract Address of the contract in the blockchain
//const contractAddress = "0xa0282D4f7acB9cEb5Bcfd33d5FF3e7D8173578ED";

//const contractAddress = "0xf5c2cfbfd40F71831733D7E02677330B6DeCE95a";

const contractAddress = "0xc946CeE6bd4CceBe067649C72A61E71A067d9785";

// Function to create and instance of the contract
export default function createContract() {
  return new web3.eth.Contract(agromartContractAbi, contractAddress);
}
