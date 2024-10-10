import { createContext, useContext } from "react";
import { DEFAULT_FIREBASE_CONTEXT } from "../util";

export const FirebaseContext = createContext(DEFAULT_FIREBASE_CONTEXT);

export const useFirebaseContext = () => {
  const context = FirebaseContext;

  if (!context) {
    throw Error(
      "FirebaseContext is undefined. It can only be used within FirebaseProvider",
    );
  }

  return useContext(context);
};
