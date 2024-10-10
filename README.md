# react-firebase-db

The purpose of this package is to expedite the set up of Firebase Realtime Database for React projects. There are additional configuration options available that allow for anonymous authorization and app check through reCaptch Enterprise.

This documentation assumes you have already created a Firebase project and registered your app. You can find the documentation for these steps [here](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app).

## FirebaseProvider

This is intended to wrap your app at the root level or as the parent in your component tree where you plan on using the context values returned by the provider.

### Props

`options`

- The object passed to the `options` prop is your Firebase configuration. This must be generated directly from your Firebase project. You can find documentation on how to generate it at [this link](https://support.google.com/firebase/answer/7015592?hl=en#web&zippy=%2Cin-this-article).

`withAnonymousAuth`

- Firebase gives developers the opportunity to have a small layer of security for apps that don't require an account to fetch data. You can follow the documentation here to set up this feature for your product, then pass `true` to this prop use the protection in your app.

`recaptchaSiteKey`

- If you are using App Check through reCaptcha Enterprise, this prop is where should pass your site key. There is further documentation on setting up App Check [here](https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider).

## assignAppCheckDebugToken

This function is specifically for apps using Firebase App Check. You should call this function outside of your app's root component. A reasonable place is above where you execute `createRoot`

## useFirebaseContext

This hook returns a Firebase Realtime Database reference, `dbRef`, that can be used to query Firebase in whatever way you prefer. However, if you are using App Check or Anonymous Auth, be certain that the returned value for `initializing` is `false`, otherwise you will encounter authorization errors.

Firebase documentation for fetching data with a Database Reference can be found [here](https://firebase.google.com/docs/database/web/read-and-write).

## Example Implementation

Simple demonstration of how this library can be used.

### main.tsx

```jsx
import {assignAppCheckDebugToken, FirebaseProvider} from "@camkerber/react-firebase-db";
import {FirebaseOptions} from "firebase/app";
import {createRoot} from "react-dom/client";

const firebaseOptions: FirebaseOptions = {
  apiKey: "your-api-key",
  authDomain: "example.com",
  projectId: "your-project-name",
  storageBucket: "example.com",
  messagingSenderId: "exampleId",
  appId: "exampleId",
  measurementId: "exampleId",
};

const RECAPTCHA_SITE_KEY = "your-site-key";

const FIREBASE_APPCHECK_DEBUG_TOKEN = "your-debug-token";

assignAppCheckDebugToken(FIREBASE_APPCHECK_DEBUG_TOKEN);

createRoot(document.getElementById("root")!).render(
  <FirebaseProvider
    options={firebaseOptions}
    withAnonymousAuth
    recaptchaSiteKey={RECAPTCHA_SITE_KEY}
  >
    <YourApp />
  </FirebaseProvider>
);
```

### YourApp.tsx

```jsx
import {get} from "firebase/database";
import {useFirebaseContext} from "@camkerber/react-firebase-db";
import {CircularProgress} from "@mui/material";

const App = () => {
  const {dbRef, initializing} = useFirebaseContext();

  const handleGetData = async () => {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  };

  return (
    <>
      {initializing ? (
        <CircularProgress />
      ) : (
        <button onClick={handleGetData}>Get Data</button>
      )}
    </>
  );
};
```
