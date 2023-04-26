import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { PermissionsAndroid, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const initialState = {
  email: "",
  password: "",
  nickname: "",
  photoURL: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState(initialState);
  const [permission, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to your storage",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          requestPermission();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setInputValue((prevState) => ({
        ...prevState,
        photoURL: result.assets[0].uri,
      }));

      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    dispatch(authSignUpUser(inputValue));
    setIsShowKeyboard(false);

    // console.log("inputValue", inputValue);

    Keyboard.dismiss();
    setInputValue(initialState);
  };

  const backdropKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const addPhoto = async () => {
    if (!permission.granted) {
      requestStoragePermission();
    } else {
      pickImage();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={backdropKeyboardHide}>
        <ImageBackground
          source={require("../../assets/image/bg.jpg")}
          style={styles.image}
        >
          <View style={styles.photoWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={addPhoto}
              style={styles.photoBtn}
            >
              {image ? (
                <ImageBackground
                  source={{ uri: image }}
                  style={{ height: 150, width: 150, resizeMode: "cover" }}
                />
              ) : (
                <View
                  style={{
                    padding: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="pluscircleo" size={100} color="#D9EBE9" />
                  <Text
                    style={{
                      color: "#D9EBE9",
                    }}
                  >
                    Аватар
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.form,
                // width: dimensions,
                paddingHorizontal: 16,
                paddingBottom: isShowKeyboard ? 20 : 50,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  inputMode="text"
                  keyboardType="default"
                  paddingLeft={10}
                  placeholder="Логин"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={inputValue.login}
                  onChangeText={(value) =>
                    setInputValue((prevState) => ({
                      ...prevState,
                      nickname: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  inputMode="email"
                  keyboardType="email-address"
                  paddingLeft={10}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={inputValue.email}
                  onChangeText={(value) =>
                    setInputValue((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginTop: 16 }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  inputMode="none"
                  keyboardType="visible-password"
                  paddingLeft={10}
                  placeholder="Пароль"
                  onFocus={() => setIsShowKeyboard(true)}
                  value={inputValue.password}
                  onChangeText={(value) =>
                    setInputValue((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleSubmit}
                style={{
                  ...styles.btn,
                }}
              >
                <Text style={styles.titleBtn}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
                style={{
                  ...styles.logBtn,
                }}
              >
                <Text style={styles.logBtnTitle}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#ffffff",
    paddingTop: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Roboto",
  },
  inputTitle: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 500,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#0217d1",
    height: 50,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "500",
  },
  btn: {
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
  logBtn: {
    backgroundColor: "inherit",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logBtnTitle: {
    fontSize: 18,
    color: "blue",
  },
  photoWrapper: {
    borderWidth: 1,
    position: "relative",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    width: 150,
    height: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: -75,
    zIndex: 100,
    overflow: "hidden",
  },
  photoBtn: {
    width: "100%",
    height: "100%",
    // position: "absolute",
    // bottom: 0,
    // right: 0,
  },
});

export default RegistrationScreen;
