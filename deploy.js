const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY, provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deploying...");
  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction().wait(1);
  // console.log(contract);
  // console.log(receipt);
  const numberBefore = await contract.retrieve();
  console.log(`number before = ${numberBefore}`);
  const numberStore = await contract.store("5");
  await numberStore.wait(1);
  const numberAfter = await contract.retrieve();
  console.log(`number after = ${numberAfter}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
