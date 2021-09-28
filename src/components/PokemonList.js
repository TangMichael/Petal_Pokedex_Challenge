import { useEffect, useState } from "react";
import { PokemonListMock } from "../mocks/PokemonListMock";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    // fetch api call, uncomment when not working with mock anymore
    // fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    console.log(PokemonListMock);
    setPokemonList(PokemonListMock.results);
  }, []);

  return (
    <div>
      {" "}
      This is the pokemon list
      {pokemonList.map((pokemon) => (
        <p>{pokemon.name}</p>
      ))}
    </div>
  );
};

export default PokemonList;
