// ActivityButton.styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
  },
  notificationContainer: {
    flexDirection: "column",
  },
  notificationBadge: {
    backgroundColor: "red",
    height: 15,
    width: 15,
    borderRadius: 20,
    zIndex: 1,
    position: "absolute",
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    color: "white",
    fontSize:10,
    fontWeight: "bold",
  },
  bellIcon: {
    color: "#1f6c5c",
  },
});

// ActivityButton.tsx
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import axios from "axios";
import { API_URL } from "../contexts/AuthContext";
import { AntDesign } from "@expo/vector-icons";

interface NumberButtonProps {
  onButtonPress?: () => void;
}

const ActivityButton: React.FC<NumberButtonProps> = ({ onButtonPress }) => {
  const [number, setNumber] = useState<number>(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/activity/newactivitycount`);
      const newNumber = response.data;

      if (newNumber !== number) {
        setNumber(newNumber);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every minute
    const intervalId = setInterval(fetchData, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [number]);

  const handleButtonClick = () => {
    // Call the parent component's callback function
    if (onButtonPress) {
      onButtonPress();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleButtonClick}>
        {number !== 0 ? (
          <Text>
            <View style={styles.notificationContainer}>
              <View style={styles.notificationBadge}>
                {number>9  ? <Text style={styles.notificationText}>+9</Text>:<Text style={styles.notificationText}>{number}</Text>  }
                
              </View>
              <AntDesign name="bells" size={30} style={styles.bellIcon} />
            </View>
          </Text>
        ) : (
          <Text>
            <AntDesign name="bells" size={30} style={styles.bellIcon} />
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ActivityButton;
