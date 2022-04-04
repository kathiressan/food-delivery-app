import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
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
import { Avatar } from "react-native-elements";
import Header from "../components/Header";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <View style={tw`flex mt-5`}>
        <TouchableOpacity>
          <Text style={tw`ml-6 text-white text-xl`}>My Products</Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
        <TouchableOpacity>
          <Text onPress={() => {navigation.navigate("NewProductScreen");}} style={tw`ml-6 text-white text-xl`}>Add New Product</Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
        <TouchableOpacity>
          <Text style={tw`ml-6 text-white text-xl`}>Wallet Balance</Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
        <TouchableOpacity>
          <Text style={tw`ml-6 text-white text-xl`}>My Rating</Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
        <TouchableOpacity>
          <Text style={tw`ml-6 text-white text-xl`}>My Sales</Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: "white",
            borderStyle: "dotted",
            borderWidth: 1,
            borderRadius: 1,
            marginBottom: 15,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
