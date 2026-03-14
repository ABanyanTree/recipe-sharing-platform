import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(
      `
        id,
        title,
        created_at,
        cooking_time,
        difficulty,
        category,
        profiles:profiles!recipes_user_id_fkey (
          username,
          full_name
        )
      `,
    )
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10 sm:px-8 lg:px-12">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-orange-600 dark:text-orange-300">
            RecipeHub
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Community recipes
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Browse dishes shared by other home cooks. We&apos;ll add search and
            filtering next.
          </p>
        </div>
        <Link
          href="/recipes/new"
          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          + Create recipe
        </Link>
      </header>

      {error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">
          Failed to load recipes: {error.message}
        </p>
      ) : null}

      {!error && (!recipes || recipes.length === 0) ? (
        <section className="rounded-2xl border border-dashed border-zinc-200 bg-white px-4 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 sm:px-6">
          <p className="font-medium text-zinc-900 dark:text-zinc-50">
            No recipes yet
          </p>
          <p className="mt-1">
            Be the first to share a recipe with the community.
          </p>
          <div className="mt-4">
            <Link
              href="/recipes/new"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              Start uploading recipes
            </Link>
          </div>
        </section>
      ) : null}

      {recipes && recipes.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => {
            const authorName =
              (Array.isArray(recipe.profiles) && recipe.profiles[0]?.full_name) ||
              (Array.isArray(recipe.profiles) && recipe.profiles[0]?.username) ||
              "Unknown cook";

            return (
              <article
                key={recipe.id}
                className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h2 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {recipe.title}
                  </h2>
                  {recipe.cooking_time !== null ? (
                    <span className="whitespace-nowrap rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {recipe.cooking_time} min
                    </span>
                  ) : null}
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  by <span className="font-medium">{authorName}</span>
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                  {recipe.difficulty ? (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                      {recipe.difficulty}
                    </span>
                  ) : null}
                  {recipe.category ? (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                      {recipe.category}
                    </span>
                  ) : null}
                  <span>
                    {new Date(recipe.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      ) : null}
    </main>
  );
}

