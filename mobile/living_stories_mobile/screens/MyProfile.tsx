import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Text} from "react-native"
import { API_URL } from "../contexts/AuthContext";

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
    startDate: string;
    endDate?: string;
    comments:{
      text: string;
      user: {
        id: number;
        name: string;
      };
      likes: number[];
    }[];
    labels:string[]
  }
  
  interface User {
    id: number;
    name: string;
    photo?: ArrayBuffer | null;
    biography?: string | null;
    stories?: Story[];
    comments?: Comment[];
    followers?: User[];
    following?: User[];
  }
  


const MyProfile = ({ navigation }: any) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get<User>(
              `${API_URL}/users/profile`
             
            );
            setUser(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUser();
      }, []);

    return(<>
            <SafeAreaView>
              <Text>{user?.name}</Text>
            </SafeAreaView>
    
    </>)
}  

export default MyProfile