import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

type Props = {
  searchParams?: { from?: string };
};

export default function SigninPage({ searchParams }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold leading-tight">
          Sign in to continue
        </h1>
        <p className="mt-2 text-brand-muted">
          Sync your browsing history, save filters, and keep shopping from
          anywhere.
        </p>
        <div className="mt-4 rounded-xl bg-surface-muted p-4 text-sm text-brand-muted">
          Tip: test sign-in quickly by creating an account first. Passwords are
          hashed with bcrypt before storing locally.
        </div>
      </div>
      <AuthForm mode="signin" redirectTo={searchParams?.from} />
      <p className="text-sm text-brand-muted">
        New here?{" "}
        <Link href="/auth/signup" className="text-brand underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

