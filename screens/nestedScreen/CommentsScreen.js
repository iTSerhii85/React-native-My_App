import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
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
  const { nickname } = useSelector((state) => state.auth);

  const postId = route.params.postId;
  const uri = route.params.uri;

  useEffect(() => {
    getAllPosts();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getAllPosts();
  //   }, [route])
  // );

  const createPost = async () => {
    try {
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        comment,
        nickname,
      }).then(getAllPosts());
      // console.log("Document written with ID: ", docRef.id);
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
            <View style={styles.commentContainer}>
              <Text>
                @{item.nickname}: {item.comment}
              </Text>
              {/* <Text>{item.comment}</Text> */}
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
      </View>
      <TouchableOpacity style={styles.download} onPress={createPost}>
        <Text style={styles.titleBtn}>Опубликовать</Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: "#FF6C00",
    marginRight: 30,
    // marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#D9EBE9",
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  input: {
    height: 30,
    borderColor: "transparent",
    borderBottomColor: "#FF6C00",
    borderWidth: 1,
  },
  download: {
    marginHorizontal: 40,
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 25,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  titleBtn: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CommentsScreen;
