import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ImmutablePosts from "./contracts/ImmutablePosts.json";
import Fortmatic from 'fortmatic';
const fm = new Fortmatic('pk_test_BA2F29C8A4846EA4', 'ropsten');
const providerOptions = {
  // walletconnect: {
  //     package: WalletConnectProvider, // required
  //     options: {
  //         infuraId: "159beab8ddc94e4fadf540f13abca684" // required
  //     }
  // },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "pk_test_BA2F29C8A4846EA4" // required
    }
  }
};
const web3Modal = new Web3Modal({
  network: "ropsten", // optional
  cacheProvider: false, // optional
  providerOptions // required
});

async function loadConnector() {
  //web3Modal.clearCachedProvider();
  const provider = await web3Modal.connect();
  return provider


} 

const options = {

  // web3: {
  //  block: false,
  //  customProvider: new Web3(window.ethereum)
  // },
  
  web3: {
    fallback: {
      type: 'ws',
      url: "wss://ropsten.infura.io/ws/v3/159beab8ddc94e4fadf540f13abca684"
    }
  },
  contracts: [ImmutablePosts],
  events: {
    ImmutablePost: ["newPost"],
  },
};

export default options;
