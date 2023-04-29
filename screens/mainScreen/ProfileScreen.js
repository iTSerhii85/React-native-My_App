import { authSignOutUser } from "../../redux/auth/authOperations";
import { UserPosts } from "../../redux/components/userPosts";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import React, { useState } from "react";
import app from "../../firebase/config";
import {
  View,
  StyleSheet,
  Text,
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

const db = getFirestore(app);

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, photoURL, nickname } = useSelector((state) => state.auth);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userPost = [];
    querySnapshot.forEach((doc) => {
      userPost.push({ ...doc.data(), id: doc.id });
    });
    setUserPosts(userPost);
  };

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
            <Text style={styles.textNicName}>{nickname}</Text>
          </View>
          <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <UserPosts item={item} />}
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
    height: "82%",
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
    marginBottom: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textNicName: { fontSize: 30, fontWeight: 500, lineHeight: 35, margin: 0 },
});

export default ProfileScreen;
