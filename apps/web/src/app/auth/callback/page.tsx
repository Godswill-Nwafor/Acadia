"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/lib/api";

export default function OAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      saveToken(token);
      router.replace("/dashboard");
    } else {
      router.replace("/login?error=oauth_failed");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 text-sm font-medium">Signing you in…</p>
      </div>
    </div>
  );
}
