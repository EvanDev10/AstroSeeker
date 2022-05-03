import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {create} from 'react-test-renderer';
import Login from './Login';
import Community from "./screens/Community";
import NewPost from "./screens/NewPost";
import ShowPost from "./screens/ShowPost";

const Stack = createNativeStackNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
		<Stack.Screen name = "Comm" component = { Community } />
        <Stack.Screen name = "newPost" component = { NewPost } />
        <Stack.Screen name = "ShowPost" component = { ShowPost } />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
