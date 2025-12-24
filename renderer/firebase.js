// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCMszzMowNXt4j0sWMwdkKWNtg8DFxRzI",
  authDomain: "lmr-oops-3b619.firebaseapp.com",
  projectId: "lmr-oops-3b619",
  storageBucket: "lmr-oops-3b619.appspot.com",
  messagingSenderId: "798675650798",
  appId: "1:798675650798:web:b89f9cc6d8a5cc5a434bff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to Sign In with Google (REDIRECT)
export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider);
};

// Handle Redirect Result After Login
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      console.log("User Info:", result.user);
    }
  })
  .catch((error) => {
    console.error("Google Sign-In Error:", error);
  });
