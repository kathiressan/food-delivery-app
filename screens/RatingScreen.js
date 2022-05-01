import { get } from "lodash";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { Rating } from "react-native-rating-element";
import CircularProgress from "react-native-circular-progress-indicator";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import ReviewerComponent from "../components/ReviewerComponent";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectAccount } from "../slices/accountSlice";

const RatingScreen = () => {
  const [products, setProducts] = useState([]);
  const [ratedBy, setRatedBy] = useState([]);
  const [rating, setRating] = useState(null);
  const [ratingProcessed, setRatingProcessed] = useState(false);
  const account = useSelector(selectAccount);
  // const DATA = [
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     username: "Safwan",
  //     rating: 3.2,
  //     timestamp: "2022-06-04",
  //   },
  //   {
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
  //     username: "Ahmad",
  //     rating: 4.5,
  //     timestamp: "2022-06-04",
  //   },
  // ];

  useEffect(() => {
    setProducts([]);
    setRatingProcessed(false);
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
          setProducts((oldArray) => [...oldArray, docObj]);
          const mainRating = get(docObj, "rating");
          const userRating = get(docObj, "ratedBy");
          if (parseFloat(mainRating) > 0) {
            if (!rating) setRating(String(mainRating));
            else setRating((parseFloat(rating) + parseFloat(mainRating)) / 2);
          }
          let tempArr = [];
          for (let raters of userRating) {
            raters.id = raters.username + raters.date;
            tempArr.push(raters);
          }
          if (tempArr.length > 0) {
            setRatedBy(tempArr);
          }
        } catch (err) {
          alert(err);
        }
      });
    }
    function doSomething() {
      setRatingProcessed(true);
    }
    getProducts().then(() => doSomething());
  }, []);

  return (
    <SafeAreaView style={tw`flex bg-purple-400 h-full`}>
      <Header />
      <MainTitle title={"My Rating"} />
      <View style={tw`items-center`}>
        {ratingProcessed && (
          <>
            <CircularProgress
              value={rating}
              radius={120}
              duration={1000}
              progressValueColor={"#ecf0f1"}
              maxValue={5}
              // title={'4.5'}
              titleColor={"white"}
              titleStyle={{ fontWeight: "bold" }}
              progressFormatter={(value) => {
                "worklet";
                if (typeof value == "string") return value;
                if (typeof value == "number") return value.toFixed(2);
              }}
            />
            <Rating
              rated={4.5}
              totalCount={5}
              ratingColor="#f1c644"
              ratingBackgroundColor="#d4d4d4"
              size={24}
              readonly // by default is false
              icon="ios-star"
              direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
            />
          </>
        )}
      </View>
      <FlatList
        data={ratedBy}
        renderItem={ReviewerComponent}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default RatingScreen;
