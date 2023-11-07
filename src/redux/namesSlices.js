import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  names: [],
  error: null,
};

const namesSlice = createSlice({
  name: 'names',
  initialState,
  reducers: {
    addName: (state, action) => {
      state.names.push({ name: action.payload }); // Agrega el nombre como objeto con la propiedad "name"
    },
    getNames: (state, action) => {
      state.names = action.payload;
      state.error = null;
    },
    getNamesError: (state, action) => {
      state.names = [];
      state.error = action.payload;
    },
    addAssignedExpenses: (state, action) => {
      const { name, expenses } = action.payload;
      const nameIndex = state.names.findIndex((n) => n.name === name);

      if (nameIndex !== -1) {
        // Si el nombre ya existe, asigna los gastos a ese nombre
        state.names[nameIndex].assignedExpenses = expenses;
      } else {
        // Si el nombre no existe, crea un nuevo objeto de nombre con los gastos asignados
        state.names.push({ name, assignedExpenses: expenses });
      }
    },
    addExpenseToName: (state, action) => {
      const { name, expense } = action.payload;
      const nameIndex = state.names.findIndex((n) => n.name === name);
    
      if (nameIndex !== -1) {
        // Si el nombre ya existe, crea un nuevo objeto de nombre con el gasto asignado
        state.names[nameIndex] = {
          ...state.names[nameIndex],
          assignedExpenses: [...state.names[nameIndex].assignedExpenses, expense],
        };
      } else {
        // Si el nombre no existe, crea un nuevo objeto de nombre con el gasto asignado
        state.names.push({ name, assignedExpenses: [expense] });
      }
    },
    removeName: (state, action) => {
      state.names = state.names.filter((name) => name.id !== action.payload);
    }
    
  },
});

export const { addName, getNames, getNamesError, addAssignedExpenses, addExpenseToName, removeName } = namesSlice.actions;

export default namesSlice.reducer;
