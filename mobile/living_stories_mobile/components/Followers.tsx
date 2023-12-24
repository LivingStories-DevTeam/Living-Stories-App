import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { API_URL } from "../contexts/AuthContext";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";

interface User {
  photo?: string;
  userName?: number;
  followerCount?: number;
  storyCount?: number;
  id?: number;
}

export default function Followers({ navigation }: any) {
  const route = useRoute();
  const { userId } = route.params as { userId: number };
  const [users, setFollowerList] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const url = `${API_URL}/users/followerlist/${userId}`;

      try {
        const response = await axios.get<User[]>(url);

        if (response.data) {
          setFollowerList(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

return (
  <>
    {users?.length > 0 ? (
      <View>
        {users.map((user) => (
          <TouchableOpacity
            key={user.id} // Add a key prop for each item in the list
            onPress={() => {
              navigation.navigate("Profile", {
                name: user?.userName,
              });
            }}
          >
            <View style={secondStyles.container}>
              <Image
                source={
                  user?.photo
                    ? { uri: user.photo }
                    : {
                        uri: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd",
                      }
                }
                style={secondStyles.avatar}
              />
              <View style={secondStyles.commentContainer}>
                <Text style={secondStyles.userName}>{user.userName}</Text>
              </View>
              <View style={secondStyles.likeCount}>
                <Text>
                  <Feather name="users" size={25} color="#212121" />
                  {user.followerCount}
                </Text>
                <Text style={{ marginRight: 4 }}>
                  <Feather name="book" size={25} color="#212121" />
                  {user.storyCount}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <View style={secondStyles.animationContainer}>
        <LottieView
          style={secondStyles.animation}
          source={require("../screens/no_animation.json")} // Replace with the path to your Lottie animation JSON file
          autoPlay
          loop
        />
        <Text style={{ marginTop: 20 }}>No one following this account!</Text>
      </View>
    )}
  </>
);
    }
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
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 8,
  },
  commentContainer: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  commentText: {
    fontSize: 17,
  },
  likeCount: {
    fontSize: 14,
    marginRight: 8,
    flexDirection: "row",
  },
});
