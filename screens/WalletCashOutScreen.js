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
import { RadioButton } from "react-native-paper";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import CashAmount from "../components/CashAmount";
import WalletButton from "../components/WalletButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAccount, setAccount } from "../slices/accountSlice";

const WalletCashOutScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const tempAccount = JSON.parse(JSON.stringify(account));

  const [cashInput, setCashInput] = useState(0);
  const [checked, setChecked] = useState("first");
  const [accNum, setAccNum] = useState("");

  const cashOutFunc = async () => {
    if (cashInput > account.totalWallet) {
      toast.show("Insufficient balance to cash out", {
        type: "danger",
      });
    } else {
      const remainingBalance = tempAccount.totalWallet - cashInput;
      tempAccount.totalWallet = remainingBalance;
      dispatch(setAccount(tempAccount));
      await updateDoc(doc(db, "accounts", account.id), {
        totalWallet: remainingBalance,
      });
      toast.show("Cash Out Successful!", {
        type: "success",
      });
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"Cash Out Wallet"} />

      <View
        style={[
          tw`h-50 border mb-3`,
          { backgroundColor: "rgba(255,255,255,0.6)" },
        ]}
      >
        <View style={tw`flex flex-row flex-wrap justify-center`}>
          <CashAmount cashAmount={5} inputFunc={setCashInput} />
          <CashAmount cashAmount={10} inputFunc={setCashInput} />
          <CashAmount cashAmount={20} inputFunc={setCashInput} />
          <CashAmount cashAmount={50} inputFunc={setCashInput} />

          <CashAmount cashAmount={100} inputFunc={setCashInput} />
          <CashAmount cashAmount={200} inputFunc={setCashInput} />
          <CashAmount cashAmount={300} inputFunc={setCashInput} />
          <CashAmount cashAmount={500} inputFunc={setCashInput} />
        </View>

        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`ml-5 text-red-500 text-xl font-bold mr-3`}>RM:</Text>
          <TextInput
            style={tw`text-lg w-20 mt-[-6] border-b`}
            onChangeText={setCashInput}
            placeholder="Input cash out amount"
            placeholderTextColor="black"
            value={`${cashInput}`}
          />
        </View>
      </View>

      <View
        style={[
          tw` border p-4 mb-3`,
          { backgroundColor: "rgba(255,255,255,0.6)" },
        ]}
      >
        <Text>Payment</Text>

        <View style={[tw`flex flex-row mt-3 mb-3`, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              setChecked("first");
            }}
          >
            <View
              style={tw`h-5 w-5 border rounded-full mr-3 ${
                checked == "first" ? "bg-black" : "bg-white"
              }`}
            />
          </TouchableOpacity>
          <Text>Current bank</Text>
        </View>

        <View style={[tw`flex flex-row`, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              setChecked("second");
            }}
          >
            <View
              style={tw`h-5 w-5 border rounded-full mr-3 ${
                checked == "second" ? "bg-black" : "bg-white"
              }`}
            />
          </TouchableOpacity>

          <Text>Other bank</Text>
        </View>
        <Text style={tw`ml-8 text-gray-500`}>Online banking - Bank Islam </Text>
        <Text style={tw`ml-8 text-gray-500`}>Account number: </Text>
        <TextInput
          style={tw`text-sm w-60 border ml-8`}
          onChangeText={setAccNum}
          placeholder="Enter the account number"
          placeholderTextColor="black"
          value={`${accNum}`}
        />
      </View>

      <View
        style={[
          tw`border mb-3 flex flex-row justify-between p-3 pl-10 pr-30`,
          { backgroundColor: "rgba(255,255,255,0.6)" },
        ]}
      >
        <Text style={tw`font-bold`}>Total cash out</Text>
        <Text style={tw`font-bold`}>{`RM: ${cashInput}`}</Text>
      </View>

      <TouchableOpacity
        style={tw`w-[40%] text-center mx-auto`}
        onPress={cashOutFunc}
      >
        <WalletButton text={"Cash out"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default WalletCashOutScreen;
