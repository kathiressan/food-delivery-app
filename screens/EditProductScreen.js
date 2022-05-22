import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
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
import NewProductFeature from "../components/NewProductFeature";
import CheckBox from "expo-checkbox";
import { selectProductToEdit, setProductToEdit } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";

const EditProductScreen = () => {
  const productToEdit = useSelector(selectProductToEdit);

  const productsRef = collection(db, "products");
  const navigation = useNavigation();
  const toast = useToast();
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);

  const [catValue, setCatValue] = useState(null);
  const [agreeDanger, setAgreeDanger] = useState(false);
  const [price, setPrice] = useState(null);
  const [stock, setStock] = useState(null);

  const categoryList = [
    "Baby",
    "Beverages",
    "Bread & Bakery",
    "Breakfast & Cereal",
    "Canned Goods",
    "Condiments/Spices",
    "Snacks & Candy",
    "Dairy",
    "Produce",
    "Pasta",
    "Meat",
    "Cleaning Supplies",
    "Personal Care",
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const publishProduct = async () => {
    saveProduct("publish");
  };

  const saveProduct = async (type = "save") => {
    try {
      let canSave = true;
      if (!image) {
        toast.show("Please upload an image", {
          type: "danger",
        });
        canSave = false;
      } else if (!productName) {
        toast.show("Please enter a product name", {
          type: "danger",
        });
        canSave = false;
      } else if (!productDescription) {
        toast.show("Please enter a product description", {
          type: "danger",
        });
        canSave = false;
      } else if (!catValue) {
        toast.show("Please enter a product category", {
          type: "danger",
        });
        canSave = false;
      } else if (!price) {
        toast.show("Please enter a product price", {
          type: "danger",
        });
        canSave = false;
      } else if (!stock) {
        toast.show("Please enter product stock", {
          type: "danger",
        });
        canSave = false;
      } else if (price && isNaN(price)) {
        toast.show("Product price should be a number", {
          type: "danger",
        });
        canSave = false;
      }

      if (canSave) {
        let downloadURL;
        if (image != productToEdit.image) {
          const storage = getStorage();
          const imageRef = ref(storage, productToEdit.id);
          await deleteObject(imageRef);

          const img = await fetch(image);
          const bytes = await img.blob();
          await uploadBytes(imageRef, bytes);
          downloadURL = await getDownloadURL(imageRef);
        }

        await updateDoc(doc(db, "products", productToEdit.id), {
          name: productName,
          description: productDescription,
          category: catValue,
          dangerousGoods: agreeDanger,
          price: parseFloat(price),
          stock: parseInt(stock),
          publish: type == "save" ? false : true,
          ...(downloadURL && { imageUrl: downloadURL }),
        });

        toast.show(
          `Product ${type == "save" ? "saved" : "published"} sucessfully!`,
          {
            type: "success",
          }
        );
        navigation.navigate("HomeScreen");
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    setImage(productToEdit.imageUrl);
    setProductName(productToEdit.name);
    setProductDescription(productToEdit.description);
    setCatValue(productToEdit.category);
    setAgreeDanger(productToEdit.dangerousGoods);
    setPrice(String(productToEdit.price));
    setStock(String(productToEdit.stock));
  }, []);

  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"Add new product"} />
      <ScrollView style={tw`mb-20`}>
        <View
          style={[
            tw`h-30 border`,
            { backgroundColor: "rgba(255,255,255,0.6)" },
          ]}
        >
          <TouchableOpacity onPress={pickImage}>
            <View style={tw`h-25 w-30 mt-2 ml-2 bg-white border`}>
              {image ? (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Text style={[tw`m-auto text-black`]}>Add Photo/Video</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            tw`h-15 border p-2 mt-5`,
            { backgroundColor: "rgba(255,255,255,0.6)" },
          ]}
        >
          <View style={tw`flex flex-row`}>
            <Text style={tw`text-black`}>Product Name</Text>
            <Text style={tw`text-red-500`}>*</Text>
          </View>
          <TouchableOpacity>
            <TextInput
              style={tw`w-[65%]`}
              onChangeText={setProductName}
              placeholder="Enter product name"
              value={productName}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            tw`h-15 border p-2 mt-5 mb-5`,
            { backgroundColor: "rgba(255,255,255,0.6)" },
          ]}
        >
          <View style={tw`flex flex-row`}>
            <Text style={tw`text-black`}>Product description</Text>
            <Text style={tw`text-red-500`}>*</Text>
          </View>
          <TouchableOpacity>
            <TextInput
              style={tw`w-[65%]`}
              onChangeText={setProductDescription}
              placeholder="Enter product description"
              value={productDescription}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setOne(!one);
          }}
        >
          <NewProductFeature
            featureName={"Category"}
            icon={<Feather name="list" size={20} spaceTop={true} />}
            touchFunc={setOne}
            touchValue={one}
          />
        </TouchableOpacity>

        {one ? (
          <ScrollView horizontal={true} style={tw`p-2 bg-white text-black`}>
            <RadioButton.Group
              onValueChange={(newValue) => setCatValue(newValue)}
              value={catValue}
            >
              <View style={tw`flex flex-row`}>
                {categoryList.map((item) => (
                  <View
                    key={item}
                    style={tw`flex flex-row items-center border mr-3 p-1`}
                  >
                    <Text>{item}</Text>
                    <View style={tw`bg-gray-300`}>
                      <RadioButton value={item} />
                    </View>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </ScrollView>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            setTwo(!two);
          }}
        >
          <NewProductFeature
            featureName={"Dangerous Goods"}
            icon={<MaterialCommunityIcons name="hazard-lights" size={20} />}
          />
        </TouchableOpacity>
        {two ? (
          <View style={tw`flex flex-row bg-white p-2`}>
            <CheckBox
              value={agreeDanger}
              onValueChange={() => setAgreeDanger(!agreeDanger)}
              color={agreeDanger ? "#4630EB" : undefined}
            />
            <Text style={tw`ml-3`}>Is Dangerous Goods?</Text>
          </View>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            setThree(!three);
          }}
        >
          <NewProductFeature
            featureName={"Price"}
            icon={<MaterialIcons name="attach-money" size={20} />}
          />
        </TouchableOpacity>

        {three ? (
          <TouchableOpacity>
            <TextInput
              style={tw` text-black p-2 bg-white`}
              onChangeText={setPrice}
              placeholder="Enter price"
              value={price}
            />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => {
            setFour(!four);
          }}
        >
          <NewProductFeature
            featureName={"Variations"}
            icon={<Fontisto name="shopping-bag-1" size={20} />}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFive(!five);
          }}
        >
          <NewProductFeature
            featureName={"Stock"}
            icon={<FontAwesome5 name="warehouse" size={20} />}
          />
        </TouchableOpacity>

        {five ? (
          <TouchableOpacity>
            <TextInput
              keyboardType="number-pad"
              style={tw` text-black p-2 bg-white`}
              onChangeText={setStock}
              placeholder="Enter stock"
              value={stock}
            />
          </TouchableOpacity>
        ) : null}

        <View style={tw`flex flex-row justify-center items-center`}>
          <TouchableOpacity style={tw`mr-5 w-20`} onPress={saveProduct}>
            <WalletButton text={"Save"} />
          </TouchableOpacity>
          <TouchableOpacity style={tw`w-20`} onPress={publishProduct}>
            <WalletButton text={"Publish"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProductScreen;
