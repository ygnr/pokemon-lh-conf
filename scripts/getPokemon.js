var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function getPokemonById(id) {
    const instance = await PokemonTrade.deployed();
    const pokemon = await instance.getPokemonById(id);
    console.log(`Pokemon at id ${id} is ${pokemon}`);
  }
  try {
    await getPokemonById(1);
  } catch (err) {
    console.error(err);
  }
  
  await callback();
}