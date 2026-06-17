"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, BookOpen, Users, Shield, Sparkles,
  GraduationCap, CheckCircle, CalendarDays,
  BarChart3, FileText, Bell, ChevronRight,
} from "lucide-react";

/* ─── animation presets ─────────────────────────────────────────── */
const vp = { once: true, margin: "0px 0px -60px 0px" };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ─── SVG wave dividers ──────────────────────────────────────────── */
function WaveLightToDark() {
  return (
    <div className="wave-bg-white w-full overflow-hidden leading-none -mt-px">
      <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none">
        <path d="M0,0 C320,80 640,80 960,40 C1120,20 1300,10 1440,40 L1440,80 L0,80 Z" className="wave-fill-slate900" />
      </svg>
    </div>
  );
}

function WaveDarkToLight() {
  return (
    <div className="wave-bg-slate900 w-full overflow-hidden leading-none -mt-px">
      <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none">
        <path d="M0,80 C360,0 720,60 1080,20 C1260,4 1380,50 1440,30 L1440,80 L0,80 Z" className="wave-fill-white" />
      </svg>
    </div>
  );
}

function WaveWhiteToSlate50() {
  return (
    <div className="wave-bg-white w-full overflow-hidden leading-none -mt-px">
      <svg viewBox="0 0 1440 60" className="block w-full" preserveAspectRatio="none">
        <path d="M0,20 C240,60 480,0 720,30 C960,60 1200,10 1440,30 L1440,60 L0,60 Z" className="wave-fill-slate50" />
      </svg>
    </div>
  );
}

function WaveSlate50ToIndigo() {
  return (
    <div className="wave-bg-slate50 w-full overflow-hidden leading-none -mt-px">
      <svg viewBox="0 0 1440 70" className="block w-full" preserveAspectRatio="none">
        <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,18 1440,35 L1440,70 L0,70 Z" className="wave-fill-indigo" />
      </svg>
    </div>
  );
}

/* ─── geometric slash decorations ───────────────────────────────── */
function SlashDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative w-full h-16 overflow-hidden pointer-events-none" aria-hidden>
      <svg viewBox="0 0 1440 64" className="w-full h-full" preserveAspectRatio="none">
        {flip ? (
          <>
            <line x1="1440" y1="0" x2="0" y2="64" stroke="rgb(99 102 241 / 0.10)" strokeWidth="1.5" />
            <line x1="1440" y1="16" x2="0" y2="64" stroke="rgb(99 102 241 / 0.05)" strokeWidth="1" />
            <line x1="1440" y1="32" x2="0" y2="64" stroke="rgb(99 102 241 / 0.04)" strokeWidth="1" />
          </>
        ) : (
          <>
            <line x1="0" y1="0" x2="1440" y2="64" stroke="rgb(99 102 241 / 0.10)" strokeWidth="1.5" />
            <line x1="0" y1="16" x2="1440" y2="64" stroke="rgb(99 102 241 / 0.05)" strokeWidth="1" />
            <line x1="0" y1="32" x2="1440" y2="64" stroke="rgb(99 102 241 / 0.04)" strokeWidth="1" />
          </>
        )}
      </svg>
    </div>
  );
}

/* ─── inline SVG illustrations ───────────────────────────────────── */
function DashboardIllustration() {
  return (
    <svg viewBox="0 0 480 320" className="w-full h-auto drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
      {/* window chrome */}
      <rect width="480" height="320" rx="14" fill="#1e293b" />
      <rect width="480" height="36" rx="14" fill="#0f172a" />
      <rect y="22" width="480" height="14" fill="#0f172a" />
      <circle cx="18" cy="18" r="5.5" fill="#ef4444" opacity="0.9" />
      <circle cx="34" cy="18" r="5.5" fill="#f59e0b" opacity="0.9" />
      <circle cx="50" cy="18" r="5.5" fill="#22c55e" opacity="0.9" />
      <rect x="70" y="12" width="80" height="12" rx="4" fill="#334155" />
      {/* sidebar */}
      <rect x="0" y="36" width="88" height="284" fill="#0f172a" />
      {[56,76,96,116,136,156,176,196].map((y, i) => (
        <g key={i}>
          <rect x="12" y={y} width="18" height="12" rx="3" fill={i === 0 ? "#3b82f6" : "#1e293b"} />
          <rect x="36" y={y+1} width={i === 0 ? 40 : 32} height="10" rx="2" fill={i === 0 ? "#60a5fa" : "#334155"} />
        </g>
      ))}
      {/* stat cards */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x={96 + i * 95} y="46" width="87" height="56" rx="8" fill="white" />
          <rect x={104 + i * 95} y="56" width="16" height="16" rx="4"
            fill={["#dbeafe","#ede9fe","#d1fae5","#fef3c7"][i]} />
          <rect x={124 + i * 95} y="58" width="42" height="6" rx="2" fill="#94a3b8" />
          <rect x={104 + i * 95} y="74" width="55" height="14" rx="3"
            fill={["#2563eb","#7c3aed","#059669","#d97706"][i]} opacity="0.12" />
          <rect x={104 + i * 95} y="78" width="38" height="8" rx="2"
            fill={["#1d4ed8","#6d28d9","#047857","#b45309"][i]} />
        </g>
      ))}
      {/* main content */}
      <rect x="96" y="112" width="245" height="132" rx="8" fill="white" />
      <rect x="104" y="122" width="80" height="10" rx="3" fill="#0f172a" />
      <rect x="104" y="136" width="50" height="7" rx="2" fill="#94a3b8" />
      {/* bar chart */}
      {[{x:108,h:56,c:"#3b82f6"},{x:134,h:76,c:"#8b5cf6"},{x:160,h:42,c:"#10b981"},
        {x:186,h:90,c:"#f59e0b"},{x:212,h:64,c:"#3b82f6"},{x:238,h:82,c:"#8b5cf6"}].map(({x,h,c},i) => (
        <g key={i}>
          <rect x={x} y={232-h} width="20" height={h} rx="4" fill={c} opacity="0.2" />
          <rect x={x} y={232-h} width="20" height="5" rx="2.5" fill={c} />
        </g>
      ))}
      <line x1="104" y1="232" x2="330" y2="232" stroke="#e2e8f0" strokeWidth="1" />
      {/* right panel */}
      <rect x="349" y="112" width="122" height="132" rx="8" fill="white" />
      <rect x="357" y="122" width="60" height="8" rx="3" fill="#0f172a" />
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="357" y={140+i*24} width="106" height="18" rx="5" fill="#f8fafc" />
          <rect x="363" y={144+i*24} width="8" height="8" rx="2"
            fill={["#3b82f6","#8b5cf6","#10b981","#f59e0b"][i]} />
          <rect x="377" y={145+i*24} width="52" height="6" rx="2" fill="#334155" />
          <rect x="357+78" y={144+i*24} width="20" height="8" rx="3"
            fill={["#dbeafe","#ede9fe","#d1fae5","#fef3c7"][i]} />
        </g>
      ))}
      {/* bottom table */}
      <rect x="96" y="254" width="375" height="56" rx="8" fill="white" />
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="104" y={264+i*14} width="120" height="7" rx="2" fill="#94a3b8" opacity={0.6-i*0.15} />
          <rect x="260" y={264+i*14} width="60" height="7" rx="2" fill="#94a3b8" opacity={0.4-i*0.1} />
          <rect x="380" y={264+i*14} width="40" height="7" rx="4"
            fill={["#d1fae5","#fef3c7","#fee2e2"][i]} />
        </g>
      ))}
    </svg>
  );
}

function CollaborationIllustration() {
  return (
    <svg viewBox="0 0 360 240" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* connection lines */}
      <line x1="180" y1="120" x2="60" y2="50"  stroke="#818cf8" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4" />
      <line x1="180" y1="120" x2="300" y2="50" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4" />
      <line x1="180" y1="120" x2="60" y2="190" stroke="#34d399" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4" />
      <line x1="180" y1="120" x2="300" y2="190" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4" />
      {/* center hub */}
      <circle cx="180" cy="120" r="36" fill="#4f46e5" opacity="0.1" stroke="#4f46e5" strokeWidth="2" strokeOpacity="0.3" />
      <circle cx="180" cy="120" r="24" fill="#4f46e5" opacity="0.15" />
      <rect x="167" y="107" width="26" height="26" rx="6" fill="#4f46e5" opacity="0.6" />
      <rect x="172" y="112" width="8" height="8" rx="2" fill="white" opacity="0.8" />
      <rect x="183" y="112" width="6" height="2" rx="1" fill="white" opacity="0.6" />
      <rect x="172" y="123" width="16" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="172" y="128" width="12" height="2" rx="1" fill="white" opacity="0.3" />
      {/* peer nodes */}
      {[
        { cx:60,  cy:50,  r:22, fill:"#2563eb", label:"AT", sub:"Student" },
        { cx:300, cy:50,  r:22, fill:"#7c3aed", label:"JO", sub:"Lecturer" },
        { cx:60,  cy:190, r:22, fill:"#059669", label:"SM", sub:"Student" },
        { cx:300, cy:190, r:22, fill:"#d97706", label:"FE", sub:"Admin" },
      ].map(({ cx, cy, r, fill, label, sub }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={r} fill={fill} opacity="0.12" stroke={fill} strokeWidth="1.5" strokeOpacity="0.4" />
          <text x={cx} y={cy+4} textAnchor="middle" fontSize="9" fill={fill} fontWeight="800">{label}</text>
          <rect x={cx-18} y={cy+r+4} width="36" height="12" rx="4" fill={fill} opacity="0.1" />
          <text x={cx} y={cy+r+13} textAnchor="middle" fontSize="7" fill={fill} opacity="0.8">{sub}</text>
        </g>
      ))}
      {/* message bubbles */}
      <rect x="92" y="70" width="70" height="22" rx="8" fill="#2563eb" opacity="0.12" />
      <rect x="98" y="76" width="48" height="5" rx="2" fill="#2563eb" opacity="0.5" />
      <rect x="198" y="160" width="68" height="22" rx="8" fill="#7c3aed" opacity="0.12" />
      <rect x="204" y="166" width="46" height="5" rx="2" fill="#7c3aed" opacity="0.5" />
    </svg>
  );
}

function AnalyticsIllustration() {
  const bars = [
    { h: 72, c: "#3b82f6" }, { h: 100, c: "#8b5cf6" }, { h: 56, c: "#10b981" },
    { h: 128, c: "#f59e0b" }, { h: 88, c: "#3b82f6" }, { h: 112, c: "#8b5cf6" },
  ];
  const trend = "45,148 95,118 145,138 195,80 245,108 295,92";
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* card bg */}
      <rect x="10" y="10" width="340" height="200" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="20" y="22" width="90" height="10" rx="3" fill="#0f172a" />
      <rect x="20" y="36" width="60" height="7" rx="2" fill="#94a3b8" />
      {/* grid lines */}
      {[60,90,120,150].map(y => (
        <line key={y} x1="30" y1={y} x2="340" y2={y} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {/* bars */}
      {bars.map(({ h, c }, i) => (
        <g key={i}>
          <rect x={30+i*48} y={170-h} width="28" height={h} rx="5" fill={c} opacity="0.15" />
          <rect x={30+i*48} y={170-h} width="28" height="6" rx="3" fill={c} />
        </g>
      ))}
      <line x1="20" y1="170" x2="340" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* trend line */}
      <polyline points={trend} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.7" />
      {trend.split(" ").map((pt, i) => {
        const [x, y] = pt.split(",").map(Number);
        return <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#2563eb" strokeWidth="2" />;
      })}
      {/* legend */}
      {[{ c:"#3b82f6", l:"Score" }, { c:"#8b5cf6", l:"Grade" }, { c:"#10b981", l:"Attend" }].map(({ c, l }, i) => (
        <g key={l}>
          <circle cx={210+i*42} cy={200} r="4" fill={c} />
          <text x={217+i*42} y={203} fontSize="7" fill="#64748b">{l}</text>
        </g>
      ))}
    </svg>
  );
}

/* ─── feature card colour map (static — Tailwind can scan these) ── */
const featureIconClass: Record<string, string> = {
  indigo:  "icon-indigo",
  violet:  "icon-violet",
  fuchsia: "icon-fuchsia",
  rose:    "icon-rose",
  emerald: "icon-emerald",
  amber:   "icon-amber",
};

/* ─── role card colour map ────────────────────────────────────────── */
const roleClass: Record<string, { icon: string; link: string }> = {
  indigo:  { icon: "role-indigo",  link: "role-link-indigo" },
  violet:  { icon: "role-violet",  link: "role-link-violet" },
  fuchsia: { icon: "role-fuchsia", link: "role-link-fuchsia" },
};

/* ════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="h-12 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/">
          <Image src="/LOGO.png" alt="Acadia" width={150} height={38} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#features"      className="hover:text-indigo-600 transition-colors">Features</a>
          <Link href="/about"      className="hover:text-indigo-600 transition-colors">How it Works</Link>
          <a href="#preview"       className="hover:text-indigo-600 transition-colors">Preview</a>
          <a href="#institutions"  className="hover:text-indigo-600 transition-colors">Institutions</a>
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

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative pt-20 pb-0 px-4 text-center overflow-hidden bg-slate-50 section-contain">
          {/* Blobs — scale + opacity only, no rotation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <motion.div
              className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-linear-to-br from-indigo-300 to-purple-200 blur-[80px] gpu-layer"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.22, 0.40, 0.22] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/4 -right-1/4 w-2/3 h-3/4 rounded-full bg-linear-to-bl from-violet-300 to-fuchsia-200 blur-[80px] gpu-layer"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </div>

          <motion.div initial="hidden" animate="visible" variants={stagger}
            className="relative z-10 max-w-4xl mx-auto space-y-7 flex flex-col items-center"
          >
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-indigo-100 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> The Operating System for Education
            </motion.div>

            <motion.h1 variants={fadeUp} custom={0.05}
              className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.05]"
            >
              One Platform.<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-500 to-purple-600">
                Every Academic<br />Connection.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={0.1}
              className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed"
            >
              Acadia unifies students, lecturers, courses and institutions in one secure, intelligent academic ecosystem — so everyone can focus on learning.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.15}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Button size="lg"
                className="rounded-full px-8 h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200/60 group w-full sm:w-auto"
                asChild
              >
                <Link href="/signup">
                  Start for free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline"
                className="rounded-full px-8 h-12 text-base font-semibold bg-white/70 border-slate-200 hover:bg-white w-full sm:w-auto"
                asChild
              >
                <Link href="/about">How it works</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.2}
              className="flex items-center gap-3 text-sm text-slate-500"
            >
              <div className="flex -space-x-2">
                {(["bg-blue-500","bg-violet-500","bg-emerald-500","bg-amber-500"] as const).map((bg, i) => (
                  <div key={i} className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold ${bg}`}>
                    {["AT","JO","SM","FE"][i]}
                  </div>
                ))}
              </div>
              <span><strong className="text-slate-700">10,000+</strong> students already enrolled</span>
            </motion.div>
          </motion.div>

          {/* Hero mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mt-16 relative w-full max-w-5xl mx-auto px-4 z-10 gpu-transform"
          >
            <div className="relative rounded-2xl border border-slate-200/80 shadow-2xl shadow-indigo-900/10 bg-white p-1.5">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src="/SIDEIMAGE.png"
                  alt="Acadia Platform Dashboard"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>

              <motion.div
                className="absolute -left-5 top-1/3 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 hidden lg:flex items-center gap-3 gpu-transform"
                animate={prefersReducedMotion ? {} : { y: [-4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-none">A+ Grade Added</p>
                  <p className="text-xs text-slate-400 mt-0.5">MTH301 · Just now</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-5 bottom-1/3 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 hidden lg:flex items-center gap-3 gpu-transform"
                animate={prefersReducedMotion ? {} : { y: [4, -4] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
              >
                <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-none">New Assignment</p>
                  <p className="text-xs text-slate-400 mt-0.5">CSC301 · Due Friday</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* hero → features transition */}
          <div className="wave-bg-slate50 w-full overflow-hidden leading-none mt-0">
            <svg viewBox="0 0 1440 70" className="block w-full" preserveAspectRatio="none">
              <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,18 1440,35 L1440,70 L0,70 Z" className="wave-fill-white" />
            </svg>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section id="features" className="py-24 bg-white relative section-contain">
          <SlashDivider />
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              >
                <motion.div variants={fadeUp} custom={0}
                  className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 mb-5"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Platform Features
                </motion.div>
                <motion.h2 variants={fadeUp} custom={0.05}
                  className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight"
                >
                  Everything you need to excel academically
                </motion.h2>
                <motion.p variants={fadeUp} custom={0.1}
                  className="text-lg text-slate-500 leading-relaxed"
                >
                  Powerful tools built for the modern university — students stay focused, lecturers save hours, institutions run smoothly.
                </motion.p>
                <motion.div variants={fadeUp} custom={0.15} className="mt-6">
                  <Link href="/about" className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:gap-2.5 transition-all duration-200">
                    See how it works <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="hidden lg:block gpu-transform"
              >
                <DashboardIllustration />
              </motion.div>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: BookOpen,     color: "indigo",  title: "Course Management",     desc: "Organise materials, track progress, and manage enrolments across all your courses." },
                { icon: Users,        color: "violet",  title: "Collaboration",          desc: "Built-in messaging and discussion boards keep students and lecturers in sync." },
                { icon: FileText,     color: "fuchsia", title: "Assignments & Grading",  desc: "Create, submit, and grade assignments with instant feedback loops." },
                { icon: CalendarDays, color: "rose",    title: "Timetable & Attendance", desc: "View weekly schedules and automatically track class attendance." },
                { icon: BarChart3,    color: "indigo",  title: "Analytics & Insights",   desc: "Real-time performance dashboards for students, lecturers, and admins." },
                { icon: Shield,       color: "violet",  title: "Secure & Multi-tenant",  desc: "Institution-level data isolation with role-based access for every user type." },
              ].map(({ icon: Icon, color, title, desc }, i) => (
                <motion.div key={title} variants={fadeUp} custom={i * 0.05}
                  className="bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${featureIconClass[color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <SlashDivider flip />
        </section>

        {/* ── wave light→dark ── */}
        <WaveLightToDark />

        {/* ── How It Works / Roles ─────────────────────────────── */}
        <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden section-contain">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <motion.div
              className="absolute -top-32 right-0 w-125 h-125 rounded-full bg-indigo-600 blur-[100px] gpu-layer"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.07, 0.16, 0.07] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-125 h-125 rounded-full bg-violet-700 blur-[100px] gpu-layer"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.18, 1], opacity: [0.05, 0.13, 0.05] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <motion.div
                initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              >
                <motion.p variants={fadeUp} custom={0}
                  className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-4"
                >
                  A connected ecosystem
                </motion.p>
                <motion.h2 variants={fadeUp} custom={0.05}
                  className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
                >
                  Tailored for every role
                </motion.h2>
                <motion.p variants={fadeUp} custom={0.1}
                  className="text-slate-400 text-lg leading-relaxed"
                >
                  Whether you&apos;re a student chasing deadlines, a lecturer managing courses, or an admin overseeing a faculty — Acadia has a view built just for you.
                </motion.p>
                <motion.div variants={fadeUp} custom={0.15} className="mt-8">
                  <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-white px-7 font-semibold">
                    <Link href="/about">Explore all roles <ArrowRight className="ml-2 w-4 h-4" /></Link>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="gpu-transform"
              >
                <CollaborationIllustration />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: GraduationCap, color: "indigo", span: "md:col-span-2", title: "For Students",
                  body: "Access courses, submit assignments, track attendance, check grades, and message lecturers — all from one unified dashboard." },
                { icon: BookOpen,      color: "violet", span: "",               title: "For Lecturers",
                  body: "Post resources, grade submissions, make announcements, and track student progress without juggling multiple tools." },
                { icon: Shield,        color: "fuchsia",span: "md:col-span-3",  title: "For Institutions",
                  body: "Manage thousands of students across multiple faculties and departments with granular controls, analytics, and role-based access." },
              ].map(({ icon: Icon, color, span, title, body }) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`${span} bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-colors duration-300`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${roleClass[color].icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-slate-400 leading-relaxed">{body}</p>
                  <Link href="/about"
                    className={`inline-flex items-center gap-1 mt-5 text-sm font-semibold hover:text-white transition-colors ${roleClass[color].link}`}
                  >
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── wave dark→light ── */}
        <WaveDarkToLight />

        {/* ── Platform Preview ─────────────────────────────────── */}
        <section id="preview" className="py-24 bg-white section-contain">
          <SlashDivider />
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="text-center mb-12"
            >
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 mb-5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Full Platform Preview
              </motion.div>
              <motion.h2 variants={fadeUp} custom={0.05}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
              >
                Every screen, beautifully designed
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.1}
                className="text-lg text-slate-500 max-w-2xl mx-auto"
              >
                From dashboard to grades, timetable, messages and beyond — every page is crafted for clarity and speed.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/10 border border-slate-200/60 group gpu-transform"
            >
              <Image
                src="/FULLUI.png"
                alt="Acadia — All Pages Overview"
                width={1400}
                height={900}
                className="w-full h-auto group-hover:scale-[1.006] transition-transform duration-700"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-10">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 rounded-full px-8 shadow-xl font-bold" asChild>
                  <Link href="/signup">Get started for free <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
            >
              {["Dashboard overview","Course management","Assignment tracking","Weekly timetable",
                "Real-time messaging","Grade reports","Attendance records","AI study assistant"].map((f, i) => (
                <motion.div key={f} variants={fadeUp} custom={i * 0.04}
                  className="flex items-center gap-2 text-sm text-slate-600 font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />{f}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <SlashDivider flip />
        </section>

        {/* ── Analytics illustration ───────────────────────────── */}
        <section className="py-20 bg-white section-contain">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="hidden lg:block gpu-transform"
              >
                <AnalyticsIllustration />
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              >
                <motion.div variants={fadeUp} custom={0}
                  className="inline-flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-widest bg-rose-50 px-4 py-2 rounded-full border border-rose-100 mb-5"
                >
                  <BarChart3 className="w-3.5 h-3.5" /> Analytics
                </motion.div>
                <motion.h2 variants={fadeUp} custom={0.05}
                  className="text-4xl font-extrabold text-slate-900 mb-5 leading-tight"
                >
                  Track performance at every level
                </motion.h2>
                <motion.p variants={fadeUp} custom={0.1}
                  className="text-slate-500 text-lg leading-relaxed mb-6"
                >
                  Students see their own progress. Lecturers monitor class performance. Admins get institution-wide insights — all in real time.
                </motion.p>
                {["Student GPA tracking & grade history","Per-course attendance analytics",
                  "Assignment completion rates","Lecturer course statistics","Department & faculty overviews"].map((item, i) => (
                  <motion.div key={item} variants={fadeUp} custom={0.1 + i * 0.04}
                    className="flex items-center gap-2.5 text-sm text-slate-600 font-medium mb-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-indigo-500 shrink-0" />{item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Institutions ─────────────────────────────────────── */}
        <WaveWhiteToSlate50 />

        <section id="institutions" className="py-20 bg-slate-50 section-contain">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp}
              className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10"
            >
              Trusted by leading institutions
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={vp} transition={{ duration: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-10 md:gap-20"
            >
              {[
                { name: "Covenant", cls: "bg-indigo-600 rounded-full" },
                { name: "UNILAG",   cls: "bg-violet-700 rounded-xl" },
                { name: "MTU",      cls: "bg-pink-700 rounded-md" },
                { name: "Babcock",  cls: "bg-cyan-600 rounded-br-3xl rounded-tl-3xl" },
              ].map(({ name, cls }) => (
                <motion.div key={name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 font-extrabold text-xl text-slate-700 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div className={`w-10 h-10 shadow-md ${cls}`} />
                  {name}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <WaveSlate50ToIndigo />

        <section className="py-24 bg-indigo-600 text-white relative overflow-hidden section-contain">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <motion.div
              className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full bg-violet-500 blur-[120px] gpu-layer"
              animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.12, 0.25, 0.12] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0}
                className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight"
              >
                Ready to transform your academic experience?
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.05}
                className="text-indigo-100 text-lg mb-8 leading-relaxed"
              >
                Join thousands of students and educators already using Acadia to learn smarter and teach better.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.1}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button size="lg"
                  className="rounded-full px-10 h-12 text-base font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl w-full sm:w-auto"
                  asChild
                >
                  <Link href="/signup">Get started for free</Link>
                </Button>
                <Button size="lg" variant="outline"
                  className="rounded-full px-10 h-12 text-base font-semibold border-white/30 text-white hover:bg-white/10 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/about">Learn more</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
            <div className="max-w-xs">
              <Image src="/LOGO.png" alt="Acadia" width={160} height={42} className="brightness-0 invert mb-4" />
              <p className="text-slate-400 text-sm leading-relaxed">
                The operating system for modern education — connecting students, lecturers and institutions seamlessly.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {[
                { heading: "Product", links: ["Features","How it Works","Pricing","Security"] },
                { heading: "Company", links: ["About","Blog","Careers","Contact"] },
                { heading: "Legal",   links: ["Privacy Policy","Terms of Service","Cookie Policy"] },
              ].map(col => (
                <div key={col.heading}>
                  <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">{col.heading}</h4>
                  <ul className="space-y-2">
                    {col.links.map(l => (
                      <li key={l}>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors duration-150">{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} Acadia Platforms. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              Crafted with <span className="text-rose-400">♥</span> for modern education
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
