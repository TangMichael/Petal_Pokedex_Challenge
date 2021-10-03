import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { properties } from "../../properties";

import "./PokemonImage.scss";

const PokemonImage = ({ name, extraStyle }) => {
  const [pokemon, setPokemon] = useState();
  const history = useHistory();

  useEffect(() => {
    async function getPokemon() {
      await fetch(`${properties.API}/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
          setPokemon(data);
        });
    }
    if (name) {
      getPokemon();
    }
  }, [name]);

  function getPokemonImage() {
    const pokemonImage = pokemon.sprites.other;
    return (
      <img
        src={pokemonImage["official-artwork"].front_default}
        alt=""
        width="300px"
        height="300px"
      />
    );
  }

  function goToPokemonDetails() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  return (
    <div onClick={goToPokemonDetails}>
      {pokemon && (
        <div
          className="pokemon-image"
          style={{
            ...extraStyle,
          }}
        >
          {getPokemonImage()}
          <span>{pokemon.name}</span>
        </div>
      )}
    </div>
  );
};

export default PokemonImage;
