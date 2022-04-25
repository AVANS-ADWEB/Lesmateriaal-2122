# Korte handleiding

1. https://console.firebase.google.com/

2. npm install firebase

3. Maak FirebaseService 

    ng g service Firebase

4. Sla configuratie op

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


5. Optioneel: CLI voor Firebase

    npm install -g firebase-tools