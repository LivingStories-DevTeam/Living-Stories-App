import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";

const PostStory = ({ navigation }: any) => {
  const TOKEN_KEY = "jtw_Token";
  
  const [webtoken, setWebToken] = useState<string>();
  
  
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);

      setWebToken(token!);
    };
    loadToken();
    console.log(webtoken);
  }, []);
  const setJwtToken = `
    document.cookie = 'jwt_Token=${webtoken}; path=/;';
  `;

  const hideNavBar = `
  // Add code to remove the <nav> element inside the <div> with id "root"
  var rootDiv = document.getElementById('root');
  if (rootDiv) {
    var navBar = rootDiv.querySelector('nav');
    if (navBar) {
      navBar.parentNode.removeChild(navBar);
    }
  }
`;

  const injectedJavaScript = `${setJwtToken}`;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: "http://104.155.147.249:3000/storymobile" }}
          injectedJavaScriptBeforeContentLoaded={injectedJavaScript} injectedJavaScript={hideNavBar}
        />
      </SafeAreaView>

    </>
  );
};
export default PostStory;