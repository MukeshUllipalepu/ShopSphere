import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">
        404
      </p>
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-brand-muted">
        We couldn&apos;t find what you were looking for. Try browsing the
        product list again.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-4 py-2 font-semibold text-brand"
      >
        Back to home
      </Link>
    </div>
  );
}

