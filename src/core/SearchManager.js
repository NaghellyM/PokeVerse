import { getPokemonById } from "../services/pokemonServices.js";
import { UI_MESSAGES } from "../utils/constants.js";
import {
  isValidSearchId,
  normalizePokemonName,
  createPokemonInstance,
} from "../utils/pokemonHelpers.js";

/**
 * Gestor de búsqueda de Pokémon
 * Maneja la funcionalidad de búsqueda individual
 */
export class SearchManager {
  constructor(cardManager, uiManager) {
    this.cardManager = cardManager;
    this.uiManager = uiManager;
  }

  /**
   * Configura la funcionalidad de búsqueda
   */
  setupSearchFunctionality(onSearch, onClear) {
    const searchButton = document.getElementById("search__button");
    const searchInput = document.getElementById("search__input");

    if (!searchButton || !searchInput) {
      console.error("Elementos de búsqueda no encontrados");
      return;
    }

    searchButton.addEventListener("click", onSearch);

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        onSearch();
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClear();
      }
    });
  }

  /**
   * Maneja la búsqueda individual de Pokémon
   */
  async handleSearch() {
    const searchTerm = this.uiManager.getSearchInputValue();

    if (!searchTerm) {
      alert(UI_MESSAGES.NO_RESULTS);
      return;
    }

    this.uiManager.togglePaginationButtons(false);
    this.uiManager.toggleLoader(true);
    this.cardManager.clearAllCards();

    try {
      let searchId;
      if (isValidSearchId(searchTerm)) {
        searchId = searchTerm;
      } else {
        searchId = normalizePokemonName(searchTerm);
      }

      const data = await getPokemonById({ id: searchId });
      const pokemon = createPokemonInstance(data);

      if (pokemon.isValid()) {
        this.cardManager.addMinimalCard(pokemon);
      } else {
        this.cardManager.addErrorCard(searchTerm);
      }
    } catch (error) {
      this.cardManager.addErrorCard(searchTerm);
    }

    this.uiManager.toggleLoader(false);
    this.uiManager.clearSearchInput();
  }

  /**
   * Limpia la búsqueda actual
   */
  clearSearch() {
    this.uiManager.clearSearchInput();
    this.cardManager.clearAllCards();
  }
}
