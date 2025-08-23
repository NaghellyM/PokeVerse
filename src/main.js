import './style.css'
import { getPokemonById } from './services/pokemonServices.js'
import PokemonCardManager from './PokemonFactory/PokemonCardManager.js'
import Pokemon from './PokemonFactory/Pokemon.js'

const searchButton = document.getElementById('search__button')
searchButton.addEventListener('click', async () => {
  const idToSearch = document.getElementById('search__input').value
  try {
    const response = await getPokemonById({ id: idToSearch })
  } catch {
    // TODO: create card for error
    console.error('Failed to fetch Pokemon data')
    return
  }
  console.log(response)
  const cardManager = new PokemonCardManager('#pokemon-container')
  const pokemon = new Pokemon(response.name, response.sprites.front_default, response.types[0].type.name)
  console.log(pokemon)
  cardManager.addMinimalCard(pokemon)
})
