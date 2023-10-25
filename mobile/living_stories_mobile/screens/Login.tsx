import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = ({ navigation }: any) => {
  const { onLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const new_login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      Alert.alert(result.msg);
    }
  };



  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View>
        <Text className="text-3xl text-black mb-8 self-center">Login</Text>
        <TextInput
          className="w-64 p-2 mb-4 rounded border border-gray-400"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="w-64 p-2 mb-4 rounded border border-gray-400"
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <Button title="Login" onPress={new_login} />
        <Text className=" text-black mt-8 self-center underline text-blue-600" onPress={() => navigation.navigate("Register")}>New User ? Register here !</Text>
        

      </View>
    </SafeAreaView>
  );
};
export default Login;
