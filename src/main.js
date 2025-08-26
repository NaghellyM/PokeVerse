import { AppController } from "./core/AppController.js";

/**
 * Punto de entrada principal de la aplicación
 * Inicializa el controlador principal cuando el DOM está listo
 */
document.addEventListener("DOMContentLoaded", () => {
  try {
    new AppController();
  } catch (error) {
    console.error("Error inicializando la aplicación:", error);
  }
});
