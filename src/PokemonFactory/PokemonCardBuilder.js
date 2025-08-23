import DefaultTypeStyleStrategy from './DefaultTypeStyleStrategy.js'

class PokemonCardBuilder {
  constructor() {
    this.styleStrategy = new DefaultTypeStyleStrategy()
    this.reset()
  }

  reset() {
    this.card = {
      pokemon: null,
      showDetail: false,
    }
    return this
  }

  setPokemon(pokemon) {
    this.card.pokemon = pokemon
    return this
  }

  setShowDetail(show = true) {
    this.card.showDetail = show
    return this
  }

  build() {
    if (!this.card.pokemon) {
      throw new Error('Pokemon is required to build a card')
    }
    
    const cardElement = this._createCardElement()
    const result = { ...this.card, element: cardElement }
    this.reset()
    return result
  }

  _createCardElement() {
    const pokemon = this.card.pokemon.getInfo()
    const card = document.createElement('div')

    card.appendChild(this._createHeader(pokemon))
    card.appendChild(this._createContent(pokemon))

    return card
  }

  _createHeader(pokemon) {
    const header = document.createElement('div')
    header.className = 'pokemon-card__header'

    const name = document.createElement('h2')
    name.className = 'pokemon-card__name'
    name.textContent = pokemon.name
    header.appendChild(name)

    const imageContainer = document.createElement('div')
    imageContainer.className = 'pokemon-card__image-container'
    
    const img = document.createElement('img')
    img.className = 'pokemon-card__image'
    img.src = pokemon.image
    img.alt = pokemon.name
    img.loading = 'lazy'
    imageContainer.appendChild(img)

    // TODO: create funct add form span content
    const span = document.createElement('span')
    span.className = 'pokemon-card__image-label'
    span.textContent = pokemon.type
    const typeColor = this.styleStrategy.getTypeColor(pokemon.type)
    span.style.backgroundColor = typeColor

    header.appendChild(imageContainer)
    header.appendChild(span)
    return header
  }

  _createContent(pokemon) {
    const content = document.createElement('div')
    content.className = 'pokemon-card__content'

    if (this.card.showDetail) {
      content.appendChild(this._createTypeElement(pokemon.type))
    }

    return content
  }

  _createInfoElement(type) {
    return null
  }
}

export default PokemonCardBuilder