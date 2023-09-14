// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCsATFLxcAwVFNYjIyxgk_7e0aUhopVnUw",
    authDomain: "connectmed-e2283.firebaseapp.com",
    projectId: "connectmed-e2283",
    storageBucket: "connectmed-e2283.appspot.com",
    messagingSenderId: "400492417088",
    appId: "1:400492417088:web:5a209e043eb8988c9c8fa5"
};

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage), // Use AsyncStorage aqui
});

export default auth;
