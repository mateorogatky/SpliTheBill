import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    completeExpense: (state, action) => {
      // Aquí puedes implementar la lógica para marcar un gasto como completado
      const expenseToComplete = state.expenses.find(expense => expense.id === action.payload);
      if (expenseToComplete) {
        expenseToComplete.completed = true;
      }
    },
    deleteExpense: (state, action) => {
      // Aquí puedes implementar la lógica para eliminar un gasto
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
    getExpenses: (state, action) => {
      // Actualiza el estado con los gastos recibidos exitosamente
      state.expenses = action.payload;
    },
    getExpensesError: (state, action) => {
      // Lógica para manejar errores al obtener gastos
      // Puedes manejar errores de la forma que prefieras aquí
    },
    decrementCount: (state, action) => {
      const { expenseId } = action.payload;
      const expense = state.expenses.find((e) => e.id === expenseId);

      if (expense) {
        if (expense.count > 0) {
          expense.count -= 1;
        }
      }
    },
  },
});

export const {
  addExpense,
  completeExpense,
  deleteExpense,
  getExpenses,
  getExpensesError,
  decrementCount
} = expensesSlice.actions;

export default expensesSlice.reducer;
