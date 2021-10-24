/**
 * @format
 */
import React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./src/store/userReducer";
import { NativeBaseProvider } from 'native-base';
import cartReducer from "./src/store/cartReducer";

const config = configureStore({
    reducer: {
        user : userReducer,
        ventor : userReducer,
        cart: cartReducer,
    }
})


const newApp = () => (
    <Provider store={config}>
        <NativeBaseProvider>
            <App/>
        </NativeBaseProvider>
    </Provider>
);


AppRegistry.registerComponent(appName, () => newApp);
