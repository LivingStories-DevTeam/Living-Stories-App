import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const Timeline = () => {
  const fallAnimation = new Animated.Value(0);
  const [change , setChange]  = useState<number>(0)
  const [backgroundImage, setBackgroundImage] = useState(require('../assets/Autumn_Loop_Large.gif'));
  const [leaf, setLeaf] = useState(require('../assets/autumn_final_GIF.gif'));

  const changeBackgroundImage = () => {
    setChange(change+1)
    if(change%4===1){
      setBackgroundImage(require('../assets/Autumn_Loop_Large.gif'));
      setLeaf(require('../assets/autumn_final_GIF.gif'))
      
    }
    else if (change%4===2){
      setBackgroundImage(require('../assets/Winter_Loop_Large.gif'));
      setLeaf(require('../assets/winter_final_GIF.gif'))
    }
    else if (change%4===3){
      setBackgroundImage(require('../assets/Summer_Loop_Large.gif'));
      setLeaf(require('../assets/summer_final_GIF.gif'))
    }
    else{
      setBackgroundImage(require('../assets/Spring_Loop_Large.gif'));
      setLeaf(require('../assets/spring_final_GIF.gif'))

    }
    // You can change the background image source dynamically
    
  };
  const startFallingAnimation = () => {
    // Reset the animated value to 0 before starting a new animation
    fallAnimation.setValue(0);

    Animated.timing(fallAnimation, {
      toValue: 1,
      duration: 2500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Animation completed, reverse back to the initial position
      Animated.timing(fallAnimation, {
        toValue: 0,
        duration: 0, // Instantly reverse (you can adjust the duration if you want a slower reverse)
        useNativeDriver: true,
      }).start();
    });
  };
  const fallingLeavesStyle = {
    transform: [
      {
        translateY: fallAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 500],
        }),
      },
      {
        translateX: Animated.modulo(
          Animated.multiply(fallAnimation, 100),
          200
        ).interpolate({
          inputRange: [0, 100, 200],
          outputRange: [0, 50, 0],
        }),
      },
      {
        rotate: fallAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "720deg"],
        }),
      },
    ],
  };

  return (
    <>
    
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
    >
      <ScrollView horizontal style={styles.horCont}
                  
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  
                  scrollEventThrottle={10}
                  snapToInterval={Dimensions.get('window').width}
                  snapToAlignment="center"
                  decelerationRate="fast">
        
        <TouchableOpacity onPress={startFallingAnimation}>
          <Animated.View style={[styles.kutu, fallingLeavesStyle]}>
            <ImageBackground
               source={leaf}
              style={styles.background}
            >
              <Text style={styles.text}>Test</Text>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={startFallingAnimation}>
          <Animated.View style={[styles.kutu, fallingLeavesStyle]}>
            <ImageBackground
               source={leaf}
              style={styles.background}
            >
              <Text style={styles.text}>Test2</Text>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={startFallingAnimation}>
          <Animated.View style={[styles.kutu, fallingLeavesStyle]}>
            <ImageBackground
              source={leaf}
              style={styles.background}
            >
              <Text style={styles.text}>Test3</Text>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={startFallingAnimation}>
          <Animated.View style={[styles.kutu, fallingLeavesStyle]}>
            <ImageBackground
              source={leaf}
              style={styles.background}
            >
              <Text style={styles.text}>Test4</Text>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={startFallingAnimation}>
          <Animated.View style={[styles.kutu, fallingLeavesStyle]}>
            <ImageBackground
               source={leaf}
              style={styles.background}
            >
              <Text style={styles.text}>AAAAAAAAAAA</Text>
            </ImageBackground>
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity onPress={changeBackgroundImage}>
        <Text>Change Background</Text>
      </TouchableOpacity>
    </ImageBackground>
    
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  horCont: {
    flex: 1,
    flexDirection: "row", // Set the flexDirection to 'row' for horizontal scrolling
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
  },
  text: {
    color: "white",
  },
  kutu: {
    marginLeft:100,
    marginTop: 150,
    width: 250,
    height: 250,
  },
  background: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
});

export default Timeline;
