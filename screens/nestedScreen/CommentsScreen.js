import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Keyboard,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";

import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import app from "../../firebase/config";
const db = getFirestore(app);

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickname, photoURL } = useSelector((state) => state.auth);

  const postId = route.params.postId;
  const uri = route.params.uri;

  useFocusEffect(
    React.useCallback(() => {
      getAllPosts();
    }, [route])
  );

  const createPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        comment,
        nickname,
        photoURL,
      }).then(getAllPosts());
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setComment("");
    Keyboard.dismiss();
  };

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", postId, "comments")
    );
    const newComments = [];
    querySnapshot.forEach((doc) => {
      newComments.push({ ...doc.data(), id: doc.id });
    });
    setAllComments(newComments);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: uri }}
        style={{ height: 200, marginBottom: 15, borderRadius: 5 }}
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", gap: 5, marginBottom: 10 }}>
              <Image
                source={{ uri: item.photoURL }}
                style={{ height: 24, width: 24, borderRadius: 12 }}
              />
              <View style={styles.commentContainer}>
                <Text>{item.comment}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setComment}
          placeholder="Комментарий"
          value={comment}
        />
        <TouchableOpacity style={styles.download} onPress={createPost}>
          <Ionicons name="arrow-up" size={18} color="#ffffff" />
          {/* <Text style={styles.titleBtn}>+</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "back",
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  commentContainer: {
    marginRight: 30,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#D9EBE9",
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    position: "relative",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    paddingLeft: 10,
  },
  download: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "#FF6C00",
    height: 34,
    width: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBtn: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CommentsScreen;
