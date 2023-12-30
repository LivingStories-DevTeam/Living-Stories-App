import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
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
  Alert,
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

const EdittStory = ({ navigation, route }: any) => {
  const { storyId } = route.params;

  const _editor = useRef<QuillEditor>(null);
  const [webtoken, setWebToken] = useState<string>();
  const [storyResponse, setStoryResponse] = useState<Story>();
  const [editorContent, setEditorContent] = useState<string>(
    "<p>Enter Your Story Here</p>"
  );

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/stories/${storyId}`);
      setStoryResponse(response.data);
      const responseData = response.data;

      // Update state directly from response.data

      setEditorContent(responseData.richText);
      setHeader(responseData.header);
      setLabels(responseData.labels);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [storyId]);

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
  interface Location {
    name: string;
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    coordinates: any[][];
    type: string;
  }

  const submitStory = async () => {
    const storyRequest = {
      header,
      labels,

      //mediaString: media,
      richText: editorContent,
    };
    async function postData() {
      const requiredFieldsEmpty = [
        storyRequest.richText,
        storyRequest.header,
        storyRequest.labels,
      ];

      try {
        console.log("Editor: " + storyRequest.richText);
        console.log(storyRequest);

        const response = await axios.post(
          `${API_URL}/stories/edit/${storyId}`,
          storyRequest
        );
        if (response.status === 200) {
          Alert.alert(
            "Success",
            "You have edited the story successfully.",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.replace("Story", { storyId });
                },
                style: "default", // Button style: 'default' (default), 'cancel', 'destructive'
              },
            ],
            { cancelable: false } // Prevent dismissing the alert by tapping outside of it
          );

          // Set the values to null after a successful response
        }
      } catch (error) {
        console.error("Error:", error);
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
        <View style={{ backgroundColor: "#ebfff0", height:"auto" }}>
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
            </View>{loading ? (<Text>Loading your Story...</Text>) : (<ScrollView><QuillEditor
                  ref={_editor}
                  initialHtml={editorContent}
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
                    console.log(html);
                  }}
                /></ScrollView>)}<View
              style={{
                flexDirection: "row",
                backgroundColor: "#ededed",
              }}
            ><TouchableOpacity
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
                onPress={takePhoto}
              >
                <Feather name="camera" size={28} color="black" />
              </TouchableOpacity>
              <QuillToolbar editor={_editor} options="full" theme="light" />
            </View>
          </View>
        </View>

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
export default EdittStory;
