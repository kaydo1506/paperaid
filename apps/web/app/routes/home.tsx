import { appConfig } from "@paperaid/app-config";
import { Link } from "react-router";

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
  return (
    <>
      <Welcome />
      <p className="text-center">
        <Link to="/guides/berlin-anmeldung" className="underline">
          Try the Anmeldung guide
        </Link>
      </p>
    </>
  );
}
