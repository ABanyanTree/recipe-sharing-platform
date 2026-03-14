import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { count: recipeCount, error } = await supabase
    .from("recipes")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Hero */}
        <section className="space-y-6">
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-orange-800 dark:bg-orange-900/40 dark:text-orange-200">
              RecipeHub · Working Title
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Share recipes, discover flavors, cook together.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                RecipeHub is your place to collect personal favorites, explore dishes
                from around the world, and share what you love to cook with a growing
                community of home cooks and food enthusiasts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:ring-offset-zinc-950"
              >
                Start uploading recipes
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                Browse community recipes
              </Link>
            </div>

            <dl className="grid gap-4 text-xs text-zinc-600 dark:text-zinc-400 sm:grid-cols-3 sm:text-sm">
              <div>
                <dt className="font-medium text-zinc-900 dark:text-zinc-50">
                  Built for home cooks
                </dt>
                <dd className="mt-1">
                  Simple fields for ingredients, steps, cook time, and servings.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-900 dark:text-zinc-50">
                  Supabase-powered backend
                </dt>
                <dd className="mt-1">
                  {error
                    ? "Connection error – check Supabase env vars and RLS."
                    : `Connected · ${
                        recipeCount ?? 0
                      } recipe${(recipeCount ?? 0) === 1 ? "" : "s"} in the database.`}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-900 dark:text-zinc-50">
                  Designed to scale
                </dt>
                <dd className="mt-1">
                  Modern Next.js app router architecture with clean boundaries.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Roadmap teaser */}
        <section className="border-t border-dashed border-zinc-200 pt-8 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 sm:text-sm">
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            What&apos;s next for RecipeHub?
          </p>
          <p className="mt-2 max-w-2xl">
            We&apos;ll wire this UI into Supabase for authentication, recipe
            storage, and image uploads; then add recipe detail pages, profiles,
            and search & filtering so users can truly explore the full
            collection.
          </p>
        </section>
      </main>
    </div>
  );
}
