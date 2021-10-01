import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonEvolution from "./PokemonEvolution";
const PokemonDetails = ({ pokemonDetails }) => {
  const [pokemon, setPokemon] = useState(pokemonDetails);
  const params = useParams();

  // get pokemon details
  useEffect(() => {
    async function getPokemonDetails() {
      // create service for this api call
      await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
        .then((response) => response.json())
        .then((data) => {
          setPokemon(data);
        });
    }
    if (!pokemon || params.name !== pokemon.name) {
      getPokemonDetails();
    }
  }, [params.name, pokemon]);

  function getPokemonImage() {
    const pokemonImage = pokemon.sprites.other;
    return <img src={pokemonImage["official-artwork"].front_default} alt="" />;
  }

  return (
    <div>
      {pokemon && (
        <div>
          {getPokemonImage()}
          <p>{pokemon.name}</p>
          {"pokemon types: "}
          {pokemon.types.map((type) => (
            <p>{type.type.name}</p>
          ))}
          <p>{pokemon.id}</p>
          <PokemonEvolution name={pokemon.name} />
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
