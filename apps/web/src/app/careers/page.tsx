"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Code, Palette, BarChart3, Heart, Zap, Globe, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};
const vp = { once: true, margin: "0px 0px -60px 0px" };

const benefits = [
  { icon: Globe, title: "Remote-First", desc: "Work from anywhere in Nigeria. We believe in flexibility and trust." },
  { icon: Heart, title: "Health Coverage", desc: "HMO health insurance for you and immediate family members." },
  { icon: Zap, title: "Learning Budget", desc: "₦300,000/year for courses, books, conferences, and certifications." },
  { icon: BarChart3, title: "Equity Options", desc: "Everyone on the team participates in the success of Acadia." },
];

const openRoles = [
  { title: "Senior Frontend Engineer", dept: "Engineering", type: "Full-time · Remote", desc: "Lead the development of our Next.js web app. Expert-level React, TypeScript and Tailwind required." },
  { title: "Backend Engineer (NestJS)", dept: "Engineering", type: "Full-time · Remote", desc: "Deepen our NestJS/Prisma API — building features for courses, assignments, grading, and real-time messaging." },
  { title: "Product Designer", dept: "Design", type: "Full-time · Remote", desc: "Shape the look and feel of Acadia — from information architecture to pixel-perfect Figma designs." },
  { title: "Growth & Partnerships Manager", dept: "Business", type: "Full-time · Lagos", desc: "Drive institution onboarding across Nigerian universities. Experience in EdTech or SaaS sales preferred." },
  { title: "DevOps / Platform Engineer", dept: "Engineering", type: "Full-time · Remote", desc: "Own our infrastructure: CI/CD, Kubernetes, observability, and reliability across our cloud platform." },
];

const deptColor: Record<string, string> = {
  Engineering: "bg-indigo-50 text-indigo-600",
  Design:      "bg-fuchsia-50 text-fuchsia-600",
  Business:    "bg-emerald-50 text-emerald-700",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* Navbar */}
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority style={{ height: "auto" }} /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">How it Works</Link>
          <Link href="/careers" className="text-indigo-600 font-semibold">Careers</Link>
          <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
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
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-violet-100/60 rounded-full blur-[100px]" />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={vp}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="max-w-3xl mx-auto relative z-10">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> Join Our Team
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.05} className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Help us transform<br />education in Africa
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.1} className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
              We&apos;re a small, ambitious team building the academic operating system for Nigerian universities. If you care deeply about education and love building great software, we want to hear from you.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.15} className="mt-8">
              <a href="#roles">
                <Button size="lg" className="rounded-full px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200/60">
                  View open roles <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp}>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our mission</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Universities across Nigeria are running on spreadsheets, WhatsApp groups, and paper registers. Lecturers lose hours to administrative work. Students have no visibility into their own academic progress.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We&apos;re building the infrastructure that lets institutions focus on what matters — teaching and learning. Every feature we ship is one less frustration for a student or lecturer somewhere.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4">
              {[
                { label: "Universities piloting", value: "4+" },
                { label: "Students onboarded", value: "2,000+" },
                { label: "Team members", value: "12" },
                { label: "Founded", value: "2025" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <p className="text-3xl font-extrabold text-indigo-600 mb-1">{value}</p>
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">Why work at Acadia</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section id="roles" className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-extrabold text-slate-900">Open positions</h2>
              <span className="text-sm text-slate-400 font-medium">{openRoles.length} roles available</span>
            </div>
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <motion.div key={role.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 p-6 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{role.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${deptColor[role.dept]}`}>{role.dept}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2 font-medium">{role.type}</p>
                    <p className="text-sm text-slate-500">{role.desc}</p>
                  </div>
                  <Link href={`/contact`}>
                    <Button size="sm" className="rounded-full px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shrink-0">
                      Apply <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-8 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <Code className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 mb-2">Don&apos;t see your role?</h3>
              <p className="text-slate-500 text-sm mb-4">We&apos;re always open to exceptional people. Send us your CV and tell us how you&apos;d contribute.</p>
              <Button variant="outline" className="rounded-full px-8 font-semibold" asChild>
                <Link href="/contact">Get in touch <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-6 bg-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Palette className="w-8 h-8 text-indigo-200 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-4">How we work</h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-10 text-left">
              {[
                { title: "Ship fast, learn faster", body: "We favour iteration over perfection. Every week we're putting new things in front of real users and improving from their feedback." },
                { title: "Own your work", body: "We don't micromanage. If you take on a problem, it's yours — from design to deployment. We trust our team." },
                { title: "Education is the mission", body: "We're not just building software. Every feature exists to improve the academic life of a real student or lecturer somewhere in Nigeria." },
              ].map(({ title, body }) => (
                <div key={title} className="bg-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm">
        <div className="flex items-center justify-center mb-4">
          <Image src="/LOGO.png" alt="Acadia" width={120} height={32} className="brightness-0 invert" style={{ height: "auto" }} />
        </div>
        <p>© {new Date().getFullYear()} Acadia Platforms · <Link href="/" className="hover:text-white transition-colors">Home</Link></p>
      </footer>
    </div>
  );
}
