"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight, GraduationCap, BookOpen, Shield, CheckCircle,
  MessageSquare, BarChart3, CalendarDays, FileText,
  Zap, Users, ChevronRight, Star,
} from "lucide-react";

/* ── animation helpers ── */
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
const vp = { once: true, margin: "0px 0px -60px 0px" };

/* ── shared navbar ── */
function Navbar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
      <Link href="/">
        <Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority style={{ height: "auto" }} />
      </Link>
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
        <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
        <Link href="/about" className="text-indigo-600 font-semibold">How it Works</Link>
        <Link href="/#preview" className="hover:text-indigo-600 transition-colors">Preview</Link>
        <Link href="/#institutions" className="hover:text-indigo-600 transition-colors">Institutions</Link>
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
  );
}

/* ── step illustration SVGs ── */
function StepIllustration({ step }: { step: number }) {
  if (step === 1) return (
    <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="20" width="140" height="120" rx="12" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5" />
      <rect x="50" y="40" width="100" height="12" rx="4" fill="#c7d2fe" />
      <rect x="60" y="62" width="80" height="10" rx="4" fill="#e0e7ff" />
      <rect x="60" y="80" width="80" height="10" rx="4" fill="#e0e7ff" />
      <rect x="60" y="98" width="60" height="28" rx="6" fill="#4f46e5" />
      <text x="90" y="117" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">Sign Up</text>
      <circle cx="155" cy="35" r="14" fill="#4f46e5" opacity="0.15" stroke="#4f46e5" strokeWidth="1.5" />
      <text x="155" y="40" textAnchor="middle" fontSize="14" fill="#4f46e5">✓</text>
    </svg>
  );
  if (step === 2) return (
    <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="120" rx="8" fill="#0f172a" />
      {[40,55,70,85,100,115].map((y,i) => (
        <rect key={i} x="18" y={y} width={i===0?64:50} height="8" rx="3" fill={i===0?"#4f46e5":"#334155"} />
      ))}
      <rect x="100" y="20" width="90" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="108" y={34+i*32} width="74" height="22" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="114" y={39+i*32} width="14" height="12" rx="2" fill={["#dbeafe","#ede9fe","#d1fae5"][i]} />
          <rect x="132" y={40+i*32} width="40" height="5" rx="1.5" fill="#94a3b8" />
          <rect x="132" y={48+i*32} width="30" height="4" rx="1.5" fill="#cbd5e1" />
        </g>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* network nodes */}
      {[
        { cx: 100, cy: 80, r: 22, fill: "#4f46e5", label: "You" },
        { cx: 40,  cy: 40, r: 14, fill: "#7c3aed", label: "Peers" },
        { cx: 160, cy: 40, r: 14, fill: "#0891b2", label: "Profs" },
        { cx: 40,  cy: 120,r: 14, fill: "#059669", label: "Dept" },
        { cx: 160, cy: 120,r: 14, fill: "#d97706", label: "Uni" },
      ].map(({ cx, cy, r, fill, label }, i) => (
        <g key={i}>
          {i > 0 && <line x1="100" y1="80" x2={cx} y2={cy} stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray={i%2===0?"4 3":""} />}
          <circle cx={cx} cy={cy} r={r} fill={fill} opacity="0.18" stroke={fill} strokeWidth="1.5" />
          <text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fill={fill} fontWeight="700">{label}</text>
        </g>
      ))}
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative py-24 px-6 text-center bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-indigo-200 blur-[100px] opacity-30 gpu-layer" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-violet-200 blur-[100px] opacity-20 gpu-layer" />
          </div>
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest bg-white/80 px-5 py-2 rounded-full border border-indigo-100 shadow-sm mb-6"
            >
              How it Works
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.05}
              className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-5"
            >
              Built for every corner of the university
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.1}
              className="text-lg text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              Acadia is a complete academic operating system — from course enrolment to grading, from messaging to analytics. Here is exactly how it all works.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.15} className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" className="rounded-full px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200/60 font-semibold" asChild>
                <Link href="/signup">Get started free <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 font-semibold border-slate-200 hover:bg-slate-50" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ── 3-step process ── */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger} className="text-center mb-16">
              <motion.p variants={fadeUp} custom={0} className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">The process</motion.p>
              <motion.h2 variants={fadeUp} custom={0.05} className="text-4xl font-extrabold text-slate-900">Up and running in minutes</motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { step: 1, circleClass: "bg-indigo-100 text-indigo-700 border-indigo-200", title: "Create your account", body: "Sign up as a student, lecturer, or institution admin. Your institution domain is automatically detected — no codes, no confusion." },
                { step: 2, circleClass: "bg-violet-100 text-violet-700 border-violet-200",  title: "Connect to your courses", body: "Browse your enrolled courses, view materials uploaded by your lecturers, and see your full timetable from day one." },
                { step: 3, circleClass: "bg-emerald-100 text-emerald-700 border-emerald-200", title: "Collaborate and excel", body: "Submit assignments, message peers, attend lectures, track your grades, and get AI-powered study suggestions — all in one place." },
              ].map(({ step, circleClass, title, body }) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: step * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-36 h-28 mb-6 relative">
                    <StepIllustration step={step} />
                  </div>
                  <div className={`w-10 h-10 rounded-full font-extrabold text-lg flex items-center justify-center mb-4 border-2 ${circleClass}`}>
                    {step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Role deep-dives ── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger} className="text-center mb-16">
              <motion.p variants={fadeUp} custom={0} className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-3">Who it&apos;s for</motion.p>
              <motion.h2 variants={fadeUp} custom={0.05} className="text-4xl font-extrabold text-slate-900">A platform for every role</motion.h2>
            </motion.div>

            <div className="space-y-16">
              {/* Students */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={vp} transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-5">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">For Students</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Your entire academic life — courses, assignments, grades, timetable, and messaging — is accessible from one clean dashboard. Never miss a deadline or a lecture again.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["View & download course materials","Submit assignments before deadlines","Track attendance percentages","Check published grades instantly","Message lecturers directly","Get AI-powered study hints"].map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <Image src="/SIDEIMAGE.png" alt="Student dashboard" width={640} height={400} className="w-full rounded-xl" />
                </div>
              </motion.div>

              {/* Lecturers */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={vp} transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="lg:order-2">
                  <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center mb-5">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">For Lecturers</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Spend less time on admin and more time teaching. Acadia handles resource distribution, assignment collection, grading, and announcements — all in one place.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Upload lecture notes & videos","Create & manage assignments","Grade submissions with feedback","Track per-student progress","Post course announcements","Monitor class attendance"].map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:order-1 bg-linear-to-br from-violet-50 to-indigo-50 rounded-2xl border border-indigo-100 p-8 shadow-sm flex flex-col gap-4">
                  {[
                    { icon: FileText,    label: "Assignment posted",     sub: "CSC301 · Due in 5 days",  badge: "New",       badgeColor: "bg-blue-100 text-blue-700" },
                    { icon: CheckCircle, label: "32 submissions received",sub: "MTH301 · Quiz 2",         badge: "Submitted", badgeColor: "bg-emerald-100 text-emerald-700" },
                    { icon: BarChart3,   label: "Class avg: 71%",        sub: "CSC303 · Mid-semester",   badge: "Graded",    badgeColor: "bg-amber-100 text-amber-700" },
                  ].map(({ icon: Icon, label, sub, badge, badgeColor }) => (
                    <div key={label} className="bg-white rounded-xl p-4 border border-slate-100 flex items-center gap-4 shadow-sm">
                      <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${badgeColor}`}>{badge}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Institutions */}
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={vp} transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className="w-12 h-12 bg-fuchsia-100 text-fuchsia-600 rounded-xl flex items-center justify-center mb-5">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4">For Institutions</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Manage your entire university on one platform. Faculties, departments, thousands of students, hundreds of courses — with granular role-based controls and real-time reporting.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["Multi-faculty & department hierarchy","Role-based access control","Institution-wide announcements","Cross-department analytics","Custom domain & branding","Data privacy & security"].map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-fuchsia-500 mt-0.5 shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 rounded-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-7 font-semibold" asChild>
                    <Link href="/signup">Partner with us <ChevronRight className="ml-1 w-4 h-4" /></Link>
                  </Button>
                </div>
                <div className="bg-slate-900 rounded-2xl p-8 shadow-xl text-white">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Institution Overview</p>
                  {[
                    { label: "Total Students",  value: "12,840", up: "+4.2%",  color: "text-emerald-400" },
                    { label: "Active Courses",  value: "340",    up: "+12",    color: "text-blue-400" },
                    { label: "Lecturers",       value: "280",    up: "+8",     color: "text-violet-400" },
                    { label: "Avg Attendance",  value: "87%",    up: "+1.3%",  color: "text-amber-400" },
                  ].map(({ label, value, up, color }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                      <span className="text-slate-300 text-sm">{label}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-lg">{value}</span>
                        <span className={`text-xs font-semibold ${color}`}>{up}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Key features grid ── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger} className="text-center mb-16">
              <motion.p variants={fadeUp} custom={0} className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">Core Modules</motion.p>
              <motion.h2 variants={fadeUp} custom={0.05} className="text-4xl font-extrabold text-slate-900">Everything, built in</motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {[
                { icon: BookOpen,      iconClass: "bg-blue-100 text-blue-600",    title: "Courses",         desc: "Enrol, browse materials, and track progress per course." },
                { icon: FileText,      iconClass: "bg-violet-100 text-violet-600",title: "Assignments",     desc: "Create, submit, and grade work with structured deadlines." },
                { icon: CalendarDays,  iconClass: "bg-emerald-100 text-emerald-600", title: "Timetable",   desc: "Weekly class schedule with room and lecturer info." },
                { icon: MessageSquare, iconClass: "bg-indigo-100 text-indigo-600",title: "Messages",        desc: "Direct messages and group chats for every course." },
                { icon: BarChart3,     iconClass: "bg-amber-100 text-amber-600",  title: "Grades",          desc: "Full grade history, CGPA calculation, semester reports." },
                { icon: Users,         iconClass: "bg-fuchsia-100 text-fuchsia-600", title: "Discussions", desc: "Threaded forums for every course with peer upvoting." },
                { icon: Zap,           iconClass: "bg-rose-100 text-rose-600",    title: "Announcements",   desc: "Institution, faculty, department, and course notices." },
                { icon: Star,          iconClass: "bg-cyan-100 text-cyan-600",    title: "AI Assistant",    desc: "Personalised study hints and smart reminders." },
              ].map(({ icon: Icon, iconClass, title, desc }, i) => (
                <motion.div key={title} variants={fadeUp} custom={i * 0.04}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${iconClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger} className="text-center mb-14">
              <motion.p variants={fadeUp} custom={0} className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-3">FAQ</motion.p>
              <motion.h2 variants={fadeUp} custom={0.05} className="text-4xl font-extrabold text-slate-900">Common questions</motion.h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger} className="space-y-4">
              {[
                { q: "Is Acadia free for students?", a: "Yes — students always access Acadia for free. Institutions pay a platform licence that covers all their enrolled students." },
                { q: "How does my institution get set up?", a: "Contact us to onboard your institution. We provision your domain, import your faculties and departments, and assign admin roles — usually within 24 hours." },
                { q: "Can students and lecturers use Acadia on mobile?", a: "Absolutely. Acadia is fully responsive and works on any screen. A native mobile app is on the roadmap." },
                { q: "How secure is student data?", a: "All data is encrypted at rest and in transit. Each institution's data is strictly isolated from others. We are FERPA-aware and GDPR-ready." },
                { q: "Can we migrate data from our existing LMS?", a: "Yes. We provide CSV import tools for user lists, course catalogues, and historical grades. Our team assists with larger migrations." },
              ].map(({ q, a }, i) => (
                <motion.details key={q} variants={fadeUp} custom={i * 0.05}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden group"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-slate-800 select-none list-none">
                    {q}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform duration-200 shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{a}</div>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-500 blur-[120px] opacity-20 gpu-layer" />
          </div>
          <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} custom={0} className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
                Ready to get started?
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.05} className="text-indigo-100 text-lg mb-8">
                Join thousands of students and educators already using Acadia.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.1} className="flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" className="rounded-full px-10 h-12 font-bold bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl" asChild>
                  <Link href="/signup">Create free account</Link>
                </Button>
                <Button size="lg" className="rounded-full px-10 h-12 font-semibold bg-white/10 border border-white/30 text-white hover:bg-white/20" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm">
        <div className="flex items-center justify-center mb-4">
          <Image src="/LOGO.png" alt="Acadia" width={120} height={32} className="brightness-0 invert" style={{ height: "auto" }} />
        </div>
        <p>© {new Date().getFullYear()} Acadia Platforms · <Link href="/" className="hover:text-white transition-colors">Home</Link></p>
      </footer>
    </div>
  );
}
