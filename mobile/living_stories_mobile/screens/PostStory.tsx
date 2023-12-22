import axios from "axios";
import React, { useRef,useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from "react-native-maps";
import * as Location from "expo-location";
import { API_URL } from "../contexts/AuthContext";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
} from "react-native";
import { LayoutChangeEvent } from "react-native";

import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import PostStoryMap from "./PostStoryMap";
import { TChildrenRenderer } from "react-native-render-html";

interface Story {
  text: string;
  decade?: string;
  header: string;
  labels: string[];
  locations: LatLng[];
  mediaString?: string[];
  richText: string;
  startDate?: string;
  endDate?: string;
  startSeason?: string;
  endSeason?: string;
}

const PostStory = ({ navigation }: any) => {
  const TOKEN_KEY = "jtw_Token";
  const _editor = useRef<QuillEditor>(null);
  const [webtoken, setWebToken] = useState<string>();

  const [modalVisible, setModalVisible] = useState(false);

  const [editorContent, setEditorContent] = useState("<p>Hello my name is Sanan. Test from mobile.</p>");

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [radius, setRadius] = useState(0);

  ///////////////////////// DATES START

  const [date, setDate] = useState(new Date());
  const [datePickerStart, setDatePickerStart] = useState(new Date());
  const [datePickerEnd, setDatePickerEnd] = useState(new Date());
  ///// Select Season
  const [startSeason, setStartSeason] = useState("");
  const [endSeason, setEndSeason] = useState("");
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
    const formattedDate = `01/${year}/${month}`;

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
  

  const dateFormats: { [key: number]: string } = {
    0: "DD/MM/YYYY",
    1: "MM/YYYY",
    2: "YYYY",
  };


  const combinedStartDateTimeString = `${startDate && selectedThirdIndex === 0
  ? dayjs(
    `${startDate.format("YYYY-MM-DD")}`
  ).format("DD/MM/YYYY HH:mm:ss")
  : startDate?.format(dateFormats[selectedThirdIndex])
  }`;
  const combinedEndDateTimeString = `${endDate && selectedThirdIndex === 0
    ? dayjs(
      `${endDate.format("YYYY-MM-DD")}}`
    ).format("DD/MM/YYYY HH:mm:ss")
    : endDate?.format(dateFormats[selectedThirdIndex])
    }`;

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
  ///////////////////////// DATES END

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);

      setWebToken(token!);
    };
    loadToken();
    console.log(webtoken);
  }, []);

  const setJwtToken = `
    document.cookie = 'jwt_Token=${webtoken}; path=/;';
  `;

  const [header, setHeader] = useState<string>("");
  const [labels, setLabels] = useState<string[]>([]);

  const handleHeaderChange = (text: string): void => {
    setHeader(text);
  };

  const handleLabelsChange = (text: string): void => {
    setLabels(text.split(",").map((label) => label.trim()));
  };

  const removeLabel = (index: number): void => {
    setLabels((prevLabels) => prevLabels.filter((_, i) => i !== index));
  };

  /////////////////////EDITOR

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        // Manipulate the image to get its base64 representation
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 300 } }],
          { format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        // Insert the image into the Quill Editor
        const imageUrl = `data:image/jpeg;base64,${manipulatedImage.base64}`;

        // Get the current Quill editor content
        const currentContent = await _editor.current?.getContents();

        // Insert the image at the end of the content
        await _editor.current?.insertEmbed(
          currentContent?.length || 0,
          "image",
          imageUrl
        );
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        // Manipulate the image to get its base64 representation
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 300 } }],
          { format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        // Insert the image into the Quill Editor
        const imageUrl = `data:image/jpeg;base64,${manipulatedImage.base64}`;

        // Get the current Quill editor content
        const currentContent = await _editor.current?.getContents();

        // Insert the image at the end of the content
        await _editor.current?.insertEmbed(
          currentContent?.length || 0,
          "image",
          imageUrl
        );
      }
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };
  //////////////////// USER LOCATION
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
      setRadius(1);
      console.log("User Location:", { latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };
  const [selectedPlaces, setSelectedPlaces] = useState<Array<LatLng>>([]);

  const handleDataFromChild = (data: Array<LatLng>) => {
    // Callback function to receive data from the child component
    setSelectedPlaces(data);
  };
  ////////////////////// SUBMIT

  const submitStoryold = async () => {

    const storyRequest = {
      editorContent,
      header,
      labels,
      locationsAdvanced: selectedPlaces,
      //mediaString: media,
      richText: editorContent,
      ...(startDate && { startDate: startDate }),
      ...(endDate && { endDate: endDate }),
      ...(startSeason && { startSeason: startSeason }),
      ...(endSeason && { endSeason: endSeason }),
      ...(selectedDecade && { decade: selectedDecade })
    };
    async function postData() {
      const requiredFieldsEmpty = [storyRequest.richText, storyRequest.header, storyRequest.locationsAdvanced, storyRequest.startDate].some(
        (value) => value === undefined || value === "" 
      );
      if (requiredFieldsEmpty) {
        alert("The necessary field is empty! Please make sure necessary fields like header and text are not empty, and the story has a start date and at least one location.");
        return;
      } else {
        try {
          const response = await axios.post(
            `${API_URL}/stories/advanced`,
            storyRequest,
            {
              withCredentials: true,
            }
          );
        } catch (error) {
        }
      }
    }
    postData();

  };

  const submitStory = async () => {
    const storyRequest = {
      text:editorContent,
      header,
      labels,
      locations:selectedPlaces,
      //mediaString: media,
      richText: editorContent,
      ...(startDate && { startDate: combinedStartDateTimeString }),
      ...(endDate && { endDate: combinedEndDateTimeString }),
      ...(startSeason && { startSeason: startSeason }),
      ...(endSeason && { endSeason: endSeason }),
      ...(selectedDecade && { decade: selectedDecade })
    };
    async function postData() {
      const requiredFieldsEmpty = [
        storyRequest.richText,
        storyRequest.header,
        storyRequest.locations,
        storyRequest.startDate,
      ].some(
        (value) => value === undefined || value === "" 
      );

      if (requiredFieldsEmpty) {
        alert(
          "The necessary field is empty! Please make sure necessary fields like header and text are not empty, and the story has a start date and at least one location."
        );
        return;
      } else {
        try {
        
          console.log(storyRequest);
          const response = await axios.post(
            `${API_URL}/stories`,
            storyRequest,
            {
              withCredentials: true,
            }
          );

        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    postData();
  };



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust the offset as needed
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ backgroundColor: "#ebfff0" }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            Create Story
          </Text>

          <View style={{ marginLeft: 2, marginRight: 2 }}>
            <View>
              <View
                style={{
                  borderWidth: 3,
                  borderColor: "green", // Use your custom color
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 1,
                  paddingRight: 15,
                  paddingLeft: 15,
                  marginBottom: 10,
                  marginTop: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                  elevation: 2,
                }}
              >
                <View style={{ marginTop: 10 }}>
                  <Text>Title:</Text>
                  <TextInput
                    style={{
                      width: "100%",
                      padding: 10,
                      marginTop: 2,
                      borderColor: "green", // Use your custom color
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    onChangeText={handleHeaderChange}
                    value={header}
                  />
                </View>

                <View style={{ marginTop: 10, marginBottom: 10 }}>
                  <Text>Labels (comma-separated):</Text>
                  <TextInput
                    style={{
                      width: "100%",
                      padding: 10,
                      marginTop: 2,
                      borderColor: "green", // Use your custom color
                      borderWidth: 1,
                      borderRadius: 8,
                    }}
                    onChangeText={handleLabelsChange}
                    value={labels.join(", ")}
                  />
                </View>

                <ScrollView horizontal style={{ width: "100%" }}>
                  {labels.map((value, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#fff",
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#1f6c5c",
                            padding: 8,
                            borderRadius: 8,
                          }}
                        >
                          <Text style={{ color: "#fff" }}>{value}</Text>
                        </View>
                        <Text
                          style={{ color: "#ad0202", marginLeft: 5 }}
                          onPress={() => removeLabel(index)}
                        >
                          <Feather name="minus-circle" size={20} color="red" />
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View
              style={{
                borderWidth: 3,
                borderColor: "green", // Use your custom color
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 1,
                paddingRight: 15,
                paddingLeft: 15,
                marginBottom: 10,
                marginTop: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
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
                      marginRight: "35%",
                      marginVertical: 20, // Adjust this value based on your design
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
                          marginRight: "35%",
                          marginVertical: 20, // Adjust this value based on your design
                        }}
                      >
                        <Text>Season: </Text>
                        <Picker
                          selectedValue={startSeason}
                          onValueChange={(itemValue, itemIndex) =>
                            setStartSeason(itemValue)
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
                              justifyContent: "center",
                              alignItems: "center",
                              marginVertical: 1,
                            }}
                          >
                            <TouchableOpacity
                              onPress={showDatepicker}
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: 7,
                                borderRadius: 8,
                                marginVertical: 5,
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
                              marginVertical: 20,
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
                              marginVertical: 20,
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
                    <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          width: "30%",
                          marginLeft: "35%", // Adjust this value based on your design
                          marginRight: "35%",
                          marginVertical: 20, // Adjust this value based on your design
                        }}
                      >
                        <Text>Start Season: </Text>
                        <Picker
                          selectedValue={startSeason}
                          onValueChange={(itemValue, itemIndex) =>
                            setStartSeason(itemValue)
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
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          width: "30%",
                          marginLeft: "35%", // Adjust this value based on your design
                          marginRight: "35%",
                          marginVertical: 20, // Adjust this value based on your design
                        }}
                      >
                        <Text>End Season: </Text>
                        <Picker
                          selectedValue={endSeason}
                          onValueChange={(itemValue, itemIndex) =>
                            setEndSeason(itemValue)
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
                              justifyContent: "center",
                              alignItems: "center",
                              marginVertical: 5,
                            }}
                          >
                            <TouchableOpacity
                              onPress={showStartDatepicker}
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: 7,
                                borderRadius: 8,
                                marginVertical: 5,
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
                              marginVertical: 20,
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
                              marginVertical: 20,
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
                              justifyContent: "center",
                              alignItems: "center",
                              marginVertical: 5,
                            }}
                          >
                            <TouchableOpacity
                              onPress={showEndDatepicker}
                              style={{
                                backgroundColor: "#f2f2f2",
                                padding: 7,
                                borderRadius: 8,
                                marginVertical: 5,
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
                              marginVertical: 20,
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
                              marginVertical: 20,
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
                borderWidth: 3,
                borderColor: "green", // Use your custom color
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 1,
                paddingRight: 15,
                paddingLeft: 15,
                marginBottom: 10,
                marginTop: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text>Select Locations:</Text>
                <TextInput
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 2,
                    marginBottom: 2,
                    borderColor: "green", // Use your custom color
                    borderWidth: 1,
                    borderRadius: 8,
                  }}
                />
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
                        backgroundColor: "#c5e8ce",
                        padding: 13,
                        borderRadius: 50,
                        width: 120,
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Image
                          source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/854/854929.png",
                          }}
                          style={{ width: 80, height: 80 }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#c5e8ce",
                        padding: 15,
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
                  <Text></Text>
                </View>
              </View>

              {selectedPlaces.map((place, index) => (
                <Text>{place.longitude}</Text>
              ))}
              <Text>
                {lat && lng ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setLat(0);
                        setLng(0);
                        setRadius(0);
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
                        Clear My Location
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text></Text>
                )}
              </Text>
            </View>
             <View
                style={{
                  flex: 1,
                  borderWidth: 3,
                  borderColor: "green", // Use your custom color
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  minHeight: 250,
                }}
              >
                <ScrollView>
                  <QuillEditor
                    ref={_editor}
                    initialHtml="<h1>Enter Your Story Here</h1>"
                    style={{
                      ...Platform.select({
                        ios: {
                          minHeight: 500,
                          maxHeight: "auto",
                        },
                        android: {
                          minHeight: 500,
                          maxHeight: "auto",
                        },
                      }),
                    }}
                    onHtmlChange={({ html }) => {
                      setEditorContent(html);
                    }}
                  />
                </ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#ededed",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={pickImage}
                  >
                    <Feather name="image" size={28} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={submitStory}
                  >
                    <Feather name="camera" size={28} color="black" />
                  </TouchableOpacity>
                  <QuillToolbar editor={_editor} options="full" theme="light" />
                </View>
              </View>
          </View>
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{ width: "90%", height: "90%", backgroundColor: "white" }}
            >
              <PostStoryMap onLocationChange={handleDataFromChild} />
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  console.log(selectedPlaces);
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View
          style={{
            marginHorizontal: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
            marginBottom: 25,
          }}
        >
          <TouchableOpacity
            style={{
              marginHorizontal: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={submitStory}
          >
            <Feather name="send" size={28} color="black" />
            <Text>Post Story</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  container: {
    flexGrow: 1,
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
export default PostStory;
