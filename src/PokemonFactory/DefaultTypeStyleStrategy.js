class DefaultTypeStyleStrategy {
  constructor() {
    this.typeColors = {
      fire: '#ff6b6b',
      water: '#4ecdc4',
      grass: '#51cf66',
      electric: '#ffd43b',
      psychic: '#e599f7',
      ice: '#74c0fc',
      dragon: '#845ef7',
      dark: '#495057',
      fighting: '#f08c00',
      poison: '#be4bdb',
      ground: '#f59f00',
      flying: '#91a7ff',
      bug: '#8ce99a',
      rock: '#868e96',
      ghost: '#9775fa',
      steel: '#adb5bd',
      normal: '#ced4da'
    }
  }

  getTypeColor(type) {
    return this.typeColors[type.toLowerCase()] || '#868e96'
  }
}

export default DefaultTypeStyleStrategy