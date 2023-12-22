import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { Google_Api_Key } from "../contexts/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const PostStoryMap = ({ route, navigation  , onLocationChange }: any , ) => {
  const [region, setRegion] = useState<LatLng>({
    latitude: 41.0864,
    longitude: 29.0455,
  });

  const [selectedPlaces, setSelectedPlaces] = useState<Array<LatLng>>([]);
  const [selectedPlacesNames, setSelectedPlacesNames] = useState<Array<string>>(
    []
  );


  const handleSendData = () => {
    // Call the callback function to send data to the parent
    onLocationChange(selectedPlaces);
    console.log(selectedPlaces);
    console.log(selectedPlacesNames);
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
    setSelectedPlaces([...selectedPlaces, coordinate]);
    reverseGeocode(coordinate.latitude, coordinate.longitude);

   
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Google_Api_Key}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Extract the place name from the response
      const placeName = data.results[0]?.formatted_address || "Unknown Place";

      setSelectedPlacesNames([...selectedPlacesNames, placeName]);
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
      return "Unknown Place";
    }
  };

  const handleDeletePress = (index: number) => {
    // Remove the element at the specified index from the array
    selectedPlacesNames.splice(index, 1);
    selectedPlaces.splice(index, 1);

    // Update the state with the modified array
    setSelectedPlacesNames([...selectedPlacesNames]);
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
            title={selectedPlacesNames[index]}
            description={`Lat: ${place.latitude}, Long: ${place.longitude}`}
          />
        ))}
      </MapView>

      {selectedPlacesNames.map((address, index) => (
        <View style={styles.locTextContainer}>
            <View style = {styles.textContainer}>
            <Text style = {styles.locText} key={index}>{selectedPlacesNames[index]}</Text>
            </View>
          
          <View style = {styles.iconContainer}>
            
            <TouchableOpacity onPress={() => handleDeletePress(index)}>
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
            <View style={styles.button}>
        <TouchableOpacity
          onPress={handleSendData}
        >
          <Text style={styles.buttonText}>Select Location</Text>
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
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
    justifyContent:"center",
    marginBottom: 50,
    flex: 1,

  },
  locText:{
    color:"white",
    marginEnd:20
  },
  locTextContainer: {
    
    backgroundColor: "#1f6c5c",
    zIndex: 1,
    width: "100%",
    height: 60, // Adjust the height as needed
    borderRadius: 20,
    flexDirection: 'row', // Change to 'row' to align items horizontally
    alignItems: "center", // Optional: adjust based on your layout
    bottom:0,
    marginBottom:10
  },
  iconContainer: {
    flex: 2, // Adjust as needed
  },
  textContainer: {
    flex: 8, // Adjust as needed
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:10
  },

  buttonText: {
    color: "white",
  },
});

export default PostStoryMap;
