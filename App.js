// import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import Main from "./redux/components/main";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
