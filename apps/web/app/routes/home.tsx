import { appConfig } from "@paperaid/app-config";

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: appConfig.displayName },
    {
      name: "description",
      content: "Clear, calm, step-by-step guides for German bureaucracy.",
    },
  ];
}

export default function Home() {
  return <Welcome />;
}
