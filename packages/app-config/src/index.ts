/**
 * Single source of truth for identity values shared by the web app
 * and apps/mobile/app.config.ts.
 *
 * appId is the Expo/iOS/Android bundle identifier. It cannot change
 * after the first store release, so treat it as locked once mobile ships.
 * The name is set, but domain/trademark research is still pending
 * (see the decision log), so this stays easy to revisit before launch.
 */
export const appConfig = {
  displayName: "Paperaid",
  appId: "com.name.paperaid",
  urlScheme: "paperaid",
} as const;

export type AppConfig = typeof appConfig;
