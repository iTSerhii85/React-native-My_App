import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const CreateScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo });
  };

  const takePhoto = async () => {
    const picture = await snap.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    setPhoto(picture.uri);
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setSnap} type={type}>
        {photo && (
          <View style={styles.takePhoto}>
            <Image source={{ uri: photo }} style={styles.picture} />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapWrap}>
          <Entypo name="camera" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleCameraType}
        >
          <Ionicons name="camera-reverse" size={30} color="#ffffff" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.download} onPress={sendPhoto}>
        <Text style={styles.titleBtn}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  camera: {
    height: "70%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
  },
  snapWrap: {
    padding: 13,
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 30,
  },
  takePhoto: {
    position: "absolute",
    top: 20,
    left: 20,
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  toggleButton: {
    position: "absolute",
    padding: 5,
    right: 20,
    bottom: 15,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 30,
  },
  picture: {
    height: 200,
    width: 200,
  },
  download: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 25,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBtn: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CreateScreen;
