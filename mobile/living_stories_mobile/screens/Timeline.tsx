import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL, RecApiUrl, useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

type StoryType = {
  header: string;
  id: number;
  startSeason: string; // Change the type according to your actual data structure
  // Other properties...
};
type Story = {
  header: string;
  id: number;
  startSeason: string;
  user: {
    id: number;
    name: string;
    photo?: string;
  };
  // Add other properties as needed
};

const Timeline = ({ route, navigation }: any) => {
  const [lat, setLat] = useState(route.params?.lat);
  const [lng, setLng] = useState(route.params?.lng);
  const [radius, setRadius] = useState(route.params?.radius);

  const fallAnimation = new Animated.Value(0);
  const scrollViewRef = useRef(null);
  const [change, setChange] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState(
    require("../assets/Autumn_Loop_Large.gif")
  );
  const [leaf, setLeaf] = useState(require("../assets/autumn_final_GIF.gif"));
  const [initialMiddlePage, setInitialMiddlePage] = useState<number>(0);

  const [stories, setStories] = useState<Story[] | null>(null);
  const fetchStories = async () => {
    try {
      const payload = {
        endDate: null,
        isInterval: true,
        latitude: route.params?.lat,
        longitude: route.params?.lng,
        radius: route.params?.radius,
        startDate: null,
      };
      console.log(payload);
      const response = await axios.post(
        `${API_URL}/stories/advancedsearch`,
        payload
      );
      setStories(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStories();
    }, [])
  );

  const leaves = [
    { season: "fall", src: require("../assets/autumn_final_GIF.gif") },
    { season: "winter", src: require("../assets/winter_final_GIF.gif") },
    { season: "summer", src: require("../assets/summer_final_GIF.gif") },
    { season: "spring", src: require("../assets/spring_final_GIF.gif") },
  ];

  const items = [
    { id: 1, season: "Autumn" },
    { id: 2, season: "Winter" },
    { id: 3, season: "Summer" },
    { id: 4, season: "Spring" },
    // Add more items with corresponding seasons
  ];

  const changeBackgroundImage = () => {
    setChange(change + 1);
    if (change % 4 === 1) {
      setBackgroundImage(require("../assets/Autumn_Loop_Large.gif"));
      setLeaf(require("../assets/autumn_final_GIF.gif"));
    } else if (change % 4 === 2) {
      setBackgroundImage(require("../assets/Winter_Loop_Large.gif"));
      setLeaf(require("../assets/winter_final_GIF.gif"));
    } else if (change % 4 === 3) {
      setBackgroundImage(require("../assets/Summer_Loop_Large.gif"));
      setLeaf(require("../assets/summer_final_GIF.gif"));
    } else {
      setBackgroundImage(require("../assets/Spring_Loop_Large.gif"));
      setLeaf(require("../assets/spring_final_GIF.gif"));
    }
    // You can change the background image source dynamically
  };
  const startFallingAnimation = (storyId: number) => {
    // Reset the animated value to 0 before starting a new animation
    setTimeout(() => {
      // Navigate to the "Story" screen
      navigation.navigate("Story", { storyId });
    }, 2000);
    fallAnimation.setValue(0);

    Animated.timing(fallAnimation, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Animation completed, reverse back to the initial position
      Animated.timing(fallAnimation, {
        toValue: 0,
        duration: 0, // Instantly reverse (you can adjust the duration if you want a slower reverse)
        useNativeDriver: true,
      }).start();
    });
  };
  const fallingLeavesStyle = {
    transform: [
      {
        translateY: fallAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 500],
        }),
      },
      {
        translateX: Animated.modulo(
          Animated.multiply(fallAnimation, 100),
          200
        ).interpolate({
          inputRange: [0, 100, 200],
          outputRange: [0, 50, 0],
        }),
      },
      {
        rotate: fallAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "380deg"],
        }),
      },
    ],
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const screenWidth = Dimensions.get("window").width;

    if (initialMiddlePage === 0) {
      const initialPage = Math.round(offsetX / screenWidth);
      setInitialMiddlePage(initialPage);
    }

    // Adjust the range to be broader
    const middlePage = Math.round((offsetX + screenWidth / 2) / screenWidth);

    // Check if responseFollowersData is not null and middlePage is within the array bounds
    if (stories && middlePage >= 0 && middlePage < stories.length) {
      // Change background based on the current middle page's season
      const currentSeason = stories[middlePage]?.startSeason;

      console.log("Current Season:", currentSeason);

      switch (currentSeason) {
        case "fall":
          setBackgroundImage(require("../assets/Autumn_Loop_Large.gif"));
          setLeaf(require("../assets/autumn_final_GIF.gif"));
          break;
        case "winter":
          setBackgroundImage(require("../assets/Winter_Loop_Large.gif"));
          setLeaf(require("../assets/winter_final_GIF.gif"));
          break;
        case "summer":
          setBackgroundImage(require("../assets/Summer_Loop_Large.gif"));
          setLeaf(require("../assets/summer_final_GIF.gif"));
          break;
        case "spring":
          setBackgroundImage(require("../assets/Spring_Loop_Large.gif"));
          setLeaf(require("../assets/spring_final_GIF.gif"));
          break;
        // Add more cases for other seasons
        default:
          setBackgroundImage(require("../assets/Autumn_Loop_Large.gif"));
          setLeaf(require("../assets/autumn_final_GIF.gif"));
          break;
      }
    }
  };

  return (
    <>
      <ImageBackground source={backgroundImage} style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={(event) => {
            handleScroll(event);
          }}
        >
          {stories &&
            stories.map((story: any) => {
              // Find the corresponding leaf based on the startSeason
              const selectedLeaf = leaves.find(
                (leaf) => leaf.season === story.startSeason
              );

              // Use the selected leaf source or provide a default source if not found
              const source = selectedLeaf
                ? selectedLeaf.src
                : require("../assets/autumn_final_GIF.gif");

              return (
                <TouchableOpacity
                  key={story.id}
                  onPress={() => startFallingAnimation(story.id)}
                >
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        borderRadius: 45,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        padding: 10,
                        height: 40,
                        top: 90,
                        right: -58,
                        minWidth: 70,
                        maxWidth: 550,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        {story.startDate}{" "}
                        {story.endDate && <>- {story.endDate}</>}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require("../assets/timeline.png")}
                    style={{
                      width: 350,
                      height: 300,
                      top: 1,
                      right: -60,
                      position: "absolute",
                      opacity: 0.2,
                      tintColor: "orange",
                    }}
                  />
                  <Animated.View style={[styles.kutu, fallingLeavesStyle]}>
                    <ImageBackground
                      source={source} // Use the selected leaf source
                      style={styles.background}
                    >
                      <Text style={styles.header}>{story.header}</Text>
                      <Text style={styles.text}>By: {story.user?.name}</Text>
                    </ImageBackground>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </ImageBackground>
    </>
  );
};
const screenHeight = Dimensions.get("window").height;
const marginPercentageY = 14;
const marginTop = (screenHeight * marginPercentageY) / 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  horCont: {
    flex: 1,
    flexDirection: "row", // Set the flexDirection to 'row' for horizontal scrolling
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
  },
  text: {
    color: "white",
  },
  header: {
    fontWeight: "bold",
    color: "white",
    textShadow: "0 0 10px black",
    width: 150,
    position: "relative",
    padding: 10,
    overflow: "hidden",
    borderRadius: 45,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    textAlign: "center", // Center text vertically, adjust the value based on the height
  },

  kutu: {
    marginLeft: 100,
    marginTop,
    width: 250,
    height: 250,
  },
  background: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});

export default Timeline;
