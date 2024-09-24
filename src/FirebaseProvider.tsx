import { PropsWithChildren, useMemo } from "react";
import { FirebaseOptions } from "firebase/app";
import {
  FirebaseContext,
  useDatabaseRef,
  useInitializeFirebase,
} from "./hooks";

interface FirebaseProviderProps extends PropsWithChildren {
  options: FirebaseOptions;
  withAnonymousAuth: boolean;
  recaptchaSiteKey?: string;
}

export const FirebaseProvider = ({
  options,
  withAnonymousAuth,
  recaptchaSiteKey,
  children,
}: FirebaseProviderProps) => {
  const dbRef = useDatabaseRef(options, recaptchaSiteKey);
  const initializing = useInitializeFirebase(
    options,
    withAnonymousAuth,
    recaptchaSiteKey,
  );

  const dbRefs = useMemo(
    () => ({
      dbRef,
      initializing,
    }),
    [dbRef, initializing],
  );

  return (
    <FirebaseContext.Provider value={dbRefs}>
      {children}
    </FirebaseContext.Provider>
  );
};
