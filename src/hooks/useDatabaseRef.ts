import { FirebaseApp, FirebaseOptions } from "firebase/app";
import { useMemo } from "react";
import { getConfig } from "../util";
import { AppCheck } from "firebase/app-check";
import { getDatabase, ref } from "firebase/database";

export const useDatabaseRef = (
  options: FirebaseOptions,
  recaptchaSiteKey?: string,
) => {
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

  return dbRef;
};
