import { useRoute } from "../../router";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { authStateChangeUser } from "../auth/authOperations";

const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
