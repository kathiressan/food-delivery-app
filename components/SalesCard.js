import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

const SalesCard = ({
  item: {
    id,
    image,
    productName,
    unitPrice,
    totalPaid,
    quantity,
    username,
    name,
    status,
  },
}) => {
  return (
    <SafeAreaView style={tw`bg-white p-2 mb-2 border`}>
      <View style={tw`flex flex-row p-2 items-center border-b`}>
        <Image
          on
          style={[
            tw`rounded-full mr-2`,
            { width: 35, height: 35, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
          }}
        />
        <Text>{username}</Text>
      </View>

      <View
        style={tw`flex flex-row p-2 items-center justify-between pr-3 pl-3`}
      >
        <Image
          on
          style={[tw`mr-2`, { width: 95, height: 95, resizeMode: "contain" }]}
          source={{
            uri: "https://cdn-prod.medicalnewstoday.com/content/images/articles/283/283659/a-basket-of-eggs.jpg",
          }}
        />
        <View style={tw`items-end`}>
          <Text>{productName}</Text>
          <Text>{`x ${quantity}`}</Text>
          <Text>{`RM${unitPrice}`}</Text>
        </View>
      </View>

      <View
        style={tw`flex flex-row p-2 items-center justify-between pr-3 pl-3 border-b`}
      >
        <Text>{`${quantity} unit`}</Text>
        <Text>{`Total Payment: RM${totalPaid}`}</Text>
      </View>

      <View
        style={tw`flex flex-row p-2 items-center justify-between pr-3 pl-3`}
      >
        <Text>{`Item status: ${status}`}</Text>
      </View>
    </SafeAreaView>
  );
};
export default SalesCard;
