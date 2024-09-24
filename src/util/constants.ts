import { DatabaseReference } from "firebase/database";
import { Firebase } from "./types";

export const DEFAULT_FIREBASE_CONTEXT: Firebase = {
  dbRef: {} as DatabaseReference,
  initializing: true,
};
