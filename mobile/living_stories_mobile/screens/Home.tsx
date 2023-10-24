import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Settings } from "react-native";
import Feed from "./Feed";
import Profile from "./Profile";
import PostStory from "./PostStory";

const Tab = createBottomTabNavigator();

const Home = ({navigation}:any) => {
  return (
    
      <Tab.Navigator>
        <Tab.Screen options={{
          
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="black"
            />
          ),
        }} name="Home" component={Feed}></Tab.Screen>
        <Tab.Screen name="Profile" component={Profile}  />
        <Tab.Screen name="PostStory" component={PostStory}  />
      </Tab.Navigator>
    
  );
};

export default Home;
