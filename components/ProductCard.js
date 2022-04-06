import {
    View,
    Text,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    Platform 
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
  import * as ImagePicker from 'expo-image-picker';

const ProductCard = ({id, image, productName, price, stock, rating, sold, views}) => {
  return (
    <View style={tw`flex bg-gray-400 p-3 m-2 border rounded-lg`}>

      <View>
        <View>
            <Text>{image}</Text>
        </View>
        
        <View style={tw`flex`}>
            <Text style={tw`text-white`}>{productName}</Text>
            <Text style={tw`text-white`}>{`RM ${price}`}</Text>
        </View>
      </View>
      

      <View>
        <Text>Stock: {stock}</Text>
        <Text>Rating: {rating}</Text>
        <Text>Sold: {sold}</Text>
        <Text>Views: {views}</Text>
      </View>
    </View>
  );
};
export default ProductCard;
