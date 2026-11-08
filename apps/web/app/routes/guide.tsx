import { getGuideBySlug } from "@paperaid/content";
import { data } from "react-router";
import type { Route } from "./+types/guide";

export async function loader({ params }: Route.LoaderArgs) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    throw data("Guide not found", { status: 404 });
  }

  return guide;
}

export function meta({ loaderData: guide }: Route.MetaArgs) {
  return [{ title: guide.title.en }];
}

export default function Guide({ loaderData: guide }: Route.ComponentProps) {
  return (
    <main className="container mx-auto max-w-2xl p-4 pt-16 text-gray-900 dark:text-gray-100">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last checked {guide.lastChecked} &middot;{" "}
        <a
          href={guide.officialSourceUrl}
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Official source
        </a>
      </p>

      <h1 className="mt-2 text-3xl font-semibold">{guide.title.en}</h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        {guide.summary.en}
      </p>

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Cost
          </dt>
          <dd>{guide.cost.en}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Timeline
          </dt>
          <dd>{guide.timeline.en}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Where to go
          </dt>
          <dd>{guide.whereToGo.en}</dd>
        </div>
      </dl>

      <h2 className="mt-8 text-xl font-semibold">What you'll need</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {guide.requiredDocuments.map((document) => (
          <li key={document.en}>{document.en}</li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Steps</h2>
      <ol className="mt-2 space-y-4">
        {guide.steps.map((step, index) => (
          <li key={step.id}>
            <p className="font-medium">
              {index + 1}. {step.title.en}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {step.description.en}
            </p>
          </li>
        ))}
      </ol>
    </main>
  );
}
