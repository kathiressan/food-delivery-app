import tw from "twrnc";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CashAmount = ({cashAmount, inputFunc}) => {
  return (
    <View>
      <TouchableOpacity style={tw`h-20`} onPress={() => {inputFunc(cashAmount)}}>
       <Text style={[tw`bg-white m-2 w-20 text-xl text-center pt-4`, {flexGrow: 1, flexBasis: "25%"}]}>{cashAmount}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CashAmount;
