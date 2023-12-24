import axios from "axios";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "../contexts/AuthContext";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../components/Card";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import SearchMap from "./SearchMap";

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

interface User {
  id: number;
  name: string;
  photo?: string | null;
  followers?: User[];
  stories?: StoryInt[];
  following?: User[];
}

interface Language {
  label: string;
  value: string;
}
const Search = ({ route, navigation }: any) => {
  const [stories, setStories] = useState<StoryInt[]>();
  const [users, setUsers] = useState<User[]>();
  const [header, setHeader] = useState<string>();
  const [name, setName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [city, setCity] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [textStory, setText] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [datePickerStart, setDatePickerStart] = useState(new Date());
  const [datePickerEnd, setDatePickerEnd] = useState(new Date());
  ///// Select Season
  const [selectedSeason, setSelectedSeason] = useState(null);
  ///// Select Month
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedMonthYear, setSelectedMonthYear] = useState(2023);
  const [selectedStartMonth, setSelectedStartMonth] = useState(1);
  const [selectedStartMonthYear, setSelectedStartMonthYear] = useState(2023);
  const [selectedEndMonth, setSelectedEndMonth] = useState(1);
  const [selectedEndMonthYear, setSelectedEndMonthYear] = useState(2023);
  const [selectedDate, setSelectedDate] = useState(
    `${selectedMonth}/${selectedMonthYear}`
  );
  const [selectedStartDate, setSelectedStartDate] = useState(
    `${selectedStartMonth}/${selectedStartMonthYear}`
  );
  const [selectedEndDate, setSelectedEndDate] = useState(
    `${selectedEndMonth}/${selectedEndMonthYear}`
  );

  /////Select Decade
  const [selectedDecade, setSelectedDecade] = useState(0);
  /////Select Year
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedEndYear, setSelectedEndYear] = useState(0);
  ///////////////////////// TABS //////////////////////
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
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
  /////
  const [lat, setLat] = useState(route.params?.lat);
  const [lng, setLng] = useState(route.params?.lng);
  const [radius, setRadius] = useState(route.params?.radius);
  const apiSearchUrl = `${API_URL}/stories/search`;
  const apiUserSearchUrl = `${API_URL}/users/findusers`;
  console.log("Radius " + radius + " lat,lng " + lat, lng);
  ////////////////// GET USER LOCATION //////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  const getUserLocation = async () => {
    try {
      // Request permission to access location
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      // Get user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLat(latitude);
      setLng(longitude);
      setRadius(2000);
      console.log("User Location:", { latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  /////////////////////////////////////////////////////////////
  const handleCardPress = (storyId: number) => {
    navigation.navigate("Story", { storyId });
  };

  const [selectedSearchIndex, setSelectedSearchIndex] = useState<number>(0);

  const handleSearchTabChange = (index: number) => {
    setSelectedSearchIndex(index);
  };
  ///////////////////////// TABS END //////////////////////
  const handleYearChange = (value: number) => {
    const selectedDate = dayjs(`${value}-01-01`, yearFormat); // Assuming the date is January 1st of the selected year
    const start = selectedDate.subtract(1, "year");
    const endDate = selectedDate.add(1, "year");

    setStartDate(start);
    setSelectedYear(value);
    setEndDate(endDate);
  };

  const handleStartYearChange = (value: number) => {
    const selectedDate = dayjs(`${value}-01-01`, yearFormat); // Assuming the date is January 1st of the selected year
    const start = selectedDate.subtract(1, "year");

    setStartDate(start);
    setSelectedYear(value);
  };
  const handleEndYearChange = (value: number) => {
    const selectedDate = dayjs(`${value}-01-01`, yearFormat); // Assuming the date is January 1st of the selected year

    const endDate = selectedDate.add(1, "year");

    setEndDate(endDate);
    setSelectedEndYear(value);
  };
  const sendData = async () => {
    try {
      const response = await axios.post(apiSearchUrl, {
        ...(name && { name: name }),
        ...(textStory && { text: textStory }),
        ...(header && { header: header }),
        ...(lat && { latitude: lat }),
        ...(lng && { longitude: lng }),
        ...(lng && { radius: radius / 1000 }),
        ...(city && { city: city }),
        ...(country && { country: country }),
        ...(label && { label: label }),
        ...(startDate && { startDate: startDate?.format(exactDateFormat) }),
        ...(endDate && { endDate: endDate?.format(exactDateFormat) }),
      });

      console.log(
        "Response:",
        label + "date: " + startDate?.format(exactDateFormat)
      );
      console.log("Radius " + radius + " lat,lng " + lat, lng);
      setStories(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };
  /////////////////////// USER SEARCH
  const GetUsers = async () => {
    try {
      const response = await axios.post(apiUserSearchUrl, { name: username });

      console.log("Response:", response);
      setUsers(response.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };
  ///////////////////////////////////
  //////////////// Month Selector ///////////

  const handleMonthChange = (itemValue: number) => {
    setSelectedMonth(itemValue);
    updateSelectedDate(itemValue, selectedMonthYear);
  };

  const handleMonthYearChange = (itemValue: number) => {
    setSelectedMonthYear(itemValue);
    updateSelectedDate(selectedMonth, itemValue);
  };

  const updateSelectedDate = (month: number, year: number) => {
    const formattedDate = `${year}-${month}-01`;

    const start = dayjs(formattedDate, monthFormat);
    const endDate = dayjs(formattedDate, monthFormat);
    setStartDate(start.subtract(1, "month"));

    setEndDate(endDate.add(1, "month"));

    setSelectedDate(formattedDate);
  };
  ////////////////////////////
  //////////////// Month Start Selector ///////////

  const handleStartMonthChange = (itemValue: number) => {
    setSelectedMonth(itemValue);
    updateStartSelectedDate(itemValue, selectedStartMonthYear);
  };

  const handleStartMonthYearChange = (itemValue: number) => {
    setSelectedStartMonthYear(itemValue);
    updateStartSelectedDate(selectedStartMonth, itemValue);
  };

  const updateStartSelectedDate = (month: number, year: number) => {
    const formattedDate = `${year}-${month}-01`;

    const start = dayjs(formattedDate, monthFormat);
    setStartDate(start.subtract(1, "month"));

    setSelectedStartDate(formattedDate);
  };
  ////////////////////////////
  //////////////// Month End Selector ///////////

  const handleEndMonthChange = (itemValue: number) => {
    setSelectedEndMonth(itemValue);
    updateEndSelectedDate(itemValue, selectedEndMonthYear);
  };

  const handleEndMonthYearChange = (itemValue: number) => {
    setSelectedEndMonthYear(itemValue);
    updateEndSelectedDate(selectedEndMonth, itemValue);
  };

  const updateEndSelectedDate = (month: number, year: number) => {
    const formattedDate = `${year}-${month}-01`;

    const endDate = dayjs(formattedDate, monthFormat);

    setEndDate(endDate.add(1, "month"));

    setSelectedEndDate(formattedDate);
  };
  ////////////////////////////

  const seasons = [
    { label: "Spring", value: "Spring" },
    { label: "Summer", value: "Summer" },
    { label: "Autumn", value: "Autumn" },
    { label: "Winter", value: "Winter" },
  ];
  const decades = [
    { value: 1901, label: "1900s" },
    { value: 1911, label: "1910s" },
    { value: 1921, label: "1920s" },
    { value: 1931, label: "1930s" },
    { value: 1941, label: "1940s" },
    { value: 1951, label: "1950s" },
    { value: 1961, label: "1960s" },
    { value: 1971, label: "1970s" },
    { value: 1981, label: "1980s" },
    { value: 1991, label: "1990s" },
    { value: 2001, label: "2000s" },
    { value: 2011, label: "2010s" },
    { value: 2021, label: "2020s" },
  ];
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const exactDateFormat = "DD/MM/YYYY";
  const yearFormat = "YYYY";
  const monthFormat = "MM/YYYY";

  const generateYears = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push({ value: year, label: year.toString() });
    }
    return years;
  };
  const years = generateYears(1880, 2023);

  const handleDecadeChange = (value: number) => {
    const decStartString = (value - 2).toString();
    const decEndString = (value + 8).toString();
    setStartDate(dayjs(decStartString, yearFormat));
    setEndDate(dayjs(decEndString, yearFormat));
    console.log(endDate);
    setSelectedDecade(value);
  };

  const handleDataFromChild = (latit: number, long: number, rad: number) => {
    // Callback function to receive data from the child component
    setLat(latit);
    setLng(long);
    setRadius(rad);
    console.log(latit, long, rad);
  };

  console.log(startDate);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };
  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };
  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };
  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      const start = dayjs(selectedDate, exactDateFormat);
      const end = dayjs(selectedDate, exactDateFormat);
      setDate(selectedDate);
      setStartDate(start.subtract(1, "day"));
      setEndDate(end.add(1, "day"));
    }

    setShowDatePicker(false);
  };
  const handleStartDateChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      const start = dayjs(selectedDate, exactDateFormat);

      setDatePickerStart(selectedDate);
      setStartDate(start.subtract(1, "day"));
    }

    setShowStartDatePicker(false);
  };
  const handleEndDateChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      const end = dayjs(selectedDate, exactDateFormat);
      setDatePickerEnd(selectedDate);

      setEndDate(end.add(1, "day"));
    }

    setShowEndDatePicker(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "white", padding: 4, borderRadius: 10 }}>
        <SegmentedControlTab
          values={["Story", "User"]}
          selectedIndex={selectedSearchIndex}
          onTabPress={handleSearchTabChange}
          tabStyle={{ borderColor: "#1f6c5c", backgroundColor: "white" }}
          activeTabStyle={{ backgroundColor: "#1f6c5c" }}
          tabTextStyle={{ color: "#1f6c5c" }}
        />
      </View>
      {selectedSearchIndex === 0 && (
        <>
          <ScrollView keyboardShouldPersistTaps="always">
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
                margin: 10,
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
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
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TextInput
                  style={styles.input}
                  placeholder="Text"
                  onChangeText={(text) => setText(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Author"
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
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
                  tabStyle={{
                    borderColor: "#1f6c5c",
                    backgroundColor: "white",
                  }}
                  activeTabStyle={{ backgroundColor: "#1f6c5c" }}
                  tabTextStyle={{ color: "#1f6c5c" }}
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
                    <Picker
                      selectedValue={selectedDecade}
                      onValueChange={handleDecadeChange}
                      style={{ width: 150 }}
                    >
                      {decades.map((decade, index) => (
                        <Picker.Item
                          key={index}
                          label={decade.label}
                          value={decade.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              )}
              {selectedIndex === 1 && (
                <>
                  <View style={{ margin: 5 }}>
                    <SegmentedControlTab
                      values={["Exact Date", "Interval Date"]}
                      selectedIndex={selectedSecondIndex}
                      tabStyle={{
                        borderColor: "#1f6c5c",
                        backgroundColor: "white",
                      }}
                      activeTabStyle={{ backgroundColor: "#1f6c5c" }}
                      tabTextStyle={{ color: "#1f6c5c" }}
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
                        <Picker
                          selectedValue={selectedSeason}
                          onValueChange={(itemValue, itemIndex) =>
                            setSelectedSeason(itemValue)
                          }
                          style={{ width: 150 }} // Adjust the width as needed
                        >
                          {seasons.map((season, index) => (
                            <Picker.Item
                              key={index}
                              label={season.label}
                              value={season.value}
                            />
                          ))}
                        </Picker>
                      </View>

                      <View style={{ margin: 5 }}>
                        <SegmentedControlTab
                          values={["Date", "Month", "Year"]}
                          selectedIndex={selectedThirdIndex}
                          onTabPress={handleThirdTabChange}
                          tabStyle={{
                            borderColor: "#1f6c5c",
                            backgroundColor: "white",
                          }}
                          activeTabStyle={{ backgroundColor: "#1f6c5c" }}
                          tabTextStyle={{ color: "#1f6c5c" }}
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
                            <TouchableOpacity
                              onPress={showDatepicker}
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: 7,
                                borderRadius: 8,
                              }}
                            >
                              <Text>
                                {startDate?.format(exactDateFormat)}-
                                {endDate?.format(exactDateFormat)}
                              </Text>
                              {showDatePicker && (
                                <DateTimePicker
                                  value={date}
                                  mode="date"
                                  display="spinner"
                                  onChange={handleDateChange}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {selectedThirdIndex === 1 && (
                        <>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Picker
                              selectedValue={selectedMonth}
                              onValueChange={handleMonthChange}
                              style={{ width: 150 }}
                            >
                              {months.map((month, index) => (
                                <Picker.Item
                                  key={index}
                                  label={month.label}
                                  value={month.value}
                                />
                              ))}
                            </Picker>
                            <Picker
                              selectedValue={selectedMonthYear}
                              onValueChange={handleMonthYearChange}
                              style={{ width: 150 }}
                            >
                              {years.map((year, index) => (
                                <Picker.Item
                                  key={index}
                                  label={year.label}
                                  value={year.value}
                                />
                              ))}
                            </Picker>
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
                            <Picker
                              selectedValue={selectedYear}
                              onValueChange={handleYearChange}
                              style={{ width: 150 }}
                            >
                              {years.map((year, index) => (
                                <Picker.Item
                                  key={index}
                                  label={year.label}
                                  value={year.value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                    </>
                  )}
                  {selectedSecondIndex === 1 && (
                    <>
                      <View style={{ margin: 5 }}>
                        <SegmentedControlTab
                          values={["Start Date", "Start Month", "Start Year"]}
                          selectedIndex={selectedThirdIndex}
                          onTabPress={handleThirdTabChange}
                          tabStyle={{
                            borderColor: "#1f6c5c",
                            backgroundColor: "white",
                          }}
                          activeTabStyle={{ backgroundColor: "#1f6c5c" }}
                          tabTextStyle={{ color: "#1f6c5c" }}
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
                            <TouchableOpacity
                              onPress={showStartDatepicker}
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: 7,
                                borderRadius: 8,
                              }}
                            >
                              <Text>{startDate?.format(exactDateFormat)}</Text>
                              {showStartDatePicker && (
                                <DateTimePicker
                                  value={datePickerStart}
                                  mode="date"
                                  display="spinner"
                                  onChange={handleStartDateChange}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {selectedThirdIndex === 1 && (
                        <>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Picker
                              selectedValue={selectedStartMonth}
                              onValueChange={handleStartMonthChange}
                              style={{ width: 150 }}
                            >
                              {months.map((month, index) => (
                                <Picker.Item
                                  key={index}
                                  label={month.label}
                                  value={month.value}
                                />
                              ))}
                            </Picker>
                            <Picker
                              selectedValue={selectedStartMonthYear}
                              onValueChange={handleStartMonthYearChange}
                              style={{ width: 150 }}
                            >
                              {years.map((year, index) => (
                                <Picker.Item
                                  key={index}
                                  label={year.label}
                                  value={year.value}
                                />
                              ))}
                            </Picker>
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
                            <Picker
                              selectedValue={selectedYear}
                              onValueChange={handleStartYearChange}
                              style={{ width: 150 }}
                            >
                              {years.map((year, index) => (
                                <Picker.Item
                                  key={index}
                                  label={year.label}
                                  value={year.value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                      <View style={{ margin: 5 }}>
                        <SegmentedControlTab
                          values={["End Date", "End Month", "End Year"]}
                          selectedIndex={selectedThirdIndex}
                          onTabPress={handleThirdTabChange}
                          tabStyle={{
                            borderColor: "#1f6c5c",
                            backgroundColor: "white",
                          }}
                          activeTabStyle={{ backgroundColor: "#1f6c5c" }}
                          tabTextStyle={{ color: "#1f6c5c" }}
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
                            <TouchableOpacity
                              onPress={showEndDatepicker}
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: 7,
                                borderRadius: 8,
                              }}
                            >
                              <Text>{endDate?.format(exactDateFormat)}</Text>
                              {showEndDatePicker && (
                                <DateTimePicker
                                  value={datePickerEnd}
                                  mode="date"
                                  display="spinner"
                                  onChange={handleEndDateChange}
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {selectedThirdIndex === 1 && (
                        <>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Picker
                              selectedValue={selectedEndMonth}
                              onValueChange={handleEndMonthChange}
                              style={{ width: 150 }}
                            >
                              {months.map((month, index) => (
                                <Picker.Item
                                  key={index}
                                  label={month.label}
                                  value={month.value}
                                />
                              ))}
                            </Picker>
                            <Picker
                              selectedValue={selectedEndMonthYear}
                              onValueChange={handleEndMonthYearChange}
                              style={{ width: 150 }}
                            >
                              {years.map((year, index) => (
                                <Picker.Item
                                  key={index}
                                  label={year.label}
                                  value={year.value}
                                />
                              ))}
                            </Picker>
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
                            <Picker
                              selectedValue={selectedEndYear}
                              onValueChange={handleEndYearChange}
                              style={{ width: 150 }}
                            >
                              {years.map((year, index) => (
                                <Picker.Item
                                  key={index}
                                  label={year.label}
                                  value={year.value}
                                />
                              ))}
                            </Picker>
                          </View>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </View>
            <View
              style={{
                alignItems: "center", // Center horizontally
                justifyContent: "center", // Center vertically
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 13,
                    borderRadius: 50,
                    width: 120,
                    margin: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/854/854929.png",
                      }}
                      style={{ width: 80, height: 80 }}
                    />
                  </TouchableOpacity>
                </View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "90%",
                        height: "90%",
                        backgroundColor: "white",
                      }}
                    >
                      <SearchMap onLocationChange={handleDataFromChild} />
                    </View>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Text style={styles.buttonText}>Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <View
                  style={{
                    backgroundColor: "white",
                    padding: 13,
                    borderRadius: 50,
                    width: 60,
                    height: 60,
                    margin: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={getUserLocation}>
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1540/1540908.png",
                      }}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text>
                {lat && lng ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setLat("");
                        setLng("");
                        setRadius("");
                      }}
                      style={{
                        backgroundColor: "#731300",
                        margin: 10,
                        borderRadius: 7,
                        padding: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Clear Location
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 15,
                          borderRadius: 50,
                          margin: 10,
                          width:110,
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center", justifyContent: "center"
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center", justifyContent: "center"
                          }}
                          onPress={() => {
                            const adjustedRadius = radius;
                            navigation.navigate("Timeline", {
                              lat,
                              lng,
                              radius: adjustedRadius,
                            });
                          }}
                        >
                         <Text>Timeline </Text><Feather name="clock" size={20} color="#212121" />
                        </TouchableOpacity>
                      </View>
                      
                    </View>
                  </>
                ) : (
                  <Text></Text>
                )}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  borderRadius: 50,
                  margin: 10,
                  width: 80,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    sendData();
                  }}
                >
                  <Feather name="search" size={50} color="#212121" />
                </TouchableOpacity>
              </View>
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
                        item.locations[0].city +
                        ", " +
                        item.locations[0].country
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
        </>
      )}
      {selectedSearchIndex === 1 && (
        <>
          <ScrollView>
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 10,
                margin: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={styles.Userinput}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    GetUsers();
                  }}
                >
                  <MaterialIcons name="person-search" size={50} color="black" />
                </TouchableOpacity>
              </View>
              {users?.map((user) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Profile", {
                        name: user?.name,
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
                        <Text style={secondStyles.userName}>{user.name}</Text>
                      </View>
                      <View style={secondStyles.likeCount}>
                        <Text>
                          <Feather name="users" size={25} color="#212121" />
                          {user.followers?.length}
                        </Text>
                        <Text style={{ marginRight: 4 }}>
                          <Feather name="book" size={25} color="#212121" />{" "}
                          {user?.stories?.length}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              ))}
            </View>
          </ScrollView>
        </>
      )}
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
    width: "50%",
    padding: 8,
    color: "black",
    backgroundColor: "rgba(242, 242, 242, 0.8)",
    marginBottom: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
  Userinput: {
    width: "70%",
    padding: 8,
    color: "black",
    backgroundColor: "rgba(242, 242, 242, 0.8)",
    marginBottom: 16,
    marginRight: 20,
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
  button: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1f6c5c",
    padding: 10,
    borderRadius: 10,
    alignContent: "center",
    marginBottom: 50,
    flex: 1,
    marginLeft: 150,
  },
  buttonText: {
    color: "white",
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

export default Search;
