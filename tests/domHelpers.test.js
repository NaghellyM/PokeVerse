import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  createButton,
  clearContainer,
  toggleElement,
} from "../src/utils/domHelpers.js";

// Mock metodos de DOM
Object.defineProperty(global, "document", {
  value: {
    createElement: vi.fn(),
    getElementById: vi.fn(),
  },
});

/**
 * Pruebas unitarias para funciones de manipulación del DOM.
 * Verifica la creación de botones, limpieza de contenedores y visibilidad de elementos.
 */
describe("DOM Helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createButton", () => {
    it("should create a button with text and classes", () => {
      const mockButton = {
        innerText: "",
        classList: { add: vi.fn() },
        addEventListener: vi.fn(),
      };

      document.createElement.mockReturnValue(mockButton);

      const button = createButton("Click me", ["btn", "primary"]);

      expect(document.createElement).toHaveBeenCalledWith("button");
      expect(mockButton.innerText).toBe("Click me");
      expect(mockButton.classList.add).toHaveBeenCalledWith("btn");
      expect(mockButton.classList.add).toHaveBeenCalledWith("primary");
    });

    it("should add click handler when provided", () => {
      const mockButton = {
        innerText: "",
        classList: { add: vi.fn() },
        addEventListener: vi.fn(),
      };

      document.createElement.mockReturnValue(mockButton);
      const clickHandler = vi.fn();

      createButton("Click me", [], clickHandler);

      expect(mockButton.addEventListener).toHaveBeenCalledWith(
        "click",
        clickHandler,
      );
    });

    it("should work without classes or click handler", () => {
      const mockButton = {
        innerText: "",
        classList: { add: vi.fn() },
        addEventListener: vi.fn(),
      };

      document.createElement.mockReturnValue(mockButton);

      const button = createButton("Simple button");

      expect(mockButton.innerText).toBe("Simple button");
      expect(mockButton.classList.add).not.toHaveBeenCalled();
      expect(mockButton.addEventListener).not.toHaveBeenCalled();
    });
  });

  describe("clearContainer", () => {
    it("should clear container innerHTML when element exists", () => {
      const mockContainer = { innerHTML: "some content" };
      document.getElementById.mockReturnValue(mockContainer);

      clearContainer("test-container");

      expect(document.getElementById).toHaveBeenCalledWith("test-container");
      expect(mockContainer.innerHTML).toBe("");
    });

    it("should handle non-existent container gracefully", () => {
      document.getElementById.mockReturnValue(null);

      expect(() => clearContainer("non-existent")).not.toThrow();
      expect(document.getElementById).toHaveBeenCalledWith("non-existent");
    });
  });

  describe("toggleElement", () => {
    it("should show element when show is true", () => {
      const mockElement = { style: { display: "none" } };
      document.getElementById.mockReturnValue(mockElement);

      toggleElement("test-element", true);

      expect(document.getElementById).toHaveBeenCalledWith("test-element");
      expect(mockElement.style.display).toBe("flex");
    });

    it("should hide element when show is false", () => {
      const mockElement = { style: { display: "flex" } };
      document.getElementById.mockReturnValue(mockElement);

      toggleElement("test-element", false);

      expect(mockElement.style.display).toBe("none");
    });

    it("should handle non-existent element gracefully", () => {
      document.getElementById.mockReturnValue(null);

      expect(() => toggleElement("non-existent", true)).not.toThrow();
    });
  });
});
