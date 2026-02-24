import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ExpenseForm } from "./ExpenseForm";
import { renderWithContext, mockUseExpensesValues } from "../../test-utils";

describe("ExpenseForm Component", () => {
  it("should prevent submission if amount is zero or date is missing (Security / Validation)", async () => {
    const onCloseSpy = vi.fn();
    renderWithContext(<ExpenseForm onClose={onCloseSpy} />);

    // Try submitting the form natively
    const saveButton = screen.getByText(/Guardar Gasto/i);
    fireEvent.click(saveButton);

    // addExpense should NOT be called due to native HTML validation (required fields) on empty inputs
    expect(mockUseExpensesValues.addExpense).not.toHaveBeenCalled();

    // Fill in 0 for amount and a date
    const amountInput = screen.getByPlaceholderText("0.00");
    fireEvent.change(amountInput, { target: { value: "0" } });

    // The browser form constraint 'min="1"' will block the submit.
    // RTL fireEvent.click on submit button doesn't fully execute native form validation blocking on 'min="1"',
    // but we have a manual JS check in `handleSubmit`: `if (!amount || !date) return;`.
    fireEvent.click(saveButton);

    // Expect not to submit since amount evaluates to 0 (falsy)
    await waitFor(() => {
      expect(mockUseExpensesValues.addExpense).not.toHaveBeenCalled();
    });
  });

  it("should successfully call addExpense with valid data and close modal (Functionality)", async () => {
    const onCloseSpy = vi.fn();
    renderWithContext(<ExpenseForm onClose={onCloseSpy} />);

    // Fill the real inputs
    const amountInput = screen.getByPlaceholderText("0.00");
    fireEvent.change(amountInput, { target: { value: "15000" } });

    // The category is a select
    const categorySelect = screen.getByDisplayValue("Comida");
    fireEvent.change(categorySelect, { target: { value: "Transporte" } });

    // Assuming the date input doesn't have a specific placeholder or label role that's perfectly accessible in the UI
    // due to DOM nesting, we can find it via label or type.
    // Textarea is by placeholder
    const descInput = screen.getByPlaceholderText(/Almuerzo con el equipo/);
    fireEvent.change(descInput, { target: { value: "Uber a la oficina" } });

    // Date input might not have role="textbox", let's find it by type
    // Since component has: <input type="date" ... />
    const dateInput = document.querySelector(
      'input[type="date"]',
    ) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2026-02-24" } });

    // Submit original form
    const saveButton = screen.getByText(/Guardar Gasto/i);
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUseExpensesValues.addExpense).toHaveBeenCalledWith({
        amount: 15000,
        category: "Transporte",
        date: "2026-02-24",
        description: "Uber a la oficina",
      });
      expect(onCloseSpy).toHaveBeenCalled();
    });
  });

  it("should close the modal when 'Cancelar' is clicked (Functionality)", () => {
    const onCloseSpy = vi.fn();
    renderWithContext(<ExpenseForm onClose={onCloseSpy} />);

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(onCloseSpy).toHaveBeenCalled();
  });
});
