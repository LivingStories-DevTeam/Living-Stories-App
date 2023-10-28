import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { API_URL } from "../contexts/AuthContext";
import { View } from "native-base";
interface Story {
  id: number;
  header: string;
  likes: number[];
  locations?: {
    id: number;
    lat: number;
    lng: number;
    name: string;
  }[];
  labels: string[];
  startDate: string;
  endDate?: string;
  comments: {
    text: string;
    user: {
      id: number;
      name: string;
    };
    likes: number[];
  }[];
}

interface User {
  id: number;
  name: string;
  photo?: string | null;
  biography?: string | null;
  stories?: Story[];
  comments?: Comment[];
  followers?: User[];
  following?: User[];
}
const Profile = ({ route }: any) => {
  const { name } = route.params;
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<User>(
          `${API_URL}/users/${name}`,
        );
       
        setUser(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [name]);

  return (
    <SafeAreaView>
      <View style={{backgroundColor:"#3a9163"}}>
      <Text> {user?.name}</Text>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
