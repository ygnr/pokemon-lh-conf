var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function settleExchange(exchangeId, initiatorPokemonId, settlerPokemonId, initiator) {
    const instance = await PokemonTrade.deployed();
    const response = await instance.settleExchange(
      exchangeId, 
      initiatorPokemonId, 
      settlerPokemonId, 
      initiator, 
      { from: "0x20573A879EE06f24929E4ecE7C12e3905eb681b3"}
    );
    console.log(`Exchange with id ${response.logs[0].args.exchangeId} completed to exchange pokemon 
    ${initiatorPokemonId} with ${settlerPokemonId} initiated by ${response.logs[0].args.initiator}`);
  }

  try {
    await settleExchange(3, 1, 2, "0x73613025e5aC0E563A33891b707d4F504D84b71c");
  } catch(err) {
    console.error(err);
  }
  
  await callback();
}