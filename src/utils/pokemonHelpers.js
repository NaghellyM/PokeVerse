/**
 * Utilidades específicas para el manejo de datos de Pokémon
 * Funciones helper para procesamiento y validación de datos
 */

import Pokemon from "../PokemonFactory/Pokemon.js";

/**
 * Procesa la respuesta de la API para obtener una lista de Pokémon
 * Maneja diferentes tipos de respuestas según el filtro aplicado
 */
export const processApiResponse = (response, filterType) => {
  if (filterType === "?") {
    return Array.isArray(response.results) ? response.results : [response];
  } else {
    if (response.pokemon && Array.isArray(response.pokemon)) {
      return response.pokemon.map((p) => p.pokemon);
    } else if (response.results && Array.isArray(response.results)) {
      return response.results;
    } else {
      console.warn("Estructura de respuesta inesperada:", response);
      return [];
    }
  }
};

/**
 * Crea una instancia de Pokemon a partir de datos de la API
 * Valida que los datos necesarios estén presentes antes de crear la instancia
 */
export const createPokemonInstance = (pokemonData) => {
  if (!pokemonData) {
    throw new Error("Datos de Pokémon requeridos");
  }

  if (!pokemonData.id || !pokemonData.name) {
    throw new Error("ID y nombre de Pokémon son requeridos");
  }

  if (!pokemonData.sprites || !pokemonData.sprites.front_default) {
    throw new Error("Imagen de Pokémon requerida");
  }

  if (
    !pokemonData.types ||
    !Array.isArray(pokemonData.types) ||
    pokemonData.types.length === 0
  ) {
    throw new Error("Tipos de Pokémon requeridos");
  }

  try {
    return new Pokemon(
      pokemonData.id,
      pokemonData.name,
      pokemonData.sprites?.front_default || "/placeholder-pokemon.png",
      pokemonData.types[0]?.type?.name || "unknown",
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Valida si un ID de búsqueda es válido para consultar la API
 * Acepta tanto IDs numéricos como nombres de Pokémon
 */
export const isValidSearchId = (searchId) => {
  if (searchId === null || searchId === undefined) {
    return false;
  }

  const trimmedId = String(searchId).trim();

  if (trimmedId.length === 0) {
    return false;
  }

  const isNumeric = /^\d+$/.test(trimmedId);
  const isValidName = /^[a-zA-Z0-9-]+$/.test(trimmedId);

  return isNumeric || isValidName;
};

/**
 * Normaliza el nombre de un Pokémon para búsqueda en la API
 * Convierte a minúsculas, elimina espacios extra y reemplaza espacios con guiones
 */
export const normalizePokemonName = (name) => {
  if (!name || typeof name !== "string") {
    return "";
  }

  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-.♀♂]/g, ""); // Mantener caracteres especiales de Pokémon
};

/**
 * Obtiene el nombre en español del tipo de Pokémon
 * Traduce los tipos de inglés (API) a español (interfaz)
 */
export const getSpanishTypeName = (englishType) => {
  const typeTranslations = {
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada",
  };

  if (!englishType || typeof englishType !== "string") {
    return "Desconocido";
  }

  const normalizedType = englishType.toLowerCase().trim();
  return typeTranslations[normalizedType] || englishType;
};

/**
 * Valida si los datos de un Pokémon están completos
 * Verifica que tenga todos los campos requeridos para mostrar
 */
export const validatePokemonData = (pokemonData) => {
  if (!pokemonData) return false;

  const requiredFields = ["id", "name", "sprites", "types"];

  for (const field of requiredFields) {
    if (!pokemonData[field]) {
      return false;
    }
  }

  if (!pokemonData.sprites.front_default) {
    return false;
  }

  if (!Array.isArray(pokemonData.types) || pokemonData.types.length === 0) {
    return false;
  }

  return true;
};

/**
 * Formatea el ID de un Pokémon con ceros a la izquierda
 * Útil para mostrar IDs con formato consistente (#001, #025, etc.)
 */
export const formatPokemonId = (id, length = 3) => {
  if (!id) return "#000";

  const numericId = Number.parseInt(id, 10);
  if (isNaN(numericId)) return `#${id}`;

  return `#${numericId.toString().padStart(length, "0")}`;
};
