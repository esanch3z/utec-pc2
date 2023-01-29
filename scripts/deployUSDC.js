require("dotenv").config();

const {
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
} = require("../utils");

//SMART CONTRACT NO UPGRADEABLE
async function deployGoerli() {
  var usdcContract = await deploySCNoUp("USDCoin", []);
  console.log(`usdcContract Public Address: ${usdcContract.address}`); 
  await verify(usdcContract.address, "USDCoin", []);
}

deployGoerli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
