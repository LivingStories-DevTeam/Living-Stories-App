import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, SafeAreaView, Text } from "react-native";
import Card from "../components/Card";
import { useAuth } from "../contexts/AuthContext";
import { ScrollView } from "react-native";

const Feed = ({ navigation }: any) => {
  const { onLogout } = useAuth();
  const [responseData, setResponseData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://104.155.147.249:8080/stories");
      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <ScrollView>
    <SafeAreaView>
      
      <Card
        title="Preview Card"
        description="This is a sample card description."
      />
      {responseData &&
        responseData.map((item, index) => (
          <>
            <Card key={index}
              title={item.header}
              description="A small preview of the Start of the story..."
              date={item.startDate}
              location={item.locations[0].city+", "+item.locations[0].country}
              labels={item.labels}
              name={item.user.name}
            />
          </>
        ))}
    </SafeAreaView></ScrollView>
  );
};

export default Feed;
