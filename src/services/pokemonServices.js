import axios from "axios"

export const getPokemonById = async ({id}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_URL_TO_POKEMON}/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}