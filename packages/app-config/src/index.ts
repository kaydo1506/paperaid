/**
 * Single source of truth for identity values shared by the web app
 * and apps/mobile/app.config.ts.
 *
 * appId is the Expo/iOS/Android bundle identifier. It cannot change
 * after the first store release, so treat it as locked once mobile ships.
 * "name" below is a placeholder segment — swap it once the product name
 * is finalized (see the decision log for naming status).
 */
export const appConfig = {
  displayName: "Wegweiser",
  appId: "com.name.wegweiser",
  urlScheme: "wegweiser",
} as const;

export type AppConfig = typeof appConfig;
