import { POKEMON_STASTS } from "../utils/constants.js";
import DefaultTypeStyleStrategy from "./DefaultTypeStyleStrategy.js";

/**
 * Constructor de tarjetas de Pokémon
 * Utiliza el patrón Builder para crear tarjetas de Pokémon con diferentes configuraciones
 * Permite personalizar la visualización de detalles y estilos
 */
class PokemonCardBuilder {
  constructor() {
    this.styleStrategy = new DefaultTypeStyleStrategy();
    this.reset();
  }

  // Reinicia el estado del constructor
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

  // Construye la tarjeta y devuelve el objeto con la tarjeta y su elemento DOM
  build() {
    this._validateCard();
    const cardElement = this._createCardElement();
    const result = this._buildResult(cardElement);
    this.reset();
    return result;
  }

  // Valida que la tarjeta tenga los datos necesarios antes de construirla
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

    if (this.card.showDetail) {
      card.style.width = "300px";
      card.style.marginBottom = "2rem";
      const movesElement = this._createMoveList(this.card.pokemon.moves);
      const statsElement = this._createStatsElement(this.card.pokemon.stats);
      card.appendChild(movesElement);
      card.appendChild(statsElement);
    }
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
    return content;
  }

  // Crea la sección de estadísticas con un diseño de cuadrícula
  _createStatsElement(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.className = "pokemon-card__stats";
    statsContainer.style.padding = "0.75em";
    statsContainer.style.backgroundColor = "#f8f9fa";
    statsContainer.style.borderTop = "1px solid #dee2e6";

    const title = document.createElement("h3");
    title.textContent = "Estadísticas";
    title.style.margin = "0 0 0.5em 0";
    title.style.fontSize = "0.9em";
    title.style.fontWeight = "bold";
    title.style.color = "#495057";
    title.style.textTransform = "uppercase";
    title.style.letterSpacing = "0.5px";
    statsContainer.appendChild(title);

    const statsGrid = document.createElement("div");
    statsGrid.style.display = "grid";
    statsGrid.style.gridTemplateColumns = "1fr 1fr";
    statsGrid.style.gap = "0.5em";
    statsGrid.style.fontSize = "0.8em";

    stats.forEach((stat) => {
      const statItem = document.createElement("div");
      statItem.className = "pokemon-card__stat-item";
      statItem.style.display = "flex";
      statItem.style.flexDirection = "column";
      statItem.style.alignItems = "center";
      statItem.style.padding = "0.5em";
      statItem.style.backgroundColor = "white";
      statItem.style.borderRadius = "6px";
      statItem.style.border = "1px solid #e9ecef";
      statItem.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";

      const nameElem = document.createElement("span");
      nameElem.className = "pokemon-card__stat-name";
      nameElem.textContent =
        POKEMON_STASTS[stat.name.replace("-", "_")] || stat.name;

      nameElem.style.fontWeight = "600";
      nameElem.style.color = "#6c757d";
      nameElem.style.fontSize = "0.75em";
      nameElem.style.textAlign = "center";
      nameElem.style.marginBottom = "0.3em";
      nameElem.style.textTransform = "uppercase";
      nameElem.style.letterSpacing = "0.3px";

      const valueElem = document.createElement("span");
      valueElem.className = "pokemon-card__stat-value";
      valueElem.textContent = stat.value;
      valueElem.style.fontWeight = "bold";
      valueElem.style.color = this._getStatColor(stat.value);
      valueElem.style.fontSize = "1.1em";
      valueElem.style.marginBottom = "0.3em";

      const statBar = document.createElement("div");
      statBar.style.width = "100%";
      statBar.style.height = "4px";
      statBar.style.backgroundColor = "#e9ecef";
      statBar.style.borderRadius = "2px";
      statBar.style.overflow = "hidden";

      const statFill = document.createElement("div");
      statFill.style.height = "100%";
      statFill.style.backgroundColor = this._getStatColor(stat.value);
      statFill.style.width = `${Math.min((stat.value / 150) * 100, 100)}%`;
      statFill.style.borderRadius = "2px";
      statFill.style.transition = "width 0.3s ease";

      statBar.appendChild(statFill);

      statItem.appendChild(nameElem);
      statItem.appendChild(valueElem);
      statItem.appendChild(statBar);
      statsGrid.appendChild(statItem);
    });

    statsContainer.appendChild(statsGrid);
    return statsContainer;
  }

  // Determina el color de la estadística basado en su valor
  _getStatColor(value) {
    if (value >= 100) return "#28a745";
    if (value >= 70) return "#ffc107";
    if (value >= 40) return "#fd7e14";
    return "#dc3545";
  }

  // Crea la lista de movimientos en un diseño de cuadrícula
  _createMoveList(moves) {
    const movesContainer = document.createElement("div");
    movesContainer.className = "pokemon-card__moves";
    movesContainer.style.padding = "0.75em";
    movesContainer.style.backgroundColor = "#f8f9fa";
    movesContainer.style.borderTop = "1px solid #dee2e6";

    const title = document.createElement("h3");
    title.textContent = "Movimientos";
    title.style.margin = "0 0 0.5em 0";
    title.style.fontSize = "0.9em";
    title.style.fontWeight = "bold";
    title.style.color = "#495057";
    title.style.textTransform = "uppercase";
    title.style.letterSpacing = "0.5px";
    movesContainer.appendChild(title);

    const movesGrid = document.createElement("div");
    movesGrid.style.display = "grid";
    movesGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(80px, 1fr))";
    movesGrid.style.gap = "0.4em";

    moves.slice(0, 6).forEach((move) => {
      const moveChip = document.createElement("div");
      moveChip.className = "pokemon-card__move-chip";
      moveChip.textContent = move
        .replace("-", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      moveChip.style.display = "flex";
      moveChip.style.alignItems = "center";
      moveChip.style.justifyContent = "center";
      moveChip.style.padding = "0.4em 0.6em";
      moveChip.style.backgroundColor = "white";
      moveChip.style.color = "#495057";
      moveChip.style.border = "1px solid #6c757d";
      moveChip.style.borderRadius = "8px";
      moveChip.style.fontSize = "0.75em";
      moveChip.style.fontWeight = "600";
      moveChip.style.textTransform = "capitalize";
      moveChip.style.textAlign = "center";
      moveChip.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
      moveChip.style.transition = "all 0.2s ease";
      moveChip.style.cursor = "default";

      moveChip.addEventListener("mouseenter", () => {
        moveChip.style.backgroundColor = "#6c757d";
        moveChip.style.color = "white";
        moveChip.style.transform = "translateY(-1px)";
      });

      moveChip.addEventListener("mouseleave", () => {
        moveChip.style.backgroundColor = "white";
        moveChip.style.color = "#495057";
        moveChip.style.transform = "translateY(0)";
      });

      movesGrid.appendChild(moveChip);
    });

    movesContainer.appendChild(movesGrid);
    return movesContainer;
  }
}

export default PokemonCardBuilder;
