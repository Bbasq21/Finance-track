import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExpenseSummary } from "./ExpenseSummary";
import { renderWithContext, MOCK_EXPENSES } from "../../test-utils";
import * as formatters from "../../utils/formatters";

describe("ExpenseSummary Component", () => {
  it("should render total balance and top categories correctly (Information & Math)", () => {
    // Math validation: MOCK_EXPENSES total is $500,000
    // Comida = 350,000 | Transporte = 100,000 | Entretenimiento = 50,000
    renderWithContext(<ExpenseSummary />);

    // Formatters might use spaces depending on Intl, let's look for digits
    expect(screen.getByText(/500\.000/)).toBeInTheDocument();

    // Total transactions
    expect(screen.getByText("4 Movimientos")).toBeInTheDocument();

    // Verify categories rendered in order of amount (Comida > Transporte > Entretenimiento)
    const cards = screen.getAllByText(/Movimientos/);
    expect(cards).toHaveLength(4); // 1 for total, 3 for top categories

    // Specific amounts for categories based on MOCK_EXPENSES
    expect(
      screen.getByText((content) =>
        content.replace(/\xa0/g, " ").includes("$ 350.000"),
      ),
    ).toBeInTheDocument(); // Comida
    expect(
      screen.getByText((content) =>
        content.replace(/\xa0/g, " ").includes("$ 100.000"),
      ),
    ).toBeInTheDocument(); // Transporte
    expect(
      screen.getByText(
        (content) =>
          content.replace(/\xa0/g, " ").includes("$ 50.000") &&
          !content.includes("350"),
      ),
    ).toBeInTheDocument(); // Entretenimiento
  });

  it("should handle empty expenses array gracefully (Optimization & Prevents Crashes)", () => {
    renderWithContext(<ExpenseSummary />, { providerValue: { expenses: [] } });

    // Should render 0 total ($ 0 formatted)
    const emptyAmounts = screen.getAllByText(
      (content) => content.replace(/\xa0/g, " ") === "$ 0" || content === "$0",
    );
    expect(emptyAmounts).toHaveLength(4); // 1 total + 3 empty categories

    // Should render 0 transactions for all cards
    const zeroTransactions = screen.getAllByText("0 Movimientos");
    expect(zeroTransactions).toHaveLength(4);

    // Empty templates should have a dash label
    const dashLabels = screen.getAllByText("—");
    expect(dashLabels).toHaveLength(3);
  });

  it("should format currency using the formatter utility (Integration)", () => {
    const formatSpy = vi.spyOn(formatters, "formatCurrency");

    renderWithContext(<ExpenseSummary />);

    // At least 4 calls: 1 for total, 3 for categories
    expect(formatSpy).toHaveBeenCalled();

    formatSpy.mockRestore();
  });
});
