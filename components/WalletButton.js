import { View, Text } from "react-native";
import tw from "twrnc";
import React from "react";

const WalletButton = ({text}) => {
  return (
    <Text
    style={tw`bg-white text-center border p-2 rounded overflow-hidden mt-2 mb-4`}
  >
    {text}
  </Text>
  );
};
export default WalletButton;
