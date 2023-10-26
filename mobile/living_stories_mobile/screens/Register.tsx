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
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <View>
        <Text style={{ fontSize: 24, color: 'black', marginBottom: 8, alignSelf: 'center' }}>Register</Text>
        <TextInput
          style={{ width: 256, padding: 8, marginBottom: 16, borderRadius: 4, borderWidth: 1, borderColor: '#ccc' }}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
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

        <Button title="Register" onPress={register} />
      </View>
    </SafeAreaView>
    );
  };
  export default Register;
  