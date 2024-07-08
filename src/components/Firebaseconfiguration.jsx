import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgSznHpVwobCeRajlNV7Kd3wzzhdx7q50",
    authDomain: "gtcaptionsignals.firebaseapp.com",
    projectId: "gtcaptionsignals",
    storageBucket: "gtcaptionsignals.appspot.com",
    messagingSenderId: "977631800678",
    appId: "1:977631800678:web:b245b2718a0409ea5b6ca7",
};

// apiKey: "AIzaSyDgSznHpVwobCeRajlNV7Kd3wzzhdx7q50",
// authDomain: "gtcaptionsignals.firebaseapp.com",
// projectId: "gtcaptionsignals",
// storageBucket: "gtcaptionsignals.appspot.com",
// messagingSenderId: "977631800678",
// appId: "1:977631800678:web:b245b2718a0409ea5b6ca7",
// measurementId: "G-MRGJW3J35C"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
