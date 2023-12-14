import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, View ,Image} from "react-native";
import Feed from "./Feed";
import Profile from "./Profile";
import PostStory from "./PostStory";
import { useAuth } from "../contexts/AuthContext";
import MyProfile from "./MyProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActivityButton from "../components/ActivityButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Timeline from "./Timeline";

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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <View style={{marginRight:30}}>
                <Ionicons name="md-search" size={30} color="#1f6c5c" />
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <ActivityButton
              onButtonPress={() => {
                navigation.navigate("Activity");
              }}
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
          headerRight: () => (
            <Button onPress={() => onLogout!()} title="Logout" />
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
            <Button onPress={() => onLogout!()} title="Logout" />
          ),
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={Timeline}
        options={{headerShown:false}}
        
      />
    </Tab.Navigator>
  );
};

export default Home;
