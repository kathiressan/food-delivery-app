import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

const SalesCard = ({
  item: { id, items, subTotal, totalAmount, userID, orderStatus },
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
        {/* <Text>{username}</Text> */}
      </View>

      <View style={tw`flex`}>
        {items.map((item, index) => (
          <View
            key={index}
            style={tw`flex flex-row p-2 items-center justify-between pr-3 pl-3`}
          >
            <Image
              on
              style={[
                tw`mr-2`,
                { width: 95, height: 95, resizeMode: "contain" },
              ]}
              source={{
                uri: item.image,
              }}
            />
            <View style={tw`items-end`}>
              <Text>{item.productName}</Text>
              <Text>{`x ${item.unit}`}</Text>
              <Text>{`RM${item.price}`}</Text>
            </View>
          </View>
        ))}
      </View>

      <View
        style={tw`flex flex-row p-2 items-center justify-end pr-3 pl-3 border-b`}
      >
        <Text>{`Subtotal: RM${subTotal}`}</Text>
      </View>
      <View
        style={tw`flex flex-row p-2 items-center justify-end pr-3 pl-3 border-b`}
      >
        <Text>{`Total Amount: RM${totalAmount}`}</Text>
      </View>

      <View
        style={tw`flex flex-row p-2 items-center justify-between pr-3 pl-3`}
      >
        <Text>{`Order status: ${
          orderStatus == "PENDING_PICKUP" ? "Pending Pickup" : orderStatus
        }`}</Text>
      </View>
    </SafeAreaView>
  );
};
export default SalesCard;
