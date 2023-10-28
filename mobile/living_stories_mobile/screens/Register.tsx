import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
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
      Alert.alert("Something went wrong! Try again!", "If the error persists, contact the developers!");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      color: "white",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      marginBottom: 8,
      alignSelf: "center",
    },
    input: {
      width: "70%",
      padding: 8,
      color: "black",
      backgroundColor: "rgba(242, 242, 242, 0.8)",
      marginBottom: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "white",
    },
    logoContainer: {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    logo: {
      width: "100%",
      height: "30%",
    },
    welcomeMessage: {
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      marginTop: 25,
    },
    background: {
      flex: 1,
      resizeMode: "cover", // You can adjust the resizeMode as needed
    },
    fields: {
      alignItems: "center", // Center horizontally
      justifyContent: "center",
    },
    registerText: {
      fontSize: 25,
      color: "green",
      marginTop: 16,
      alignSelf: "center",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    loginText: {
      color: "white",
      marginTop: 16,
      alignSelf: "center",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      textDecorationLine: "underline",
    },
  });

  return (
    <ImageBackground
      source={require("../assets/fall.gif")} // Replace with the actual path to your GIF
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo_kare.png")}
            style={styles.logo}
          />
          <Text style={styles.welcomeMessage}>
            Welcome to Living Stories, the ultimate writing and memory-sharing
            app, where you can unleash your creativity and connect with others
            through the power of beautiful memories.
          </Text>
        </View>
        <View></View>
        <View style={styles.fields}>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <Text style={styles.registerText} onPress={register}>
            {" "}
            Register{" "}
          </Text>
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            If you have an accaunt go Login!
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Register;
