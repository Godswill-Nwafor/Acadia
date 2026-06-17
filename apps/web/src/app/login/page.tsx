"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { auth, saveToken } from "@/lib/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await auth.login({ email, password });
      saveToken(res.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-8 py-12 relative overflow-hidden">
        {/* Subtle background blobs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl pointer-events-none" />

        <Link
          href="/"
          className="absolute top-8 left-8 text-slate-500 hover:text-primary flex items-center gap-1.5 transition-colors text-sm font-medium z-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo */}
          <div className="mb-8">
            <Image src="/LOGO.png" alt="Acadia" width={130} height={35} priority style={{ height: "auto" }} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Log in to your account</h1>
          <p className="text-slate-500 text-sm mb-8">Welcome back! Please enter your details.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@institution.edu"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Password</label>
                <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />{error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl shadow-lg shadow-primary/20 font-semibold text-base transition-all"
            >
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in…</> : "Log In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-4 text-xs text-slate-400 font-medium">Or continue with</span>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
              className="flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium text-slate-700"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </a>
            <button type="button" className="flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium text-slate-700 opacity-40 cursor-not-allowed" disabled>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-primary hover:underline">Sign up free</Link>
          </p>
        </motion.div>
      </div>

      {/* Right — hero image */}
      <div className="hidden lg:block relative flex-1 bg-slate-900 overflow-hidden">
        <Image src="/logimage.png" alt="Acadia Platform" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Acadia Platform</p>
          <blockquote className="text-white text-2xl font-bold leading-snug">
            &ldquo;Everything you need for your academic journey, in one place.&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3].map(n => (
                <div key={n} className="w-7 h-7 rounded-full bg-primary/40 border-2 border-white/20 flex items-center justify-center text-[10px] text-white font-bold">
                  {["AT","JO","SM"][n-1]}
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs">Join 10,000+ students already on Acadia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
