import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ExpenseDetails({ expense }) {
  return (
    <View style={styles.container}>
      <Text style={styles.detail}>{`Expense Name: ${expense.name}`}</Text>
      <Text style={styles.detail}>{`Expense Price: $${expense.price}`}</Text>
      <Text style={styles.detail}>{`Expense Count: ${expense.count}`}</Text>
      {/* Puedes agregar más detalles si es necesario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
  },
});

export default ExpenseDetails;
