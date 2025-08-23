import axios from "axios"

export const getPokemonById = async ({id}) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return response.data
    } catch (error) {
        console.error("Error fetching Pokemon by ID:", error)
        throw error
    }
}