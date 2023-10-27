import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { URL } from "@env";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string, name: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "jtw_Token";
export const API_URL = `${URL}`;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
    console.log(authState);
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { email, password, name });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const requestData = { email, password };
      const response = await axios.post(`${API_URL}/login`, requestData);
      console.log(API_URL)
      const cookies = response.headers["set-cookie"];
      let jwtToken = null;

      if (cookies) {
        // Loop through the cookies to find the one that contains your JWT token
        cookies.forEach((cookie) => {
          if (cookie.includes("jwt_Token=")) {
            // Extract the JWT token from the cookie
            jwtToken = cookie.split("jwt_Token=")[1].split(";")[0];
          }
        });
      }

      if (jwtToken) {
        // Use the JWT token as needed

        await SecureStore.setItemAsync(TOKEN_KEY, jwtToken);
        console.log("JWT Token:", jwtToken);
      } else {
        console.log("JWT Token not found in cookies.");
      }

      // Set your authentication state, headers, or perform any additional actions as needed
      setAuthState({
        token: jwtToken,
        authenticated: jwtToken !== null,
      });

      return { error: false };
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    // Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";
    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false,
    });
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
