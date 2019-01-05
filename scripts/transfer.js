var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function transferPokemon(id, to) {
    const instance = await PokemonTrade.deployed();
    const returnValue = await instance.transfer(id, to, { from: "0x20573A879EE06f24929E4ecE7C12e3905eb681b3"});
    console.log(`Pokemon with id ${id}, transferred to ${to}`);
  }
  await transferPokemon(1, "0xafe60fE65f2Be15D2d14e3D67949E0b1F39e8167");
  await callback();
}