"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Props = {
  mode: "signin" | "signup";
  redirectTo?: string | null;
};

export function AuthForm({ mode, redirectTo }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }
      router.refresh();
      router.push(redirectTo || "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-white p-6 shadow-subtle"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
          {isSignup ? "Create account" : "Welcome back"}
        </p>
        <h1 className="text-2xl font-semibold">
          {isSignup ? "Sign up" : "Sign in"}
        </h1>
      </div>
      {isSignup ? (
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-brand">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Doe"
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </div>
      ) : null}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-brand">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border px-3 py-2"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-semibold text-brand">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-lg border border-border px-3 py-2"
        />
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-4 py-2 font-semibold text-brand disabled:cursor-not-allowed disabled:opacity-70"
        disabled={loading}
      >
        {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
      </button>
    </form>
  );
}

