import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState();
  const [showImage, setshowImage] = useState(false);
  const cameraRef = createRef(null);
  useEffect(() => {
    async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const capturePicture = async () => {
    let photo = await cameraRef.current.takePictureAsync();
    setPicture(photo);
    setshowImage(true);
    console.debug(photo);
  };

  return (
    <View style={styles.container}>
      {showImage ? (
        <Image
          source={{ uri: picture.uri }}
          resizeMode={"contain"}
          style={{
            backgroundColor: "transparent",
          }}
        />
      ) : (
        <>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text style={styles.text}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                onPress={capturePicture}
              >
                <Text style={styles.capture}></Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
