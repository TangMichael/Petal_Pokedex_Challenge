import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const PokemonEvolution = ({ name }) => {
  const [pokemonEvolution, setPokemonEvolution] = useState([]);
  const history = useHistory();

  function getEvolutionChainName(pokemonChain) {
    let evolNameArray = [];
    function findEvolutionName(pokemon) {
      evolNameArray.push(pokemon.species.name);
      if (pokemon.evolves_to.length === 0) {
        return;
      }
      return pokemon.evolves_to.forEach((x) => findEvolutionName(x));
    }
    findEvolutionName(pokemonChain);
    return evolNameArray;
  }

  // get evolution url
  useEffect(() => {
    async function getPokemonEvolutionUrl() {
      // get evolution chain url
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
        .then((response) => response.json())
        .then(async (data) => {
          await fetch(`${data.evolution_chain.url}`)
            .then((response) => response.json())
            .then((data) => {
              const evolutionNameArray = getEvolutionChainName(data.chain);
              setPokemonEvolution(evolutionNameArray);
            });
        });
    }
    getPokemonEvolutionUrl();
  }, [name]);

  function goToPokemonDetails(name) {
    history.push(`/pokemon/${name}`);
  }

  return (
    <div>
      {pokemonEvolution.map((evolutionName) => (
        <p onClick={() => goToPokemonDetails(evolutionName)}>{evolutionName}</p>
      ))}
    </div>
  );
};
export default PokemonEvolution;
