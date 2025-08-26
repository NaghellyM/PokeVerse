class Pokemon {
  constructor(id, name, image, type) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.type = type;
  }
  get stats() {
    if (!this._pokemonData || this._pokemonData.stats) {
      return null;
    }
    const statsType = {
      hp: "vida",
      attack: "ataque",
      defense: "defensa",
      "special-attack": "ataqueEspecial",
      "special-defense": "defensaEspecial",
      speed: "velocidad",
    };

    const stats = {};
    this._pokemonData.stats.forEach((stat) => {
      const translated = statsType[stat.stat.name];
      if (translated) {
        stats[translated] = stat.base_stat;
      }
    });
    return stats;
  }
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      type: this.type,
    };
  }

  isValid() {
    return this.id && this.name && this.image && this.type;
  }
}

export default Pokemon;
