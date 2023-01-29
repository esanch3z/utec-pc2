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

var MINTER_ROLE = getRole("MINTER_ROLE");
var BURNER_ROLE = getRole("BURNER_ROLE");

//SMART CONTRACT UPGRADEABLE
async function deployMumbai() {
  var relayer = { address:"0x607a9b74225e0c0fad4b91c88cc17851784ad6b4"}
  
  var nftContract = await deploySC("MiPrimerNft", []);
  var implementation = await printAddress("MiPrimerNft", nftContract.address);  

  // set up
  await ex(nftContract, "grantRole", [MINTER_ROLE, relayer.address], "GR");
  await ex(nftContract, "grantRole", [BURNER_ROLE, relayer.address], "GR");

  await verify(implementation, "MiPrimerNft", []);
}

async function upgrade() {
  var nftProxy ={address:"0xa6064a4E06a2f4d96C3bB8257341Ebf00DA8d12A"};
  
  nftContract = await upgradeSC("MiPrimerNft_v2",nftProxy.address);
  var implementation = await printAddress("MiPrimerNft_v2", nftContract.address);

  await verify(implementation, "MiPrimerNft_v2", []);
}

deployMumbai()
//upgrade()
 .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
