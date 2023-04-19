import { View, StyleSheet, Text, Button, FlatList, Image } from "react-native";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
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
  const { userId } = useSelector((state) => state.auth);

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
      <Button title="signOut" onPress={signOut} />
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ height: 200, borderRadius: 10 }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
  },
});

export default ProfileScreen;
