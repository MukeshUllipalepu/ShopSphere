"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  className?: string;
};

export function SignOutButton({ className }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await fetch("/api/auth/signout", { method: "POST" });
    router.refresh();
    router.push("/");
  };

  return (
    <button
      className={className ?? "rounded-full border border-border px-3 py-2"}
      onClick={handleSignOut}
      aria-label="Sign out"
      disabled={loading}
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}

