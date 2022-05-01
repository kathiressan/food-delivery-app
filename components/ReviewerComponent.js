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
import { Rating } from "react-native-rating-element";

const ReviewerComponent = ({ item: { id, username, rating, date } }) => {
  return (
    <SafeAreaView
      style={[
        tw`flex flex-row border border-white mt-3 items-center`,
        { backgroundColor: "rgba(255,255,255,0.4)" },
      ]}
    >
      <View style={tw`p-2`}>
        <Image
          on
          style={[
            tw`rounded-full mr-2`,
            { width: 55, height: 55, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
          }}
        />
      </View>
      <View style={tw`p-2`}>
        <Text style={tw`text-white font-bold text-lg`}>{username}</Text>
        <Rating
          rated={parseFloat(rating)}
          totalCount={5}
          ratingColor="#f1c644"
          ratingBackgroundColor="#d4d4d4"
          size={10}
          readonly // by default is false
          icon="ios-star"
          direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
        />
        <Text style={tw`text-white`}>{date}</Text>
      </View>
    </SafeAreaView>
  );
};
export default ReviewerComponent;
