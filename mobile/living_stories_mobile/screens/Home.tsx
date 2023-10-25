import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Settings } from "react-native";
import Feed from "./Feed";
import Profile from "./Profile";
import PostStory from "./PostStory";
import { useAuth } from "../contexts/AuthContext";

const Tab = createBottomTabNavigator();

const Home = ({ navigation }: any) => {
  const { onLogout } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="PostStory" component={PostStory} />
    </Tab.Navigator>
  );
};

export default Home;
