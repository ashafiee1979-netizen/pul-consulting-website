"use client";

import { useActionState } from "react";
import Link from "next/link";

type State = { error: string } | null;

export default function AuthForm({
  mode,
  action,
}: {
  mode: "sign-in" | "sign-up";
  action: (prev: State, formData: FormData) => Promise<State>;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const isUp = mode === "sign-up";
  const input =
    "w-full px-3 py-2.5 rounded border border-slate-300 text-corp-ink text-sm focus:outline-none focus:border-corp-blue";

  return (
    <main className="min-h-screen bg-corp-ice flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-corp-line rounded-md shadow-executive overflow-hidden">
        <div className="bg-corp-navy px-6 py-5">
          <h1 className="font-serif text-lg font-bold text-white">PUL Consulting</h1>
          <p className="text-xs text-sky-200">{isUp ? "Create admin account" : "Admin sign in"}</p>
        </div>
        <form action={formAction} className="p-6 space-y-4">
          {state?.error && (
            <p role="alert" className="p-3 rounded bg-red-50 border border-red-200 text-xs text-red-700">
              {state.error}
            </p>
          )}
          {isUp && (
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-corp-ink mb-1">Name</label>
              <input id="name" name="name" required autoComplete="name" className={input} />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-corp-ink mb-1">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className={input} />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-corp-ink mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={isUp ? 10 : undefined}
              autoComplete={isUp ? "new-password" : "current-password"}
              className={input}
            />
          </div>
          <button
            disabled={pending}
            className="w-full py-2.5 rounded bg-corp-blue hover:bg-corp-blueHover disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            {pending ? "Please wait…" : isUp ? "Create account" : "Sign in"}
          </button>
          <p className="text-xs text-corp-muted text-center">
            {isUp ? (
              <Link href="/auth/sign-in" className="underline">Already have an account? Sign in</Link>
            ) : (
              <Link href="/auth/sign-up" className="underline">First time? Create admin account</Link>
            )}
          </p>
        </form>
      </div>
    </main>
  );
}
