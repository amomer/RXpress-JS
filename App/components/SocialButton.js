import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import React from "react";
//import {windowHeight} from '../Dimensions';

import FontAwesome from "react-native-vector-icons/FontAwesome";

const SocialButton = ({
  buttonTitle,
  color,
  backgroundColor,
  btnType,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={btnType}
          style={styles.icon}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, { color: color }]}>{buttonTitle}</Text>
      </View>
      <Text style={styles.buttonText}></Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 3,
    width: "100%",
    // height: windowHeight / 15,
    height: 50,
  },
  btnTxtWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  iconWrapper: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontWeight: "bold",
  },
});
