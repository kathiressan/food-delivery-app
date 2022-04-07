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
import { Rating } from "react-native-rating-element";

const ReviewerComponent = ({item: {id, username, rating, timestamp}}) => {
  return (
    <SafeAreaView style={[tw`flex flex-row border border-white mt-3 items-center`, {backgroundColor: "rgba(255,255,255,0.4)"}]}>
        <View style={tw`p-2`}>
            <Text>IMAGE GOES HERE</Text>
        </View>
        <View style={tw`p-2`}>
            <Text style={tw`text-white font-bold text-lg`}>{username}</Text>
            <Rating
                rated={rating}
                totalCount={5}
                ratingColor="#f1c644"
                ratingBackgroundColor="#d4d4d4"
                size={10}
                readonly // by default is false
                icon="ios-star"
                direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
            />
            <Text style={tw`text-white`}>{timestamp}</Text>
        </View>
    </SafeAreaView>
  );
};
export default ReviewerComponent;
