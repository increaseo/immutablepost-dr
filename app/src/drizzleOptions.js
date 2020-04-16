import Web3 from "web3";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import ImmutablePosts from "./contracts/ImmutablePosts.json";
// import Fortmatic from 'fortmatic';
// const fm = new Fortmatic('pk_test_BA2F29C8A4846EA4', 'ropsten');


const options = {

  // web3: {
  //  block: false,
  //  customProvider: new Web3(window.ethereum)
  // },
  
  web3: {
    //customProvider: new Web3(window.ethereum),
    fallback: {
      type: 'ws',
      url: "wss://ropsten.infura.io/ws/v3/159beab8ddc94e4fadf540f13abca684"
    }
  },
  syncAlways:true,
  contracts: [ImmutablePosts],
  events: {
    ImmutablePost: ["newPost"],
  },
};

export default options;
