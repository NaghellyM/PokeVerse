import PokemonCardFactory from './PokemonCardFactory.js'

class PokemonCardManager {
  constructor(containerSelector, styleStrategy) {
    this.container = document.querySelector(containerSelector)
    this.factory = new PokemonCardFactory(styleStrategy)
    this.cards = new Map()
    
    if (!this.container) {
      throw new Error(`Container not found: ${containerSelector}`)
    }
  }

  addDetailedCard(pokemon) {
    this._addCard(pokemon, 'detailed')
  }

  addMinimalCard(pokemon) {
    this._addCard(pokemon, 'minimal')
  }

  _addCard(pokemon, type) {
    if (!pokemon.isValid()) {
      console.warn('Pokemon is not valid:', pokemon)
      return null
    }
    console.log('Adding card of type:', type)
    let card
    switch (type) {
      case 'detailed':
        card = this.factory.createDetailedCard(pokemon)
        break
      case 'minimal':
        card = this.factory.createMinimalCard(pokemon)
        break
      default:
        throw new Error(`Unknown card type: ${type}`)
    }
    // TODO: Install UUII and remove logic form here
    const cardId = `pokemon-${Date.now()}-${Math.random()}`
    card.element.setAttribute('data-pokemon-id', cardId)
    
    this.container.appendChild(card.element)
    this.cards.set(cardId, card)
  }

  removeCard(cardId) {
    if (this.cards.has(cardId)) {
      const card = this.cards.get(cardId)
      card.element.remove()
      this.cards.delete(cardId)
      return true
    }
    return false
  }

  clearAllCards() {
    this.cards.forEach((card, id) => {
      card.element.remove()
    })
    this.cards.clear()
  }

  getCard(cardId) {
    return this.cards.get(cardId)
  }
}

export default PokemonCardManager