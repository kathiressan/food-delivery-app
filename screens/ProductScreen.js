import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  FlatList
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
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import ProductCard from "../components/ProductCard";

const ProductScreen = () => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8jHyAAAABPTU7W1dUcGBkZExVqaGgfGxwHAAAbFhf29vYQCAofGhsUDhDy8vKxsLAxLS7o6OgMAAWOjI18enteXFxFQ0PCwcG3trbq6urc3NxVU1OWlJSHhoZycHClpKVCP0A5Nje9vLzJyMiAfn5samooJCWopqcI4FBKAAAC1UlEQVR4nO3c2XaqQBCFYWknhhZxwijBIdHE93/CYBYSxT7nisK1iv+7rQvYgEiPvR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAANeaDLHr1OciJkndzNcvnrz4VGZuZCb0r3y6WGm/kzvheJVhPa+V5nr73RaTLQSsBV8a7F88e7+LO2FE4lBCG1uxbeGQOjwGLiOl9Oa2Xm2WP9UemcVP7dFSz+SvvAtGARcT03+fWjN1zwslHVR3I3sEr8ymc8DlgcdDqBbCPxRP6M9mAzptkl2U1kg9YXE/Z/+BPV8LRuKxm8g9pkfBNNOFh4Tjm5FhW39pIGCTtJxyuy+pJQUL9T6n7TZPfyhPfUW464VY0Yc93ZDDZrXqWf5mG6/+dXgPy54+WsF9VM+lPmuJynoQTRs838f6HkUv/EoO9cMCicVjPsHg45sqI/hRN2kLjonabbP+xfPFMPJIRB3HuPqeGHcoW/pVvxvWLOt2cv8YiVonwa7Ry6pv491kMjXdp6ZhtO50nQRDYNNHYS1OZq04HAAA6Ibssv84H6cbo62w+TGBH8cIEufhAySts+3+t3MB77vmKsoGMrKXLmX2P7hrAE1NrP0W7mTUyFrN9Gw3E6XfoPXgcDBoYK9eN4cfiI0+FtN5h6Id3F3Yg203j+fIRHR339lxVo2PoOK1GI4bSD2rfEcFUb4BEvlvf7mQDTl0RTDVWsh6KJ/SMbELn+Fm8KqvbVkZmZL8zEle3/fC9rLYyunY/MUJA7hrH929TFdoZIZXtwNR/D/X/DvW/S/X/H3bgm0b/d2kH2hb624cdaOP39PfTXGnvawMAAJ2he06U9nlt6ucmqp9fqn6OsPp53vrn6utfb6F+zYz+dU/6167pX3+ofw2p/qdU/1pu/evxO7Cngv59MfTvbdKB/Wk6sMdQB/aJ6sBeX79079cGAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNQPclNNNX+giAMAAAAASUVORK5CYII=",
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8jHyAAAABPTU7W1dUcGBkZExVqaGgfGxwHAAAbFhf29vYQCAofGhsUDhDy8vKxsLAxLS7o6OgMAAWOjI18enteXFxFQ0PCwcG3trbq6urc3NxVU1OWlJSHhoZycHClpKVCP0A5Nje9vLzJyMiAfn5samooJCWopqcI4FBKAAAC1UlEQVR4nO3c2XaqQBCFYWknhhZxwijBIdHE93/CYBYSxT7nisK1iv+7rQvYgEiPvR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAANeaDLHr1OciJkndzNcvnrz4VGZuZCb0r3y6WGm/kzvheJVhPa+V5nr73RaTLQSsBV8a7F88e7+LO2FE4lBCG1uxbeGQOjwGLiOl9Oa2Xm2WP9UemcVP7dFSz+SvvAtGARcT03+fWjN1zwslHVR3I3sEr8ymc8DlgcdDqBbCPxRP6M9mAzptkl2U1kg9YXE/Z/+BPV8LRuKxm8g9pkfBNNOFh4Tjm5FhW39pIGCTtJxyuy+pJQUL9T6n7TZPfyhPfUW464VY0Yc93ZDDZrXqWf5mG6/+dXgPy54+WsF9VM+lPmuJynoQTRs838f6HkUv/EoO9cMCicVjPsHg45sqI/hRN2kLjonabbP+xfPFMPJIRB3HuPqeGHcoW/pVvxvWLOt2cv8YiVonwa7Ry6pv491kMjXdp6ZhtO50nQRDYNNHYS1OZq04HAAA6Ibssv84H6cbo62w+TGBH8cIEufhAySts+3+t3MB77vmKsoGMrKXLmX2P7hrAE1NrP0W7mTUyFrN9Gw3E6XfoPXgcDBoYK9eN4cfiI0+FtN5h6Id3F3Yg203j+fIRHR339lxVo2PoOK1GI4bSD2rfEcFUb4BEvlvf7mQDTl0RTDVWsh6KJ/SMbELn+Fm8KqvbVkZmZL8zEle3/fC9rLYyunY/MUJA7hrH929TFdoZIZXtwNR/D/X/DvW/S/X/H3bgm0b/d2kH2hb624cdaOP39PfTXGnvawMAAJ2he06U9nlt6ucmqp9fqn6OsPp53vrn6utfb6F+zYz+dU/6167pX3+ofw2p/qdU/1pu/evxO7Cngv59MfTvbdKB/Wk6sMdQB/aJ6sBeX79079cGAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNQPclNNNX+giAMAAAAASUVORK5CYII=",
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8jHyAAAABPTU7W1dUcGBkZExVqaGgfGxwHAAAbFhf29vYQCAofGhsUDhDy8vKxsLAxLS7o6OgMAAWOjI18enteXFxFQ0PCwcG3trbq6urc3NxVU1OWlJSHhoZycHClpKVCP0A5Nje9vLzJyMiAfn5samooJCWopqcI4FBKAAAC1UlEQVR4nO3c2XaqQBCFYWknhhZxwijBIdHE93/CYBYSxT7nisK1iv+7rQvYgEiPvR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAANeaDLHr1OciJkndzNcvnrz4VGZuZCb0r3y6WGm/kzvheJVhPa+V5nr73RaTLQSsBV8a7F88e7+LO2FE4lBCG1uxbeGQOjwGLiOl9Oa2Xm2WP9UemcVP7dFSz+SvvAtGARcT03+fWjN1zwslHVR3I3sEr8ymc8DlgcdDqBbCPxRP6M9mAzptkl2U1kg9YXE/Z/+BPV8LRuKxm8g9pkfBNNOFh4Tjm5FhW39pIGCTtJxyuy+pJQUL9T6n7TZPfyhPfUW464VY0Yc93ZDDZrXqWf5mG6/+dXgPy54+WsF9VM+lPmuJynoQTRs838f6HkUv/EoO9cMCicVjPsHg45sqI/hRN2kLjonabbP+xfPFMPJIRB3HuPqeGHcoW/pVvxvWLOt2cv8YiVonwa7Ry6pv491kMjXdp6ZhtO50nQRDYNNHYS1OZq04HAAA6Ibssv84H6cbo62w+TGBH8cIEufhAySts+3+t3MB77vmKsoGMrKXLmX2P7hrAE1NrP0W7mTUyFrN9Gw3E6XfoPXgcDBoYK9eN4cfiI0+FtN5h6Id3F3Yg203j+fIRHR339lxVo2PoOK1GI4bSD2rfEcFUb4BEvlvf7mQDTl0RTDVWsh6KJ/SMbELn+Fm8KqvbVkZmZL8zEle3/fC9rLYyunY/MUJA7hrH929TFdoZIZXtwNR/D/X/DvW/S/X/H3bgm0b/d2kH2hb624cdaOP39PfTXGnvawMAAJ2he06U9nlt6ucmqp9fqn6OsPp53vrn6utfb6F+zYz+dU/6167pX3+ofw2p/qdU/1pu/evxO7Cngv59MfTvbdKB/Wk6sMdQB/aJ6sBeX79079cGAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNQPclNNNX+giAMAAAAASUVORK5CYII=",
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d71',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8jHyAAAABPTU7W1dUcGBkZExVqaGgfGxwHAAAbFhf29vYQCAofGhsUDhDy8vKxsLAxLS7o6OgMAAWOjI18enteXFxFQ0PCwcG3trbq6urc3NxVU1OWlJSHhoZycHClpKVCP0A5Nje9vLzJyMiAfn5samooJCWopqcI4FBKAAAC1UlEQVR4nO3c2XaqQBCFYWknhhZxwijBIdHE93/CYBYSxT7nisK1iv+7rQvYgEiPvR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAANeaDLHr1OciJkndzNcvnrz4VGZuZCb0r3y6WGm/kzvheJVhPa+V5nr73RaTLQSsBV8a7F88e7+LO2FE4lBCG1uxbeGQOjwGLiOl9Oa2Xm2WP9UemcVP7dFSz+SvvAtGARcT03+fWjN1zwslHVR3I3sEr8ymc8DlgcdDqBbCPxRP6M9mAzptkl2U1kg9YXE/Z/+BPV8LRuKxm8g9pkfBNNOFh4Tjm5FhW39pIGCTtJxyuy+pJQUL9T6n7TZPfyhPfUW464VY0Yc93ZDDZrXqWf5mG6/+dXgPy54+WsF9VM+lPmuJynoQTRs838f6HkUv/EoO9cMCicVjPsHg45sqI/hRN2kLjonabbP+xfPFMPJIRB3HuPqeGHcoW/pVvxvWLOt2cv8YiVonwa7Ry6pv491kMjXdp6ZhtO50nQRDYNNHYS1OZq04HAAA6Ibssv84H6cbo62w+TGBH8cIEufhAySts+3+t3MB77vmKsoGMrKXLmX2P7hrAE1NrP0W7mTUyFrN9Gw3E6XfoPXgcDBoYK9eN4cfiI0+FtN5h6Id3F3Yg203j+fIRHR339lxVo2PoOK1GI4bSD2rfEcFUb4BEvlvf7mQDTl0RTDVWsh6KJ/SMbELn+Fm8KqvbVkZmZL8zEle3/fC9rLYyunY/MUJA7hrH929TFdoZIZXtwNR/D/X/DvW/S/X/H3bgm0b/d2kH2hb624cdaOP39PfTXGnvawMAAJ2he06U9nlt6ucmqp9fqn6OsPp53vrn6utfb6F+zYz+dU/6167pX3+ofw2p/qdU/1pu/evxO7Cngv59MfTvbdKB/Wk6sMdQB/aJ6sBeX79079cGAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNQPclNNNX+giAMAAAAASUVORK5CYII=",
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8jHyAAAABPTU7W1dUcGBkZExVqaGgfGxwHAAAbFhf29vYQCAofGhsUDhDy8vKxsLAxLS7o6OgMAAWOjI18enteXFxFQ0PCwcG3trbq6urc3NxVU1OWlJSHhoZycHClpKVCP0A5Nje9vLzJyMiAfn5samooJCWopqcI4FBKAAAC1UlEQVR4nO3c2XaqQBCFYWknhhZxwijBIdHE93/CYBYSxT7nisK1iv+7rQvYgEiPvR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAANeaDLHr1OciJkndzNcvnrz4VGZuZCb0r3y6WGm/kzvheJVhPa+V5nr73RaTLQSsBV8a7F88e7+LO2FE4lBCG1uxbeGQOjwGLiOl9Oa2Xm2WP9UemcVP7dFSz+SvvAtGARcT03+fWjN1zwslHVR3I3sEr8ymc8DlgcdDqBbCPxRP6M9mAzptkl2U1kg9YXE/Z/+BPV8LRuKxm8g9pkfBNNOFh4Tjm5FhW39pIGCTtJxyuy+pJQUL9T6n7TZPfyhPfUW464VY0Yc93ZDDZrXqWf5mG6/+dXgPy54+WsF9VM+lPmuJynoQTRs838f6HkUv/EoO9cMCicVjPsHg45sqI/hRN2kLjonabbP+xfPFMPJIRB3HuPqeGHcoW/pVvxvWLOt2cv8YiVonwa7Ry6pv491kMjXdp6ZhtO50nQRDYNNHYS1OZq04HAAA6Ibssv84H6cbo62w+TGBH8cIEufhAySts+3+t3MB77vmKsoGMrKXLmX2P7hrAE1NrP0W7mTUyFrN9Gw3E6XfoPXgcDBoYK9eN4cfiI0+FtN5h6Id3F3Yg203j+fIRHR339lxVo2PoOK1GI4bSD2rfEcFUb4BEvlvf7mQDTl0RTDVWsh6KJ/SMbELn+Fm8KqvbVkZmZL8zEle3/fC9rLYyunY/MUJA7hrH929TFdoZIZXtwNR/D/X/DvW/S/X/H3bgm0b/d2kH2hb624cdaOP39PfTXGnvawMAAJ2he06U9nlt6ucmqp9fqn6OsPp53vrn6utfb6F+zYz+dU/6167pX3+ofw2p/qdU/1pu/evxO7Cngv59MfTvbdKB/Wk6sMdQB/aJ6sBeX79079cGAAAAAAAAAAAAAAAAAAAAAAAAAAAAQNQPclNNNX+giAMAAAAASUVORK5CYII=",
      productName: 'Telur Kampung',
      price: 15.00,
      stock: 15,
      rating: 4.9,
      sold: 4,
      views: 4
    },
  ];

  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"My products"} />

      {/* <ProductCard id={"123"} image={""} productName={"Telur Kampung"} price={15.00} stock={15} rating={4.9} sold={4} views={4} /> */}

      <FlatList
        data={DATA}
        renderItem={ProductCard}
        keyExtractor={item => item.id}
      />

      {/* <ProductCard />
      <ProductCard /> */}
    </SafeAreaView>
  );
};
export default ProductScreen;
