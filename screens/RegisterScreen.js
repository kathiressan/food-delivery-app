import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { collection, addDoc, doc } from "firebase/firestore";
import {
  getFirestore,
  // collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [preferredBank, setPreferredBank] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  const toast = useToast();
  const accountsRef = collection(db, "accounts");
  const navigation = useNavigation();

  const registerFunc = async () => {
    try {
      await addDoc(accountsRef, {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        shopName: shopName,
        shopLocation: shopLocation,
        shopAddress: shopAddress,
        preferredBank: preferredBank,
        bankAccountNumber: bankAccountNumber,
        totalCollected: 0.0,
        totalWallet: 0.0,
        accountType: "Seller",
      });
      toast.show("Registration Successful!", {
        type: "success",
      });
      navigation.navigate("LoginScreen");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={tw`bg-purple-400 h-full flex items-center`}>
      <ScrollView style={tw`w-[100%]`}>
        <View style={tw`flex items-center w-[100%]`}>
          <Image
            style={[
              tw`mt-20 rounded-full`,
              { width: 100, height: 100, resizeMode: "contain" },
            ]}
            source={{
              uri: "https://thumbs.dreamstime.com/b/shopping-cart-orange-background-icon-vector-illustration-stock-80754940.jpg",
            }}
          />
          <Text style={tw`font-bold text-4xl`}>Hello Seller!</Text>
          <Text style={tw`font-bold text-lg`}>Create your account below</Text>
        </View>
        <View style={tw`flex items-center`}>
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-4`}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="black"
            value={name}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor="black"
            value={phoneNumber}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            value={password}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setShopName}
            placeholder="Shop Name"
            placeholderTextColor="black"
            value={shopName}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setShopLocation}
            placeholder="Shop Location"
            placeholderTextColor="black"
            value={shopLocation}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setShopAddress}
            placeholder="Shop Address"
            placeholderTextColor="black"
            value={shopAddress}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setPreferredBank}
            placeholder="Preferred Bank"
            placeholderTextColor="black"
            value={preferredBank}
          />
          <TextInput
            style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
            onChangeText={setBankAccountNumber}
            placeholder="Bank Account Number"
            placeholderTextColor="black"
            value={bankAccountNumber}
          />
          <TouchableOpacity style={tw`w-[20%]`}>
            <Text
              style={tw`bg-gray-100 text-center border p-2 rounded overflow-hidden mt-2 mb-4`}
              onPress={registerFunc}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row mt-6 mb-20 mx-auto`}>
          <Text style={tw`mr-2`}>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={tw`text-blue-600`}
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              Click here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
