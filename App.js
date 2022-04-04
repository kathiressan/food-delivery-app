import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store";
import { Provider } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import NewProductScreen from "./screens/NewProductScreen";

export default function App() {
  const Stack = createStackNavigator();
  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await SplashScreen.preventAutoHideAsync();
  //       // await new Promise(resolve => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  return (
    // <Provider store={store}>
    //   <NavigationContainer>
    //     <ToastProvider
    // placement="top"
    // offsetTop={80}
    // duration={1500}
    // animationType="slide-in"
    // swipeEnabled={true}
    // textStyle={{ fontSize: 17 }}
    //     >
    //       <SafeAreaProvider>
    //         <KeyboardAvoidingView
    //           behavior={Platform.OS === "ios" ? "padding" : "height"}
    //           style={{ flex: 1 }}
    //           keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
    //       <Stack.Navigator
    //         initialRouteName="LoginScreen"
    //       >
    //       <Stack.Screen>

    //       </Stack.Screen>
    //       </Stack.Navigator>
    //         ></KeyboardAvoidingView>
    //         {/* <View
    //           // style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    //           onLayout={onLayoutRootView}
    //         >
    //           <LoginScreen />
    //           <StatusBar style="auto" />
    //         </View> */}
    //       </SafeAreaProvider>
    //     </ToastProvider>
    //   </NavigationContainer>
    // </Provider>
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <ToastProvider
              placement="top"
              offsetTop={80}
              duration={1500}
              animationType="slide-in"
              swipeEnabled={true}
              textStyle={{ fontSize: 17 }}
            >
              <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="RegisterScreen"
                  component={RegisterScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                                <Stack.Screen
                  name="NewProductScreen"
                  component={NewProductScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </ToastProvider>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
