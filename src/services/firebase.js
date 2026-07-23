import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGUmDKjOkDFWJhKnCfe1ZYKKdqIl9G2g8",
  authDomain: "studyflow-ai-aa74d.firebaseapp.com",
  projectId: "studyflow-ai-aa74d",
  storageBucket: "studyflow-ai-aa74d.firebasestorage.app",
  messagingSenderId: "311148404022",
  appId: "1:311148404022:web:87ec5cf97f7ff27ee1e797" 
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);