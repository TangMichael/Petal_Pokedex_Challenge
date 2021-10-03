import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./components/PokemonDetail/PokemonDetails";
import PokemonHeader from "./components/PokemonHeader/PokemonHeader";
import PokemonList from "./components/PokemonList/PokemonList";

function App() {
  return (
    <BrowserRouter>
      <PokemonHeader />
      <Switch>
        <Route path="/pokemon/:name">
          <PokemonDetails />
        </Route>
        <Route path="/:page">
          <PokemonList />
        </Route>
        <Route path="/">
          <PokemonList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
