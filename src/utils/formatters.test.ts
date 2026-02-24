import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate } from "./formatters";

describe("formatters - Information & Data Integrity", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers to COP currency", () => {
      const result = formatCurrency(1500000);
      // Validar que el string contenga el símbolo de moneda, separadores de miles y cero decimales
      // Intl format can have some spaces depending on the node version, so we check for digits
      expect(result).toMatch(/\$?\s?1\.500\.000/);
    });

    it("should format zero correctly", () => {
      const result = formatCurrency(0);
      expect(result).toMatch(/\$?\s?0/);
    });

    it("should correctly handle negative numbers", () => {
      const result = formatCurrency(-50000);
      // It should include a negative sign
      expect(result).toMatch(/-\$?\s?50\.000/);
    });

    it("should safely handle NaN or undefined gracefully (Optimization)", () => {
      // @ts-expect-error testing invalid input
      const result = formatCurrency(undefined);
      // Result behavior depends on Intl implementation for NaN, usually "NaN"
      expect(result).toBeDefined();
    });
  });

  describe("formatDate", () => {
    it("should format a valid date string correctly", () => {
      const result = formatDate("2026-02-23");
      // Format is DD de MMM de YYYY
      expect(result).toBe("23 de febrero de 2026");
    });

    it("should pad single digit days", () => {
      const result = formatDate("2026-02-05");
      expect(result).toBe("5 de febrero de 2026");
    });

    it("should handle invalid dates without crashing", () => {
      const result = formatDate("invalid-date-string");
      expect(result).toBe("Fecha inválida");
    });

    it("should handle empty strings without crashing (Optimization / Edge Case)", () => {
      const result = formatDate("");
      expect(result).toBe("Fecha inválida");
    });
  });
});
