import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: `By accessing or using Acadia ("the Platform"), you agree to be bound by these Terms of Service. If you are using Acadia on behalf of an institution, you represent that you have authority to bind that institution to these terms.

If you do not agree with any part of these terms, you may not use the Platform.`,
  },
  {
    id: "accounts",
    title: "2. Accounts & Eligibility",
    body: `You must be at least 16 years old to use Acadia. Accounts are created for individual users — you may not share your login credentials with anyone.

You are responsible for maintaining the confidentiality of your password and for all activity that occurs under your account. If you suspect unauthorised access, contact us immediately at security@acadiaplatforms.com.

Institutional administrators may create, manage, and deactivate accounts for members of their institution. Students and lecturers must use their verified institutional email address.`,
  },
  {
    id: "acceptable-use",
    title: "3. Acceptable Use",
    body: `You agree not to:
• Misrepresent your identity, role, or institutional affiliation
• Submit content that is false, misleading, or academically dishonest
• Attempt to access other users' accounts or data without authorisation
• Use the platform to harass, threaten, or discriminate against any user
• Upload malicious code, viruses, or harmful content
• Scrape, copy, or redistribute platform content without permission
• Circumvent any access controls, security features, or rate limits
• Use Acadia in any manner that violates Nigerian law or applicable international law`,
  },
  {
    id: "content",
    title: "4. User Content",
    body: `You retain ownership of any content you upload to Acadia (assignments, submissions, course materials, etc.). By uploading content, you grant Acadia a non-exclusive licence to store, process, and display that content solely for the purpose of operating the Platform on behalf of your institution.

Acadia does not claim ownership of student work or academic materials. Content will not be used for any commercial purpose outside of Platform operation.`,
  },
  {
    id: "institution-terms",
    title: "5. Institution Responsibilities",
    body: `Institutions that deploy Acadia are responsible for:
• Obtaining appropriate consents from students for data processing under the NDPR
• Ensuring users are aware of and comply with these Terms
• Maintaining the accuracy of student and faculty enrolment data
• Appointing an internal point of contact for data protection matters
• Notifying Acadia promptly if their institutional data is compromised`,
  },
  {
    id: "termination",
    title: "6. Termination",
    body: `Acadia reserves the right to suspend or terminate access to the Platform at any time, with or without notice, for conduct that violates these Terms or is otherwise harmful to Acadia, other users, or third parties.

You may delete your account at any time via Settings. Deletion will remove your personal profile but your academic records (grades, submissions) will remain accessible to your institution as required by academic record-keeping obligations.`,
  },
  {
    id: "disclaimer",
    title: "7. Disclaimers & Limitation of Liability",
    body: `The Platform is provided "as is" and "as available". Acadia makes no warranties, express or implied, regarding the availability, accuracy, or reliability of the Platform.

To the maximum extent permitted by Nigerian law, Acadia shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of the Platform, including loss of data or service interruption.

Our total liability in any claim arising from use of the Platform shall not exceed the amount paid by your institution in the 12 months prior to the claim.`,
  },
  {
    id: "governing-law",
    title: "8. Governing Law",
    body: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute arising from these Terms shall be resolved by the courts of Lagos State, Nigeria.`,
  },
  {
    id: "changes",
    title: "9. Changes to These Terms",
    body: `We may update these Terms from time to time. We will notify users of material changes via email or a prominent notice on the Platform at least 14 days before the changes take effect.

Continued use of the Platform after changes constitutes acceptance of the updated Terms.`,
  },
  {
    id: "contact",
    title: "10. Contact",
    body: `For questions about these Terms, contact us at:
Email: legal@acadiaplatforms.com
Address: Victoria Island, Lagos, Nigeria`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <header className="h-14 flex items-center justify-between px-6 md:px-10 border-b border-slate-200/60 bg-white/90 backdrop-blur-lg sticky top-0 z-50">
        <Link href="/"><Image src="/LOGO.png" alt="Acadia" width={130} height={34} priority /></Link>
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
          <div className="mb-12 pb-8 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Legal</div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Terms of Service</h1>
            <p className="text-slate-500">Last updated: 1 June 2026 · Effective: 1 June 2026</p>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-2xl">
              These Terms of Service govern your use of the Acadia academic management platform operated by Acadia Platforms.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-12 items-start">
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

            <div className="space-y-10">
              {sections.map(s => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h2>
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{s.body}</div>
                </section>
              ))}
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-full font-semibold">
                  <Link href="/cookies">Cookie Policy →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
