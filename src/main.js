import "./style.css";
import { getPokemonById } from "./services/pokemonServices.js";
import PokemonCardManager from "./PokemonFactory/PokemonCardManager.js";
import Pokemon from "./PokemonFactory/Pokemon.js";

const searchButton = document.getElementById("search__button");
searchButton.addEventListener("click", async () => {
  const idToSearch = document.getElementById("search__input").value;
  const cardManager = new PokemonCardManager("#pokemon-container");
  try {
    const response = await getPokemonById({ id: idToSearch });
    const pokemon = new Pokemon(
      response.id,
      response.name,
      response.sprites.front_default,
      response.types[0].type.name
    );
    cardManager.addMinimalCard(pokemon);
  } catch {
    cardManager.addErrorCard(idToSearch);
    return;
  }
});
