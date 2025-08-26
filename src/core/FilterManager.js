import {
  getAllPokemonsByType,
  getPokemonById,
} from "../services/pokemonServices.js";
import { POKEMON_TYPES } from "../utils/constants.js";
import { createButton } from "../utils/domHelpers.js";
import {
  processApiResponse,
  createPokemonInstance,
} from "../utils/pokemonHelpers.js";

/**
 * Gestor de filtros de Pokémon
 * Maneja la creación de botones de filtro y la lógica de filtrado
 */
export class FilterManager {
  constructor(cardManager, paginationService, uiManager) {
    this.cardManager = cardManager;
    this.paginationService = paginationService;
    this.uiManager = uiManager;
    this.allPokemonData = [];
  }

  /**
   * Crea los botones de filtro dinámicamente usando un bucle for
   */
  createFilterButtons(onFilterClick) {
    const filterContainer = document.getElementById("filter-buttons");
    if (!filterContainer) {
      return;
    }

    const typeKeys = Object.keys(POKEMON_TYPES);

    for (let i = 0; i < typeKeys.length; i++) {
      const key = typeKeys[i];
      const button = createButton(key, ["filter__button"], () => {
        onFilterClick(key);
      });

      button.setAttribute("data-filter-type", key);
      button.setAttribute("aria-label", `Filtrar por tipo ${key}`);

      filterContainer.appendChild(button);
    }
  }

  /**
   * Maneja el click en los botones de filtro
   */
  async handleFilterClick(filterKey) {
    this.uiManager.togglePaginationButtons(true);
    this.uiManager.toggleLoader(true);
    this.uiManager.updateActiveFilterButton(filterKey);

    const selectedFilter = POKEMON_TYPES[filterKey];
    this.cardManager.clearAllCards();

    try {
      let response;

      if (selectedFilter === "?") {
        response = await this.getAllPokemonRange(1, 151);
      } else {
        response = await getAllPokemonsByType({ type: selectedFilter });
        response.results = response.pokemon.map((p) => p.pokemon);
      }

      const pokemonList = processApiResponse(response, selectedFilter);
      await this.loadPokemonData(pokemonList);
    } catch (error) {
      console.error("Error aplicando filtro:", error);
      this.cardManager.addErrorCard(selectedFilter);
    }

    this.uiManager.toggleLoader(false);
  }

  /**
   * Obtiene un rango de Pokémon por ID para el filtro "Todos"
   */
  async getAllPokemonRange(start, end) {
    const results = [];
    for (let i = start; i <= end; i++) {
      results.push({ name: i.toString(), url: `pokemon/${i}` });
    }
    return { results };
  }

  /**
   * Carga los datos completos de una lista de Pokémon
   */
  async loadPokemonData(pokemonList) {
    this.allPokemonData = [];
    let loadedCount = 0;

    for (const p of pokemonList) {
      try {
        const data = await getPokemonById({ id: p.name });
        const pokemon = createPokemonInstance(data);
        if (pokemon.isValid()) {
          this.allPokemonData.push(pokemon);
          loadedCount++;
        } else {
          console.warn("Datos de Pokémon inválidos:", data.name || p.name);
        }
      } catch (error) {
        console.error("Error cargando Pokémon:", p.name, error.message);
      }
    }
  }

  /**
   * Actualiza el botón de filtro activo
   */
  updateActiveFilterButton(activeFilterKey) {
    this.uiManager.updateActiveFilterButton(activeFilterKey);
  }

  /**
   * Obtiene todos los datos de Pokémon cargados
   */
  getAllPokemonData() {
    return this.allPokemonData;
  }
}
