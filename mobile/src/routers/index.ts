import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthLoading from "../views/AuthLoading";
import Home from "../views/Home";
import SignIn from "../views/SignIn";

export default createAppContainer(
  createSwitchNavigator(
    {
      App: Home,
      AuthLoading,
      Auth: SignIn
    },
    { initialRouteName: "AuthLoading" }
  )
);
