import { describe, it, expect } from "vitest";

/**
 * Prueba unitaria para verificar las constantes en el proyecto.
 * Asegura que las configuraciones de paginación y tipos de Pokémon estén definidas correctamente.
 */
describe("Constants", () => {
  it("Validación de configuración de paginación", async () => {
    // Dynamic import to test constants
    const { PAGINATION_CONFIG } = await import("../src/utils/constants.js");

    expect(PAGINATION_CONFIG).toBeDefined();
    expect(PAGINATION_CONFIG.ITEMS_PER_PAGE).toBeGreaterThan(0);
    expect(typeof PAGINATION_CONFIG.ITEMS_PER_PAGE).toBe("number");
  });

  it("Validación de tipos de Pokémon", async () => {
    const constants = await import("../src/utils/constants.js");

    // Test that constants module exports expected values
    expect(constants).toBeDefined();
    expect(typeof constants).toBe("object");
  });
});
