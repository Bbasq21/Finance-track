import { describe, it, expect } from "vitest";
import { filterExpenses } from "./filters";
import { MOCK_EXPENSES } from "../test-utils";

describe("filters - Functionality & Data Integrity", () => {
  it("should return all expenses when no filters are applied", () => {
    const result = filterExpenses(MOCK_EXPENSES, "", "", "");
    expect(result).toHaveLength(4);
    expect(result).toEqual(MOCK_EXPENSES);
  });

  it("should filter correctly by category ('Comida')", () => {
    const result = filterExpenses(MOCK_EXPENSES, "Comida", "", "");
    expect(result).toHaveLength(2);
    expect(result.every((exp) => exp.category === "Comida")).toBe(true);
  });

  it("should return empty array if category does not exist", () => {
    const result = filterExpenses(MOCK_EXPENSES, "Salud", "", "");
    expect(result).toHaveLength(0);
  });

  it("should filter correctly by start date only", () => {
    const result = filterExpenses(MOCK_EXPENSES, "", "2026-02-22", "");
    expect(result).toHaveLength(2); // 22 and 23
    expect(result.map((e) => e.date)).toEqual(["2026-02-22", "2026-02-23"]);
  });

  it("should filter correctly by end date only", () => {
    const result = filterExpenses(MOCK_EXPENSES, "", "", "2026-02-21");
    expect(result).toHaveLength(2); // 20 and 21
    expect(result.map((e) => e.date)).toEqual(["2026-02-20", "2026-02-21"]);
  });

  it("should filter correctly by a specific date range", () => {
    const result = filterExpenses(
      MOCK_EXPENSES,
      "",
      "2026-02-21",
      "2026-02-22",
    );
    expect(result).toHaveLength(2);
  });

  it("should filter correctly combining category and dates", () => {
    const result = filterExpenses(
      MOCK_EXPENSES,
      "Comida",
      "2026-02-22", // solo la cena
      "2026-02-23",
    );
    expect(result).toHaveLength(1);
    expect(result[0].description).toBe("Cena");
  });

  it("should handle empty arrays gracefully (Optimization)", () => {
    const result = filterExpenses([], "Comida", "2026-01-01", "2026-12-31");
    expect(result).toHaveLength(0);
  });
});
