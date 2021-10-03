import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PokemonEvolution from "../PokemonEvolution/PokemonEvolution";
import "./PokemonDetails.scss";
import { properties } from "../../properties";

const PokemonDetails = ({ pokemonDetails }) => {
  const [pokemon, setPokemon] = useState(pokemonDetails);
  const params = useParams();

  // get pokemon details
  useEffect(() => {
    async function getPokemonDetails() {
      // create service for this api call
      await fetch(`${properties.API}/pokemon/${params.name}`)
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
    <div className="pokemon-details-container">
      {pokemon && (
        <div className="pokemon-details-content">
          {getPokemonImage()}
          <div className="pokemon-information">
            <p>Id: {pokemon.id}</p>
            <span>Name: {pokemon.name}</span>
            <p>
              {"Pokemon type(s): "}
              {pokemon.types.map((type) => (
                <span> {type.type.name + " "}</span>
              ))}
            </p>
            <PokemonEvolution name={pokemon.name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
