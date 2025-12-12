import Link from "next/link";
import { getUserFromCookies } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

export async function Navbar() {
  const user = await getUserFromCookies();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          ShopSphere
        </Link>
        <nav className="flex items-center gap-3 text-sm text-brand-muted">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <Link href="/profile" className="hover:text-brand">
            Profile
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs text-brand">
                {user.name}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="rounded-full border border-border px-3 py-2 hover:border-brand"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-accent px-3 py-2 font-semibold text-brand"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

