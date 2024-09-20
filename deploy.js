const ethers = require("ethers");
// http://172.25.0.1:7545
const fs = require("fs");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://172.25.0.1:7545")
  const wallet = new ethers.Wallet(
    "0x389226d96a0bfef7cc8d855fc59b5004684161ed67713ffb2682e66d6e160ce4",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying...");
  const contract = await contractFactory.deploy();
  const receipt = await contract.deploymentTransaction();
  console.log(contract);
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
