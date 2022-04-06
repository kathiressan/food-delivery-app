import { View, Text, SafeAreaView } from "react-native";
import { Rating } from "react-native-rating-element";
import CircularProgress from 'react-native-circular-progress-indicator';
import React from 'react';
import tw from "twrnc";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";

const RatingScreen = () => {
  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
        <Header />
        <MainTitle title={"My Rating"} />
        <View style={tw`items-center`}>
            <CircularProgress
                value={4.5}
                radius={120}
                duration={1000}
                progressValueColor={'#ecf0f1'}
                maxValue={5}
                // title={'4.5'}
                titleColor={'white'}
                titleStyle={{fontWeight: 'bold'}}
                progressFormatter={(value) => {
                    'worklet';
                      
                    return value.toFixed(2); // 2 decimal places
                  }}
            />
            <Rating
                rated={4.5}
                totalCount={5}
                ratingColor="#f1c644"
                ratingBackgroundColor="#d4d4d4"
                size={24}
                readonly // by default is false
                icon="ios-star"
                direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
            />
        </View>

    </SafeAreaView>
  );
};
export default RatingScreen;
