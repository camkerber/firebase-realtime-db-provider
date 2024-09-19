import { AppCheck, getToken } from "firebase/app-check";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { FirebaseContext } from "./useFirebaseContext";
import { getConfig } from "./get-config";
import { FirebaseApp, FirebaseOptions } from "firebase/app";

interface FirebaseProviderProps extends PropsWithChildren {
  options: FirebaseOptions;
  recaptchaSiteKey?: string;
  withAnonymousAuth: boolean;
}

export const FirebaseProvider = ({
  options,
  recaptchaSiteKey,
  withAnonymousAuth = false,
  children,
}: FirebaseProviderProps) => {
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    setInitializing(true);
    (async function initializeFirebase() {
      if (withAnonymousAuth) {
        const auth = getAuth();
        await signInAnonymously(auth);
      }

      if (recaptchaSiteKey) {
        const appCheckApp = getConfig(options, recaptchaSiteKey);
        await getToken(appCheckApp as AppCheck);
      } else {
        return;
      }
    })()
      .then(() => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setInitializing(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dbRef = useMemo(() => {
    if (recaptchaSiteKey) {
      const appCheck = getConfig(options, recaptchaSiteKey);
      const app = (appCheck as AppCheck).app;
      const database = getDatabase(app);
      return ref(database);
    } else {
      const app = getConfig(options);
      const database = getDatabase(app as FirebaseApp);
      return ref(database);
    }
  }, [options, recaptchaSiteKey]);

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
