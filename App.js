import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//bringing in all the Screens
import Home from './screens/Home';
import Edit from './screens/Edit';
import Add from './screens/Add';
import {NativeBaseProvider} from 'native-base';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: '#b0160b',
              },
              title: 'Netflix Tracks',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#fae3e1',
              },
            }}></Stack.Screen>
          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerStyle: {
                backgroundColor: '#b0160b',
              },
              title: 'Add series',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#fae3e1',
              },
            }}></Stack.Screen>
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerStyle: {
                backgroundColor: '#b0160b',
              },
              title: 'Edit Series',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#fae3e1',
              },
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
