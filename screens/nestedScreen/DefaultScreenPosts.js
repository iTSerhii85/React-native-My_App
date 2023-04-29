import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { Posts } from "../../redux/components/post";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import app from "../../firebase/config";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const db = getFirestore(app);

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const { photoURL, nickname } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllPost();
    }, [route])
  );

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          source={{ uri: photoURL }}
          style={{ height: 60, width: 60, borderRadius: 16 }}
        />
        <Text>{nickname}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={signOut}
          style={{ marginLeft: "auto", marginRight: 0 }}
        >
          <Entypo name="log-out" size={28} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Posts post={item} navigation={navigation} />}
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
    paddingTop: 30,
  },
  user: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
});

export default DefaultScreenPosts;
