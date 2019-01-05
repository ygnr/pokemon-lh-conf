var PokemonTrade = artifacts.require("PokemonTrade");

const initialPokemons = [
  {
    name: "Bulbasaur",
    power: 90,
    pokemonType: "Grass",
    owner: "0x73613025e5aC0E563A33891b707d4F504D84b71c"
  },
  {
    name: "Pikachu",
    power: 90,
    pokemonType: "Electric",
    owner: "0x20573A879EE06f24929E4ecE7C12e3905eb681b3"
  },
  {
    name: "Charmander",
    power: 85,
    pokemonType: "Fire",
    owner: "0x73613025e5aC0E563A33891b707d4F504D84b71c"
  },
  {
    name: "Charizard",
    power: 95,
    pokemonType: "Fire",
    owner: "0x20573A879EE06f24929E4ecE7C12e3905eb681b3"
  },
  {
    name: "Snorlax",
    power: 95,
    pokemonType: "Normal",
    owner: "0x20573A879EE06f24929E4ecE7C12e3905eb681b3"
  }
]

module.exports = async function(callback) {
  async function createPokemon(name, power, pokemonType, owner) {
    const instance = await PokemonTrade.deployed();
    const response = await instance.create(name, power, pokemonType, owner);
    console.log(`${name}, created with id ${response.logs[0].args.pokemonId}`);
  }

  try {
    for (let pokemon of initialPokemons) {
      await createPokemon(pokemon.name, pokemon.power, pokemon.pokemonType, pokemon.owner);
    }
  } catch(err) {
    console.error(err);
  }
  
  await callback();
}