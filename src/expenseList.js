import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getExpenses, getExpensesError, deleteExpense } from "./redux/expensesSlices";

function ExpenseList() {
  const expenses = useSelector((state) => state.expenses.expenses);
  console.log("expense", expenses)
  const error = useSelector((state) => state.expenses.error);
  const dispatch = useDispatch();

  const fetchExpenses = () => {
    axios
      .get("http://192.168.1.164:3000/api/expenses")
      .then((response) => {
        dispatch(getExpenses(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener los gastos:", error);
        dispatch(getExpensesError(error));
      });
  };
  
  const handleDeleteExpense = (name) => {
    axios
      .delete(`http://192.168.1.164:3000/api/expenses/${name}`)
      .then(() => {
        console.log("Gasto eliminado con éxito");
        // Actualiza la lista de gastos después de eliminar
        fetchExpenses();
  
        // Despacha la acción para eliminar el gasto de Redux
        dispatch(deleteExpense(name));
      })
      .catch((error) => {
        console.error("Error al eliminar el gasto:", error);
      });
  };
  

  useEffect(() => {
    fetchExpenses();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseDetail}>{`${item.name}`}</Text>
              <Text style={styles.expenseDetail}>{`$${item.price}`}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteExpense(item.name)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Aumenta el valor del padding
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10, // Aumenta el valor del padding
    borderRadius: 5,
    marginBottom: 10, // Aumenta el valor del marginBottom
  },
  expenseDetail: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    padding: 10, // Aumenta el valor del padding
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#ffffff",
  },
});

export default ExpenseList;

