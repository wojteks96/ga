import * as React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";

import { getAuthToken } from "../auth";
import commonStyles from "../common-styles";
import { NavigationViewProps } from "../navigation/types";
import { setAuthToken } from "../state/auth";

interface Props extends NavigationViewProps {
  setAuthToken: typeof setAuthToken;
}

class AuthLoading extends React.Component<Props> {
  public render() {
    return (
      <View style={commonStyles.container}>
        <Text>Hello world!</Text>
      </View>
    );
  }

  public async componentDidMount() {
    await this.bootstrap();
  }

  private bootstrap = async () => {
    const token = await getAuthToken();
    console.log("Found token " + token); // tslint:disable-line
    if (!!token) {
      await this.props.setAuthToken(token);
      await this.props.navigation.navigate("App");
    } else {
      await this.props.navigation.navigate("Auth");
    }
  };
}

export default connect(
  null,
  { setAuthToken }
)(AuthLoading);
