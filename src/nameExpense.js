import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense, getExpenses } from './redux/expensesSlices';
import ExpenseList from './expenseList';
import axios from 'axios'; // Importa el módulo axios


function NameExpense() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');
  const dispatch = useDispatch();

  // Define la función `fetchExpenses` aquí
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

  const handleNameChange = (text) => {
    setName(text);
  }

  const handleCountChange = (real) => {
    setCount(real);
  }

  const handlePriceChange = (real) => {
    setPrice(real);
  }

  const handleAddExpense = async () => {
    if (name && price && count) {
      const newExpense = { nameExpense: name, price: price, count: count };

      try {
        const response = await axios.post('http://192.168.1.164:3000/api/expenses', newExpense);
        console.log('Gasto agregado con éxito:', response.data);

        // Despacha la acción para agregar el nuevo gasto a Redux
        dispatch(addExpense(newExpense));

        // Llama a `fetchExpenses` para actualizar la lista
        fetchExpenses();

        setName('');
        setPrice('');
        setCount('');
      } catch (error) {
        console.error('Error al agregar el gasto:', error);

        if (error.response) {
          console.error('Respuesta del servidor:', error.response.data);
        }
      }
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [dispatch]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expenses:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name expense"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={handlePriceChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Count"
        value={count}
        onChangeText={handleCountChange}
      />
      <Button
        title="Add Expense"
        onPress={handleAddExpense}
      />
      < ExpenseList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default NameExpense;
