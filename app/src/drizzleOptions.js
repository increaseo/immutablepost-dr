import Web3 from "web3";
import ImmutablePosts from "./contracts/ImmutablePosts.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [ImmutablePosts],
  events: {
    ImmutablePost: ["newPost"],
  },
};

export default options;
