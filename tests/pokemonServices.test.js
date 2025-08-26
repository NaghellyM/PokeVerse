import { describe, it, expect, beforeEach, vi } from "vitest";
import axios from "axios";
import {
  getPokemonById,
  getInfoSpecies,
  getPokemonMoves,
  getAllPokemonsByType,
} from "../src/services/pokemonServices.js";

// Mock axios
vi.mock("axios");
const mockedAxios = axios;

/**
 * Pruebas unitarias para los servicios de Pokémon.
 * Verifica la correcta obtención de datos desde la API de Pokémon.
 */
describe("Pokemon Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPokemonById", () => {
    it("should fetch Pokemon data successfully", async () => {
      const mockPokemonData = {
        id: 25,
        name: "pikachu",
        sprites: { front_default: "pikachu.png" },
        types: [{ type: { name: "electric" } }],
      };

      mockedAxios.get.mockResolvedValue({ data: mockPokemonData });

      const result = await getPokemonById({ id: 25 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.VITE_URL_TO_POKEMON}/pokemon/25`,
      );
      expect(result).toEqual(mockPokemonData);
    });

    it("should throw error when API call fails", async () => {
      const mockError = new Error("Pokemon not found");
      mockedAxios.get.mockRejectedValue(mockError);

      await expect(getPokemonById({ id: 999 })).rejects.toThrow(
        "Pokemon not found",
      );
    });
  });

  describe("getInfoSpecies", () => {
    it("should fetch Pokemon species data successfully", async () => {
      const mockSpeciesData = {
        id: 25,
        name: "pikachu",
        flavor_text_entries: [{ flavor_text: "Electric mouse Pokemon" }],
      };

      mockedAxios.get.mockResolvedValue({ data: mockSpeciesData });

      const result = await getInfoSpecies({ id: 25 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.VITE_URL_TO_POKEMON}/pokemon-species/25`,
      );
      expect(result).toEqual(mockSpeciesData);
    });
  });

  describe("getPokemonMoves", () => {
    it("should fetch Pokemon moves successfully", async () => {
      const mockMovesData = {
        moves: [
          { move: { name: "thunderbolt" } },
          { move: { name: "quick-attack" } },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: mockMovesData });

      const result = await getPokemonMoves({ id: 25 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.VITE_URL_TO_POKEMON}/pokemon/moves/25`,
      );
      expect(result).toEqual(mockMovesData);
    });
  });

  describe("getAllPokemonsByType", () => {
    it("should fetch Pokemon by type successfully", async () => {
      const mockTypeData = {
        pokemon: [
          { pokemon: { name: "pikachu", url: "pokemon/25/" } },
          { pokemon: { name: "raichu", url: "pokemon/26/" } },
        ],
      };

      mockedAxios.get.mockResolvedValue({ data: mockTypeData });

      const result = await getAllPokemonsByType({ type: "electric" });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.VITE_URL_TO_POKEMON}/type/electric`,
      );
      expect(result).toEqual(mockTypeData);
    });

    it("should handle API errors gracefully", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Type not found"));

      await expect(getAllPokemonsByType({ type: "invalid" })).rejects.toThrow(
        "Type not found",
      );
    });
  });
});
