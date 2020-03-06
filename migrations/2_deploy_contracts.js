const ImmutablePosts = artifacts.require("ImmutablePosts");

module.exports = function(deployer) {
  deployer.deploy(ImmutablePosts);
};
