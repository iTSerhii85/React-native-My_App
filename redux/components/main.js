// import app from "../../firebase/config";

import { useRoute } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { authStateChangeUser } from "../auth/authOperations";

// const auth = getAuth(app);

const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
