import axios from "axios";

export const getPokemonById = async ({ id }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_TO_POKEMON}/pokemon/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getInfoSpecies = async ({ id }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_TO_POKEMON}/pokemon-species/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonMoves = async ({ id }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_TO_POKEMON}/pokemon/moves/${id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPokemonsByType = async ({ type }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_TO_POKEMON}/type/${type}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
