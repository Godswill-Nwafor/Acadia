"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, Loader2, GraduationCap, BookOpen, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { auth, saveToken } from "@/lib/api";

const floatAnim = (delay: number, duration: number) => ({
  animate: { y: [0, -10, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const features = [
  "Access all your courses in one place",
  "Submit assignments before deadlines",
  "Communicate with lecturers instantly",
  "Track your grades and attendance",
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await auth.register({ ...form, role });
      saveToken(res.access_token);
      setDone(true);
      await new Promise(r => setTimeout(r, 1500));
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — animated welcome panel */}
      <div className="hidden lg:flex flex-1 relative bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 flex-col items-center justify-center overflow-hidden p-16">
        {/* Animated background orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px]"
        />

        {/* Floating icons */}
        <motion.div {...floatAnim(0, 3)}
          className="absolute top-[15%] left-[12%] w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
          <GraduationCap className="w-7 h-7 text-blue-300" />
        </motion.div>
        <motion.div {...floatAnim(0.4, 3.5)}
          className="absolute top-[20%] right-[12%] w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
          <BookOpen className="w-6 h-6 text-purple-300" />
        </motion.div>
        <motion.div {...floatAnim(0.8, 4)}
          className="absolute bottom-[20%] left-[10%] w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
          <Sparkles className="w-6 h-6 text-amber-300" />
        </motion.div>
        <motion.div {...floatAnim(1.2, 3.2)}
          className="absolute bottom-[25%] right-[10%] w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
          <CheckCircle className="w-7 h-7 text-emerald-300" />
        </motion.div>

        {/* Central welcome card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          className="relative z-10 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl mb-6 select-none"
          >
            🎓
          </motion.div>
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Welcome aboard,<br />future scholar!
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xs mx-auto">
            Join thousands of students already thriving on Acadia.
          </p>

          <div className="space-y-3 text-left">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-white/70 text-sm">{feat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom social proof */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-white/30 text-xs">Trusted by 50+ institutions across Nigeria</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 bg-white flex flex-col justify-center items-center px-8 py-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

        <Link
          href="/"
          className="absolute top-8 left-8 text-slate-500 hover:text-primary flex items-center gap-1.5 transition-colors text-sm font-medium z-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground">Account Created!</h2>
              <p className="text-muted-foreground mt-2">Redirecting to your dashboard…</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md relative z-10"
            >
              <div className="mb-8">
                <Image src="/LOGO.png" alt="Acadia" width={130} height={35} priority />
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Create your account</h1>
              <p className="text-slate-500 text-sm mb-8">Get started — it&apos;s completely free.</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "firstName", label: "First Name", placeholder: "Ayomide" },
                    { key: "lastName",  label: "Last Name",  placeholder: "Taiwo" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">{f.label}</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          value={form[f.key as keyof typeof form]}
                          onChange={set(f.key)}
                          type="text"
                          placeholder={f.placeholder}
                          required
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Institutional Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      value={form.email}
                      onChange={set("email")}
                      type="email"
                      placeholder="you@institution.edu"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      value={form.password}
                      onChange={set("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
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

                {/* Role selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">I am a</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ label: "Student", value: "STUDENT", emoji: "🎓" }, { label: "Lecturer", value: "LECTURER", emoji: "📚" }].map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`h-11 border-2 rounded-xl text-sm font-semibold transition-all ${
                          role === r.value
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary"
                        }`}
                      >
                        {r.emoji} {r.label}
                      </button>
                    ))}
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
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl shadow-lg shadow-primary/20 font-semibold text-base mt-1"
                >
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating account…</> : "Create Account"}
                </Button>

                <p className="text-center text-xs text-slate-400 leading-relaxed">
                  By signing up you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </form>

              {/* Divider */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-4 text-xs text-slate-400 font-medium">Or sign up with</span>
              </div>

              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                className="flex items-center justify-center gap-2 w-full h-11 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium text-slate-700"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </a>

              <p className="mt-5 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary hover:underline">Log in</Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
