import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import the Feather Icons library
import { Image } from "react-native";
import { ScrollView } from "react-native";

interface CardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  labels: string[];
  name: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  date,
  location,
  labels,
  name,
}) => {
  const styles = {
    tag: {
      backgroundColor: "#c9ffd8",
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 16,
      margin: 4,
    },
    tagText: {
      fontSize: 12,
      color: "#666",
    },
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        padding: 11,
        margin: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 12,
            color: "#666",
            position: "absolute",
            top: 1,
            left: 6,
          }}
        >
          <Feather name="map-pin" size={14} color="#666" /> {location}
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#666",
            position: "absolute",
            top: 1,
            right: 12,
          }}
        >
          {date}
        </Text>

        <Text style={{ fontSize: 18, marginTop: 22, fontWeight: "bold" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 8 }}>
          {description}
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
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
      <View style={{ flex: 0.2, marginLeft: 8, alignItems: "center" }}>
        <Image
          source={{
            uri: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />
        <Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default Card;
