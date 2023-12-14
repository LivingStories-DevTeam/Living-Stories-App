import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";

const EditStory = ({ route }: any) => {
  const { storyId } = route.params;
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

  const injectedJavaScript = setJwtToken;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{
            uri: `http://34.107.94.81:3000/stories/editMobile/${storyId}`,
          }}
          injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        />
      </SafeAreaView>
    </>
  );
};
export default EditStory;
