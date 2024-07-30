import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqFYEameeEUvvySGu_7S82m3OGtZm7-wM",
  authDomain: "login-and-register-1fa0b.firebaseapp.com",
  projectId: "login-and-register-1fa0b",
  storageBucket: "login-and-register-1fa0b.appspot.com",
  messagingSenderId: "815302368107",
  appId: "1:815302368107:web:e94e59f03b5e187c8b4a2e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
