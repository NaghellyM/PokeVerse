import PokemonCardBuilder from './PokemonCardBuilder.js'

class PokemonCardFactory {
  constructor() {
    this.builder = new PokemonCardBuilder()
  }

  createDetailedCard(pokemon) {
    return this.builder
      .setPokemon(pokemon)
      .setShowDetail(true)
      .build()
  }

  createMinimalCard(pokemon) {
    return this.builder
      .setPokemon(pokemon)
      .setShowDetail(false)
      .build()
  }
}

export default PokemonCardFactory