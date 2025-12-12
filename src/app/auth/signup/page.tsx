import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

type Props = {
  searchParams?: { from?: string };
};

export default function SignupPage({ searchParams }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
          Join us
        </p>
        <h1 className="text-3xl font-semibold leading-tight">
          Create your ShopSphere account
        </h1>
        <p className="mt-2 text-brand-muted">
          Access wishlists, track orders, and enjoy personalized
          recommendations.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-brand">
          <li>• Secure authentication with hashed passwords</li>
          <li>• Session stored in httpOnly cookies</li>
          <li>• Edit or clear filters without losing your data</li>
        </ul>
      </div>
      <AuthForm mode="signup" redirectTo={searchParams?.from} />
      <p className="text-sm text-brand-muted">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-brand underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

