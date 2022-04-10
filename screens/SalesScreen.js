import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
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
import SalesCard from "../components/SalesCard";

const SalesScreen = () => {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      image:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
      productName: "Telur Kampung",
      unitPrice: 15.0,
      totalPaid: 30.0,
      quantity: 2,
      username: "Safwan_27",
      name: "Ahmad Safwan",
      status: "DELIVERED",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
      image:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
      productName: "Telur Kampung",
      unitPrice: 15.0,
      totalPaid: 30.0,
      quantity: 2,
      username: "Safwan_27",
      name: "Ahmad Safwan",
      status: "DELIVERY IN PROGRESS",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bc",
      image:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
      productName: "Telur Kampung",
      unitPrice: 15.0,
      totalPaid: 30.0,
      quantity: 2,
      username: "Safwan_27",
      name: "Ahmad Safwan",
      status: "PENDING DELIVERY",
    },
  ];
  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"My sales"} />

      <FlatList
        data={DATA}
        renderItem={SalesCard}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default SalesScreen;
