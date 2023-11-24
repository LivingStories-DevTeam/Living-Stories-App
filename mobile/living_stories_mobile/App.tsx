import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import Home from "./screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import StoryPage from "./screens/StoryPage";
import "react-native-gesture-handler";
import React from "react";
import Login from "./screens/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import EditStory from "./screens/EditStory";

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
              <Stack.Screen
                name="Living Stories"
                component={Home}
                options={{
                  headerShown: false,
                  headerRight: () => (
                    <Button
                      onPress={() => onLogout!()}
                      title="Logout"
                      color="black"
                    />
                  ),
                }}
              />
              <Stack.Screen name="Story" component={StoryPage} />
              <Stack.Screen name="EditStory" component={EditStory} />
              <Stack.Screen name="Profile" component={Profile} 
               options={{
                headerShown: false,
              }}/>
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerShown: false,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
