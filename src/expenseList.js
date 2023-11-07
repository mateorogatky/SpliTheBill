import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getExpenses, getExpensesError } from "./redux/expensesSlices";

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
    padding: 20,
    backgroundColor: "white",
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
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  expenseDetail: {
    fontSize: 16,
  },
});

export default ExpenseList;
