import { useHistory } from "react-router-dom";
import pokemonLogo from "../../pokemon_logo.png";
import "./PokemonHeader.scss";

const PokemonHeader = () => {
  const history = useHistory();
  return (
    <div
      className="pokemon-header"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <img
        src={pokemonLogo}
        alt="pokemon logo"
        height="300px"
        onClick={() => history.push("/")}
      />
    </div>
  );
};

export default PokemonHeader;
