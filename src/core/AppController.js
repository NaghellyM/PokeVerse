import { UIManager } from "./UIManager.js";
import { SearchManager } from "./SearchManager.js";
import { FilterManager } from "./FilterManager.js";
import { PaginationManager } from "./PaginationManager.js";
import PokemonCardManager from "../PokemonFactory/PokemonCardManager.js";
import { PaginationService } from "../services/paginationService.js";

/**
 * Controlador principal de la aplicación PokeVerse
 * Coordina todos los managers y servicios
 */
export class AppController {
  constructor() {
    this.cardManager = new PokemonCardManager("#pokemon-container");
    this.paginationService = new PaginationService();

    // Managers especializados
    this.uiManager = new UIManager();
    this.searchManager = new SearchManager(this.cardManager, this.uiManager);
    this.filterManager = new FilterManager(
      this.cardManager,
      this.paginationService,
      this.uiManager,
    );

    this.paginationManager = new PaginationManager(
      this.paginationService,
      this.cardManager,
    );

    // Estado de la aplicación
    this.currentFilter = null;
    this.isSearchMode = false;
    this.allPokemonData = [];

    this.init();
  }

  /**
   * Inicializa la aplicación configurando todos los componentes
   */
  init() {
    this.filterManager.createFilterButtons((filterKey) =>
      this.handleFilterClick(filterKey),
    );
    this.searchManager.setupSearchFunctionality(
      () => this.handleSearch(),
      () => this.clearSearch(),
    );
    this.paginationManager.setupPaginationContainer(
      () => this.handlePreviousPage(),
      () => this.handleNextPage(),
    );
    this.uiManager.togglePaginationButtons(false);
  }

  /**
   * Maneja el click en los botones de filtro
   */
  async handleFilterClick(filterKey) {
    this.currentFilter = filterKey;
    this.isSearchMode = false;

    await this.filterManager.handleFilterClick(filterKey);
    this.allPokemonData = this.filterManager.getAllPokemonData();

    this.paginationService.initialize(this.allPokemonData);
    this.displayCurrentPage();
  }

  /**
   * Maneja la búsqueda individual
   */
  async handleSearch() {
    this.isSearchMode = true;
    this.currentFilter = null;

    await this.searchManager.handleSearch();
    this.filterManager.updateActiveFilterButton(null);
  }

  /**
   * Limpia la búsqueda actual
   */
  clearSearch() {
    this.searchManager.clearSearch();
    if (this.isSearchMode) {
      this.isSearchMode = false;
    }
  }

  /**
   * Navegación a página anterior
   */
  handlePreviousPage() {
    if (!this.isSearchMode && this.paginationService.hasPreviousPage()) {
      this.paginationService.goToPreviousPage();
      this.displayCurrentPage();
    }
  }

  /**
   * Navegación a página siguiente
   */
  handleNextPage() {
    if (!this.isSearchMode && this.paginationService.hasNextPage()) {
      this.paginationService.goToNextPage();
      this.displayCurrentPage();
    }
  }

  /**
   * Muestra la página actual
   */
  displayCurrentPage() {
    this.paginationManager.displayCurrentPage();
  }
}
