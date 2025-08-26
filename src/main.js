import "./style.css";
import {
  getAllPokemonsByType,
  getPokemonById,
} from "./services/pokemonServices.js";
import PokemonCardManager from "./PokemonFactory/PokemonCardManager.js";
import { POKEMON_TYPES, UI_MESSAGES } from "./utils/constants.js";
import {
  createButton,
  toggleElement,
  createPaginationContainer,
} from "./utils/domHelpers.js";
import {
  processApiResponse,
  createPokemonInstance,
  isValidSearchId,
  normalizePokemonName,
} from "./utils/pokemonHelpers.js";
import { PaginationService } from "./services/paginationService.js";

/**
 * Clase principal de la aplicación PokeVerse
 * Maneja la inicialización y coordinación de todos los componentes
 *
 * Funcionalidades principales:
 * - Filtrado de Pokémon por tipo usando bucle for
 * - Búsqueda individual con tarjetas mínimas
 * - Paginación para filtros (botones anterior/siguiente)
 * - Gestión de estados de búsqueda vs filtrado
 */
class PokeVerseApp {
  constructor() {
    this.cardManager = new PokemonCardManager("#pokemon-container");
    this.paginationService = new PaginationService();
    this.currentFilter = null;
    this.isSearchMode = false;
    this.allPokemonData = [];

    this.init();
  }

  /**
   * Inicializa la aplicación configurando todos los componentes
   * Orden de inicialización: filtros -> búsqueda -> paginación
   */
  init() {
    this.createFilterButtons();
    this.setupSearchFunctionality();
    this.setupPaginationContainer();
  }

  /**
   * Crea los botones de filtro dinámicamente usando un bucle for
   * Implementa el requisito específico de usar for para crear botones de filtros
   */
  createFilterButtons() {
    const filterContainer = document.getElementById("filter-buttons");
    if (!filterContainer) {
      return;
    }

    const typeKeys = Object.keys(POKEMON_TYPES);

    for (let i = 0; i < typeKeys.length; i++) {
      const key = typeKeys[i];
      const button = createButton(key, ["filter__button"], () => {
        this.handleFilterClick(key);
      });

      button.setAttribute("data-filter-type", key);
      button.setAttribute("aria-label", `Filtrar por tipo ${key}`);

      filterContainer.appendChild(button);
    }
  }

  /**
   * Configura la funcionalidad de búsqueda individual
   * La búsqueda utiliza tarjetas mínimas y oculta los botones de paginación
   */
  setupSearchFunctionality() {
    const searchButton = document.getElementById("search__button");
    const searchInput = document.getElementById("search__input");

    if (!searchButton || !searchInput) {
      console.error("Elementos de búsqueda no encontrados");
      return;
    }

    searchButton.addEventListener("click", () => this.handleSearch());

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.clearSearch();
      }
    });
  }

  /**
   * Configura el contenedor de paginación con botones anterior/siguiente
   * Los botones solo se muestran en modo filtro, no en búsqueda
   */
  setupPaginationContainer() {
    const actionContainer = document.getElementById("filter-buttons-action");
    if (!actionContainer) {
      console.error("Container de acciones no encontrado");
      return;
    }

    const paginationContainer = createPaginationContainer(
      () => this.handlePreviousPage(),
      () => this.handleNextPage(),
    );

    actionContainer.appendChild(paginationContainer);

    toggleElement("filter-buttons-action", false);
  }

  /**
   * Maneja el click en los botones de filtro
   * Muestra botones de paginación y carga datos paginados
   * @param {string} filterKey - Clave del filtro seleccionado
   */
  async handleFilterClick(filterKey) {
    this.currentFilter = filterKey;
    this.isSearchMode = false;

    toggleElement("filter-buttons-action", true);
    toggleElement("loader", true);

    this.updateActiveFilterButton(filterKey);

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

      this.paginationService.initialize(this.allPokemonData);
      this.displayCurrentPage();
    } catch (error) {
      console.error("Error aplicando filtro:", error);
      this.cardManager.addErrorCard(selectedFilter);
    }
    toggleElement("loader", false);
  }

  /**
   * Actualiza el botón de filtro activo visualmente
   * @param {string} activeFilterKey - Clave del filtro activo
   */
  updateActiveFilterButton(activeFilterKey) {
    const allFilterButtons = document.querySelectorAll(".filter__button");
    allFilterButtons.forEach((button) => {
      button.classList.remove("active");
    });

    const activeButton = document.querySelector(
      `[data-filter-type="${activeFilterKey}"]`,
    );
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }

  /**
   * Obtiene un rango de Pokémon por ID para el filtro "Todos"
   * @param {number} start - ID inicial
   * @param {number} end - ID final
   * @returns {Object} Respuesta simulada con lista de Pokémon
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
   * Optimizado para manejar errores individuales sin afectar el resto
   * @param {Array} pokemonList - Lista de referencias de Pokémon
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
   * Maneja la búsqueda individual de Pokémon
   */
  async handleSearch() {
    const searchInput = document.getElementById("search__input");
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
      alert(UI_MESSAGES.NO_RESULTS);
      return;
    }

    this.isSearchMode = true;
    this.currentFilter = null;

    toggleElement("filter-buttons-action", false);
    toggleElement("loader", true);

    this.updateActiveFilterButton(null);
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

    toggleElement("loader", false);
    searchInput.value = "";
  }

  /**
   * Limpia la búsqueda actual y resetea la vista
   */
  clearSearch() {
    const searchInput = document.getElementById("search__input");
    if (searchInput) {
      searchInput.value = "";
    }

    if (this.isSearchMode) {
      this.cardManager.clearAllCards();
      this.isSearchMode = false;
    }
  }

  /**
   * Maneja la navegación a la página anterior
   * Solo funciona en modo filtro, no en búsqueda
   */
  handlePreviousPage() {
    if (!this.isSearchMode && this.paginationService.hasPreviousPage()) {
      this.paginationService.goToPreviousPage();
      this.displayCurrentPage();
    }
  }

  /**
   * Maneja la navegación a la página siguiente
   * Solo funciona en modo filtro, no en búsqueda
   */
  handleNextPage() {
    if (!this.isSearchMode && this.paginationService.hasNextPage()) {
      this.paginationService.goToNextPage();
      this.displayCurrentPage();
    }
  }

  /**
   * Muestra la página actual de Pokémon con tarjetas detalladas
   * Solo se usa en modo filtro
   */
  displayCurrentPage() {
    this.cardManager.clearAllCards();
    const currentPageData = this.paginationService.getCurrentPageData();
    currentPageData.forEach((pokemon) => {
      this.cardManager.addMinimalCard(pokemon);
    });

    this.updatePaginationButtons();
  }

  /**
   * Actualiza el estado visual de los botones de paginación
   * Deshabilita botones cuando no hay más páginas disponibles
   */
  updatePaginationButtons() {
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    if (prevButton && nextButton) {
      const hasPrev = this.paginationService.hasPreviousPage();
      const hasNext = this.paginationService.hasNextPage();

      prevButton.disabled = !hasPrev;
      nextButton.disabled = !hasNext;

      prevButton.classList.toggle("disabled", !hasPrev);
      nextButton.classList.toggle("disabled", !hasNext);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    new PokeVerseApp();
  } catch (error) {}
});
