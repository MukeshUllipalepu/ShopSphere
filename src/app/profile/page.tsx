import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserFromCookies } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

export default async function ProfilePage() {
  const user = await getUserFromCookies();
  if (!user) {
    redirect("/auth/signin?from=/profile");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-subtle">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">
          Profile
        </p>
        <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
        <p className="text-brand-muted">{user.email}</p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/"
            className="rounded-full border border-border px-4 py-2 font-semibold hover:border-brand"
          >
            Back to shopping
          </Link>
          <SignOutButton className="rounded-full bg-accent px-4 py-2 font-semibold text-brand" />
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-white p-6 shadow-subtle">
        <h2 className="text-xl font-semibold">Session notes</h2>
        <ul className="mt-3 space-y-2 text-sm text-brand-muted">
          <li>• Auth tokens live in httpOnly cookies for safety.</li>
          <li>• Passwords are hashed with bcrypt before persisting.</li>
          <li>
            • Data lives in a local JSON file for this assignment—replace with a
            database in production.
          </li>
        </ul>
      </div>
    </div>
  );
}

