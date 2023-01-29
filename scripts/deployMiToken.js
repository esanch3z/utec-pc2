require("dotenv").config();

const {
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  deploySCNoUp,
} = require("../utils");

//SMART CONTRACT UPGRADEABLE
async function deployGoerli() {
  miPrimerTokenContract = await deploySC("MiPrimerToken", []);
  var implementation = await printAddress("MiPrimerToken", miPrimerTokenContract.address);

  await verify(implementation, "MiPrimerToken", []);
}

deployGoerli().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});