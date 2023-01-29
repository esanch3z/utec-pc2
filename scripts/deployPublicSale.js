require("dotenv").config();

const {
  getRole,
  verify,
  ex,
  printAddress,
  deploySC,
  upgradeSC,
  deploySCNoUp,
} = require("../utils");



//SMART CONTRACT UPGRADEABLE
async function deployGoerli() {  

  var miPrimerToken = { address: "0xa6064a4E06a2f4d96C3bB8257341Ebf00DA8d12A"};
  var usdc = { address: "0x11fdBC776B151f08d051317Eb94c585c64E413Fb"};
  var gnosis = { address: "0x6B7166eB89dAEB4a9374dC73ef46BE05e0635C20"};

  publicSaleContract = await deploySC("PublicSale", []);
  var implementation = await printAddress("PublicSale", publicSaleContract.address);
  
  await ex(publicSaleContract, "setMiPrimerToken", [miPrimerToken.address], "GR");
  await ex(publicSaleContract, "setUSDCCoin", [usdc.address], "GR");
  await ex(publicSaleContract, "setGnosisWalletAdd", [gnosis.address], "GR");

  await verify(implementation, "PublicSale", []);
}

async function upgrade() {
  var publicSaleProxy ={address:"0x0E941DbC6E9ba784e64948AAD9BebaF23FB5b867"};
  
  publicSaleContract = await upgradeSC("PublicSale_v2",publicSaleProxy.address);
  var implementation = await printAddress("PublicSale_v2", publicSaleContract.address);

  await verify(implementation, "PublicSale_v2", []);
}

//upgrade()
deployGoerli()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
