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
  
  const Register = ({ navigation }: any) => {
    const { onRegister } = useAuth();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
  
    const register = async () => {
      const result = await onRegister!(email, password, name);
      if (result && result.error) {
        Alert.alert(result.msg);
      }
    };
  
  
  
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View>
          <Text className="text-3xl text-black mb-8 self-center">Register</Text>
          <TextInput
            className="w-64 p-2 mb-4 rounded border border-gray-400"
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
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
  
          <Button title="Register" onPress={register} />
  
        </View>
      </SafeAreaView>
    );
  };
  export default Register;
  