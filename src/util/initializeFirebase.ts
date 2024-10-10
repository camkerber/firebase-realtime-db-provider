import { getAuth, signInAnonymously } from "firebase/auth";
import { getConfig } from "./";
import { AppCheck, getToken } from "firebase/app-check";
import { FirebaseOptions } from "firebase/app";

export async function initializeFirebase(
  options: FirebaseOptions,
  withAnonymousAuth: boolean,
  recaptchaSiteKey?: string,
) {
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
}
