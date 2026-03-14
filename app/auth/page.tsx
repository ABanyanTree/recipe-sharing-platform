"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const supabase = createSupabaseBrowserClient();

    startTransition(async () => {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        setMessage(
          "Check your email to confirm your account. Once confirmed, you can sign in.",
        );
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/dashboard");
    });
  }

  async function handleSignOut() {
    setError(null);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setMessage("Signed out.");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-orange-600 dark:text-orange-300">
            RecipeHub
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Sign in" : "Create an account"}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use email and password for now. We&apos;ll add social logins later.
          </p>
        </header>

        <div className="flex gap-2 rounded-full bg-zinc-100 p-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 rounded-full px-3 py-1.5 transition ${
              mode === "signin"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                : "hover:text-zinc-900 dark:hover:text-zinc-50"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full px-3 py-1.5 transition ${
              mode === "signup"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-50"
                : "hover:text-zinc-900 dark:hover:text-zinc-50"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-sm">
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </div>

          <div className="space-y-1.5 text-sm">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-wide text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-0 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-70"
          >
            {isPending
              ? "Working..."
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <div className="space-y-2 text-xs">
          {error ? (
            <p className="rounded-md bg-red-50 px-3 py-2 font-medium text-red-700 dark:bg-red-950 dark:text-red-200">
              {error}
            </p>
          ) : null}
          {message ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">
              {message}
            </p>
          ) : null}
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-1 text-xs font-medium text-zinc-500 underline-offset-4 hover:text-zinc-800 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}

