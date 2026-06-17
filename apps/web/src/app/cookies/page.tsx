import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const cookieTypes = [
  {
    name: "Strictly Necessary",
    required: true,
    desc: "These cookies are essential for the platform to function. They include your authentication session token (JWT), CSRF protection tokens, and user preference settings. You cannot opt out of these.",
    examples: ["Session authentication token", "CSRF security token", "Language/locale preference"],
  },
  {
    name: "Functional",
    required: false,
    desc: "These cookies remember your choices and personalise your experience — such as your last-visited dashboard section or notification preferences.",
    examples: ["Last visited page", "Notification preferences", "Dashboard layout preference"],
  },
  {
    name: "Analytics",
    required: false,
    desc: "We use minimal, privacy-respecting analytics to understand how the platform is used so we can improve it. No personally identifiable information is shared with analytics providers.",
    examples: ["Page view counts", "Feature usage frequency", "Error rate tracking"],
  },
];

const sections = [
  {
    id: "what-are-cookies",
    title: "What are cookies?",
    body: `Cookies are small text files stored on your device when you visit a website or web application. They allow the application to remember information about your visit — such as your login status, preferences, and usage patterns.

Acadia uses cookies to keep you logged in and to remember your settings as you navigate the platform.`,
  },
  {
    id: "how-we-use",
    title: "How Acadia uses cookies",
    body: `Acadia uses cookies primarily for authentication and session management. When you log in, we store a JWT (JSON Web Token) in your browser's local storage to identify you on subsequent requests. We do not use third-party advertising cookies.

We do not use Google Analytics, Facebook Pixel, or any other third-party tracking scripts. The only external services that may set cookies are Google (for OAuth sign-in) and Cloudinary (for secure file delivery).`,
  },
  {
    id: "managing",
    title: "Managing cookies",
    body: `You can control and manage cookies through your browser settings:

• Chrome: Settings → Privacy and Security → Cookies and other site data
• Firefox: Settings → Privacy & Security → Cookies and Site Data
• Safari: Preferences → Privacy → Manage Website Data
• Edge: Settings → Cookies and site permissions

Note that disabling strictly necessary cookies will prevent you from logging in and using the Platform.`,
  },
  {
    id: "third-party",
    title: "Third-party cookies",
    body: `When you use Google Sign-In to authenticate, Google may set its own cookies as part of their OAuth flow. These are governed by Google's Privacy Policy, not ours.

Cloudinary may set cookies when delivering files (course resources, attachments) stored on their CDN. These are performance-only cookies with no personally identifiable data.`,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: `We may update this Cookie Policy as we introduce new features. Material changes will be communicated via email or a notice on the Platform.`,
  },
];

export default function CookiesPage() {
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
          <div className="mb-12 pb-8 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">Legal</div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3">Cookie Policy</h1>
            <p className="text-slate-500">Last updated: 1 June 2026</p>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-2xl">
              This Cookie Policy explains how Acadia Platforms uses cookies and similar technologies when you use our academic management platform.
            </p>
          </div>

          {/* Cookie types table */}
          <div className="mb-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Cookie categories we use</h2>
            <div className="space-y-4">
              {cookieTypes.map(ct => (
                <div key={ct.name} className="rounded-2xl border border-slate-100 bg-white p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-slate-900">{ct.name}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ct.required ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                      {ct.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{ct.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {ct.examples.map(ex => (
                      <span key={ex} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-full">{ex}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-10">
            {sections.map(s => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h2>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{s.body}</div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <Button asChild className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
              <Link href="/privacy">Privacy Policy</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full font-semibold">
              <Link href="/terms">Terms of Service</Link>
            </Button>
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
