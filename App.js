import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/homeScreen';
import AssociateExpenseScreen from './src/associateExpenses';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import expensesSlice from './src/redux/expensesSlices';
import namesSlice from './src/redux/namesSlices';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const store = configureStore({
  reducer: {
    expenses: expensesSlice,
    names: namesSlice,
    // Agrega otros slices si los tienes
  },
});

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AssociateExpense" component={AssociateExpenseScreen} />
          </Stack.Navigator>
        </View>
    </Provider>
    </NavigationContainer>
  );
}

export default App;
