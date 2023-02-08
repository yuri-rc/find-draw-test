import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzrgzNayLBorn1ofMrDfZxS7h-aP-ceIo",
  authDomain: "to-do-17007.firebaseapp.com",
  projectId: "to-do-17007",
  storageBucket: "to-do-17007.appspot.com",
  messagingSenderId: "647377148603",
  appId: "1:647377148603:web:0a71648e1ed6e2b605e79e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
export const databaseApp = getFirestore(app);
export const storage = getStorage(app);
// export const storagee = storage();
