import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EditExpenseModal } from "./EditExpenseModal";
import {
  renderWithContext,
  MOCK_EXPENSES,
  mockUseExpensesValues,
} from "../../test-utils";

describe("EditExpenseModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize the form with the provided expense data (Information & Integrity)", () => {
    const onCloseSpy = vi.fn();
    const expenseToEdit = MOCK_EXPENSES[0]; // Transporte por 100,000, fecha 2026-02-20, desc: "Gasolina"

    renderWithContext(
      <EditExpenseModal expense={expenseToEdit} onClose={onCloseSpy} />,
    );

    // Initial values should map to the provided prop
    const amountInput = screen.getByDisplayValue("100000");
    expect(amountInput).toBeInTheDocument();

    const categorySelect = screen.getByDisplayValue("Transporte");
    expect(categorySelect).toBeInTheDocument();

    const textareas = screen.getByDisplayValue("Gasolina");
    expect(textareas).toBeInTheDocument();

    const dateInput = document.querySelector(
      'input[type="date"]',
    ) as HTMLInputElement;
    expect(dateInput.value).toBe("2026-02-20");
  });

  it("should submit the edited data via editExpense and close (Functionality)", async () => {
    const onCloseSpy = vi.fn();
    const expenseToEdit = MOCK_EXPENSES[0];

    renderWithContext(
      <EditExpenseModal expense={expenseToEdit} onClose={onCloseSpy} />,
    );

    // Change amount from 100,000 to 120,000
    const amountInput = screen.getByDisplayValue("100000");
    fireEvent.change(amountInput, { target: { value: "120000" } });

    // Submit
    const saveButton = screen.getByText(/Guardar Cambios/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUseExpensesValues.editExpense).toHaveBeenCalledWith(
        expenseToEdit.id,
        {
          amount: 120000,
          category: "Transporte",
          date: "2026-02-20",
          description: "Gasolina",
        },
      );
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });

  it("should prevent submission of invalid data like empty amount (Security)", async () => {
    const onCloseSpy = vi.fn();
    const expenseToEdit = MOCK_EXPENSES[0];

    renderWithContext(
      <EditExpenseModal expense={expenseToEdit} onClose={onCloseSpy} />,
    );

    // Set amount to 0 (invalid) / empty string then submit
    const amountInput = screen.getByDisplayValue("100000");
    fireEvent.change(amountInput, { target: { value: "0" } });

    // Mock editExpense
    const saveButton = screen.getByText(/Guardar Cambios/i);
    fireEvent.click(saveButton);

    // Wait and verify we don't call anything matching 0 (or falsy amount)
    // The test runner might submit 0 because it doesn't block with HTML5 form validation internally in jsdom
    // Let's ensure editExpense is called but ideally we'd add an explicit JS block if we wanted to block 0 entirely.
    // Assuming the application logic accepts it if JS doesn't block it, we verify what actually happens:

    // (Note: in earlier test we observed ExpenseForm blocks 0, but EditExpenseModal doesn't have !amount check!)
    // As QA, this is an excellent edge case. If it fires, it means we lack a JS validation check in EditExpenseModal.

    await waitFor(() => {
      expect(mockUseExpensesValues.editExpense).not.toHaveBeenCalled();
    });
  });
});
