class DefaultTypeStyleStrategy {
  constructor() {
    this.typeColors = {
      fire: "#ff6b6b",
      water: "#4ecdc4",
      grass: "#51cf66",
      electric: "#ffd43b",
      psychic: "#e599f7",
      ice: "#74c0fc",
      dragon: "#845ef7",
      dark: "#495057",
      fighting: "#f08c00",
      poison: "#be4bdb",
      ground: "#f59f00",
      flying: "#91a7ff",
      bug: "#8ce99a",
      rock: "#868e96",
      ghost: "#9775fa",
      steel: "#adb5bd",
      normal: "#ced4da",
      error404: "#637269ff"
    };
  }

  getTypeColor(type) {
    return this.typeColors[type.toLowerCase()] || this.typeColors.error404;
  }

  lightenColor(hex, percent) {
    hex = hex.replace(/^#/, "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }
}

export default DefaultTypeStyleStrategy;
