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
import { getDatabase, onValue, set } from "firebase/database";
import { getStorage, ref, uploadString, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import WalletButton from "../components/WalletButton";

const NewProductFeature = ({ featureName, icon }) => {
  return (
    <View
      style={[
        tw`flex flex-row justify-between p-2 border`,
        { backgroundColor: "rgba(255,255,255,0.6)" },
      ]}
    >
      <View style={tw`flex flex-row items-center`}>
        <View style={tw`mr-5`}>{icon}</View>
        <View>
          <Text>{featureName}</Text>
        </View>
        <View>
          <Text style={tw`text-red-500`}>*</Text>
        </View>
      </View>
      <View>
        <Text>{">"}</Text>
      </View>
    </View>
  );
};

export default NewProductFeature;
