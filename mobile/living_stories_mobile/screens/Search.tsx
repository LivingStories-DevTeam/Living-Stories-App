import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../contexts/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../components/Card";
import DateTimePicker from "@react-native-community/datetimepicker";
import MonthSelector from "../components/MonthSelector";
import moment from "moment";
import SegmentedControlTab from "react-native-segmented-control-tab";
import RNPickerSelect from "react-native-picker-select";

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
  const [selectedMonth, setSelectedMonth] = useState<moment.Moment | null>(
    null
  );
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  ///////////////////////// TABS //////////////////////
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };
  const [selectedSecondIndex, setSelectedSecondIndex] = useState<number>(0);

  const handleSecondTabChange = (index: number) => {
    setSelectedSecondIndex(index);
  };
  const [selectedThirdIndex, setSelectedThirdIndex] = useState<number>(0);

  const handleThirdTabChange = (index: number) => {
    setSelectedThirdIndex(index);
  };
  const lat = route.params?.lat;
  const lng = route.params?.lng;
  const radius = route.params?.radius;
  const apiUrl = `${API_URL}/stories/search`;
  const handleCardPress = (storyId: number) => {
    navigation.navigate("Story", { storyId });
  };

  ///////////////////////// TABS END //////////////////////

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
  //////////////// Month Selector ///////////
  const handleMonthTapped = (selectedMonth: moment.Moment) => {
    console.log("Selected Month:", selectedMonth);
    setSelectedMonth(selectedMonth);
    toggleModal();
  };

  const handleYearChanged = (selectedYear: moment.Moment) => {
    console.log("Selected Year:", selectedYear);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  ////////////////////////////

  const seasons = [
    { label: "Spring", value: "Spring" },
    { label: "Summer", value: "Summer" },
    { label: "Autumn", value: "Autumn" },
    { label: "Winter", value: "Winter" },
  ];
  const decades = [
    { label: "1900s", value: "1900s" },
    { label: "1910s", value: "1910s" },
    { label: "1920s", value: "1920s" },
    { label: "1930s", value: "1930s" },
    { label: "1940s", value: "1940s" },
    { label: "1950s", value: "1950s" },
    { label: "1960s", value: "1960s" },
    { label: "1970s", value: "1970s" },
    { label: "1980s", value: "1980s" },
    { label: "1990s", value: "1990s" },
    { label: "2000s", value: "2000s" },
    { label: "2010s", value: "2010s" },
    { label: "2020s", value: "2020s" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            margin: 10,
          }}
        >
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
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            margin: 10,
          }}
        >
          <View style={{ margin: 5 }}>
            <SegmentedControlTab
              values={["Decade", "Date"]}
              selectedIndex={selectedIndex}
              onTabPress={handleTabChange}
            />
          </View>
          {selectedIndex === 0 && (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30%",
                  marginLeft: "35%", // Adjust this value based on your design
                  marginRight: "35%", // Adjust this value based on your design
                }}
              >
                <RNPickerSelect
                  placeholder={{ label: "Select a Decade", value: null }}
                  items={decades}
                  onValueChange={(value) => setSelectedDecade(value)}
                  style={pickerSelectStyles}
                />
              </View>
            </>
          )}
          {selectedIndex === 1 && (
            <>
              <View style={{ margin: 5 }}>
                <SegmentedControlTab
                  values={["Exact Date", "Interval Date"]}
                  selectedIndex={selectedSecondIndex}
                  onTabPress={handleSecondTabChange}
                />
              </View>
              {selectedSecondIndex === 0 && (
                <>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "30%",
                      marginLeft: "35%", // Adjust this value based on your design
                      marginRight: "35%", // Adjust this value based on your design
                    }}
                  >
                    <RNPickerSelect
                      placeholder={{ label: "Select a season", value: null }}
                      items={seasons}
                      onValueChange={(value) => setSelectedSeason(value)}
                      style={pickerSelectStyles}
                    />
                  </View>

                  <View style={{ margin: 5 }}>
                    <SegmentedControlTab
                      values={["Date", "Month", "Year"]}
                      selectedIndex={selectedThirdIndex}
                      onTabPress={handleThirdTabChange}
                    />
                  </View>
                  {selectedThirdIndex === 0 && (
                    <>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <DateTimePicker
                          value={date}
                          mode="date" // You can also use 'date' or 'time' mode
                          display="default" // 'default', 'spinner', or 'calendar' on Android, 'default' or 'spinner' on iOS
                        />
                      </View>
                    </>
                  )}
                  {selectedThirdIndex === 1 && (
                    <>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            toggleModal();
                          }}
                        >
                          <Text
                            style={{
                              backgroundColor: "#e3e3e3",
                              padding: 10,
                              borderRadius: 8,
                              fontSize: 18,
                            }}
                          >
                            {selectedMonth
                              ? selectedMonth.format("MMMM YYYY")
                              : "Select Month"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  {selectedThirdIndex === 2 && (
                    <>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text>Select Year</Text>
                      </View>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <MonthSelector
                selectedDate={moment(date)} // Convert to moment object
                currentDate={moment()} // Convert to moment object
                minDate={moment("01-01-2000", "DD-MM-YYYY")} // Convert to moment object
                maxDate={moment()} // Replace with your max date
                onMonthTapped={handleMonthTapped}
                onYearChanged={handleYearChanged}
                selectedBackgroundColor="#000" // Replace with your color
                selectedMonthTextStyle={{ color: "#fff" }} // Replace with your styles
                seperatorColor="#b6c3cb" // Replace with your color
                seperatorHeight={1} // Replace with your height
                nextText="Next"
                prevText="Prev"
                monthFormat="MMM"
                initialView={moment()} // Convert to moment object
                monthDisabledStyle={{ color: "#00000050" }} // Replace with your styles
                localeLanguage="en" // Replace with your desired locale
                localeSettings={{}} // Replace with your locale settings
                swipable={true}
                velocityThreshold={0.3}
                directionalOffsetThreshold={80}
                gestureIsClickThreshold={5}
              />

              <Button
                title="Close"
                onPress={() => {
                  toggleModal();
                }}
              />
            </View>
          </View>
        </Modal>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            margin: 10,
          }}
        >
          <Button
            title="Select Location"
            onPress={() => {
              navigation.replace("SearchMap");
            }}
          ></Button>
        </View>
        <View
          style={{
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            margin: 10,
          }}
        >
          <Button
            title="Search"
            onPress={() => {
              sendData();
            }}
          ></Button>
        </View>
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
    backgroundColor: "#1f6c5c",
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
  selectedDateContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%", // Adjust the width as needed
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center", // Center the content horizontally
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 28,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default Search;
