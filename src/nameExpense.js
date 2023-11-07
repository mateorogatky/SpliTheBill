import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from './redux/expensesSlices';
import ExpenseList from './expenseList';

function NameExpense() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');
  const dispatch = useDispatch();

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
  
        dispatch(addExpense(newExpense));
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
