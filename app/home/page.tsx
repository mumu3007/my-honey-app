"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // When after loading success and have session, show profile
  return (
    status === "authenticated" &&
    session.user && (
      <div className="flex h-screen items-center justify-center">
        Home
      </div>
    )
  );
}
