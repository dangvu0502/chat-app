import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnIK3VUCvHGwhomLhQFOLpsjPpRMyLGws",
  authDomain: "chat-app-30210.firebaseapp.com",
  projectId: "chat-app-30210",
  storageBucket: "chat-app-30210.appspot.com",
  messagingSenderId: "383852070153",
  appId: "1:383852070153:web:e96e17a32a6b57044bffd8",
  measurementId: "G-RRF34J678T",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");
const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);
export { auth, db };
