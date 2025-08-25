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
    this._validateCard();
    const cardElement = this._createCardElement();
    const result = this._buildResult(cardElement);
    this.reset();
    return result;
  }

  _validateCard() {
    if (!this.card.pokemon) {
      throw new Error("Pokemon is required to build a card");
    }
  }

  _buildResult(cardElement) {
    return { ...this.card, element: cardElement };
  }

  _createCardElement() {
    const pokemon = this.card.pokemon.getInfo();
    const card = this._createCardContainer();
    card.appendChild(this._createHeader(pokemon));
    card.appendChild(this._createContent(pokemon));
    return card;
  }

  _createCardContainer() {
    const card = document.createElement("div");
    card.style.border = "1px solid #0253";
    card.style.borderRadius = ".5em";
    card.style.overflow = "hidden";
    card.style.width = "200px";
    card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    return card;
  }

  _createHeader(pokemon) {
    const header = document.createElement("div");
    header.className = "pokemon-card__header";

    header.appendChild(this._createNameElement(pokemon));
    header.appendChild(this._createIdElement(pokemon));
    header.appendChild(this._createImageContainer(pokemon));
    header.appendChild(this._createTypeLabel(pokemon));

    return header;
  }

  _createNameElement(pokemon) {
    const typeColor = this.styleStrategy.getTypeColor(pokemon.type);
    const lighterTypeColor = this.styleStrategy.lightenColor(typeColor, 0.2);

    const name = document.createElement("h2");
    name.className = "pokemon-card__name";
    name.textContent = pokemon.name;

    name.style.background = `linear-gradient(to right, ${typeColor}, ${lighterTypeColor})`;
    name.style.color = "#222";
    name.style.padding = "0.5em";

    return name;
  }
  _createIdElement(pokemon) {
    const typeColor = this.styleStrategy.getTypeColor(pokemon.type);
    const lighterTypeColor = this.styleStrategy.lightenColor(typeColor, 0.2);

    const id = document.createElement("h2");
    id.className = "pokemon-card__id";
    id.textContent = `#${pokemon.id}`;

    id.style.background = `linear-gradient(to right, ${typeColor}, ${lighterTypeColor})`;
    id.style.color = "#222";

    return id;
  }

  _createImageContainer(pokemon) {
    const imageContainer = document.createElement("div");
    imageContainer.className = "pokemon-card__image-container";
    imageContainer.style.display = "flex";
    imageContainer.style.justifyContent = "center";
    imageContainer.style.alignItems = "center";
    imageContainer.style.height = "150px";
    imageContainer.appendChild(this._createImage(pokemon));
    return imageContainer;
  }

  _createImage(pokemon) {
    const img = document.createElement("img");
    img.className = "pokemon-card__image";
    img.src = pokemon.image;
    img.alt = pokemon.name;
    img.loading = "lazy";
    img.style.maxWidth = "140px";
    img.style.maxHeight = "140px";
    img.style.objectFit = "contain";
    return img;
  }

  _createTypeLabel(pokemon) {
    const typeColor = this.styleStrategy.getTypeColor(pokemon.type);

    const span = document.createElement("span");
    span.className = "pokemon-card__image-label";
    span.textContent = pokemon.type;
    span.style.backgroundColor = typeColor;

    return span;
  }

  _createContent(pokemon) {
    const content = document.createElement("div");
    content.className = "pokemon-card__content";

    if (this.card.showDetail) {
      content.appendChild(this._createTypeElement(pokemon.type));
    }

    return content;
  }

  _createTypeElement(type) {
    return null;
  }
}

export default PokemonCardBuilder;
