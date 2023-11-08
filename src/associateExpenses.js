import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addAssignedExpenses } from "./redux/namesSlices";
import ExpenseDetails from "./expenseDetails";
import { decrementCount } from "./redux/expensesSlices";
import RNPickerSelect from 'react-native-picker-select';

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
  const [isNameListExpanded, setIsNameListExpanded] = useState(true);

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
    // Con esto, ocultamos la lista de nombres al seleccionar uno
    setIsNameListExpanded(false);
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

  const handleDeselectName = () => {
    setSelectedName(null);
    setIsNameListExpanded(true);
  };

  return (
    <View style={styles.container}>
      {isNameListExpanded ? (
        <View style={styles.namesList}>
          <Text style={styles.listTitle}>Names:</Text>
          <FlatList
            data={names.names}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleNameSelection(item)}>
                <View style={styles.nameItem}>
                  <Text style={styles.nameText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.selectedNameSection}>
          <Text style={styles.selectedNameText}>Selected Name: {selectedName ? selectedName.name : "None"}</Text>
          <Button title="Change Name" onPress={handleDeselectName} />
        </View>
      )}
      <View style={styles.expensesList}>
        <Text style={styles.listTitle}>Expenses:</Text>
        <FlatList
          data={expenses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAssignExpense(item)}>
              <View style={styles.expenseItem}>
                <Text style={styles.expenseDetail}>{`${item.name}`}</Text>
                <Text style={styles.expenseDetail}>{`$${item.price}`}</Text>
                <Text style={styles.expenseDetail}>{`Count: ${item.count}`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {selectedName && (
        <View>
          <Text style={styles.assignButtonText}>Selected Name: {selectedName ? selectedName.name : "None"}</Text>
          <TouchableOpacity
            style={styles.assignButton}
            onPress={handleAssignExpensesToName}
            disabled={!canAssignExpenses}
          >
            <Text style={styles.assignButtonText}>Assign Expenses to Name</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.assignedExpenses}>
        <Text style={styles.listTitle}>Assigned Expenses:</Text>
        <ScrollView style={styles.assignedExpensesList}>
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
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  namesList: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  nameItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 16,
  },
  expensesList: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  expenseDetail: {
    fontSize: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedNameText: {
    fontSize: 16,
    marginBottom: 10,
  },
  assignButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  assignButtonText: {
    color: 'white',
    fontSize: 16,
  },
  assignedExpenses: {
    backgroundColor: 'white',
  },
  assignedExpensesList: {
    height: 300, // Ajusta la altura según tus necesidades
    marginTop: 10,
  },
  selectedNameSection: {
    padding: 10,
    backgroundColor: 'white',
  },
});

export default AssociateExpense;
