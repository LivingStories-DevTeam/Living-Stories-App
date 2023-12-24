import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import MapView, { LatLng, Marker, Circle } from "react-native-maps";
import Slider from "@react-native-community/slider";
import { Google_Api_Key } from "../contexts/AuthContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const SearchMap = ({ route, navigation, onLocationChange }: any) => {
  const [region, setRegion] = useState<LatLng>({
    latitude: 41.0864,
    longitude: 29.0455,
  });

  const [radius, setRadius] = useState(1); // Initial radius in meters
  const handleSendData = () => {
    // Call the callback function to send data to the parent
    onLocationChange(region.latitude, region.longitude, radius/1000);
    console.log(region.latitude, region.longitude, radius/1000)
 
  };
  const handleMapPress = (event: { nativeEvent: { coordinate: LatLng } }) => {
    const { coordinate } = event.nativeEvent;
    setRegion({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
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
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        <Circle
          center={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          radius={radius}
          strokeWidth={1}
          strokeColor={"rgba(158, 158, 255, 1)"}
          fillColor={"rgba(158, 158, 255, 0.3)"}
        />
      </MapView>
      <View style={styles.slider}>
      <Text style={styles.radiusText}>Radius: {radius}</Text>
        <Slider
          minimumValue={1000}
          maximumValue={10000}
          minimumTrackTintColor="#1f6c5c"
          maximumTrackTintColor="#000000"
          onValueChange={(value) => {
            setRadius(value);
          }}
        />
      </View>

   

      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            handleSendData()
          }}
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
    justifyContent: "center",
    borderColor: "#1f6c5c", 
    borderWidth: 2, 
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
    zIndex: 1,
  },
  autoComplete: {
    flex: 1,
  },
  radiusText: {
    position: "absolute",
    marginBottom: 10,
    right:0
  },
  slider: {
    width: "90%",
    position: "absolute",
    bottom: 0,
    marginBottom: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1f6c5c",
    padding: 10,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",

    margin: 8,
    flex: 1,
  },
  buttonText:{
    color:"white"
  }
});

export default SearchMap;
