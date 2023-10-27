import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button, SafeAreaView, Text, TouchableOpacity } from "react-native";
import Card from "../components/Card";
import { API_URL, useAuth } from "../contexts/AuthContext";
import { ScrollView } from "react-native";

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

const Feed = ({ navigation }: any) => {
  const { onLogout } = useAuth();
  const [responseData, setResponseData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories`);
      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once

  const handleCardPress = (storyId:number) => {
    
    // Replace "YourTargetScreen" with the name of the screen you want to navigate to
    navigation.navigate("Story" , {storyId});
  };

  return (
    <ScrollView>
      <SafeAreaView>
        {responseData &&
          responseData.map((item: any, index: any) => (
            <>
              <TouchableOpacity onPress={() => handleCardPress(item.id)}>
                <Card
                  key={index}
                  title={item.header}
                  description="A small preview of the Start of the story..."
                  date={item.startDate}
                  location={
                    item.locations[0].city + ", " + item.locations[0].country
                  }
                  labels={item.labels}
                  name={item.user.name}
                />
              </TouchableOpacity>
            </>
          ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Feed;
