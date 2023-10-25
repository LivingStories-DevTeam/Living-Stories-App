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
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
    <View>
      <Text style={{ fontSize: 24, color: 'black', marginBottom: 8, alignSelf: 'center' }}>Login</Text>
      <TextInput
        style={{ width: 256, padding: 8, marginBottom: 16, borderRadius: 4, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ width: 256, padding: 8, marginBottom: 16, borderRadius: 4, borderWidth: 1, borderColor: '#ccc' }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Login" onPress={new_login} />
      <Text
        style={{ color: 'black', marginTop: 16, alignSelf: 'center', textDecorationLine: 'underline', color: 'blue' }}
        onPress={() => navigation.navigate("Register")}
      >
        New User? Register here!
      </Text>
    </View>
  </SafeAreaView>
  );
};
export default Login;
