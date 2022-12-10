import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB2HXy3MvAd4FOu_-Re02V35WCv9EqFqko",
  authDomain: "todo-app-d4b9d.firebaseapp.com",
  projectId: "todo-app-d4b9d",
  storageBucket: "todo-app-d4b9d.appspot.com",
  messagingSenderId: "338045175961",
  appId: "1:338045175961:web:f429ef2ae740066eec1008",
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
