
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBy1Kc6U1z0YNrjDia4N9qoLsGPX9plIo8",
    authDomain: "sparta-b8e8f.firebaseapp.com",
    projectId: "sparta-b8e8f",
    storageBucket: "sparta-b8e8f.appspot.com",
    messagingSenderId: "7944380067",
    appId: "1:7944380067:web:5775f84118faa7864b6916",
    measurementId: "G-NCBMC5PS9R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };