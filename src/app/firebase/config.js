import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCuzWIYaj5-PPzUP_jxJi4jt4AQbHCOzvk",
    authDomain: "learnwithme-66b45.firebaseapp.com",
    projectId: "learnwithme-66b45",
    storageBucket: "learnwithme-66b45.appspot.com",
    messagingSenderId: "491228412550",
    appId: "1:491228412550:web:dc5055cb412635e3d66f07",
    measurementId: "G-W07BKR783X"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };