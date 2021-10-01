import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import PokemonDetails from "./components/PokemonDetails";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pokemon/:name">
          <PokemonDetails />
        </Route>
        <Route path="/">
          <div className="App">
            <PokemonList />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
