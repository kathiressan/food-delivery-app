import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import WalletButton from "./WalletButton";

const ProductCard = ({
  item: { id, imageUrl, productName, price, stock, rating, sold, views },
}) => {
  return (
    <View style={tw`flex bg-gray-400 p-3 m-2 border rounded-lg justify-center`}>
      <View style={tw`flex flex-row mb-2`}>
        <View>
          <Image
            on
            style={[
              tw`rounded-lg mr-5`,
              { width: 100, height: 70, resizeMode: "contain" },
            ]}
            source={{
              uri: imageUrl,
            }}
          />
        </View>

        <View style={tw`flex`}>
          <Text style={tw`text-white`}>{productName}</Text>
          <Text style={tw`text-white`}>{`RM ${price}`}</Text>
        </View>
      </View>

      <View
        style={{
          borderColor: "white",
          borderStyle: "dotted",
          borderWidth: 1,
          borderRadius: 1,
          marginBottom: 15,
        }}
      />

      <View style={tw`flex flex-row flex-wrap`}>
        <Text style={tw`text-white mr-3`}>Stock: {stock}</Text>
        <Text style={tw`text-white mr-3`}>Rating: {rating}</Text>
      </View>
      <View style={tw`flex flex-row flex-wrap`}>
        <Text style={tw`text-white mr-3`}>Sold: {sold}</Text>
        <Text style={tw`text-white mr-3`}>Views: {views}</Text>
      </View>

      <View style={tw`flex flex-row justify-center items-center`}>
        <TouchableOpacity style={tw`mr-5 w-15`}>
          <WalletButton text={"Delist"} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-15`}>
          <WalletButton text={"Edit"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ProductCard;
