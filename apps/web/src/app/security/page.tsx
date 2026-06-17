"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, Key, Bell, CheckCircle, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};
const vp = { once: true, margin: "0px 0px -60px 0px" };

const features = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All data in transit is protected with TLS 1.3. Sensitive records like grades and submissions are encrypted at rest using AES-256.",
    color: "indigo",
  },
  {
    icon: Shield,
    title: "NDPR Compliance",
    desc: "Fully compliant with Nigeria's Data Protection Regulation (NDPR). We handle personal data with transparency and purpose limitation.",
    color: "violet",
  },
  {
    icon: Key,
    title: "Role-Based Access Control",
    desc: "Every action is gated by role — Students, Lecturers, and Admins each see only what they need. No privilege creep.",
    color: "fuchsia",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    desc: "Every sensitive action — logins, grade changes, file uploads — is logged with timestamps and user identity for accountability.",
    color: "rose",
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    desc: "Hosted on enterprise-grade cloud infrastructure with automatic backups, DDoS protection, and 99.9% uptime SLA.",
    color: "emerald",
  },
  {
    icon: Bell,
    title: "Breach Notification",
    desc: "In the unlikely event of a security incident, affected users and institutions are notified within 72 hours in line with NDPR requirements.",
    color: "amber",
  },
];

const colorMap: Record<string, string> = {
  indigo:  "bg-indigo-50 text-indigo-600 border-indigo-100",
  violet:  "bg-violet-50 text-violet-600 border-violet-100",
  fuchsia: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
  rose:    "bg-rose-50 text-rose-600 border-rose-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber:   "bg-amber-50 text-amber-600 border-amber-100",
};

const checklist = [
  "OAuth 2.0 Google Sign-In with JWT session tokens",
  "Passwords hashed with bcrypt (cost factor 10)",
  "HTTPS enforced on all endpoints — HTTP redirects blocked",
  "CORS configured to allow only trusted frontend origins",
  "SQL injection protection via Prisma parameterised queries",
  "Rate limiting on auth endpoints to prevent brute-force",
  "No third-party analytics scripts — your data stays with us",
  "Student records never shared with advertisers or third parties",
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* Navbar */}
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">How it Works</Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
          <Link href="/security" className="text-indigo-600 font-semibold">Security</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="font-semibold text-slate-700 hover:text-indigo-600 hidden sm:inline-flex" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" className="font-semibold rounded-full px-5 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200/60" asChild>
            <Link href="/signup">Sign Up Free</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="py-24 px-6 text-center bg-linear-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-100/60 rounded-full blur-[100px]" />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }} className="max-w-3xl mx-auto relative z-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" /> Security & Trust
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.05} className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Built secure,<br />from the ground up
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.1} className="text-xl text-slate-500 leading-relaxed">
              Academic data is sensitive. Acadia treats it that way — with enterprise-grade encryption, NDPR compliance, and zero-compromise access controls protecting every student, lecturer, and institution.
            </motion.p>
          </motion.div>
        </section>

        {/* Security Features Grid */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              className="text-3xl font-extrabold text-slate-900 text-center mb-4">
              How we keep your data safe
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ delay: 0.1 }}
              className="text-slate-500 text-center mb-14 max-w-xl mx-auto">
              Every layer of Acadia is designed with security as a first principle, not an afterthought.
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map(({ icon: Icon, title, desc, color }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-lg hover:border-slate-200 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colorMap[color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Security checklist</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {checklist.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={vp} transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* NDPR Banner */}
        <section className="py-16 px-6 bg-indigo-600 text-white">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Regulatory Compliance</p>
              <h2 className="text-3xl font-extrabold mb-4">NDPR Compliant</h2>
              <p className="text-indigo-100 leading-relaxed">
                Acadia is fully compliant with the Nigeria Data Protection Regulation. We maintain a data processing register, conduct regular privacy impact assessments, and appoint a Data Protection Officer (DPO) for all institutional partnerships.
              </p>
            </div>
            <Button size="lg" className="rounded-full px-8 bg-white text-indigo-700 hover:bg-indigo-50 font-bold shadow-xl shrink-0" asChild>
              <Link href="/contact">Talk to our DPO <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-white text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Questions about our security?</h2>
          <p className="text-slate-500 mb-8">We publish a full security disclosure programme and respond to responsible reports within 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200/60" asChild>
              <Link href="/contact">Contact Security Team</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 font-semibold" asChild>
              <Link href="/privacy">Read Privacy Policy</Link>
            </Button>
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm">
        <div className="flex items-center justify-center mb-4">
          <Image src="/LOGO.png" alt="Acadia" width={120} height={32} className="brightness-0 invert" />
        </div>
        <p>© {new Date().getFullYear()} Acadia Platforms · <Link href="/" className="hover:text-white transition-colors">Home</Link></p>
      </footer>
    </div>
  );
}
