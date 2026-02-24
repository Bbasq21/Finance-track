import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExpenseList } from "./ExpenseList";
import {
  renderWithContext,
  MOCK_EXPENSES,
  mockUseExpensesValues,
} from "../../test-utils";

describe("ExpenseList Component", () => {
  it("should display a loading spinner when loading is true (Functionality)", () => {
    renderWithContext(<ExpenseList filteredExpenses={MOCK_EXPENSES} />, {
      providerValue: { loading: true },
    });

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("should display an error message if error exists (Security / Boundary)", () => {
    const errorMessage = "Error de red crítico";
    renderWithContext(<ExpenseList filteredExpenses={MOCK_EXPENSES} />, {
      providerValue: { error: errorMessage },
    });

    // Verify it doesn't crash and renders the error
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render the empty state when filtered array is empty", () => {
    renderWithContext(<ExpenseList filteredExpenses={[]} />);
    expect(
      screen.getByText(/No se encontraron gastos. ¡Agrega uno para empezar!/i),
    ).toBeInTheDocument();
  });

  it("should render a paginated list of expenses (Functionality)", () => {
    renderWithContext(<ExpenseList filteredExpenses={MOCK_EXPENSES} />);

    // Should render all 4 mock items (since items per page = 5)
    expect(screen.getByText("Gasolina")).toBeInTheDocument();
    expect(screen.getByText("Mercado")).toBeInTheDocument();
    expect(screen.getByText("Cena")).toBeInTheDocument();
    expect(screen.getByText("Cine")).toBeInTheDocument();
  });

  it("should ask for confirmation before deleting an expense (Security)", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => false);

    renderWithContext(<ExpenseList filteredExpenses={MOCK_EXPENSES} />);

    // Clicking the delete button of the first item
    const deleteButtons = screen.getAllByTitle("Eliminar");
    fireEvent.click(deleteButtons[0]);

    // Should show confirm prompt
    expect(confirmSpy).toHaveBeenCalledWith(
      "¿Estás seguro de que deseas eliminar este gasto?",
    );

    // User cancelled (mocked as false), so removeExpense should NOT be called
    expect(mockUseExpensesValues.removeExpense).not.toHaveBeenCalled();

    // Now user confirms
    confirmSpy.mockImplementation(() => true);
    fireEvent.click(deleteButtons[0]);

    // removeExpense should be called with the first item's ID
    expect(mockUseExpensesValues.removeExpense).toHaveBeenCalledWith(
      MOCK_EXPENSES[0].id,
    );

    confirmSpy.mockRestore();
  });

  it("should open edit modal on edit button click (Functionality)", () => {
    renderWithContext(<ExpenseList filteredExpenses={MOCK_EXPENSES} />);

    const editButtons = screen.getAllByTitle("Editar");
    fireEvent.click(editButtons[0]);

    // Edit modal should be rendered with the header text
    expect(screen.getByText("Editar Gasto")).toBeInTheDocument();
    expect(
      screen.getByText("Actualiza los detalles de tu gasto"),
    ).toBeInTheDocument();
  });
});
