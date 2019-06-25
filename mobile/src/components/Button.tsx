import * as React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

import colors from "../config/colors";

interface Props {
  label: string;
  isLoading?: boolean;
  onPress: () => void;
}

class Button extends React.Component<Props> {
  public render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {this.getContent()}
      </TouchableOpacity>
    );
  }

  private getContent() {
    const { isLoading, label } = this.props;
    if (!!isLoading) {
      return <ActivityIndicator size={"small"} color={colors.BLUE_LIGHT} />;
    } else {
      return <Text style={styles.text}>{label}</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.BLUE_MAIN,
    borderRadius: 4,
    justifyContent: "center",
    marginBottom: 12,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: colors.GREY,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    width: "100%"
  },
  text: {
    color: colors.WHITE,
    textAlign: "center",
    height: 20,
    fontSize: 16
  }
});

export default Button;
