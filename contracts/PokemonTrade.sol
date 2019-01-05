pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

import "./Ownable.sol";

contract PokemonTrade is Ownable {

  struct Pokemon {
    uint256 id;
    string name;
    uint256 power;
    string pokemonType;
  }
  
  Pokemon[] pokemons;

  mapping (uint256 => address) public pokemonIdToOwner;

  struct Exchange {
    uint256 exchangeId;
    address initiator;
    address settler;
    uint256 initiatorPokemonId;
    uint256 setttlerPokemonId;
    uint256 exchangeExpiry;
    bool isCompleted;
  }

  Exchange[] exchanges;

  event Create(uint256 indexed pokemonId, address indexed owner);
  event Transfer(address indexed from, address indexed to, uint256 indexed pokemonId);
  event ExchangeInit(uint256 indexed exchangeId, address indexed initiator, address indexed settler);
  event ExchangeComplete(uint256 indexed exchangeId, address indexed initiator, address indexed settler);

  constructor() public {
    Pokemon memory pokemon = Pokemon(0, "", 0, "");
    pokemons.push(pokemon);
    Exchange memory exchange = Exchange(0, address(0), address(0), 0, 0, 0, false);
    exchanges.push(exchange);
  }

  function create(string memory name, uint256 power, string memory pokemonType, address owner) public onlyOwner {
    uint pokemonId = pokemons.length;
    pokemons.push(Pokemon(pokemonId, name, power, pokemonType));
    pokemonIdToOwner[pokemonId] = owner;
    emit Create(pokemonId, owner);
  }

  function transfer(uint256 pokemonId, address to) public {
    require(pokemonIdToOwner[pokemonId] == msg.sender);
    pokemonIdToOwner[pokemonId] = to;
    emit Transfer(msg.sender, to, pokemonId);
  }

  function getOwner(uint256 pokemonId) public view returns (address) {
    return pokemonIdToOwner[pokemonId];
  }

  function getPokemonsCount() public view returns (uint) {
    return pokemons.length;
  }

  function getPokemonById(uint256 id) public view returns (Pokemon memory) {
    Pokemon memory pokemon = pokemons[id];
    return pokemon;
  }

  function getPokemons() public view returns (Pokemon[] memory) {
    return pokemons;
  }

  function getExchangesCount() public view returns (uint) {
    return exchanges.length;
  }

  function getExchangeById(uint256 id) public view returns (Exchange memory) {
    Exchange memory exchange = exchanges[id];
    return exchange;
  }

  function getExchanges() public view returns (Exchange[] memory) {
    return exchanges;
  }

  function initiateExchange(uint256 initiatorPokemonId, uint256 settlerPokemonId, address settler) public {
    require(pokemonIdToOwner[initiatorPokemonId] == msg.sender);
    uint256 exchangeExpiry = now + 1 minutes;
    uint exchangeId = exchanges.length;
    exchanges.push(Exchange(exchangeId, msg.sender, settler, initiatorPokemonId, settlerPokemonId, exchangeExpiry, false));
    pokemonIdToOwner[initiatorPokemonId] = address(this);
    emit ExchangeInit(exchangeId, msg.sender, settler);
  }

  function settleExchange(uint256 exchangeId, uint256 initiatorPokemonId, uint256 settlerPokemonId, address initiator) public {
    Exchange storage exchange = exchanges[exchangeId];
    require(!exchange.isCompleted);
    require(pokemonIdToOwner[settlerPokemonId] == msg.sender);
    require(pokemonIdToOwner[initiatorPokemonId] == address(this));

    require(exchange.initiator == initiator);
    require(exchange.settler == msg.sender);
    require(exchange.initiatorPokemonId == initiatorPokemonId);
    require(exchange.setttlerPokemonId == settlerPokemonId);
    require(now < exchange.exchangeExpiry);

    Pokemon memory initiatorPokemon = pokemons[initiatorPokemonId];
    Pokemon memory settlerPokemon = pokemons[settlerPokemonId];

    require(initiatorPokemon.power == settlerPokemon.power);

    pokemonIdToOwner[initiatorPokemonId] = exchange.settler;
    pokemonIdToOwner[settlerPokemonId] = exchange.initiator;
    exchange.isCompleted = true;

    emit ExchangeComplete(exchangeId, exchange.initiator, exchange.settler);
  }

  function withdrawExchange(uint256 exchangeId) public {
    Exchange storage exchange = exchanges[exchangeId];
    require(!exchange.isCompleted);
    require(pokemonIdToOwner[exchange.initiatorPokemonId] == address(this));
    require(exchange.initiator == msg.sender);
    require(now > exchange.exchangeExpiry);

    pokemonIdToOwner[exchange.initiatorPokemonId] = exchange.initiator;
    exchange.isCompleted = true;
    emit ExchangeComplete(exchangeId, exchange.initiator, exchange.settler);
  }
}