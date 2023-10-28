import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Settings } from "react-native";
import Feed from "./Feed";
import Profile from "./Profile";
import PostStory from "./PostStory";
import { useAuth } from "../contexts/AuthContext";
import MyProfile from "./MyProfile";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Home = ({ navigation }: any) => {
  const { onLogout } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <Button
              title="Search"
            />
          ),
          headerLeft: () => (
            <Button
              title="Activities"
            />
          ),
        }}
      />
      <Tab.Screen
        name="PostStory"
        component={PostStory}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="ios-add" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={MyProfile}
        options={{ 
            headerShown: false,
          
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-person" : "ios-person-outline"}
              size={size}
              color={color}
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => onLogout!()}
              title="Logout"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
