import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import NameInput from './nameInput';
import NameExpense from './nameExpense';
import ExpenseList from './expenseList';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'; // Asegúrate de importar tus estilos correctamente

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showNames, setShowNames] = useState(true);

  const toggleView = () => {
    setShowNames(!showNames);
  };

  const buttonText = showNames ? "Ir a agregar gastos" : "Ir a cargar nombres";

  const navigateToAssociateExpense = () => {
    navigation.navigate('AssociateExpense');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {showNames ? 'Add Names' : 'Add Expenses'}
      </Text>
      {showNames ? <NameInput /> : <NameExpense />}
      <Button title={buttonText} onPress={toggleView} />
      <Button title="Go to Associate Expense" onPress={navigateToAssociateExpense} />
    </View>
  );
}
