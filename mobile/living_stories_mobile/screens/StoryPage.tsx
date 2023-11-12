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
  KeyboardAvoidingView,
  Platform,
  Button,
  Alert,
} from "react-native";
import HTML from "react-native-render-html";
import { API_URL } from "../contexts/AuthContext";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import LikeButton from "../components/LikeButton";

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
      photo: string;
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
  const [comment, setComment] = useState<string>();
  const [trigger, setTrigger] = useState(false);
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
  }, [trigger]); // The empty dependency array ensures this effect runs only once
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
  const handleCommentChange = (text: string) => {
    setComment(text);
    console.log(comment);
    console.log(storyId);
  };
  const sendComment = async () => {
    const CommentData: CommentRequestInt = {
      text: comment!,
      storyId: storyId,
    };
    if (comment) {
      try {
        console.log(CommentData);
        const response = await axios.post(
          `${API_URL}/stories/comments`,
          CommentData
        );
        setComment("");
        setTrigger(!trigger);
        
        Alert.alert("You commented on story!");

      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {storyResponse ? (
        <>
          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
              keyboardVerticalOffset={120}
            >
              <ScrollView>
                {storyResponse?.locations && (
                  <>
                    <View style={styles.mapContainer}>
                      <MapView
                        provider={PROVIDER_GOOGLE}
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
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        margin: 10,
                      }}
                    >
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.locationsScroll}
                      >
                        {storyResponse.locations &&
                          storyResponse.locations.map((location, index) => (
                            <View
                              key={index}
                              style={{ marginTop: 5, marginBottom: 5 }}
                            >
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
                        <Image
                          source={
                            storyResponse?.user?.photo
                              ? { uri: storyResponse.user.photo }
                              : {
                                  uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd",
                                }
                          }
                          style={styles.avatar}
                        />
                      </View>

                      <View>
                        <Text style={styles.name}>
                          {storyResponse.user.name}
                        </Text>
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

                      {/* Right section with dates and seasons */}
                      <View style={styles.rightSection}>
                        {storyResponse.decade ? (
                          <Text>{storyResponse.decade}</Text>
                        ) : (
                          <View style={{ flexDirection: "row" }}>
                            <Text>
                              <Feather
                                name="sunrise"
                                size={16}
                                color="#212121"
                              />{" "}
                              {storyResponse.startDate}{" "}
                            </Text>
                            {storyResponse.endDate && (
                              <Text>
                                <Feather
                                  name="sunset"
                                  size={16}
                                  color="#212121"
                                />{" "}
                                {storyResponse.endDate}{" "}
                              </Text>
                            )}
                          </View>
                        )}
                        {storyResponse.startSeason && (
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 5,
                              alignItems: "center",
                            }}
                          >
                            <Text>
                              {storyResponse.startSeason === "summer" && (
                                <MaterialIcons
                                  name="wb-sunny"
                                  size={16}
                                  color="black"
                                />
                              )}
                              {storyResponse.startSeason === "fall" && (
                                <MaterialIcons
                                  name="park"
                                  size={16}
                                  color="black"
                                />
                              )}
                              {storyResponse.startSeason === "spring" && (
                                <MaterialIcons
                                  name="spa"
                                  size={16}
                                  color="black"
                                />
                              )}
                              {storyResponse.startSeason === "winter" && (
                                <MaterialIcons
                                  name="ac-unit"
                                  size={16}
                                  color="black"
                                />
                              )}{" "}
                              {storyResponse.startSeason}{" "}
                            </Text>
                            {storyResponse.endSeason && (
                              <Text>
                                {storyResponse.endSeason === "summer" && (
                                  <MaterialIcons
                                    name="wb-sunny"
                                    size={16}
                                    color="black"
                                  />
                                )}
                                {storyResponse.endSeason === "fall" && (
                                  <MaterialIcons
                                    name="park"
                                    size={16}
                                    color="black"
                                  />
                                )}
                                {storyResponse.endSeason === "spring" && (
                                  <MaterialIcons
                                    name="spa"
                                    size={16}
                                    color="black"
                                  />
                                )}
                                {storyResponse.endSeason === "winter" && (
                                  <MaterialIcons
                                    name="ac-unit"
                                    size={16}
                                    color="black"
                                  />
                                )}{" "}
                                {storyResponse.endSeason}{" "}
                              </Text>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.storyContainer1}>
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
                    </View>
                  </>
                )}

                {storyResponse?.user.name && (
                  <View style={styles.storyContainer2}>
                    <View style={{ marginLeft: 15, marginRight: 15 }}>
                      <HTML source={{ html: storyResponse?.richText }} />
                    </View>
                  </View>
                )}
                <View style={styles.likeCommentContainer}>
                  <LikeButton
                    id={storyResponse.id}
                    type="story"
                    likeNumber={storyResponse?.likes.length}
                  />

                  <Text style={styles.comment}>
                    <Feather name="message-circle" size={25} color="#212121" />{" "}
                    {storyResponse?.comments.length}
                  </Text>
                </View>
                <View style={styles.commentContainer}>
                  <Text style={{ color: "gray" }}>Comment</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Write your comment here!"
                      multiline={true}
                      onChangeText={handleCommentChange}
                      value={comment}
                    />
                    <TouchableOpacity
                      style={{
                        width: "25%",
                        backgroundColor: "#007BFF",
                        paddingVertical: 10,
                        borderRadius: 5,
                        alignItems: "center",
                        marginLeft: 5, 
                        marginRight: 5,
                      }}
                      onPress={sendComment}
                    >
                      <Text style={{ color: "white" }}>Comment</Text>
                    </TouchableOpacity>
                  </View>

                  {storyResponse.comments &&
                    storyResponse.comments.reverse().map((comment, index) => (
                      <View style={secondStyles.container}>
                        <Image
                          source={
                            comment?.user?.photo
                              ? { uri: comment.user.photo }
                              : {
                                  uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd",
                                }
                          }
                          style={secondStyles.avatar}
                        />
                        <View style={secondStyles.commentContainer}>
                          <Text style={secondStyles.userName}>
                            {comment.user.name}
                          </Text>
                          <Text style={secondStyles.commentText}>
                            {comment.text}
                          </Text>
                        </View>
                        <Text style={secondStyles.likeCount}>
                          <Feather name="thumbs-up" size={22} color="#212121" />{" "}
                          {comment.likes.length}
                        </Text>
                      </View>
                    ))}
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
    backgroundColor: "#f2f2f2",
  },
  headerCont: { flex: 1, justifyContent: "center", alignItems: "center" },
  mapContainer: {
    height: 230,
    flex: 1,
    // This maintains a 1:1 aspect ratio for the map
  },
  storyContainer1: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 7,
    marginTop: 7,
    paddingTop: 5,
    paddingBottom: 5,
  },
  storyContainer2: { backgroundColor: "white", borderRadius: 20 },
  map: {
    flex: 1,
  },
  headerText: { fontSize: 30 },
  avatar: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    marginRight: 5,
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "green",
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 75,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 7,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end", // Align content to the bottom
    justifyContent: "flex-end", // Align content to the right
    marginRight: 10,
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
  likeCommentContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
  },
  comment: {
    marginLeft: 15,
    fontSize: 15,
    color: "#1f6c5c",
  },
  like: {
    marginLeft: 10,
    marginTop: 7,
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
  commentInput: {
    width: "75%",
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "black",
  },
  commentContainer: {
    margin: 10,
  },
  locationsScroll: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "black",
  },
});

const secondStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 7,
    padding: 8,
    margin: 7,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
  },
  commentContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  commentText: {
    fontSize: 17,
  },
  likeCount: {
    fontSize: 14,
    marginRight: 4,
  },
});

export default StoryPage;
