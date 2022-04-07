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
import MainTitle from "../components/MainTitle";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
  
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
      <MainTitle title={"Add new product"} />

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

      {/* <View style={[tw`border p-2 mt-5`, {backgroundColor: "rgba(255,255,255,0.6)"}]}> */}
            {/* <View style={tw`flex flex-row`}><Text style={tw`text-black`}>Product description</Text><Text style={tw`text-red-500`}>*</Text></View> */}
            <View style={[tw`flex flex-row justify-between mt-5 p-2 border`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
              <View style={tw`flex flex-row items-center`}>
                <View style={tw`mr-5`}>
                  <Feather name="list" size={20} />
                </View>         
                <View><Text>Category</Text></View>
                <View><Text style={tw`text-red-500`}>*</Text></View>
              </View>
              <View>
                <Text>{">"}</Text>
              </View>
            </View>

            <View style={[tw`flex flex-row justify-between p-2 border-b border-r border-l`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
              <View style={tw`flex flex-row items-center`}>
                <View style={tw`mr-5`}>
                  <MaterialCommunityIcons name="hazard-lights" size={20} />
                </View>      
                <View><Text>Dangerous Goods</Text></View>
                <View><Text style={tw`text-red-500`}>*</Text></View>
              </View>
              <View>
                <Text>{">"}</Text>
              </View>
            </View>

            <View style={[tw`flex flex-row justify-between p-2 border-b border-r border-l`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
              <View style={tw`flex flex-row items-center`}>
                <View style={tw`mr-5`}>
                  <MaterialIcons name="attach-money" size={20} />
                </View>         
                <View><Text>Price</Text></View>
                <View><Text style={tw`text-red-500`}>*</Text></View>
              </View>
              <View>
                <Text>{">"}</Text>
              </View>
            </View>

            <View style={[tw`flex flex-row justify-between p-2 border-b border-r border-l`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
              <View style={tw`flex flex-row items-center`}>
                <View style={tw`mr-5`}>
                  <Fontisto name="shopping-bag-1" size={20} />
                </View>         
                <View><Text>Variations</Text></View>
                <View><Text style={tw`text-red-500`}>*</Text></View>
              </View>
              <View>
                <Text>{">"}</Text>
              </View>
            </View>

            <View style={[tw`flex flex-row justify-between p-2 border-b border-r border-l`, {backgroundColor: "rgba(255,255,255,0.6)"}]}>
              <View style={tw`flex flex-row items-center`}>
                <View style={tw`mr-5`}>
                  <FontAwesome5 name="warehouse" size={20} />
                </View>      
                <View><Text>Stock</Text></View>
                <View><Text style={tw`text-red-500`}>*</Text></View>
              </View>
              <View>
                <Text>{">"}</Text>
              </View>
            </View>
      {/* </View> */}

    </SafeAreaView>
  );
};
export default NewProductScreen;
