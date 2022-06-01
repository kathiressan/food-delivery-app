import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import ProductCard from "../components/ProductCard";
import { selectProductToEdit, setProductToEdit } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import WalletButton from "../components/WalletButton";
import { selectAccount } from "../slices/accountSlice";

const ProductScreen = () => {
  const productToEdit = useSelector(selectProductToEdit);
  const navigation = useNavigation();
  const toast = useToast();
  const [productData, setProduct] = useState([]);
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  useEffect(() => {
    setProduct([]);
    async function getProducts() {
      const q = query(
        collection(db, "products"),
        where("sellerID", "==", account.id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        try {
          const docObj = doc.data();
          docObj.id = doc.id;
          setProduct((oldArray) => [...oldArray, docObj]);
        } catch (err) {}
      });
    }
    getProducts();
  }, []);
  const delistProduct = async (productID) => {
    await updateDoc(doc(db, "products", productID), {
      publish: false,
    });
    toast.show("Product delisted!", {
      type: "success",
    });
    navigation.navigate("HomeScreen");
  };

  const editProduct = (item) => {
    dispatch(setProductToEdit(item));
    navigation.navigate("EditProductScreen");
  };
  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"My products"} />
      <ScrollView>
        {productData.map((item) => (
          <View
            key={item.id}
            style={tw`flex bg-gray-400 p-3 m-2 border rounded-lg justify-center`}
          >
            <View style={tw`flex flex-row mb-2`}>
              <View>
                <Image
                  on
                  style={[
                    tw`rounded-lg mr-5`,
                    { width: 100, height: 70, resizeMode: "contain" },
                  ]}
                  source={{
                    uri: item.imageUrl,
                  }}
                />
              </View>

              <View style={tw`flex flex-1`}>
                <Text style={tw`text-white`}>{item.name}</Text>
                <Text style={tw`text-white`}>{`RM ${item.price}`}</Text>
              </View>
            </View>

            <View
              style={{
                borderColor: "white",
                borderStyle: "dotted",
                borderWidth: 1,
                borderRadius: 1,
                marginBottom: 15,
              }}
            />

            <View style={tw`flex flex-row flex-wrap`}>
              <Text style={tw`text-white mr-3`}>Stock: {item.stock}</Text>
              <Text style={tw`text-white mr-3`}>Rating: {item.rating}</Text>
            </View>
            <View style={tw`flex flex-row flex-wrap`}>
              <Text style={tw`text-white mr-3`}>Sold: {item.sold}</Text>
              <Text style={tw`text-white mr-3`}>Views: {item.views}</Text>
            </View>

            <View style={tw`flex flex-row justify-center items-center`}>
              {item.publish ? (
                <TouchableOpacity
                  style={tw`mr-5 w-15`}
                  onPress={() => {
                    delistProduct(item.id);
                  }}
                >
                  <WalletButton text={"Delist"} />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={tw`w-15`}
                onPress={() => {
                  editProduct(item);
                }}
              >
                <WalletButton text={"Edit"} />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* <FlatList
        data={productData}
        renderItem={({ item }) => (

        )}
        keyExtractor={(item) => item.id}
      /> */}

        {/* <ProductCard />
      <ProductCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProductScreen;
