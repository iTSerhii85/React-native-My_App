import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Text,
} from "react-native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export const Posts = ({ post, navigation }) => {
  return (
    <View style={styles.postContainer}>
      <Image
        source={{ uri: post.photo }}
        style={{ height: 200, borderRadius: 10, marginBottom: 5 }}
      />
      <View style={styles.userPost}>
        <Image
          source={{ uri: post.photoURL }}
          style={{ height: 24, width: 24, borderRadius: 12 }}
        />
        <Text style={{ color: "#FF6C00", fontSize: 15, fontWeight: 700 }}>
          {post.nickname}
        </Text>
        <Text style={{ marginRight: 10, marginLeft: "auto" }}>
          {post.comment}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate("Map", { location: post.location })}
      >
        <Ionicons name="location-sharp" size={24} color="#FF6C00" />
        <Text>{post.country},</Text>
        <Text>{post.city}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() =>
          navigation.navigate("Comments", {
            postId: post.id,
            uri: post.photo,
          })
        }
      >
        <MaterialCommunityIcons
          name="comment-processing-outline"
          size={24}
          color="#FF6C00"
        />
        <Text>Комментарии</Text>
      </TouchableOpacity>
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
  userPost: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 5,
    marginLeft: 5,
    zIndex: 100,
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    gap: 5,
  },
});
