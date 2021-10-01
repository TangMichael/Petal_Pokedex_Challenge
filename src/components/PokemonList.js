import { useEffect, useState } from "react";
import PokemonImage from "./PokemonImage";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([{}]);
  const [displayCount, setDisplayCount] = useState();
  const [qtyDisplay, setQtyDisplay] = useState(20);
  const [displayOffset, setDisplayOffset] = useState(0);

  const handleChange = (event) => {
    setQtyDisplay(event.target.value);
  };

  useEffect(() => {
    // fetch api call, uncomment when not working with mock anymore
    async function getPokemonList() {
      await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${qtyDisplay}&offset=${displayOffset}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPokemonList(data.results);
          setDisplayCount(data.count / qtyDisplay);
        });
    }
    getPokemonList();
  }, [qtyDisplay, displayOffset]);

  return (
    <div>
      {" "}
      This is the pokemon list
      <div>
        <Stack spacing={2}>
          <Pagination
            count={displayCount}
            onChange={(_, value) => setDisplayOffset(value * qtyDisplay - 20)}
          />
        </Stack>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qtyDisplay}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {pokemonList.map((pokemon) => {
          return <PokemonImage name={pokemon.name} />;
        })}
      </div>
    </div>
  );
};

export default PokemonList;
