import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OneScreen from '../screens/OneScreen';
import TwoScreen from '../screens/TwoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OneScreen"
          component={OneScreen}
          options={{ headerTitle: 'Recipes', headerTintColor:'#fff', headerStyle: {
            backgroundColor: '#0095ff',
          }, }}
        />
        <Stack.Screen
          name="TwoScreen"
          component={TwoScreen}
          options={{ headerTitle: 'Recipe', headerTintColor:'#fff', headerStyle: {
            backgroundColor: '#0095ff',
          }, }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default AppNavigator;