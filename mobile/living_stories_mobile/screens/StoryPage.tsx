import axios from "axios";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";
import HTML from "react-native-render-html";
import { API_URL } from "../contexts/AuthContext";

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface LocationProps {
  slocations: Location[];
}

interface CommentRequestInt {
  text: string;
  storyId: number;
}
interface User {
  id: number;
  name: string;
  photo?: ArrayBuffer | null;
}
interface StoryInt {
  id: number;
  header: string;
  richText: string;
  user: {
    id: number;
    name: string;
    photo?: string;
  };
  labels: string[];

  likes: number[];

  locations: {
    id: number;
    lat: number;
    lng: number;
    name: string;
  }[];

  comments: {
    id: number;
    text: string;
    user: {
      id: number;
      name: string;
    };
    likes: number[];
  }[];
  startDate: string;
  endDate: string;
  startSeason?: string;
  endSeason?: string;
  decade?: string;
}

const StoryPage = ({ route, navigation }: any) => {
  const { storyId } = route.params;
  const [storyResponse, setStoryResponse] = useState<StoryInt>();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/stories/${storyId}`
      );
      setStoryResponse(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mountsr
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <SafeAreaView>
    <ScrollView>
      
        <Text> This is Story id number {storyResponse?.id}!</Text>
        <Text>{storyResponse?.header}</Text>
        <Text>{storyResponse?.user.name}</Text>
        {storyResponse?.user.name && (
          <>
            <Button
              title=" Go to Author"
              onPress={() => {
                navigation.navigate("Profile", {
                  name: storyResponse?.user.name,
                });
              }}
            />
            
            <View>
              <HTML source={{ html: storyResponse?.richText }} />
            </View>
            
          </>
        )}
      
    </ScrollView>
    </SafeAreaView>
  );
};
export default StoryPage;
