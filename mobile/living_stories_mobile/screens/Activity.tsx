import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "../contexts/AuthContext";

type requestObject = {
    id: number;
    user_id: number;
    user_name: string;
    user_media: string | null; 
    action_type: string;
    story_id: number | null; 
    story_title: string | null; 
    following_id: number;
    following_name: string;
    action_timestamp: string;
    newFlag: string;
  };
  

const Activity = ({ route, navigation }: any) => {
  const [activities,setActivities] = useState<requestObject[]>()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/activity`); 
        setActivities(response.data)
        console.log(response.data)
       
      } catch (error) {
        
      }
    };

    fetchData(); // Call the function to initiate the Axios request

    // If you need to perform cleanup or want to add dependencies, do it here
    // For example: return () => cleanupFunction();
  }, []); // The empty dependency array ensures the effect runs once when the component mounts

  const generateText = (
    actionType: string,
    user_name: string,
    story_title?: string,
    following_name?: string
  ) => {
    if (actionType === "L") {
      return `${user_name} liked the story ${story_title}!`;
    } else if (actionType === "C") {
      return `${user_name}  commented on story ${story_title}!`;
    } else if (actionType === "F") {
      return `${user_name} followed the user ${following_name}!`;
    }
    else if (actionType === "S") {
      return `${user_name} posted story ${story_title}!`;
    }
  };
  const onPressHandler = (
    actionType: string,
    story_id?: number,
    following_name?: string,
  ) => {
    if (actionType === "L" || actionType === "C" || actionType=='S') {
      navigation.navigate("Story", { storyId:story_id })
    } else if (actionType === "F") {
        navigation.navigate("Profile", {
            name: following_name,
          });
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {activities?.map((item: any, index: number) => (
          <TouchableOpacity
            onPress={() => onPressHandler(item.action_type,item.story_id,item.following_name)}
          >
            <View key={index} style={styles.notBox}>
              {item.newFlag === 'Y' &&<View style={styles.redAlert}></View>}
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: item.user_media
                      ? item.user_media
                      : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1698542998~exp=1698543598~hmac=f1dde6bce65fc668784143b9e47139ffd1813927888979fa849950d62a7088fd",
                  }}
                  style={styles.avatar}
                />
              </View>

              <Text style={styles.text}>
                {generateText(
                  item.action_type,
                  item.user_name,
                  item.story_title,
                  item.following_name
                )}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  text: {
    flex: 0.95,
    marginLeft: 10,
    marginRight: 10,
  },
  notBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    margin: 10,
    width: "100%",
    borderColor: "#000000", // Use the correct property name
    borderWidth: 0.1,
  },
  redAlert: {
    
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: "red",
    top:0,
    marginTop:5,
    marginLeft: 33,
    position:'absolute',
    zIndex:1

  },
});
export default Activity;
