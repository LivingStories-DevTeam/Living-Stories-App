import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import StoryPage from "./screens/StoryPage";
import PostStory from "./screens/PostStory";
import 'react-native-gesture-handler';
import React from "react";
import Login from "./screens/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Story" component={StoryPage}></Stack.Screen>
        <Stack.Screen  name="Login" component={Login}></Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
