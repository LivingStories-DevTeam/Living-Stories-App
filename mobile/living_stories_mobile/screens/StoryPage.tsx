import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import HTML from "react-native-render-html";
import { API_URL } from "../contexts/AuthContext";
import MapView, { Marker } from "react-native-maps";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
    city: string;
    country: string;
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
      const response = await axios.get(`${API_URL}/stories/${storyId}`);
      setStoryResponse(response.data);

      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mountsr
  }, []); // The empty dependency array ensures this effect runs only once
  const markers = storyResponse?.locations || [];
  let center = {
    latitude: 0,
    longitude: 0,
  };

  let delta = {
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  // If there are multiple markers, calculate the center and delta
  if (markers!.length > 1) {
    const bounds = markers!.reduce(
      (acc, location) => {
        return {
          minLatitude: Math.min(acc.minLatitude, location.lat),
          maxLatitude: Math.max(acc.maxLatitude, location.lat),
          minLongitude: Math.min(acc.minLongitude, location.lng),
          maxLongitude: Math.max(acc.maxLongitude, location.lng),
        };
      },
      {
        minLatitude: Number.MAX_VALUE,
        maxLatitude: Number.MIN_VALUE,
        minLongitude: Number.MAX_VALUE,
        maxLongitude: Number.MIN_VALUE,
      }
    );

    center = {
      latitude: (bounds.minLatitude + bounds.maxLatitude) / 2,
      longitude: (bounds.minLongitude + bounds.maxLongitude) / 2,
    };

    delta = {
      latitudeDelta: bounds.maxLatitude - bounds.minLatitude + 3, // Add padding
      longitudeDelta: bounds.maxLongitude - bounds.minLongitude + 3, // Add padding
    };
  } else if (markers!.length === 1) {
    // If there's only one marker, use its location as the center
    center = {
      latitude: markers![0].lat,
      longitude: markers![0].lng,
    };
  }

  return (
    <>
      {storyResponse ? (
        <>
          <SafeAreaView style={styles.container}>
            <ScrollView>
              {storyResponse?.locations && (
                <>
                  <View style={styles.mapContainer}>
                    <MapView
                      provider="google"
                      style={styles.map}
                      initialRegion={{
                        ...center,
                        ...delta,
                      }}
                    >
                      {markers!.map((location) => (
                        <Marker
                          key={location.id}
                          coordinate={{
                            latitude: location.lat,
                            longitude: location.lng,
                          }}
                          title={location.name}
                        />
                      ))}
                    </MapView>
                  </View>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" , margin:10 }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={{ marginTop: 8 }}
                    >
                      {storyResponse.locations &&
                        storyResponse.locations.map((location, index) => (
                          <View key={index}>
                            <Text>
                              {" "}
                              <Feather
                                name="map-pin"
                                size={14}
                                color="#212121"
                              />{" "}
                              {location.city}, {location.country}
                            </Text>
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                  <View style={styles.row}>
                    <View>
                      {storyResponse?.user.photo ? (
                        <Image
                          source={{ uri: storyResponse.user.photo }}
                          style={styles.avatar}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
                          }}
                          style={styles.avatar}
                        />
                      )}
                      <Text style={styles.name}>{storyResponse.user.name}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Profile", {
                            name: storyResponse?.user.name,
                          });
                        }}
                      >
                        <Text style={styles.link}>See profile</Text>
                      </TouchableOpacity>
                    </View>
                    {/* Dates*/}
                    <View>
                      {storyResponse.decade ? (
                        <Text>{storyResponse.decade}</Text>
                      ) : (
                        <>
                          <Text>
                            <Feather name="sunrise" size={14} color="#212121" />{" "}
                            {storyResponse.startDate}
                          </Text>
                          {storyResponse.endDate && (
                            <Text>
                              <Feather
                                name="sunset"
                                size={14}
                                color="#212121"
                              />{" "}
                              {storyResponse.endDate}
                            </Text>
                          )}
                        </>
                      )}
                    </View>
                    {/* Seasons*/}
                    {storyResponse.startSeason && (
                      <View>
                        <Text>
                          <Entypo name="leaf" size={14} color="black" />
                          {storyResponse.startSeason}
                        </Text>
                        {storyResponse.endSeason && (
                          <Text>
                            <Entypo name="leaf" size={14} color="black" />{" "}
                            {storyResponse.endSeason}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>

                  <View style={styles.headerCont}>
                    <Text style={styles.headerText}>
                      {storyResponse.header}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 10,
                    }}
                  >
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={{ marginTop: 8 }}
                    >
                      {storyResponse.labels &&
                        storyResponse.labels.map((label, index) => (
                          <View style={styles.tag} key={index}>
                            <Text style={styles.tagText}>{label}</Text>
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                </>
              )}

              {storyResponse?.user.name && (
                <>
                  <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <HTML source={{ html: storyResponse?.richText }} />
                  </View>
                </>
              )}
              <View style={styles.row}>
                <Text style={styles.likeAndComment}>
                  <Feather name="thumbs-up" size={14} color="#212121" />{" "}
                  {storyResponse?.comments.length}
                </Text>
                <Text style={styles.likeAndComment}>
                  <Feather name="message-circle" size={14} color="#212121" />{" "}
                  {storyResponse?.comments.length}
                </Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      ) : (
        <>
          <View style={styles.animationContainer}>
            <LottieView
              style={styles.animation}
              source={require("./animation.json")} // Replace with the path to your Lottie animation JSON file
              autoPlay
              loop
            />
            <Text style={{ marginTop: 20 }}>LOADING THE STORY!</Text>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCont: { flex: 1, justifyContent: "center", alignItems: "center" },
  mapContainer: {
    height: 230,
    flex: 1,
    // This maintains a 1:1 aspect ratio for the map
  },
  map: {
    flex: 1,
  },
  headerText: { fontSize: 30 },
  avatar: {
    margin: 15,
    width: 75, // Set the width as per your requirements
    height: 75, // Set the height as per your requirements
    borderRadius: 50, // Make it a circle
  },
  name: {
    marginLeft: 15,
    fontSize: 20, // Adjust the font size as needed
    fontWeight: "bold",
  },
  link: {
    marginLeft: 15,
    fontSize: 16, // Adjust the font size as needed
    color: "green", // Set the text color to blue
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row", // Arrange the image and text in a row
    alignItems: "center", // Vertically center the content
  },
  tag: {
    backgroundColor: "#1f6c5c",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
    color: "white",
  },
  likeAndComment: {
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 15,
    color: "#1f6c5c",
  },
  animation: {
    width: 300,
    height: 300,
    marginRight: 60,
    marginTop: 50,
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",

    flex: 1,
  },
});

export default StoryPage;
