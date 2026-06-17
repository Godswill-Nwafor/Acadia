"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Building2, Users, TrendingUp, CreditCard, Search, Filter,
  CheckCircle, AlertCircle, XCircle, ChevronDown, MoreVertical,
  BarChart3, Settings, LogOut, Shield, Bell, ArrowUpRight,
} from "lucide-react";

// ---------- mock data ----------
const MOCK_INSTITUTIONS = [
  { id: "1", name: "Babcock University",          domain: "babcock.edu.ng",     plan: "PRO",        billing: "YEARLY",  students: 412, lecturers: 38, status: "active",   nextRenewal: "2027-01-15", mrr: 16000, joinedAt: "Jan 2026" },
  { id: "2", name: "Covenant University",         domain: "covenantuniversity.edu.ng", plan: "ENTERPRISE", billing: "YEARLY",  students: 1840, lecturers: 142, status: "active",  nextRenewal: "2026-09-01", mrr: null,  joinedAt: "Sep 2025" },
  { id: "3", name: "University of Lagos",         domain: "unilag.edu.ng",      plan: "PRO",        billing: "MONTHLY", students: 498, lecturers: 47, status: "active",   nextRenewal: "2026-07-18", mrr: 20000, joinedAt: "Mar 2026" },
  { id: "4", name: "Mountain Top University",     domain: "mtu.edu.ng",         plan: "FREE",       billing: "—",       students: 43,  lecturers: 4,  status: "active",   nextRenewal: "—",          mrr: 0,     joinedAt: "May 2026" },
  { id: "5", name: "Redeemer's University",       domain: "run.edu.ng",         plan: "PRO",        billing: "MONTHLY", students: 287, lecturers: 29, status: "active",   nextRenewal: "2026-07-22", mrr: 20000, joinedAt: "Apr 2026" },
  { id: "6", name: "Landmark University",         domain: "lmu.edu.ng",         plan: "PRO",        billing: "YEARLY",  students: 310, lecturers: 31, status: "past_due",  nextRenewal: "2026-06-10", mrr: 16000, joinedAt: "Jun 2025" },
  { id: "7", name: "Pan-Atlantic University",     domain: "pau.edu.ng",         plan: "FREE",       billing: "—",       students: 28,  lecturers: 3,  status: "trial",    nextRenewal: "2026-06-30", mrr: 0,     joinedAt: "Jun 2026" },
  { id: "8", name: "Afe Babalola University",     domain: "abuad.edu.ng",       plan: "PRO",        billing: "MONTHLY", students: 502, lecturers: 44, status: "cancelled", nextRenewal: "—",         mrr: 0,     joinedAt: "Nov 2025" },
];

type Plan = "ALL" | "FREE" | "PRO" | "ENTERPRISE";
type Status = "ALL" | "active" | "past_due" | "trial" | "cancelled";

const planBadge: Record<string, string> = {
  FREE:       "bg-slate-100 text-slate-600",
  PRO:        "bg-indigo-50 text-indigo-700",
  ENTERPRISE: "bg-violet-50 text-violet-700",
};

const statusBadge: Record<string, { cls: string; icon: typeof CheckCircle }> = {
  active:    { cls: "bg-emerald-50 text-emerald-700", icon: CheckCircle },
  trial:     { cls: "bg-amber-50 text-amber-700",    icon: AlertCircle },
  past_due:  { cls: "bg-red-50 text-red-600",        icon: AlertCircle },
  cancelled: { cls: "bg-slate-100 text-slate-500",   icon: XCircle },
};

const navItems = [
  { icon: BarChart3, label: "Dashboard",     active: true  },
  { icon: Building2, label: "Institutions",  active: false },
  { icon: CreditCard, label: "Revenue",      active: false },
  { icon: Users,     label: "All Users",     active: false },
  { icon: Bell,      label: "Alerts",        active: false },
  { icon: Settings,  label: "Settings",      active: false },
];

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub?: string; icon: typeof Building2; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      </div>
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </motion.div>
  );
}

export default function SuperAdminPage() {
  const [planFilter, setPlanFilter] = useState<Plan>("ALL");
  const [statusFilter, setStatusFilter] = useState<Status>("ALL");
  const [search, setSearch] = useState("");
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [institutions, setInstitutions] = useState(MOCK_INSTITUTIONS);

  const filtered = institutions.filter(inst => {
    const matchPlan   = planFilter === "ALL" || inst.plan === planFilter;
    const matchStatus = statusFilter === "ALL" || inst.status === statusFilter;
    const matchSearch = inst.name.toLowerCase().includes(search.toLowerCase()) ||
                        inst.domain.toLowerCase().includes(search.toLowerCase());
    return matchPlan && matchStatus && matchSearch;
  });

  const totalStudents = institutions.reduce((a, b) => a + b.students, 0);
  const mrr = institutions.filter(i => i.status === "active").reduce((a, b) => a + (b.mrr ?? 180000), 0);
  const proCount = institutions.filter(i => i.plan === "PRO" && i.status === "active").length;
  const enterpriseCount = institutions.filter(i => i.plan === "ENTERPRISE").length;

  const handleChangePlan = (id: string, newPlan: string) => {
    setInstitutions(prev => prev.map(i => i.id === id ? { ...i, plan: newPlan, mrr: newPlan === "PRO" ? 20000 : newPlan === "FREE" ? 0 : null as unknown as number } : i));
    setActionMenu(null);
  };

  return (
    <div className="min-h-screen flex bg-slate-950 font-sans text-slate-100">

      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/5 flex flex-col bg-slate-900 sticky top-0 h-screen">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Acadia Platform</p>
              <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">Super Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-0.5">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-bold text-white">SA</div>
            <div>
              <p className="text-xs font-semibold text-white">Super Admin</p>
              <p className="text-[10px] text-slate-500">admin@acadia.ng</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-white hover:bg-white/5 text-xs gap-2">
              <LogOut className="w-3.5 h-3.5" /> Exit admin
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-10 h-14 flex items-center justify-between px-8 bg-slate-950/90 backdrop-blur border-b border-white/5">
          <div>
            <p className="font-bold text-white">Overview</p>
            <p className="text-xs text-slate-500">Platform-wide institution management</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full font-semibold">● Live</span>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-4 font-semibold text-xs">
              + Add institution
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard label="Total institutions" value={String(institutions.length)} sub="4 added this month" icon={Building2} color="bg-indigo-500/10 text-indigo-400" />
            <StatCard label="Total students" value={totalStudents.toLocaleString()} sub="Across all plans" icon={Users} color="bg-emerald-500/10 text-emerald-400" />
            <StatCard label="Monthly revenue" value={`₦${(mrr / 1000).toFixed(0)}k`} sub={`${proCount} Pro · ${enterpriseCount} Enterprise active`} icon={TrendingUp} color="bg-amber-500/10 text-amber-400" />
            <StatCard label="Active subscriptions" value={`${proCount + enterpriseCount}`} sub={`${proCount} Pro · ${enterpriseCount} Enterprise`} icon={CreditCard} color="bg-violet-500/10 text-violet-400" />
          </div>

          {/* Plan distribution */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { plan: "Free",       count: institutions.filter(i => i.plan === "FREE").length,       color: "bg-slate-500/10 border-slate-700 text-slate-400" },
              { plan: "Pro",        count: institutions.filter(i => i.plan === "PRO").length,        color: "bg-indigo-500/10 border-indigo-800 text-indigo-400" },
              { plan: "Enterprise", count: institutions.filter(i => i.plan === "ENTERPRISE").length, color: "bg-violet-500/10 border-violet-800 text-violet-400" },
            ].map(({ plan, count, color }) => (
              <div key={plan} className={`rounded-2xl border p-5 ${color}`}>
                <p className="text-2xl font-extrabold mb-0.5">{count}</p>
                <p className="text-sm font-semibold opacity-70">{plan} institutions</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-current opacity-40" style={{ width: `${(count / institutions.length) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Institutions table */}
          <div className="bg-slate-900 rounded-2xl border border-white/5 overflow-hidden">
            {/* Table header / filters */}
            <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <h2 className="font-bold text-white flex-1">Institutions</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search institutions..."
                    className="pl-8 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-52"
                  />
                </div>
                {/* Plan filter */}
                <div className="relative">
                  <Filter className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select
                    value={planFilter} onChange={e => setPlanFilter(e.target.value as Plan)}
                    className="pl-7 pr-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
                  >
                    <option value="ALL">All plans</option>
                    <option value="FREE">Free</option>
                    <option value="PRO">Pro</option>
                    <option value="ENTERPRISE">Enterprise</option>
                  </select>
                  <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                {/* Status filter */}
                <div className="relative">
                  <select
                    value={statusFilter} onChange={e => setStatusFilter(e.target.value as Status)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer pr-6"
                  >
                    <option value="ALL">All statuses</option>
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="past_due">Past due</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 border-b border-white/5 uppercase tracking-wider">
                    <th className="text-left px-5 py-3 font-semibold">Institution</th>
                    <th className="text-left px-4 py-3 font-semibold">Plan</th>
                    <th className="text-left px-4 py-3 font-semibold">Billing</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-right px-4 py-3 font-semibold">Students</th>
                    <th className="text-left px-4 py-3 font-semibold">Next renewal</th>
                    <th className="text-right px-4 py-3 font-semibold">MRR</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inst) => {
                    const sb = statusBadge[inst.status];
                    const StatusIcon = sb.icon;
                    return (
                      <tr key={inst.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-white">{inst.name}</p>
                          <p className="text-xs text-slate-500">{inst.domain}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${planBadge[inst.plan]}`}>{inst.plan}</span>
                        </td>
                        <td className="px-4 py-4 text-slate-400 text-xs font-medium">{inst.billing}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${sb.cls}`}>
                            <StatusIcon className="w-3 h-3" />
                            {inst.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-white font-semibold">{inst.students.toLocaleString()}</td>
                        <td className="px-4 py-4 text-slate-400 text-xs">{inst.nextRenewal}</td>
                        <td className="px-4 py-4 text-right font-semibold">
                          {inst.mrr === null
                            ? <span className="text-violet-400">Custom</span>
                            : inst.mrr === 0
                              ? <span className="text-slate-500">—</span>
                              : <span className="text-emerald-400">₦{inst.mrr.toLocaleString()}</span>
                          }
                        </td>
                        <td className="px-4 py-4 relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === inst.id ? null : inst.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {actionMenu === inst.id && (
                            <div className="absolute right-8 top-8 z-20 bg-slate-800 border border-white/10 rounded-xl shadow-xl shadow-black/40 p-1.5 w-44">
                              <p className="text-[10px] text-slate-500 uppercase tracking-widest px-2 py-1 font-bold">Change plan</p>
                              {["FREE", "PRO", "ENTERPRISE"].filter(p => p !== inst.plan).map(p => (
                                <button key={p} onClick={() => handleChangePlan(inst.id, p)}
                                  className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
                                  → {p}
                                </button>
                              ))}
                              <div className="border-t border-white/5 mt-1 pt-1">
                                <button className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                                  <ArrowUpRight className="w-3 h-3" /> View details
                                </button>
                                <button className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-red-900/30 text-red-400 hover:text-red-300 transition-colors">
                                  Suspend access
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-5 py-12 text-center text-slate-500 text-sm">
                        No institutions match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filtered.length} of {institutions.length} institutions</span>
              <span>Last synced: just now</span>
            </div>
          </div>

          {/* Alert: past due */}
          {institutions.some(i => i.status === "past_due") && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-5 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-300 mb-1">Payment overdue</p>
                <p className="text-sm text-red-400/80">
                  {institutions.filter(i => i.status === "past_due").map(i => i.name).join(", ")} {institutions.filter(i => i.status === "past_due").length === 1 ? "has" : "have"} a past-due payment. Access will be restricted in 7 days if not resolved.
                </p>
                <button className="mt-2 text-xs text-red-300 underline hover:text-red-200">Send payment reminder →</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
