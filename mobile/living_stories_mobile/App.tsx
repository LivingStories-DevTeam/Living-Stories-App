import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Home from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import StoryPage from "./screens/StoryPage";
import PostStory from "./screens/PostStory";
import "react-native-gesture-handler";
import React from "react";
import Login from "./screens/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {authState?.authenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Story" component={StoryPage}/>
            </>
          ) : (
            <Stack.Screen name="Login" component={Login}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
