import { SafeAreaView, Button, Text, Alert } from "react-native";
import axios from "axios";


// @ts-ignore
import * as CookieManager from "react-native-cookies";
import { useState } from "react";

const Login = ({ navigation }: any) => {
  const [jwtToken  , setJwtToken] = useState<string>()
    // Define the request data
  const requestData = {
    email: "user1@gmail.com",
    password: "1",
  };

  // Make the API request
  const login = () => {
    axios
      .post("http://104.155.147.249:8080/login", requestData)
      .then((response) => {
        // Handle the response here

        const cookies = response.headers["set-cookie"];
        let jwttoken = null;

        if (cookies) {
          // Loop through the cookies to find the one that contains your JWT token
          cookies.forEach((cookie) => {
            if (cookie.includes("jwt_Token=")) {
              // Extract the JWT token from the cookie
              jwttoken = cookie.split("jwt_Token=")[1].split(";")[0];
              
            }
          });
        }

        if (jwttoken) {
          // Use the JWT token as needed
          setJwtToken(jwttoken)
          Alert.alert("Jwt", jwtToken);
          console.log("JWT Token:", jwtToken);
        } else {
          Alert.alert("not found", "JWT Token not found in cookies.");
          console.log("JWT Token not found in cookies.");
        }
      });
  };

  const send  = async () =>{
    
    const config = {
      headers: {
        'Authorization': `Bearer ${jwtToken}`, // Add the JWT token in the "Authorization" header
      },
    };
      try {
        console.log("var" + jwtToken)
        const response = await axios.get('http://104.155.147.249:8080/stories',config);
        console.log(response.data)
      } catch (error) {
        console.error('Request failed:', error);
        Alert.alert('Error', 'Failed to fetch data');
      }
      
    
         
      }
  
  return (
    <SafeAreaView>
      <Button title="Login" onPress={() => login()} />
      <Button title="Send" onPress={() => send()} />
      <Text> This is Login Screen!</Text>
    </SafeAreaView>
  );
};
export default Login;
