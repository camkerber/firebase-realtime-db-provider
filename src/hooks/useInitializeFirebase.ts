import { useState, useEffect } from "react";
import { initializeFirebase } from "../util";
import { FirebaseOptions } from "firebase/app";

export const useInitializeFirebase = (
  options: FirebaseOptions,
  withAnonymousAuth: boolean,
  recaptchaSiteKey?: string,
): boolean => {
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    setInitializing(true);
    initializeFirebase(options, withAnonymousAuth, recaptchaSiteKey)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setInitializing(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return initializing;
};
