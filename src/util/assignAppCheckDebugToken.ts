export function assignAppCheckDebugToken(token: string) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = token;
  }
}
