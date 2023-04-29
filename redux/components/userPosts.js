import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import app from "../../firebase/config";

const db = getFirestore(app);

export const UserPosts = ({ item }) => {
  const [allComments, setAllComments] = useState([]);

  const getAllPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", item.id, "comments")
    );
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ ...doc.data() });
    });
    setAllComments(comments);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.postContainer}>
      <Image
        source={{ uri: item.photo }}
        style={{ height: 200, borderRadius: 10, marginBottom: 5 }}
      />
      <Text style={styles.textComment}>{item.comment}</Text>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={24}
            color="#FF6C00"
          />
          <Text>{allComments.length}</Text>
        </View>
        <View style={styles.textContainer}>
          <Ionicons name="location-sharp" size={24} color="#FF6C00" />
          <Text>{item.country}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 10,
    justifyContent: "center",
    borderBottomColor: "#D9EBE9",
    borderBottomWidth: 1,
  },
  textComment: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
    marginLeft: 10,
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    gap: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 0,
  },
});
