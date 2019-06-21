import { createStackNavigator } from "react-navigation";

const SignIn = "placeholder";

const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});

export default SignedOut;
