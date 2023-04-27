import { authSignOutUser } from "../../redux/auth/authOperations";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";

import app from "../../firebase/config";
const db = getFirestore(app);

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId, photoURL, nickname } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userPost = [];
    querySnapshot.forEach((doc) => {
      userPost.push({ ...doc.data() });
    });
    setUserPosts(userPost);
  };
  // console.log(userPosts);

  // useEffect(() => {
  //   getUserPosts();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserPosts();
    }, [])
  );

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/image/bg.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={signOut}
            style={styles.btn}
          >
            <Entypo name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.user}>
            <Image source={{ uri: photoURL }} style={styles.userPhoto} />
            <Text style={{ fontSize: 30, fontWeight: 500, lineHeight: 35 }}>
              {nickname}
            </Text>
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 10,
                  // justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{ height: 200, borderRadius: 10, marginBottom: 5 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 19,
                    marginLeft: 10,
                  }}
                >
                  {item.comment}
                </Text>
                <View style={styles.textContainer}>
                  <Ionicons name="location-sharp" size={24} color="#FF6C00" />
                  <Text>{item.country}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    position: "relative",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  userPhoto: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: -75,
  },
  btn: {
    position: "absolute",
    top: 22,
    right: 16,
    zIndex: 100,
  },
  user: {
    gap: 10,
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    gap: 5,
    marginRight: 10,
    marginLeft: "auto",
  },
});

export default ProfileScreen;
