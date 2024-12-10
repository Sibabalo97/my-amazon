import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBtjie78fsxQXpZ_8cHmL8k1Z_UAtWkOw",
  authDomain: "challenge-1c2a3.firebaseapp.com",
  databaseURL: "https://challenge-1c2a3.firebaseio.com",
  projectId: "challenge-1c2a3",
  storageBucket: "challenge-1c2a3.appspot.com",
  messagingSenderId: "21783335578",
  appId: "1:21783335578:web:5a9097d4dc2b8ed1578523",
  measurementId: "G-6KKYMLBNN1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export both services (no need to re-export auth separately)
export { auth, firestore as db };