import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "what-we-collect",
    title: "1. Information We Collect",
    body: `We collect information you provide directly when you register an account, including your name, institutional email address, role (Student, Lecturer, or Administrator), and optionally your profile picture via Google OAuth.

We also collect usage data automatically — including pages visited, features used, assignment submissions, grade records, attendance logs, and login timestamps. This data is essential for the platform to function and to provide you with your academic dashboard.

We do not collect payment information. We do not use cookies for advertising.`,
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    body: `We use collected data to:
• Operate and improve the Acadia platform
• Display your grades, assignments, and attendance to you and authorised staff
• Send transactional notifications (e.g. new assignments, grade releases)
• Investigate and resolve security incidents
• Comply with our obligations under the Nigeria Data Protection Regulation (NDPR)

We do not sell your personal data to any third party. We do not use your data for advertising purposes.`,
  },
  {
    id: "sharing",
    title: "3. Sharing of Information",
    body: `Your data may be shared with:
• Your institution's authorised administrators, lecturers, and faculty staff — only the data relevant to their role
• Our infrastructure provider (Neon/PostgreSQL hosted on AWS) under a data processing agreement
• Cloudinary, for secure file storage of uploaded resources

We will not share your personal data with any other third party without your explicit consent, except where required by Nigerian law or a valid court order.`,
  },
  {
    id: "ndpr",
    title: "4. NDPR Compliance",
    body: `Acadia complies with the Nigeria Data Protection Regulation (NDPR) 2019 issued by the National Information Technology Development Agency (NITDA).

In accordance with the NDPR:
• We process your data only for specified, explicit, and legitimate purposes
• We retain data only for as long as necessary for academic record-keeping
• You have the right to access, correct, and request deletion of your personal data
• We maintain a data processing register and conduct periodic privacy impact assessments
• Our Data Protection Officer (DPO) can be reached at: privacy@acadiaplatforms.com`,
  },
  {
    id: "retention",
    title: "5. Data Retention",
    body: `We retain your account and academic records for the duration of your enrolment plus 5 years, as required by standard academic record-keeping practices in Nigeria.

You may request deletion of your account at any time via Settings → Account → Delete Account. Note that grades and attendance records may be retained by your institution independent of your Acadia account.`,
  },
  {
    id: "rights",
    title: "6. Your Rights",
    body: `Under the NDPR, you have the right to:
• Access the personal data we hold about you
• Correct inaccurate or incomplete data
• Request erasure of your data (subject to institutional requirements)
• Object to certain types of processing
• Lodge a complaint with NITDA if you believe your rights have been violated

To exercise any of these rights, contact us at privacy@acadiaplatforms.com.`,
  },
  {
    id: "security",
    title: "7. Security",
    body: `We implement technical and organisational measures to protect your personal data, including AES-256 encryption at rest, TLS 1.3 in transit, role-based access controls, and audit logging of all sensitive actions.

In the event of a data breach, we will notify affected users and NITDA within 72 hours of becoming aware of it.`,
  },
  {
    id: "contact",
    title: "8. Contact",
    body: `If you have any questions about this Privacy Policy, contact us at:
Email: privacy@acadiaplatforms.com
Address: Victoria Island, Lagos, Nigeria`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority style={{ height: "auto" }} /></Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="font-semibold text-slate-700 hover:text-indigo-600 hidden sm:inline-flex" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button size="sm" className="font-semibold rounded-full px-5 bg-indigo-600 hover:bg-indigo-700 text-white" asChild>
            <Link href="/signup">Sign Up Free</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-12 pb-8 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Legal</div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
            <p className="text-slate-500">Last updated: 1 June 2026 · Effective: 1 June 2026</p>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-2xl">
              This Privacy Policy describes how Acadia Platforms (&ldquo;Acadia&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects your personal information when you use our academic management platform.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-12 items-start">

            {/* Sidebar TOC */}
            <nav className="hidden lg:block sticky top-20 bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contents</p>
              <ul className="space-y-2">
                {sections.map(s => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-sm text-slate-600 hover:text-indigo-600 transition-colors block py-0.5 leading-snug">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Content */}
            <div className="space-y-10">
              {sections.map(s => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h2>
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{s.body}</div>
                </section>
              ))}

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  <Link href="/contact">Contact Privacy Team</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full font-semibold">
                  <Link href="/terms">Terms of Service →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
