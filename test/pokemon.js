const PokemonTrade = artifacts.require("PokemonTrade");

contract('PokemonTrade', function(accounts) {
  it("should get pokemon count as zero initially", async () => {
    const instance = await PokemonTrade.deployed();
    const pokemonCount = await instance.pokemonsCount.call();
    assert.equal(pokemonCount.toNumber(), 0, "Initial pokemon count wasn't zero");
  });
});