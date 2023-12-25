import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Card from "../components/Card";
import { API_URL, RecApiUrl, useAuth } from "../contexts/AuthContext";
import { ScrollView } from "react-native";

import SegmentedControlTab from "react-native-segmented-control-tab";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

const Feed = ({ navigation }: any) => {
  const { onLogout } = useAuth();
  const [responseData, setResponseData] = useState<any>(null);
  const [responseFollowersData, setFollowersResponseData] = useState(null);
  const [responseRecomendationData, setRecomendationData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchRecommendedStories = async () => {
    try {
      const idResponse = await axios.get(`${API_URL}/users/getname`);
      const idData = idResponse.data;
      
      // Extract the id from the response
      const userId = idData.id;
      console.log(userId)
      // Fetch data from the first API endpoint with the custom request name using Axios
      const firstApiResponse = await axios.get(
        `${RecApiUrl}/recommendations?user_id=${userId}`
      );
      

      const firstApiData = firstApiResponse.data;
      console.log(firstApiData)
      // Assuming the response is an array of numbers [1, 3, 4, 5]
      const numbersArray: number[] = firstApiData;



      // Send the numberss to the second API endpoint using Axios
      const secondApiResponse = await axios.post(
        `${API_URL}/activity/recommendedstories`,
        {
          storyIds: numbersArray,
        }
      );
      console.log(secondApiResponse.request)
      const secondApiData = secondApiResponse.data;

      setRecomendationData(secondApiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/stories`);
      setResponseData(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
      setIsLoading(false);
    }
  };
  const fetchFollowerData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/stories/following`);
      setFollowersResponseData(response.data);

      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Request failed:", error);
      setIsLoading(false);
    }
  };

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (selectedIndex === 0) {
      fetchData();
    }
    if (selectedIndex === 1) {
      fetchFollowerData();
    }
    if (selectedIndex ===2){
      fetchRecommendedStories()
    }
  }, [selectedIndex]);

  useFocusEffect(
    useCallback(() => {
      fetchFollowerData();
      fetchData();
      fetchRecommendedStories()
    }, [])
  );

  const handleCardPress = (storyId: number) => {
    navigation.navigate("Story", { storyId });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ margin: 5 }}>
          <SegmentedControlTab
            values={["All", "Following", "Recommendation"]}
            selectedIndex={selectedIndex}
            onTabPress={handleTabChange}
            tabStyle={{ borderColor: "#1f6c5c", backgroundColor: "white" }}
            activeTabStyle={{ backgroundColor: "#1f6c5c" }}
            tabTextStyle={{ color: "#1f6c5c" }}
          />
        </View>
        {isLoading ? (
          <>
            <View style={styles.animationContainer}>
              <LottieView
                style={styles.animation}
                source={require("./globePin.json")}
                autoPlay
                loop
              />
              <Text style={{ marginTop: 60, fontSize: 20 }}>
                Loading Feed...
              </Text>
            </View>
          </>
        ) : responseData ? (
          <>
            {selectedIndex === 0 && (
              <>
                {responseData &&
                  responseData.map((item: any, index: any) => (
                    <>
                      <TouchableOpacity
                        onPress={() => handleCardPress(item.id)}
                      >
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
                          avatar={
                            item.user.photo
                              ? item.user.photo
                              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd"
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
                {responseFollowersData &&
                  (responseFollowersData as any).map((item: any, index: any) => (
                    <>
                      <TouchableOpacity
                        onPress={() => handleCardPress(item.id)}
                      >
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
                          avatar={
                            item.user.photo
                              ? item.user.photo
                              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd"
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
            {selectedIndex === 2 && (
              <>
                {responseRecomendationData &&
                  responseRecomendationData.map((item: any, index: any) => (
                    <>
                      <TouchableOpacity
                        onPress={() => handleCardPress(item.id)}
                      >
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
                          avatar={
                            item.user.photo
                              ? item.user.photo
                              : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd"
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
          </>
        ) : (
          <Text>No data available.</Text>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 300,
    height: 300,
    marginRight: 60,
    marginTop: 50,
  },
  animationContainer: {
    alignItems: "center",
    flex: 1,
  },
});
export default Feed;
