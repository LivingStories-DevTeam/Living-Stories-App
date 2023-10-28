import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";
import { API_URL, useAuth } from "../contexts/AuthContext";
import { ScrollView } from "react-native";

import SegmentedControlTab from "react-native-segmented-control-tab";

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
    fetchData();
  }, []);

  const handleCardPress = (storyId: number) => {
    navigation.navigate("Story", { storyId });
  };

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ margin: 5 }}>
          <SegmentedControlTab
            values={["All", "Following"]}
            selectedIndex={selectedIndex}
            onTabPress={handleTabChange}
          />
        </View>
        {selectedIndex === 0 && (
          <>
            <Card
              title="The Removal of Lenin's Statu from the center of Baku"
              date="29.11.1992 - 2000"
              location="Azerbaijan, Turkey"
              labels={[
                "memories",
                "family",
                "happy",
                "life",
                "fun",
                "childhood",
                "test",
                "story",
                "sea",
                "love",
              ]}
              name="Rauf Eminov"
              likes={2}
              comments={5}
            />
            {responseData &&
              responseData.map((item: any, index: any) => (
                <>
                  <TouchableOpacity onPress={() => handleCardPress(item.id)}>
                    <Card
                      key={index}
                      title={item.header}
                      date={
                        item.decade
                          ? item.decade
                          : item.endDate
                          ? item.startDate + " - " + item.endDate
                          : item.startDate
                      }
                      location={
                        item.locations[0].city +
                        ", " +
                        item.locations[0].country
                      }
                      labels={item.labels}
                      name={item.user.name}
                      likes={item.likes.length}
                      comments={item.comments.length}
                    />
                  </TouchableOpacity>
                </>
              ))}
          </>
        )}

        {/* Following Tab */}
        {selectedIndex === 1 && (
          <>
            <Card
              title="The Removal of Lenin's Statu from the center of Baku"
              date="29.11.1992 - 2000"
              location="Azerbaijan, Turkey"
              labels={[
                "memories",
                "family",
                "happy",
                "life",
                "fun",
                "childhood",
                "test",
                "story",
                "sea",
                "love",
              ]}
              name="Rauf Eminov"
              likes={2}
              comments={4}
            />
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Feed;
