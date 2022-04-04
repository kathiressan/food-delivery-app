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
  import * as ImagePicker from 'expo-image-picker';
import Header from "../components/Header";
  
const NewProductScreen = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }


  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <View>
        <Text style={tw`mx-auto text-white text-xl`}>Add new product</Text>
          <View
            style={{
              borderColor: "white",
              borderStyle: "dotted",
              borderWidth: 1,
              borderRadius: 1,
              marginBottom: 15,
            }}
          />
      </View>

      <View style={[tw`h-30 border`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
            <TouchableOpacity onPress={pickImage}>
            <View style={tw`h-25 w-30 mt-2 ml-2 bg-white border`}>
              {image ? <Image source={{ uri: image }} style={{ width:"100%", height: "100%" }} /> : <Text style={[tw`m-auto text-black`]}>Add Photo/Video</Text>}
            </View>
            </TouchableOpacity>
      </View>

      <View style={[tw`h-15 border p-2 mt-5`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
            <View style={tw`flex flex-row`}><Text style={tw`text-black`}>Product Name</Text><Text style={tw`text-red-500`}>*</Text></View>
            <TouchableOpacity>
            <TextInput
              style={tw`w-[65%]`}
              onChangeText={setProductName}
              placeholder="Enter product name"
              value={productName}
            />
            </TouchableOpacity>
      </View>

      <View style={[tw`h-15 border p-2 mt-5`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
            <View style={tw`flex flex-row`}><Text style={tw`text-black`}>Product description</Text><Text style={tw`text-red-500`}>*</Text></View>
            <TouchableOpacity>
            <TextInput
              style={tw`w-[65%]`}
              onChangeText={setProductDescription}
              placeholder="Enter product description"
              value={productDescription}
            />
            </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
export default NewProductScreen;
