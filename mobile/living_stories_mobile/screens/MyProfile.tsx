import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { API_URL, useAuth } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import Card from "../components/Card";
import LottieView from "lottie-react-native";
import { useFocusEffect } from "@react-navigation/native";

interface Story {
  id: number;
  header: string;
  likes: number[];
  locations?: {
    id: number;
    lat: number;
    lng: number;
    name: string;
    country: string;
  }[];
  startDate: string;
  endDate?: string;
  comments: {
    text: string;
    user: {
      id: number;
      name: string;
    };
    likes: number[];
  }[];
  labels: string[];
  decade?: string;
}

interface User {
  id: number;
  name: string;
  photo?: string;
  biography?: string | null;
  stories?: Story[];
  comments?: Comment[];
  followers?: User[];
  following?: User[];
}

const MyProfile = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const { onLogout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get<User>(`${API_URL}/users/profile`);
          setUser(response.data);
          console.log("User: " + JSON.stringify(response.data, null, 2));
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUser();
    }, [])
  );

  const handleCardPress = (storyId: number) => {
    navigation.navigate("Story", { storyId });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    back: {
      flex: 0.3,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 15,
      height: "100%",
    },
    avatarContainer: {
      alignItems: "center",
      marginBottom: 50,
    },
    avatar: {
      width: 150,
      height: 150,
      borderRadius: 75,
      margin: 35,
    },
    title: {
      fontSize: 35,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 10,
    },
    bio: {
      fontSize: 17,
      textAlign: "center",
      marginTop: 10,
    },
    background: {
      flex: 1,
      resizeMode: "cover", // You can adjust the resizeMode as needed
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
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
  return (
    <>
      {user?(
        <>
          <ImageBackground
            source={require("../assets/fall.gif")}
            style={styles.background}
          >
            <ScrollView>
              <SafeAreaView style={styles.container}>
                <View style={styles.back}>
                  <View style={styles.header}>
                    <TouchableOpacity style={{ marginRight: 20 }}>
                      <Feather name="edit" size={30} color="white" />
                    </TouchableOpacity>

                    <Image
                      source={
                        user?.photo
                          ? { uri: user.photo }
                          : {
                              uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd",
                            }
                      }
                      style={styles.avatar}
                    />

                    <TouchableOpacity
                      onPress={() => onLogout!()}
                      style={{ marginLeft: 20 }}
                    >
                      <Feather name="log-out" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.content}>
                  <Text style={styles.title}>{user?.name}</Text>
                  <Text style={styles.bio}>{user?.biography}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ marginRight: 4 }}>
                      <Feather name="book" size={25} color="#212121" />{" "}
                      {user?.stories?.length}
                    </Text>
                    <Text>
                      <Feather name="users" size={25} color="#212121" />{" "}
                      {user?.followers?.length}
                    </Text>
                  </View>
                  <View style={{ marginTop: 10, backgroundColor: "white" }}>
                    <View>
                      {user?.stories?.map((item: Story, index: number) => (
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
                                item.locations
                                  ?.map((location) => location.country)
                                  .join(", ") || ""
                              }
                              avatar={
                                user.photo
                                  ? user.photo
                                  : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd"
                              }
                              labels={item.labels}
                              name={user.name}
                              likes={item.likes.length}
                              comments={item.comments.length}
                            />
                          </TouchableOpacity>
                        </>
                      ))}
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
          </ImageBackground>
        </>
      ) : (
        <>
          <View style={styles.animationContainer}>
            <LottieView
              style={styles.animation}
              source={require("./globe.json")} // Replace with the path to your Lottie animation JSON file
              autoPlay
              loop
            />
            <Text style={{ marginTop: 20 }}>Loading your Profile...!</Text>
          </View>
        </>
      )}
    </>
  );
};

export default MyProfile;
