"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; email: string | null };

export default function NewRecipePage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        setAuthState({ status: "unauthenticated" });
        return;
      }

      setAuthState({
        status: "authenticated",
        email: data.user.email ?? null,
      });
    });
  }, []);

  if (authState.status === "loading") {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Checking your session…
        </p>
      </main>
    );
  }

  if (authState.status === "unauthenticated") {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4">
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-lg font-semibold">Sign in to share recipes</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            You need an account to create recipes. This keeps your recipes tied
            to your profile and lets you manage them later.
          </p>
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Go to sign in / sign up
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-4 py-10">
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-lg font-semibold">Create a new recipe</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          You are signed in as{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {authState.email ?? "unknown user"}
          </span>
          . The full recipe creation form will go here next.
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          For now, this page just proves that only authenticated users can
          access the recipe creation flow. We&apos;ll wire this up to insert
          into your Supabase `recipes` table next.
        </p>
      </div>
    </main>
  );
}

