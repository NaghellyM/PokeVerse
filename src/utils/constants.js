/**
 * Constantes de la aplicación PokeVerse
 * Contiene los tipos de Pokémon disponibles para filtros y configuraciones globales
 */

export const POKEMON_TYPES = {
  Todos: "?",
  Fuego: "fire",
  Agua: "water",
  Planta: "grass",
  Eléctrico: "electric",
  Psíquico: "psychic",
  Hielo: "ice",
  Dragón: "dragon",
  Siniestro: "dark",
  Hada: "fairy",
};

export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 20,
  MAX_VISIBLE_PAGES: 5,
};

export const UI_MESSAGES = {
  LOADING: "Cargando...",
  ERROR_POKEMON_NOT_FOUND: "Pokémon no encontrado",
  ERROR_NETWORK: "Error de conexión",
  NO_RESULTS: "No se encontraron resultados",
};
