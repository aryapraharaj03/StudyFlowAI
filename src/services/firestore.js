import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "./firebase";

export const saveRevisionKit = async ({
  summary,
  quiz,
  flashcards,
}) => {
  console.log("saveRevisionKit called");

  const user = auth.currentUser;

  console.log("Current user:", user);

  if (!user) {
    console.log("No user logged in");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "revisionKits"), {
      uid: user.uid,
      email: user.email,
      summary,
      quiz,
      flashcards,
      createdAt: serverTimestamp(),
    });

    console.log("Document saved with ID:", docRef.id);
  } catch (error) {
    console.error("Firestore Error:", error);
    throw error;
  }
};