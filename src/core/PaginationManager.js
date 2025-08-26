import { createPaginationContainer } from "../utils/domHelpers.js";

/**
 * Gestor de paginación
 * Maneja la configuración y visualización de la paginación
 */
export class PaginationManager {
  constructor(paginationService, cardManager) {
    this.paginationService = paginationService;
    this.cardManager = cardManager;
  }

  /**
   * Configura el contenedor de paginación
   */
  setupPaginationContainer(onPrevious, onNext) {
    const actionContainer = document.getElementById("filter-buttons-action");
    if (!actionContainer) {
      console.error("Container de acciones no encontrado");
      return;
    }

    const paginationContainer = createPaginationContainer(onPrevious, onNext);
    actionContainer.appendChild(paginationContainer);
  }

  /**
   * Muestra la página actual de Pokémon
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
   * Actualiza el estado de los botones de paginación
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
