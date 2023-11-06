import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
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
      Alert.alert("Something went wrong! Try again!", "If the error persists, contact the developers!");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titleText: {
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
    registerText: {
      color: "white",
      marginTop: 16,
      alignSelf: "center",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      textDecorationLine: "underline",
    },
    loginText: {
      fontSize:25,
      color: "green",
      marginTop: 16,
      alignSelf: "center",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
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
    login: {
      alignItems: "center", // Center horizontally
      justifyContent: "center",
    },
    background: {
      flex: 1,
      resizeMode: "cover", // You can adjust the resizeMode as needed
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
        <View style={styles.login}>
          <Text style={styles.titleText}>Login</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <Text style={styles.loginText} onPress={new_login}>
            {" "}
            Login
          </Text>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate("Register")}
          >
            New User? Register here!
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Login;
