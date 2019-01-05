var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function withdrawExchange(exchangeId) {
    const instance = await PokemonTrade.deployed();
    const response = await instance.withdrawExchange(exchangeId);
    console.log(`Exchange with id ${response.logs[0].args.exchangeId} withdrawn by ${response.logs[0].args.initiator}`);
  }

  try {
    await withdrawExchange(1);
  } catch(err) {
    console.error(err);
  }
  
  await callback();
}