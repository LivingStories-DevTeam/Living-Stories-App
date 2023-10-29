import React, { useEffect, useState } from "react";
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
import { API_URL, useAuth } from "../contexts/AuthContext";
import { ScrollView } from "react-native";

import SegmentedControlTab from "react-native-segmented-control-tab";
import LottieView from "lottie-react-native";

const Feed = ({ navigation }: any) => {
  const { onLogout } = useAuth();
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories`);
      setResponseData(response.data);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
      setIsLoading(false);
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
        {isLoading ? (
          <>
            <View style={styles.animationContainer}>
              <LottieView
                style={styles.animation}
                source={require("./globePin.json")}
                autoPlay
                loop
              />
              <Text style={{ marginTop: 20 }}>Loading Feed...</Text>
            </View>
          </>
        ) : responseData ?(
          <>
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
                  avatar="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd"
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
                <Card
                  title="The Removal of Lenin's Statu from the center of Baku"
                  date="29.11.1992 - 2000"
                  location="Azerbaijan, Turkey"
                  avatar="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd"
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
          </>
        ): (
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
