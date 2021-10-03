import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { properties } from "../../properties";

import "./PokemonEvolution.scss";
import PokemonImage from "../PokemonImage/PokemonImage";

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
      await fetch(`${properties.API}/pokemon-species/${name}`)
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
      <p>Evolution line: </p>
      <div className="pokemon-evolution-container">
        {pokemonEvolution.map((evolutionName) => (
          <span>
            {name === evolutionName ? (
              <PokemonImage
                name={evolutionName}
                extraStyle={{ cursor: "default" }}
              />
            ) : (
              <span
                onClick={() => goToPokemonDetails(evolutionName)}
                className="pokemon-evolution-container-span"
              >
                <PokemonImage
                  name={evolutionName}
                  extraStyle={{ fontWeight: "normal" }}
                />
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
export default PokemonEvolution;
