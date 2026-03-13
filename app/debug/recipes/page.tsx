import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export const dynamic = "force-dynamic";

export default async function DebugRecipesPage() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("recipes")
    .select("id, title, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10 text-sm">
        <h1 className="mb-4 text-lg font-semibold">Debug: Recipes</h1>
        <p className="mb-2 rounded-md bg-red-50 px-3 py-2 font-mono text-red-700 dark:bg-red-950 dark:text-red-200">
          {error.message}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Check that your RLS policies allow `select` for the `recipes` table
          and that your Supabase environment variables are set correctly.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-sm">
      <h1 className="mb-4 text-lg font-semibold">Debug: Last 5 recipes</h1>

      {data && data.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          No recipes found yet. Once you insert recipes via Supabase or the app,
          they will show up here.
        </p>
      ) : (
        <ul className="space-y-3">
          {data?.map((recipe) => (
            <li
              key={recipe.id}
              className="rounded-md border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {recipe.title}
                </span>
                <span className="text-[11px] text-zinc-500">
                  {new Date(recipe.created_at).toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-zinc-500">
                user_id: {recipe.user_id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

