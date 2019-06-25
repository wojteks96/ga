import Immutable from "immutable";
import * as React from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

// TODO: Add mock modules for this filetype
// @ts-ignore
import splashImage from "../../assets/splash.png";
import { callAuthLogin } from "../api";
import commonStyles from "../common-styles";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import strings from "../config/strings";
import { NavigationViewProps } from "../navigation/types";
import { RootState } from "../state";
import { CallAction } from "../state/api";
import { getIsFetching, Routes } from "../state/fetch";

interface Props extends NavigationViewProps {
  isFetching: boolean;
  callAuthLogin(email: string, password: string): CallAction;
}

interface State {
  email: string;
  password: string;
}

class SignIn extends React.Component<Props, State> {
  public readonly state: State = {
    email: "",
    password: ""
  };

  private passwordTextInputRef = React.createRef<FormTextInput>();

  public render() {
    return (
      <KeyboardAvoidingView
        style={[commonStyles.container, styles.container]}
        behavior={"padding"}
      >
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
          <Button
            label={strings.LOGIN}
            onPress={this.handleLoginPress}
            isLoading={this.props.isFetching}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }

  private handleLoginPress = async () => {
    // TODO: Navigate to home on success
    const { email, password } = this.state;
    await this.props.callAuthLogin(email, password);
  };

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

function mapStateToProps({ fetch }: RootState) {
  return {
    isFetching: getIsFetching(fetch, Immutable.Set([Routes.AUTH_LOGIN]))
  };
}

export default connect(
  mapStateToProps,
  { callAuthLogin }
)(SignIn);
