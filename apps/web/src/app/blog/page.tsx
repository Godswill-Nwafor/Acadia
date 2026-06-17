"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};
const vp = { once: true, margin: "0px 0px -60px 0px" };

const posts = [
  {
    category: "Education",
    title: "How Digital Learning Management Systems Are Transforming Nigerian Universities",
    excerpt: "From paper registers to real-time analytics — how forward-thinking institutions are using technology to close the gap between teaching and learning outcomes.",
    date: "June 10, 2026",
    readTime: "6 min read",
    color: "indigo",
  },
  {
    category: "Product",
    title: "Introducing Acadia: One Platform for Every Role in Academia",
    excerpt: "Today we're launching Acadia — an academic operating system built specifically for the realities of higher education in Nigeria and across Africa.",
    date: "May 28, 2026",
    readTime: "4 min read",
    color: "violet",
  },
  {
    category: "Institutions",
    title: "What Babcock and Covenant Are Doing Right with Digital Administration",
    excerpt: "A look at how Nigeria's top private universities are adopting centralised platforms to manage student records, course delivery, and faculty communications.",
    date: "May 15, 2026",
    readTime: "8 min read",
    color: "fuchsia",
  },
  {
    category: "Technology",
    title: "Why We Built Acadia on NestJS and Next.js",
    excerpt: "A technical deep-dive into the architecture decisions behind Acadia — from our monorepo setup to real-time messaging and Neon PostgreSQL on the backend.",
    date: "May 3, 2026",
    readTime: "10 min read",
    color: "emerald",
  },
  {
    category: "Students",
    title: "5 Ways Students Perform Better When They Have Full Visibility of Their Progress",
    excerpt: "Research consistently shows that access to timely grade feedback, attendance data, and assignment deadlines dramatically improves academic performance.",
    date: "April 22, 2026",
    readTime: "5 min read",
    color: "rose",
  },
  {
    category: "Education",
    title: "The NDPR and Your Students: What Universities Need to Know in 2026",
    excerpt: "Nigeria's data protection law has real implications for how institutions store and process student records. Here's a plain-English breakdown.",
    date: "April 10, 2026",
    readTime: "7 min read",
    color: "amber",
  },
];

const catColor: Record<string, string> = {
  indigo:  "bg-indigo-50 text-indigo-600",
  violet:  "bg-violet-50 text-violet-600",
  fuchsia: "bg-fuchsia-50 text-fuchsia-600",
  emerald: "bg-emerald-50 text-emerald-600",
  rose:    "bg-rose-50 text-rose-600",
  amber:   "bg-amber-50 text-amber-700",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* Navbar */}
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">How it Works</Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
          <Link href="/blog" className="text-indigo-600 font-semibold">Blog</Link>
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
        <section className="py-20 px-6 bg-linear-to-b from-slate-50 to-white text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={vp}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" /> The Acadia Blog
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.05} className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Ideas, insights & updates
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.1} className="text-lg text-slate-500">
              Perspectives on the future of education in Africa — from the team building it.
            </motion.p>
          </motion.div>
        </section>

        {/* Featured Post */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
              className="group relative bg-linear-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-white overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-indigo-200/60 transition-all duration-300">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white blur-[80px]" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Featured</span>
                <h2 className="text-3xl font-extrabold leading-tight mb-4 group-hover:underline underline-offset-4">
                  {posts[0].title}
                </h2>
                <p className="text-indigo-100 leading-relaxed mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-indigo-200 text-sm">
                  <span>{posts[0].date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{posts[0].readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Post Grid */}
        <section className="px-6 pb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-extrabold text-slate-900 mb-8">All Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post, i) => (
                <motion.article key={post.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ delay: i * 0.07 }}
                  className="group bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
                >
                  <div className={`h-2 w-full ${catColor[post.color].replace("text-", "bg-").split(" ")[0].replace("bg-", "bg-").replace("50", "200")}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full w-fit mb-3 ${catColor[post.color]}`}>{post.category}</span>
                    <h3 className="font-bold text-slate-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 px-6 bg-slate-50">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Stay in the loop</h2>
            <p className="text-slate-500 text-sm mb-6">Get new posts delivered to your inbox. No spam, unsubscribe anytime.</p>
            <div className="flex gap-3">
              <input type="email" placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all" />
              <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 shrink-0">
                Subscribe <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
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
