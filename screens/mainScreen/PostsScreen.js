import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreen/DefaultScreenPosts";
import CommentsScreen from "../nestedScreen/CommentsScreen";
import MapScreen from "../nestedScreen/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="DefaultScreen"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: "Комментарий" }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
