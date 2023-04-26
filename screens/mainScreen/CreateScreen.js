import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Camera, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Image,
  View,
  Text,
} from "react-native";

import app from "../../firebase/config";
const storage = getStorage(app);
const db = getFirestore(app);

const CreateScreen = ({ navigation }) => {
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [newPhoto, setNewPhoto] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const { userId, nickname, photoURL } = useSelector((state) => state.auth);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestPermissionStatus] = Location.useForegroundPermissions();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const navigate = async () => {
    navigation.navigate("DefaultScreen");
    setPhoto(null);
    setNewPhoto(false);
  };

  const uploadPostToServer = async (photo) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId,
        nickname,
        photo,
        comment,
        location: location.coords,
        photoURL,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sendPhoto = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    const storageRef = ref(storage, `postImages/${uniquePostId}.jpg`);

    await uploadBytes(storageRef, file).then((snapshot) => {});

    await getDownloadURL(ref(storage, `postImages/${uniquePostId}.jpg`))
      .then((url) => {
        uploadPostToServer(url);
      })
      .then(() => navigate());
  };

  const takePhoto = async () => {
    const picture = await snap.takePictureAsync();
    setPhoto(picture.uri);
    const location = await Location.getCurrentPositionAsync();
    setLocation(location);
    const [geocode] = await Location.reverseGeocodeAsync(location.coords);
    setCity(geocode.city);
    setCountry(geocode.country);
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function redactPhoto() {
    setPhoto(null);
    setNewPhoto(false);
  }

  if (!permission || !status) {
    //! Camera permissions are still loading
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!permission.granted || !status.granted) {
    //! Camera and location permissions are not granted yet
    return (
      <View style={styles.container}>
        {!permission.granted && (
          <>
            <Text style={{ textAlign: "center" }}>
              We need your permission to show the camera
            </Text>
            <Button onPress={requestPermission} title="grant permission" />
          </>
        )}
        {!status.granted && (
          <>
            <Text style={{ textAlign: "center" }}>
              We need your permission to use the location
            </Text>
            <Button
              onPress={requestPermissionStatus}
              title="grant permission"
            />
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        {newPhoto ? (
          <Camera style={styles.camera} ref={setSnap} type={type}>
            {photo ? (
              <View style={styles.takePhoto}>
                <Image source={{ uri: photo }} style={styles.picture} />
              </View>
            ) : (
              <>
                <TouchableOpacity onPress={takePhoto} style={styles.snapWrap}>
                  <Entypo name="camera" size={30} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={toggleCameraType}
                >
                  <Ionicons name="camera-reverse" size={30} color="#ffffff" />
                </TouchableOpacity>
              </>
            )}
          </Camera>
        ) : (
          <TouchableOpacity
            onPress={() => setNewPhoto(true)}
            style={styles.btnWrap}
          >
            <Entypo name="camera" size={35} color="#ffffff" />
          </TouchableOpacity>
        )}
      </View>
      {photo && (
        <>
          <TouchableOpacity style={styles.redactBtn} onPress={redactPhoto}>
            <Text style={styles.titleRedactBtn}>Редактировать фото</Text>
            <Entypo name="cycle" size={20} color="#FF6C00" />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              placeholder="Описание"
            />
          </View>
          <View style={styles.textContainer}>
            <Ionicons name="location-sharp" size={24} color="#FF6C00" />
            <Text>{country},</Text>
            <Text>{city}</Text>
          </View>
          <TouchableOpacity style={styles.download} onPress={sendPhoto}>
            <Text style={styles.titleBtn}>Опубликовать</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  cameraWrapper: {
    height: "60%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#82D1E2",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    resizeMode: "cover",
    // height: "60%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 7,
  },
  snapWrap: {
    position: "absolute",
    bottom: 15,
    left: "45%",
    padding: 13,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 30,
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
  btnWrap: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: 13,
    borderWidth: 4,
    borderColor: "#ffffff",
    backgroundColor: "#82D1E2",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhoto: {
    position: "absolute",
    width: "105%",
    height: "105%",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  redactBtn: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  titleRedactBtn: {
    color: "#FF6C00",
  },
  picture: {
    margin: 0,
    marginLeft: "auto",
    marginRight: "auto",
    height: "100%",
    width: "100%",
  },
  download: {
    marginHorizontal: 40,
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
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  textContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    gap: 5,
  },
  input: {
    height: 35,
    borderColor: "#ffffff",
    borderBottomColor: "#FF6C00",
    borderWidth: 1,
  },
});

export default CreateScreen;
