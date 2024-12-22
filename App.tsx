import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserDetailScreen from './components/UserDetailScreen';
import UserListScreen from './components/UserListScreen';
import { Provider } from 'react-redux'
import store from './Redux/store';

const Stack = createStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
      <Stack.Screen name="UserDetails" component={UserDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserList" component={UserListScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
   
  );
}
