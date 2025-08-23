import DefaultTypeStyleStrategy from "./DefaultTypeStyleStrategy.js";

class PokemonCardBuilder {
  constructor() {
    this.styleStrategy = new DefaultTypeStyleStrategy();
    this.reset();
  }

  reset() {
    this.card = {
      pokemon: null,
      showDetail: false,
    };
    return this;
  }

  setPokemon(pokemon) {
    this.card.pokemon = pokemon;
    return this;
  }

  setShowDetail(show = true) {
    this.card.showDetail = show;
    return this;
  }

  build() {
    if (!this.card.pokemon) {
      throw new Error("Pokemon is required to build a card");
    }

    const cardElement = this._createCardElement();
    const result = { ...this.card, element: cardElement };
    this.reset();
    return result;
  }

  _createCardElement() {
    const pokemon = this.card.pokemon.getInfo();
    const card = document.createElement("div");
    card.style.border = "1px solid #0253";
    card.style.borderRadius = ".5em";
    card.style.overflow = "hidden";
    card.style.width = "200px";
    card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";

    card.appendChild(this._createHeader(pokemon));
    card.appendChild(this._createContent(pokemon));

    return card;
  }

  lightenColor(hex, percent) {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * percent));
    g = Math.min(255, Math.floor(g + (255 - g) * percent));
    b = Math.min(255, Math.floor(b + (255 - b) * percent));

    return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
  }

  _createHeader(pokemon) {
    const typeColor = this.styleStrategy.getTypeColor(pokemon.type);
    const header = document.createElement("div");
    header.className = "pokemon-card__header";

    const lighterTypeColor = this.lightenColor(typeColor, 0.2);
    const name = document.createElement("h2");
    name.className = "pokemon-card__name";
    name.textContent = pokemon.name;
    name.style.background = `linear-gradient(to right, ${typeColor}, ${lighterTypeColor})`;
    name.style.color = "#222";
    name.style.padding = "0.5em";
    header.appendChild(name);

    const imageContainer = document.createElement("div");
    imageContainer.className = "pokemon-card__image-container";

    const img = document.createElement("img");
    img.className = "pokemon-card__image";
    img.src = pokemon.image;
    img.alt = pokemon.name;
    img.loading = "lazy";
    imageContainer.appendChild(img);

    // TODO: create funct add form span content
    const span = document.createElement("span");
    span.className = "pokemon-card__image-label";
    span.textContent = pokemon.type;

    span.style.backgroundColor = typeColor;

    header.appendChild(imageContainer);
    header.appendChild(span);
    return header;
  }

  _createContent(pokemon) {
    const content = document.createElement("div");
    content.className = "pokemon-card__content";

    if (this.card.showDetail) {
      content.appendChild(this._createTypeElement(pokemon.type));
    }

    return content;
  }

  _createInfoElement(type) {
    return null;
  }
}

export default PokemonCardBuilder;
