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
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
  nickname: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [inputValue, setInputValue] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width;
  //     setDimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, []);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(inputValue));
    setInputValue(initialState);
  };

  const backdropKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={backdropKeyboardHide}>
        <ImageBackground
          source={require("../../assets/image/bg.jpg")}
          style={styles.image}
        >
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
                  // marginHorizontal: dimensions > 500 ? 40 : 0,
                }}
              >
                <Text style={styles.titleBtn}>Зарегистрироваться</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
                style={{
                  ...styles.logBtn,
                  // marginHorizontal: dimensions > 500 ? 40 : 0,
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
    // alignItems: "center",
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
});

export default RegistrationScreen;
