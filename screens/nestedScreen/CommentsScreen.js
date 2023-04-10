import { View, StyleSheet, Text } from "react-native";

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Комментарии</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: "back",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

export default CommentsScreen;
