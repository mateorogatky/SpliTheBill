// Acción para agregar un nuevo gasto
import axios from "axios";
import { useDispatch } from 'react-redux';

/* ----------------------  EXPENSES  ------------------------------- */
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE", // Coincide con el tipo definido en el reductor
  payload: expense,
});

// Acción para marcar un gasto como completado
export const completeExpense = (expenseId) => ({
  type: "COMPLETE_EXPENSE", // Coincide con el tipo definido en el reductor
  payload: expenseId,
});

// Acción para eliminar un gasto
export const deleteExpense = (expenseId) => ({
  type: "DELETE_EXPENSE", // Coincide con el tipo definido en el reductor
  payload: expenseId,
});
//accion para traer los gastos
export const getExpenses = () => {
  return async (dispatch) => {
    try {
      console.log("Llamando a la acción getExpenses");
      const response = await axios.get(
        "http://192.168.1.164:3000/api/expenses"
      );
      const expenses = response.data.map((expense, index) => ({
        ...expense,
        id: index + 1, // Asigna un identificador único basado en el índice
      }));
      console.log("Devuelve", expenses); // Asegúrate de que los datos actualizados se impriman en la consola
      dispatch({ type: "GET_EXPENSES_SUCCESS", expenses });
    } catch (error) {
      if (error.response) {
        console.error(
          "Error en la respuesta del servidor:",
          error.response.data
        );
      } else if (error.request) {
        console.error("Error en la solicitud:", error.request);
      } else {
        console.error("Error al configurar la solicitud:", error.message);
      }
      dispatch({ type: "GET_EXPENSES_FAILURE", error: error.message });
    }
  };
};


/* ------------------------  USERS   ----------------------------------- */



// ...

export const getNames = () => {
  const dispatch = useDispatch(); // Obtén la función dispatch

  return async () => {
    try {
      console.log("Llamando a la acción getNames");
      const response = await axios.get("http://192.168.1.164:3000/api/names");
      const names = response.data;
      console.log("Nombres recuperados:", names);

      // Usa dispatch para despachar la acción con los nombres
      dispatch({ type: "GET_NAMES_SUCCESS", names });
    } catch (error) {
      // En caso de error, puedes despachar una acción de error
      dispatch({ type: "GET_NAMES_ERROR", error });
    }
  };
};



