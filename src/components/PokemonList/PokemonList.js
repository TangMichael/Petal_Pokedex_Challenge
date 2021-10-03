import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import PokemonImage from "../PokemonImage/PokemonImage";
import "./PokemonList.scss";
import { properties } from "../../properties";

const PokemonList = () => {
  const { page } = useParams();
  const history = useHistory();
  const [pokemonList, setPokemonList] = useState([{}]);
  const [pageAmount, setPageAmount] = useState();
  const [qtyDisplay, setQtyDisplay] = useState(20);
  const [pageSelected, setPageSelected] = useState(page || 1);

  const handleChange = (event) => {
    setQtyDisplay(event.target.value);
  };

  useEffect(() => {
    // fetch api call, uncomment when not working with mock anymore
    async function getPokemonList(displayOffset) {
      await fetch(
        `${properties.API}/pokemon?limit=${qtyDisplay}&offset=${displayOffset}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPokemonList(data.results);
          setPageAmount(Math.ceil(data.count / qtyDisplay));
        });
    }
    const displayOffset = page * qtyDisplay - qtyDisplay;
    getPokemonList(displayOffset);
  }, [qtyDisplay, page]);

  return (
    <div className="pokemon-list-container">
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Pokemon</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={qtyDisplay}
              label="Pokemon per page"
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
      <div className="pokemon-list">
        {pokemonList.map((pokemon) => {
          return <PokemonImage name={pokemon.name} />;
        })}
      </div>
      <Stack spacing={2}>
        <Pagination
          defaultPage={pageSelected}
          count={pageAmount}
          onChange={(_, value) => {
            if (value) {
              setPageSelected(value);
              history.push(`/${value}`);
            }
          }}
        />
      </Stack>
    </div>
  );
};

export default PokemonList;
