import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";

import MapView, { LatLng, Marker } from "react-native-maps";
import { Google_Api_Key } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Feather } from "@expo/vector-icons";
import { googleMapIsInstalled } from "react-native-maps/lib/decorateMapComponent";

interface Location {
  name: string;
  lat: number;
  lng: number;
  city?:string;
  country?:string;
  type : string;
  coordinates:any [][]
}


const PostStoryMap = ({ route, navigation, onLocationChange }: any) => {
  const [region, setRegion] = useState<LatLng>({
    latitude: 41.0864,
    longitude: 29.0455,
  });

  const [selectedPlaces, setSelectedPlaces] = useState<Array<LatLng>>([]);
  const [selectedPlacesNames, setSelectedPlacesNames] = useState<Array<string>>(
    []
  );
  const [finalPlaces, setFinalPlaces] = useState<Array<Location>>(
    []
  );
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
      setRegion({
        latitude:latitude , 
        longitude:longitude
      });
      console.log("User Location:", { latitude, longitude });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleSendData = () => {
    // Call the callback function to send data to the parent
    onLocationChange(finalPlaces);
    console.log(finalPlaces);
 
  };
  const handleMapPress = async (event: {
    nativeEvent: { coordinate: LatLng };
  }) => {
    const { coordinate } = event.nativeEvent;
    setRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    // Add the selected place to the array

    
    const locationDetails = await getLocationDetails(coordinate.latitude, coordinate.longitude);
    console.log(locationDetails);
    setSelectedPlaces([...selectedPlaces, coordinate]);
    setFinalPlaces([...finalPlaces, locationDetails]);
  };


const getLocationDetails = async (latitude: number, longitude: number): Promise<Location> => {

  try {
    
    const locationNameResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Google_Api_Key}`
    );
    const { results } = locationNameResponse.data;
    const placeName = results[0]?.formatted_address || "Unknown Place";

    let city = "";
    let country = "";
    results.forEach((item: any) => {
      item.address_components.forEach((subItem: any) => {
        if (subItem.types.includes("administrative_area_level_1") || subItem.types.includes("locality"))
          city = subItem.long_name;
        if (subItem.types.includes("country"))
          country = subItem.long_name;
      });
    });

    return {
      name: placeName,
      lat: latitude,
      lng: longitude,
      city: city,
      country: country,
      type : "Point",
      coordinates: [[longitude  ,latitude]]
    };
  } catch (error) {
    console.error("Error fetching location details:", error);
    return {
      name: "Unknown Place",
      lat: latitude,
      lng: longitude,
      city: "Unnamed location",
      country: "Unnamed location",
      type : "Point",
      coordinates: [[longitude  ,latitude]]
    };
  }
};
  
  
  const handleDeletePress = (index: number) => {
    // Remove the element at the specified index from the array
    finalPlaces.splice(index, 1);
    selectedPlaces.splice(index, 1);


    // Update the state with the modified array
    setFinalPlaces([...finalPlaces]);
    setSelectedPlaces([...selectedPlaces]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autoCompleteContainer}>
        <GooglePlacesAutocomplete
          styles={styles.autoComplete}
          placeholder="Search for location"
          onPress={async (data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?place_id=${details?.place_id}&key=${Google_Api_Key}`
            );
            const rep = response.data;

            // Extract latitude and longitude
            const location = rep.results[0].geometry.location;

            const lat = location.lat;
            const lng = location.lng;
            setRegion({ latitude: lat, longitude: lng });
            console.log(lat);
          }}
          onFail={(error) => console.error(error)}
          enablePoweredByContainer={false}
          query={{
            key: Google_Api_Key,
            language: "en",
          }}
        />
      </View>

      <MapView
        style={styles.map}
        region={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        onPress={handleMapPress}
      >
        {selectedPlaces.map((place, index) => (
          <Marker
            key={index}
            coordinate={place}

          />
        ))}
      </MapView>
      <ScrollView
        style={{
          position: "absolute",
          top: 73,
          height: 130,
          width: "100%",
          zIndex: 1,
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {finalPlaces.map((address, index) => (
            <View style={styles.locTextContainer} key={index}>
              <View style={styles.textContainer}>
                <Text style={styles.locText}>
                  {finalPlaces[index].name.substring(0, 25)}...
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleDeletePress(index)}>
                  <Feather name="trash" size={28} color="#b32319" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.button}>
        <TouchableOpacity onPress={handleSendData}>
          <Text style={styles.buttonText}>Add Locations</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.button , {end:0}]}>
        <TouchableOpacity onPress={getUserLocation}>
          <Text style={styles.buttonText}>Get My Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    borderColor: "#1f6c5c", // Set border color to green
    borderWidth: 2, // Set border thickness
    borderRadius: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  autoCompleteContainer: {
    position: "absolute",
    width: "90%",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    top: 0,
    zIndex: 999,
  },
  autoComplete: {
    flex: 1,
    zIndex: 999,
  },
  radiusText: {
    position: "absolute",
    marginBottom: 10,
    right: 0,
  },

  button: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1f6c5c",
    padding: 10,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",

    margin: 6,
    flex: 1,
  },
  locText: {
    color: "white",
  },
  locTextContainer: {
    backgroundColor: "#1f6c5c",
    zIndex: 1,
    width: "70%",
    paddingVertical: 5, // Adjust the height as needed
    borderRadius: 20,
    flexDirection: "row", // Change to 'row' to align items horizontally
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    flex: 2, // Adjust as needed
  },
  textContainer: {
    flex: 8, // Adjust as needed
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  buttonText: {
    color: "white",
  },
});

export default PostStoryMap;
