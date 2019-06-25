import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import colors from "../config/colors";

type Props = TextInputProps;

class FormTextInput extends React.Component<Props> {
  private textInputRef = React.createRef<TextInput>();

  public focus() {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  }

  public render() {
    const { style, ...otherProps } = this.props;

    return (
      <TextInput
        ref={this.textInputRef}
        selectionColor={colors.BLUE_MAIN}
        style={[styles.textInput, style]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: colors.BLUE_MAIN,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    fontSize: 16
  }
});

export default FormTextInput;
