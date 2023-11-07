import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addAssignedExpenses } from "./redux/namesSlices";
import ExpenseDetails from "./expenseDetails";
import { decrementCount } from "./redux/expensesSlices";

function AssociateExpense() {
  const names = useSelector((state) => state.names);
  const expenses = useSelector((state) => state.expenses.expenses);

  const dispatch = useDispatch();
  const [canAssignExpenses, setCanAssignExpenses] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedName, setSelectedName] = useState(null);
  const [expensesToAssign, setExpensesToAssign] = useState([]);
  const [assignedExpenses, setAssignedExpenses] = useState([]);
  const [nameExpenseCounts, setNameExpenseCounts] = useState({});

  useEffect(() => {
    setCanAssignExpenses(selectedName && expensesToAssign.length > 0);
  }, [selectedName, expensesToAssign]);

  const handleNameSelection = (name) => {
    // Guarda el estado actual de los contadores de gastos para el nombre seleccionado
    if (selectedName) {
      setNameExpenseCounts((prevCounts) => ({
        ...prevCounts,
        [selectedName.name]: expensesToAssign.reduce((acc, expense) => {
          acc[expense.id] = expense.count;
          return acc;
        }, {}),
      }));
    }
    
    // Restablece los gastos asignados cuando se selecciona otro nombre
    setExpensesToAssign([]);
    setSelectedName(name);
  };

  const handleAssignExpense = (expense) => {
    if (selectedName && expense.count > 0) {
      setExpensesToAssign((prevExpenses) => [...prevExpenses, expense]);
      dispatch(decrementCount({ expenseId: expense.id }));
    }
  };

  const handleAssignExpensesToName = () => {
    if (selectedName && expensesToAssign.length > 0) {
      const newAssignment = {
        name: selectedName.name,
        expenses: expensesToAssign,
      };

      setAssignedExpenses((prevAssignments) => [...prevAssignments, newAssignment]);

      dispatch(addAssignedExpenses({ name: selectedName.name, expenses: expensesToAssign }));
      setExpensesToAssign([]);
    }
  };

  return (
    <View>
      <View>
        <Text>Names:</Text>
        <FlatList
          data={names.names}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNameSelection(item)}>
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <Text>Expenses:</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAssignExpense(item)}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 40,
                  paddingVertical: 8,
                }}
              >
                <Text style={{ fontSize: 16 }}>{`Name: ${item.name}`}</Text>
                <Text style={{ fontSize: 16 }}>{`Price: $${item.price}`}</Text>
                <Text style={{ fontSize: 16 }}>{`Count: ${item.count}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <Text>Selected Name: {selectedName ? selectedName.name : "None"}</Text>
        {/* Agregar un botón o una forma de asignar los gastos seleccionados al nombre */}
        <TouchableOpacity
  style={{
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  }}
  onPress={handleAssignExpensesToName}
  disabled={!canAssignExpenses}
>
  <Text style={{ color: "white", fontSize: 16 }}>
    Assign Expenses to Name
  </Text>
</TouchableOpacity>




      </View>
      <View>
        <Text>Assigned Expenses:</Text>
        {selectedName && assignedExpenses.length > 0 ? (
          assignedExpenses.map((assignment, index) => (
            <View key={index}>
              <Text>{`Assigned to ${assignment.name}`}</Text>
              {assignment.expenses.map((expense, expenseIndex) => (
                <View key={expenseIndex}>
                  <ExpenseDetails expense={expense} />
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text>No assigned expenses for the selected name</Text>
        )}
      </View>
    </View>
  );
}

export default AssociateExpense;
