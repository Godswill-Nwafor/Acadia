"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};
const vp = { once: true };

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* Navbar */}
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">How it Works</Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
          <Link href="/contact" className="text-indigo-600 font-semibold">Contact</Link>
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
        <section className="py-16 px-6 text-center bg-linear-to-b from-slate-50 to-white">
          <motion.div initial="hidden" whileInView="visible" viewport={vp}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.05} className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              We&apos;d love to hear from you
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.1} className="text-lg text-slate-500">
              Whether you&apos;re an institution exploring Acadia, a student with a question, or a developer — we&apos;re here.
            </motion.p>
          </motion.div>
        </section>

        {/* Form + Info */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Message sent!</h3>
                  <p className="text-slate-500">We&apos;ll get back to you within 24 hours.</p>
                  <Button className="mt-6 rounded-full" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-extrabold text-slate-900 mb-6">Send us a message</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                      <input value={form.name} onChange={set("name")} required type="text" placeholder="Ayomide Taiwo"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Email</label>
                      <input value={form.email} onChange={set("email")} required type="email" placeholder="you@institution.edu"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Subject</label>
                    <select value={form.subject} onChange={set("subject")} required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all text-slate-700">
                      <option value="">Select a topic…</option>
                      <option>Institution Partnership</option>
                      <option>Technical Support</option>
                      <option>Security Report</option>
                      <option>Press & Media</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Message</label>
                    <textarea value={form.message} onChange={set("message")} required rows={5} placeholder="Tell us what's on your mind…"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all resize-none" />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 shadow-lg shadow-indigo-200/60">
                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</> : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ delay: 0.15 }}
              className="space-y-8 pt-2">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Contact information</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our team is based in Lagos, Nigeria and typically responds within one business day.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Email</p>
                    <a href="mailto:hello@acadiaplatforms.com" className="text-slate-800 font-semibold hover:text-indigo-600 transition-colors text-sm">
                      hello@acadiaplatforms.com
                    </a>
                    <p className="text-xs text-slate-400 mt-0.5">For security issues: security@acadiaplatforms.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Office</p>
                    <p className="text-slate-800 font-semibold text-sm">Lagos, Nigeria</p>
                    <p className="text-xs text-slate-400 mt-0.5">Victoria Island, Lagos State</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-0.5">Response time</p>
                    <p className="text-slate-800 font-semibold text-sm">Within 24 hours</p>
                    <p className="text-xs text-slate-400 mt-0.5">Mon – Fri, 8am – 6pm WAT</p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">Quick links</p>
                <div className="space-y-2">
                  {[
                    { label: "Security disclosure", href: "/security" },
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Terms of Service", href: "/terms" },
                    { label: "Join our team", href: "/careers" },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href} className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 transition-colors group">
                      {label}
                      <span className="text-slate-300 group-hover:text-indigo-400 transition-colors">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
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
