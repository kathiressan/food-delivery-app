import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const HomeScreenTemp = () => {
  return (
    <SafeAreaView style={tw`bg-orange-300 h-full`}>
      <View>
        <Image
          style={[
            tw`mx-auto mt-20 rounded-full`,
            { width: 100, height: 100, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://thumbs.dreamstime.com/b/shopping-cart-orange-background-icon-vector-illustration-stock-80754940.jpg",
          }}
        />
        <Text style={tw`text-white mx-auto mt-5 text-4xl text-center`}>
          YOUR ONE STOP GROCERY SHOPPING APP
        </Text>
        <Image
          style={[
            tw`mx-auto mt-5`,
            { width: 300, height: 300, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://image.similarpng.com/very-thumbnail/2022/01/Supermarket-delivery-man-wearing-medical-mask-while-holding-food-and-groceries-basket-isolated-on-transparent-background-PNG.png",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenTemp;
