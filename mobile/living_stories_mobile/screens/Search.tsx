import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../contexts/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../components/Card";
import DateTimePicker from "@react-native-community/datetimepicker";

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
    city: string;
    country: string;
    name: string;
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

const Search = ({ route, navigation }: any) => {
  const [stories, setStories] = useState<StoryInt[]>();
  const [locations, setLocations] = useState<Location>();
  const [header, setHeader] = useState<string>();
  const [name, setName] = useState<string>();
  const [city, setCity] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [textStory, setText] = useState<string>();
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());


  const lat = route.params?.lat;
  const lng = route.params?.lng;
  const radius = route.params?.radius;
  const apiUrl = `${API_URL}/stories/search`;
  const handleCardPress = (storyId: number) => {
    navigation.navigate("Story", { storyId });
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const sendData = async () => {
    try {
      const response = await axios.post(apiUrl, {
        ...(name && { name: name }),
        ...(textStory && { text: textStory }),
        ...(header && { header: header }),
        ...(lat && { latitude: lat }),
        ...(lng && { longitude: lng }),
        ...(lng && { radius: radius }),
        ...(city && { city: city }),
        ...(country && { country: country }),
        ...(label && { label: label }),
      });

      console.log("Response:", label);
      setStories(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Text"
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Header"
          onChangeText={(text) => setHeader(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Label"
          onChangeText={(text) => setLabel(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(text) => setCity(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          onChangeText={(text) => setCountry(text)}
        />
      
      <DateTimePicker
          value={date}
          mode="date" // You can also use 'date' or 'time' mode
          display="default" // 'default', 'spinner', or 'calendar' on Android, 'default' or 'spinner' on iOS
         
        />
    

        <Button
          title="Select Location"
          onPress={() => {
            navigation.replace("SearchMap");
          }}
        ></Button>
        <Button
          title="Search"
          onPress={() => {
            sendData();
          }}
        ></Button>
        <View>
          {stories?.map((item: StoryInt, index: number) => (
            <>
              <TouchableOpacity onPress={() => handleCardPress(item.id)}>
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
                    item.locations[0].city + ", " + item.locations[0].country
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 8,
    alignSelf: "center",
  },
  input: {
    width: "70%",
    padding: 8,
    color: "black",
    backgroundColor: "rgba(242, 242, 242, 0.8)",
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default Search;
