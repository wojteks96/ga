import { AsyncStorage } from "react-native";

import storage from "../config/storage";

type AuthToken = string;

async function saveAuthToken(token: AuthToken) {
  await AsyncStorage.setItem(storage.AUTH_TOKEN, token);
}

function getAuthToken() {
  return AsyncStorage.getItem(storage.AUTH_TOKEN);
}

export { AuthToken, getAuthToken, saveAuthToken };
