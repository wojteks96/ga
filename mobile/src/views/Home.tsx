import * as React from "react";
import { Text, View } from "react-native";

import commonStyles from "../common-styles";
import { NavigationViewProps } from "../navigation/types";

type Props = NavigationViewProps;

class Home extends React.Component<Props> {
  public render() {
    return (
      <View style={commonStyles.container}>
        <Text>Home!</Text>
      </View>
    );
  }
}

export default Home;
