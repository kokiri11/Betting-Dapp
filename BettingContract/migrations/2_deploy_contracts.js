const bettingContract = artifacts.require("bettingContract");

module.exports = function (deployer) {
  deployer.deploy(bettingContract);
};