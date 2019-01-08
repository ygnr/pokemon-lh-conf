var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function getOwnerById(id) {
    const instance = await PokemonTrade.deployed();
    const owner = await instance.getOwner(id);
    console.log(`Owner of Pokemon id ${id} is ${owner}`);
  }

  try {
    await getOwnerById(1);
  } catch(err) {
    console.error(err);
  }
  
  await callback();
}