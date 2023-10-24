import axios from "axios";
import { Button, SafeAreaView, Text } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

const Feed = ({ navigation }: any) => {
  const { onLogout } = useAuth();

  
  const send = async () => {
    
    try {
    
      const response = await axios.get(
        "http://104.155.147.249:8080/stories",
       
      );
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
      
    }
  };
  return (
    <SafeAreaView>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Get data!"
        onPress={() => send() }
      />
      <Button
        title="Log Out"
        onPress={() => onLogout!() }
      />
      <Text> This is Feed Screen!</Text>
    </SafeAreaView>
  );
};
export default Feed;
