var PokemonTrade = artifacts.require("PokemonTrade");

module.exports = async function(callback) {
  async function initiateExchange(initiatorPokemonId, settlerPokemonId, settler) {
    const instance = await PokemonTrade.deployed();
    const response = await instance.initiateExchange(initiatorPokemonId, settlerPokemonId, settler);
    console.log(`Exchange with id ${response.logs[0].args.exchangeId} initiated to exchange pokemon 
    ${initiatorPokemonId} with ${settlerPokemonId} initiated by ${response.logs[0].args.initiator}`);
  }

  try {
    await initiateExchange(1, 2, "0x20573A879EE06f24929E4ecE7C12e3905eb681b3");
  } catch(err) {
    console.error(err);
  }
  
  await callback();
}