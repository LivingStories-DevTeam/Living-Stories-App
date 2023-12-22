import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import the Feather Icons library
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CardProps {
  title: string;
  date: string;
  id: number;
  location: string;
  avatar: string;
  labels: string[];
  name: string;
  likes: number;
  comments: number;
  navigation: any;
}

const ProfileCard: React.FC<CardProps> = ({
  title,
  date,
  location,
  avatar,
  labels,
  id,
  name,
  likes,
  comments,
  navigation,
}) => {
  const styles = StyleSheet.create({
    tag: {
      backgroundColor: "#1f6c5c",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 16,
      margin: 2,
    },
    tagText: {
      fontSize: 12,
      color: "white",
    },
    cardContainer: {
      flexDirection: "row",
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
    avatarContainer: {
      flex: 0.2,
      alignItems: "center",
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    nameText: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    likesAndComments: {
      flexDirection: "row",
      marginTop: 12,
    },
    titleText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    locationText: {
      fontSize: 12,
      color: "#212121",
    },
    dateText: {
      fontSize: 12,
      color: "#212121",
    },
  });
  const handleEditPress = (storyId: number) => {
    navigation.navigate("EditStory", { storyId });
  };
  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.avatar}
        />
        <Text style={styles.nameText}>{name}</Text>
        <View style={styles.likesAndComments}>
          <Text>
            <Feather name="thumbs-up" size={14} color="#212121" /> {likes}
          </Text>
          <Text>
            <Feather name="message-circle" size={14} color="#212121" />{" "}
            {comments}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text style={styles.titleText}>{title}</Text>
        <View>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.locationText}>
              <Feather name="map-pin" size={14} color="#212121" /> {location}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 4,
                justifyContent: "space-between",
              }}
            >
              <View style={{
                flexDirection: "row",
              }}>
              <Feather
                name="clock"
                size={14}
                color="#212121"
                style={{ marginRight: 5 }}
              />
              <Text style={[styles.dateText, { color: "#212121" }]}>
                {date}
              </Text></View>
              <View style={{
                marginRight:10,
              }}>
              <TouchableOpacity onPress={() => handleEditPress(id)}>
                <Feather name="edit" size={30} color="#212121" />
              </TouchableOpacity></View>
            </View>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 8 }}
            >
              {labels &&
                labels.map((label, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{label}</Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
