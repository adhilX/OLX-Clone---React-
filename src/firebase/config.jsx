import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBstVxnichb1qnziCilYelPO3QQgQ_dd8c",
  authDomain: "olx-clone-db34a.firebaseapp.com",
  projectId: "olx-clone-db34a",
  storageBucket: "olx-clone-db34a.firebasestorage.app",
  messagingSenderId: "23817729462",
  appId: "1:23817729462:web:7ae7608e1dab3f5c8f3d17"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {db, storage, auth}