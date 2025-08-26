/**
 * Utilidades para manipulación del DOM
 * Funciones helper para crear elementos y manejar eventos
 */

/**
 * Crea un elemento button con las clases y texto especificados
 */
export const createButton = (text, classes = [], clickHandler = null) => {
  const button = document.createElement("button");
  button.innerText = text;
  classes.forEach((className) => button.classList.add(className));

  if (clickHandler) {
    button.addEventListener("click", clickHandler);
  }

  return button;
};

/**
 * Limpia el contenido de un contenedor
 */
export const clearContainer = (containerId) => {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = "";
  }
};

/**
 * Muestra u oculta un elemento
 */
export const toggleElement = (elementId, show) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = show ? "block" : "none";
  }
};

/**
 * Crea un contenedor de paginación con botones anterior y siguiente
 */
export const createPaginationContainer = (onPrevious, onNext) => {
  const container = document.createElement("div");
  container.className = "pagination-container";

  const prevButton = createButton(
    "← Anterior",
    ["pagination-btn", "prev-btn"],
    onPrevious,
  );
  const nextButton = createButton(
    "Siguiente →",
    ["pagination-btn", "next-btn"],
    onNext,
  );

  container.appendChild(prevButton);
  container.appendChild(nextButton);

  return container;
};
