var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function getPokemonCount() {
    const instance = await PokemonTrade.deployed();
    const pokemoncount = await instance.getPokemonsCount();
    console.log('Pokemon Count '+pokemoncount.toNumber());
  }

  async function getExchangesCount() {
    const instance = await PokemonTrade.deployed();
    const exchangesCount = await instance.getExchangesCount();
    console.log('Exchanges Count '+exchangesCount.toNumber());
  }

  try {
    await getPokemonCount();
    await getExchangesCount();
  } catch (err) {
    console.error(err);
  }

  await callback();
}