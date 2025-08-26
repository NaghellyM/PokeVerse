/**
 * Servicio de paginación para manejo de resultados por páginas
 * Gestiona la lógica de paginación para filtros de Pokémon
 */

import { PAGINATION_CONFIG } from "../utils/constants.js";

export class PaginationService {
  constructor() {
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = PAGINATION_CONFIG.ITEMS_PER_PAGE;
    this.allItems = [];
  }

  /**
   * Inicializa la paginación con un conjunto de elementos
   */
  initialize(items) {
    this.allItems = items;
    this.totalItems = items.length;
    this.currentPage = 1;
  }

  /**
   * Obtiene los elementos de la página actual
   */
  getCurrentPageData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allItems.slice(startIndex, endIndex);
  }

  /**
   * Obtiene el número de la página actual
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Navega a la página anterior
   */
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      return true;
    }
    return false;
  }

  /**
   * Navega a la página siguiente
   */
  goToNextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      return true;
    }
    return false;
  }

  /**
   * Obtiene el número total de páginas
   */
  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Verifica si hay página anterior
   */
  hasPreviousPage() {
    return this.currentPage > 1;
  }

  /**
   * Verifica si hay página siguiente
   */
  hasNextPage() {
    return this.currentPage < this.getTotalPages();
  }

  /**
   * Obtiene información del estado actual de la paginación
   */
  getPaginationInfo() {
    return {
      currentPage: this.currentPage,
      totalPages: this.getTotalPages(),
      totalItems: this.totalItems,
      hasNext: this.hasNextPage(),
      hasPrevious: this.hasPreviousPage(),
      startItem: (this.currentPage - 1) * this.itemsPerPage + 1,
      endItem: Math.min(this.currentPage * this.itemsPerPage, this.totalItems),
    };
  }

  /**
   * Resetea la paginación
   */
  reset() {
    this.currentPage = 1;
    this.totalItems = 0;
    this.allItems = [];
  }
}
