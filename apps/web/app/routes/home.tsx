import { appConfig } from "@paperaid/app-config";
import { loadGuides } from "@paperaid/content";
import { Link } from "react-router";

import type { Route } from "./+types/home";

export async function loader() {
  return { guides: loadGuides() };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: appConfig.displayName },
    {
      name: "description",
      content: "Clear, calm, step-by-step guides for German bureaucracy.",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { guides } = loaderData;

  return (
    <main className="container mx-auto max-w-2xl p-4 pt-16 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-semibold">{appConfig.displayName}</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        German bureaucracy, explained calmly: step-by-step guides for
        immigrants, starting with Berlin.
      </p>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Not legal advice. Every guide links to its official source and shows
        when it was last checked.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Guides</h2>
      {guides.length === 0 ? (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          More guides are on the way.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                to={`/guides/${guide.slug}`}
                className="block rounded-lg border border-gray-200 p-4 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-600"
              >
                <p className="font-medium">{guide.title.en}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {guide.summary.en}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-16 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        Work in progress &middot;{" "}
        <a
          href="https://github.com/kaydo1506/paperaid"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Source on GitHub
        </a>
      </footer>
    </main>
  );
}
