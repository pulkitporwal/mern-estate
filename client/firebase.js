// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACJhfA75ySb5UVs1ScVfz9mYJcfBn4RWc",
  authDomain: "mern-estate-jivans.firebaseapp.com",
  projectId: "mern-estate-jivans",
  storageBucket: "mern-estate-jivans.appspot.com",
  messagingSenderId: "796541606248",
  appId: "1:796541606248:web:1bc4eefc66e0ffad7b9edd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}