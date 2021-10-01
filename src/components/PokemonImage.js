import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const PokemonImage = ({ name }) => {
  const [pokemon, setPokemon] = useState();
  const history = useHistory();

  useEffect(() => {
    async function getPokemon() {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
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
    return <img src={pokemonImage["official-artwork"].front_default} alt="" />;
  }

  function goToPokemonDetails() {
    history.push(`/pokemon/${pokemon.name}`);
  }

  return (
    <div onClick={goToPokemonDetails}>
      {pokemon && (
        <div>
          {getPokemonImage()}
          <p>{pokemon.name}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonImage;
