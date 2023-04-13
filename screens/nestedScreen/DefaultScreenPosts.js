import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import app from "../../firebase/config";
const db = getFirestore(app);

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };
  console.log(posts);

  useFocusEffect(
    React.useCallback(() => {
      getAllPost();
    }, [route])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
            }}
          >
            <Image source={{ uri: item.photo }} style={{ height: 200 }} />
            <Button
              title="Go to map"
              onPress={() => navigation.navigate("Map")}
            />
            <Button
              title="Go to comments"
              onPress={() => navigation.navigate("Comments")}
            />
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
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default DefaultScreenPosts;
