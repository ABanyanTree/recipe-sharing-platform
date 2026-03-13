import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const { count: recipeCount, error } = await supabase
    .from("recipes")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] md:items-center">
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
              <button className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:ring-offset-zinc-950">
                Start uploading recipes
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900">
                Browse community recipes
              </button>
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

          {/* Visual placeholder for future recipe content */}
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Preview
                </span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Featured recipes (sample)
                </span>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                Coming soon
              </span>
            </div>

            <div className="mb-3 flex gap-2">
              <div className="flex-1">
                <input
                  disabled
                  className="w-full cursor-not-allowed rounded-full border border-dashed border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-500 shadow-inner dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500"
                  placeholder="Search recipes by name or ingredient"
                />
              </div>
              <button
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-dashed border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-500 dark:border-zinc-700"
              >
                Filters
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-orange-50 to-rose-50 p-3 text-xs dark:border-zinc-800 dark:from-orange-950/40 dark:to-rose-950/40">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Weeknight Creamy Tomato Pasta
                  </h3>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-orange-700 shadow-sm dark:bg-zinc-900/80 dark:text-orange-300">
                    25 min
                  </span>
                </div>
                <p className="line-clamp-3 text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  A comforting, one-pot pasta with pantry staples you can throw
                  together any night of the week.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span>By @homecook</span>
                  <span>Serves 2 · Pasta</span>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-emerald-50 to-sky-50 p-3 text-xs dark:border-zinc-800 dark:from-emerald-950/40 dark:to-sky-950/40">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Crunchy Sesame Slaw
                  </h3>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-emerald-700 shadow-sm dark:bg-zinc-900/80 dark:text-emerald-300">
                    15 min
                  </span>
                </div>
                <p className="line-clamp-3 text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  A bright, fresh side with toasted sesame, lime, and a hint of
                  chili—perfect for weeknight dinners.
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span>By @foodie</span>
                  <span>Serves 4 · Side</span>
                </div>
              </article>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-500">
              This is a static preview. Next, we&apos;ll connect real data from
              Supabase so you can upload recipes, browse by category, and see
              what the community is cooking.
            </p>
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
