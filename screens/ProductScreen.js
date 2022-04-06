import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList
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
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import ProductCard from "../components/ProductCard";

const ProductScreen = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      image: '',
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: '',
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: '',
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d71',
      image: '',
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      image: '',
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
  ];

  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"My products"} />

      {/* <ProductCard id={"123"} image={""} productName={"Telur Kampung"} price={15.00} stock={15} rating={4.9} sold={4} views={4} /> */}

      <FlatList
        data={DATA}
        renderItem={ProductCard}
        keyExtractor={item => item.id}
      />

      {/* <ProductCard />
      <ProductCard /> */}
    </SafeAreaView>
  );
};
export default ProductScreen;
