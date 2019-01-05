const PokemonTrade = artifacts.require("PokemonTrade");

module.exports = function(deployer) {
  deployer.deploy(PokemonTrade);
};
