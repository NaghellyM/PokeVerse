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

  createErrorCard(searchError) {
    const errorPokemon = {
    getInfo: () => ({
      id: `${searchError}`,
      name: `Desconocido`,
      type: "error404",
      image: "./public/error404.png"
    }),
    isValid: () => true 
  };

  return this.builder
    .setPokemon(errorPokemon)
    .setShowDetail(false)
    .build();
}

}


export default PokemonCardFactory