import * as React from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";

// TODO: Add mock modules for this filetype
// @ts-ignore
import splashImage from "../../assets/splash.png";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import colors from "../config/colors";
import strings from "../config/strings";

interface State {
  email: string;
  password: string;
}

class SignIn extends React.Component<{}, State> {
  public readonly state: State = {
    email: "",
    password: ""
  };

  private passwordTextInputRef = React.createRef<FormTextInput>();

  public render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <Image source={splashImage} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            value={this.state.email}
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            placeholder={strings.EMAIL}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />
          <FormTextInput
            ref={this.passwordTextInputRef}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            placeholder={strings.PASSWORD}
            secureTextEntry={true}
            returnKeyType="done"
          />
          <Button label={strings.LOG_IN} onPress={null} />
        </View>
      </KeyboardAvoidingView>
    );
  }

  private handleEmailSubmitPress = () => {
    if (this.passwordTextInputRef.current) {
      this.passwordTextInputRef.current.focus();
    }
  };

  private handleEmailChange = (email: string) => {
    this.setState({ email });
  };

  private handlePasswordChange = (password: string) => {
    this.setState({ password });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "80%"
  }
});

export default SignIn;
