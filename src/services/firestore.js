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
  const user = auth.currentUser;

console.log("Current user:", user);

if (!user) {
  console.log("No user logged in");
  return;
}

console.log("Saving to Firestore...");

  await addDoc(collection(db, "revisionKits"), {
    uid: user.uid,
    email: user.email,
    summary,
    quiz,
    flashcards,
    createdAt: serverTimestamp(),
  });
};