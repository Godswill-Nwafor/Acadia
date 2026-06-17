"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X, Zap, Building2, Sparkles, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};
const vp = { once: true, margin: "0px 0px -40px 0px" };

const plans = [
  {
    name: "Free",
    icon: Zap,
    monthly: 0,
    yearly: 0,
    desc: "Perfect for getting started. No credit card required.",
    cta: "Get started free",
    ctaHref: "/signup",
    highlight: false,
    badge: "",
    features: {
      "Students": "Up to 500",
      "Lecturers": "Up to 50",
      "Active courses": "Up to 3",
      "File storage": "1 GB",
      "Assignment management": true,
      "Grade tracking": true,
      "Basic announcements": true,
      "Attendance tracking": false,
      "AI Study Assistant": false,
      "Analytics dashboard": false,
      "Real-time messaging": false,
      "Custom branding": false,
      "Course timetable": false,
      "API access": false,
      "SSO / SAML": false,
      "Dedicated support": false,
      "SLA guarantee": false,
    },
  },
  {
    name: "Pro",
    icon: Building2,
    monthly: 20000,
    yearly: 192000,
    desc: "For growing institutions ready to move beyond the basics.",
    cta: "Start Pro trial",
    ctaHref: "/signup?plan=pro",
    highlight: true,
    badge: "Most popular",
    features: {
      "Students": "Up to 1,000",
      "Lecturers": "Up to 500",
      "Active courses": "Unlimited",
      "File storage": "20 GB",
      "Assignment management": true,
      "Grade tracking": true,
      "Basic announcements": true,
      "Attendance tracking": true,
      "AI Study Assistant": true,
      "Analytics dashboard": true,
      "Real-time messaging": true,
      "Custom branding": true,
      "Course timetable": true,
      "API access": false,
      "SSO / SAML": false,
      "Dedicated support": false,
      "SLA guarantee": false,
    },
  },
  {
    name: "Enterprise",
    icon: Sparkles,
    monthly: -1,
    yearly: -1,
    desc: "For large institutions, multi-campus universities, and consortiums.",
    cta: "Contact sales",
    ctaHref: "/contact",
    highlight: false,
    badge: "",
    features: {
      "Students": "Unlimited",
      "Lecturers": "Unlimited",
      "Active courses": "Unlimited",
      "File storage": "Unlimited",
      "Assignment management": true,
      "Grade tracking": true,
      "Basic announcements": true,
      "Attendance tracking": true,
      "AI Study Assistant": true,
      "Analytics dashboard": true,
      "Real-time messaging": true,
      "Custom branding": true,
      "Course timetable": true,
      "API access": true,
      "SSO / SAML": true,
      "Dedicated support": true,
      "SLA guarantee": true,
    },
  },
];

const featureRows = [
  "Students", "Lecturers", "Active courses", "File storage",
  "Assignment management", "Grade tracking", "Basic announcements",
  "Attendance tracking", "AI Study Assistant", "Analytics dashboard",
  "Real-time messaging", "Custom branding", "Course timetable",
  "API access", "SSO / SAML", "Dedicated support", "SLA guarantee",
];

const faqs = [
  { q: "Can I switch plans at any time?", a: "Yes. Upgrades take effect immediately. Downgrades apply at the end of your current billing period." },
  { q: "Is there a free trial for Pro?", a: "Every new institution gets a 14-day Pro trial with no credit card required. After the trial, choose a plan or stay on Free." },
  { q: "What payment methods do you accept?", a: "Card payments (Visa, Mastercard, Verve) and bank transfers via Paystack. Enterprise customers can pay by invoice." },
  { q: "How does the student count work?", a: "Student count is the number of active student accounts in your institution. Archived or suspended accounts do not count." },
  { q: "Can we use Acadia for multiple campuses?", a: "Multi-campus support is an Enterprise feature. Each campus gets its own department/faculty hierarchy within one account." },
  { q: "Is our data safe?", a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are NDPR-compliant and data is stored on AWS Africa (Cape Town) servers." },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="text-sm text-slate-700 font-medium">{value}</span>;
  return value
    ? <Check className="w-4 h-4 text-indigo-600 mx-auto" />
    : <X className="w-4 h-4 text-slate-300 mx-auto" />;
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const proSavings = (plans[1].monthly * 12) - plans[1].yearly;

  function displayPrice(plan: typeof plans[0]) {
    if (plan.monthly === -1) return "Custom";
    if (plan.monthly === 0) return "Free";
    const n = yearly ? Math.round(plan.yearly / 12) : plan.monthly;
    return `₦${n.toLocaleString()}`;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority style={{ height: "auto" }} /></Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link href="/#features" className="hover:text-indigo-600 transition-colors">Features</Link>
          <Link href="/about" className="hover:text-indigo-600 transition-colors">How it Works</Link>
          <Link href="/pricing" className="text-indigo-600 font-semibold">Pricing</Link>
          <Link href="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
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

        {/* Hero + toggle */}
        <section className="pt-20 pb-10 px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={vp}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
            className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Simple, transparent pricing
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.05} className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              Start free. Scale as you grow.
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.1} className="text-lg text-slate-500 leading-relaxed">
              Every institution starts on a free 14-day Pro trial. No credit card required.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.15} className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-semibold ${!yearly ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
              <button
                type="button"
                onClick={() => setYearly(v => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${yearly ? "bg-indigo-600" : "bg-slate-200"}`}
                aria-label="Toggle billing period"
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${yearly ? "translate-x-6" : ""}`} />
              </button>
              <span className={`text-sm font-semibold ${yearly ? "text-slate-900" : "text-slate-400"}`}>
                Yearly
                <span className="ml-2 inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  Save ₦{proSavings.toLocaleString()}
                </span>
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* Plan cards */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-4 items-start">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              const price = displayPrice(plan);
              const isCustom = plan.monthly === -1;
              const isFree = plan.monthly === 0;
              return (
                <motion.div key={plan.name}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp}
                  transition={{ delay: i * 0.08 }}
                  className={`relative rounded-3xl border p-8 flex flex-col ${plan.highlight
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-2xl shadow-indigo-200/70 md:-mt-2 md:pb-10"
                    : "border-slate-100 bg-white shadow-sm hover:shadow-md"
                  } transition-shadow duration-300`}>

                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-indigo-600 text-xs font-bold px-4 py-1 rounded-full border border-indigo-200 shadow-sm whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.highlight ? "bg-white/20" : "bg-indigo-50"}`}>
                    <Icon className={`w-5 h-5 ${plan.highlight ? "text-white" : "text-indigo-600"}`} />
                  </div>
                  <h2 className={`text-xl font-extrabold mb-1 ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.name}</h2>
                  <p className={`text-sm mb-6 leading-relaxed ${plan.highlight ? "text-indigo-200" : "text-slate-500"}`}>{plan.desc}</p>

                  <div className="mb-6">
                    <p className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                      {price}
                      {!isCustom && !isFree && (
                        <span className={`text-base font-semibold ml-1 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>/mo</span>
                      )}
                    </p>
                    {yearly && !isCustom && !isFree && (
                      <p className={`text-xs mt-1 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>
                        Billed ₦{plan.yearly.toLocaleString()}/year
                      </p>
                    )}
                    {isCustom && <p className={`text-xs mt-1 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>Tailored to your institution</p>}
                  </div>

                  <Button asChild className={`rounded-full font-bold mb-8 ${plan.highlight
                    ? "bg-white text-indigo-600 hover:bg-indigo-50"
                    : plan.name === "Enterprise"
                      ? "bg-violet-600 hover:bg-violet-700 text-white"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}>
                    <Link href={plan.ctaHref}>{plan.cta}</Link>
                  </Button>

                  <ul className="space-y-3">
                    {(["Students", "Lecturers", "File storage", "AI Study Assistant", "Attendance tracking", "Analytics dashboard", "Custom branding", "API access", "SSO / SAML", "Dedicated support"] as const).map(feat => {
                      const val = (plan.features as Record<string, boolean | string>)[feat];
                      return (
                        <li key={feat} className="flex items-center gap-3">
                          {typeof val === "boolean"
                            ? val
                              ? <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-indigo-600"}`} />
                              : <X className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-indigo-400/60" : "text-slate-300"}`} />
                            : <Check className={`w-4 h-4 shrink-0 ${plan.highlight ? "text-indigo-200" : "text-indigo-600"}`} />
                          }
                          <span className={`text-sm ${typeof val === "boolean" && !val
                            ? plan.highlight ? "text-indigo-400/60" : "text-slate-300"
                            : plan.highlight ? "text-indigo-50" : "text-slate-700"
                          }`}>
                            {typeof val === "string" ? `${val} ${feat.toLowerCase()}` : feat}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-6 pb-20 bg-slate-50">
          <div className="max-w-5xl mx-auto pt-16">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">Full feature comparison</h2>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left p-5 text-slate-500 font-semibold w-[45%]">Feature</th>
                    {plans.map(p => (
                      <th key={p.name} className={`p-5 font-bold text-center ${p.highlight ? "text-indigo-600" : "text-slate-900"}`}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, i) => (
                    <tr key={row} className={`border-b border-slate-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                      <td className="p-4 pl-5 text-slate-600 font-medium">{row}</td>
                      {plans.map(p => (
                        <td key={p.name} className="p-4 text-center">
                          <FeatureCell value={(p.features as Record<string, boolean | string>)[row]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Trusted by institutions across Nigeria</p>
            <div className="flex flex-wrap items-center justify-center gap-10 grayscale opacity-50">
              <Image src="/babcock.webp"  alt="Babcock University"      width={130} height={40} className="object-contain" />
              <Image src="/unilag.webp"   alt="University of Lagos"     width={50}  height={50} className="object-contain" />
              <Image src="/MTU.webp"      alt="Mountain Top University" width={50}  height={50} className="object-contain" />
              <Image src="/covenant.webp" alt="Covenant University"     width={50}  height={50} className="object-contain" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100">
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left">
                    <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-indigo-600 text-white text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4">Start transforming your institution today</h2>
            <p className="text-indigo-200 mb-8">14-day Pro trial. No credit card. Cancel anytime.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="rounded-full px-10 bg-white text-indigo-600 hover:bg-indigo-50 font-bold shadow-lg">
                <Link href="/signup">Get started free</Link>
              </Button>
              <Button size="lg" asChild className="rounded-full px-10 bg-white/10 border border-white/30 text-white hover:bg-white/20 font-semibold">
                <Link href="/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-10 text-center text-sm">
        <div className="flex items-center justify-center mb-4">
          <Image src="/LOGO.png" alt="Acadia" width={120} height={32} className="brightness-0 invert" style={{ height: "auto" }} />
        </div>
        <p>© {new Date().getFullYear()} Acadia Platforms · <Link href="/" className="hover:text-white transition-colors">Home</Link> · <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></p>
      </footer>
    </div>
  );
}
