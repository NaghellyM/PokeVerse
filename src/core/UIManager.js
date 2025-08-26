import { toggleElement } from "../utils/domHelpers.js";

/**
 * Gestor de elementos de interfaz de usuario
 * Centraliza las operaciones de manipulación del DOM
 */
export class UIManager {
  /**
   * Muestra u oculta el loader
   */
  toggleLoader(show) {
    toggleElement("loader", show);
  }

  /**
   * Muestra u oculta los botones de paginación
   */
  togglePaginationButtons(show) {
    toggleElement("filter-buttons-action", show);
  }

  /**
   * Actualiza el estado visual de los botones de paginación
   */
  updatePaginationButtons(hasPrev, hasNext) {
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    if (prevButton && nextButton) {
      prevButton.disabled = !hasPrev;
      nextButton.disabled = !hasNext;

      prevButton.classList.toggle("disabled", !hasPrev);
      nextButton.classList.toggle("disabled", !hasNext);
    }
  }

  /**
   * Actualiza el botón de filtro activo
   */
  updateActiveFilterButton(activeFilterKey) {
    const allFilterButtons = document.querySelectorAll(".filter__button");
    allFilterButtons.forEach((button) => {
      button.classList.remove("active");
    });

    if (activeFilterKey) {
      const activeButton = document.querySelector(
        `[data-filter-type="${activeFilterKey}"]`,
      );
      if (activeButton) {
        activeButton.classList.add("active");
      }
    }
  }

  /**
   * Obtiene el valor del input de búsqueda
   */
  getSearchInputValue() {
    const searchInput = document.getElementById("search__input");
    return searchInput ? searchInput.value.trim() : "";
  }

  /**
   * Limpia el input de búsqueda
   */
  clearSearchInput() {
    const searchInput = document.getElementById("search__input");
    if (searchInput) {
      searchInput.value = "";
    }
  }
}
