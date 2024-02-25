// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBID27_GnNguJXWuOtor0V-_pTMQi8aYmk",
	authDomain: "mern-estate-jivan.firebaseapp.com",
	projectId: "mern-estate-jivan",
	storageBucket: "mern-estate-jivan.appspot.com",
	messagingSenderId: "1063793076632",
	appId: "1:1063793076632:web:b52ee27656547d629fe3ed",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
