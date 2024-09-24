import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

export function getConfig(
  options: FirebaseOptions,
  recaptchaSiteKey?: string,
): FirebaseApp | AppCheck {
  const app = initializeApp(options);
  if (recaptchaSiteKey) {
    return initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } else {
    return app;
  }
}
