import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { token: action.payload, errorMessage: "" };
    case "signout":
      return { ...state, token: null };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({
      type: "signin",
      payload: token,
    });
    navigate("TrackList");
  } else {
    navigate("Signup");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({
    type: "clear_error_message",
  });
};

//signup

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/api/auth/signup", { email, password });
    const token = response.data.token;
    //console.log(response.data);
    await AsyncStorage.setItem("token", token);
    dispatch({
      type: "signin",
      payload: token,
    });
    navigate("TrackList");
  } catch (error) {
    //console.log(error.response.data);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up.",
    });
  }
};

//signin
const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("/api/auth/signin", { email, password });
    const token = response.data.token;
    await AsyncStorage.setItem("token", token);
    dispatch({
      type: "signin",
      payload: token,
    });
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in.",
    });
  }
};

//signout

const signout = (dispatch) => async () => {
  console.log("function called");
  await AsyncStorage.removeItem("token");
  dispatch({
    type: "signout",
  });
  navigate("Signin");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
