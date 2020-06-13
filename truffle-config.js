const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "unable jazz short divert sail hen paddle sight slender tongue universe wish";
//const provider = () => {return return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/41e3caed56f7474e93847994bd04db3c")};

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    /*develop: {
      port: 9545,
      network: 5777
    },*/
    developNetwork: {
      network_id: "*",
      host: "127.0.0.1",
      port: 9546
    },
    mainnet: {
      provider: function () {
       
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/41e3caed56f7474e93847994bd04db3c")
      },
      network_id: "1"
    },
    rinkeby: {
     
      provider: function () {
       
        return new HDWalletProvider(mnemonic, "wss://rinkeby.infura.io/ws/v3/41e3caed56f7474e93847994bd04db3c")
      },
      from: "0xCc66636f860249BE442c9B658e0051C5aA8367d5",
      network_id: "4"
    }
  }
};
