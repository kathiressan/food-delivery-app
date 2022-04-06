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

const MainTitle = ({title}) => {
  return (
        <View>
            <Text style={tw`text-center text-white text-xl`}>{title}</Text>
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
  );
};
export default MainTitle;
