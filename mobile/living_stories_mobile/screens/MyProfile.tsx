import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { API_URL } from "../contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import Card from "../components/Card";

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
}

interface User {
  id: number;
  name: string;
  photo?: ArrayBuffer | null;
  biography?: string | null;
  stories?: Story[];
  comments?: Comment[];
  followers?: User[];
  following?: User[];
}

const MyProfile = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
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
  }, []);

  const handleCardPress = (storyId: number) => {
    
    navigation.navigate("Story", { storyId });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1, // Make the container take up the full available height
      backgroundColor: "#1F6C5C",
    },
    back: {
      flex: 0.3,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      flex: 1, 
      backgroundColor: "white",
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
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
            }}
            style={styles.avatar}
          />
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
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }} // without this scrolling bounces back up when releasing your finger
          >
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
            {user?.stories?.map((item: Story, index: number) => (
              <><TouchableOpacity onPress={() => handleCardPress(item.id)}>
                <Card
                  key={index}
                  title={item.header}
                  date={item.startDate + " - " + item.endDate}
                  location={
                    item.locations
                      ?.map((location) => location.country)
                      .join(", ") || ""
                  }
                  labels={item.labels}
                  name={user.name}
                  likes={2}
                  comments={4}
                /></TouchableOpacity>
              </>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;
