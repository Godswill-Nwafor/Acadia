"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Clock, CheckCircle, AlertCircle, Upload, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const assignments = [
  {
    id: 1, title: "Data Structures Assignment 1", course: "CSC301", courseColor: "blue",
    due: "Jun 18, 2026", dueIn: "2 days", status: "pending",
    description: "Implement a binary search tree with insertion, deletion, and traversal operations.",
  },
  {
    id: 2, title: "Database Systems Quiz", course: "CSC303", courseColor: "purple",
    due: "Jun 19, 2026", dueIn: "3 days", status: "pending",
    description: "Quiz covering SQL joins, normalization forms, and ACID properties.",
  },
  {
    id: 3, title: "Operating Systems Test", course: "CSC305", courseColor: "indigo",
    due: "Jun 22, 2026", dueIn: "6 days", status: "upcoming",
    description: "Test on process management, scheduling algorithms, and deadlock.",
  },
  {
    id: 4, title: "Discrete Mathematics Assignment", course: "MTH301", courseColor: "emerald",
    due: "Jun 16, 2026", dueIn: "Today", status: "overdue",
    description: "Solve problems on graph theory, combinatorics, and Boolean algebra.",
  },
  {
    id: 5, title: "English Essay", course: "GST301", courseColor: "amber",
    due: "Jun 14, 2026", dueIn: "2 days ago", status: "submitted",
    description: "A 1500-word essay on the role of language in academic writing.",
  },
  {
    id: 6, title: "Computer Networks Lab Report", course: "CSC307", courseColor: "rose",
    due: "Jun 20, 2026", dueIn: "4 days", status: "upcoming",
    description: "Lab report on TCP/IP implementation and network configuration.",
  },
];

const statusConfig = {
  pending:   { label: "Pending",   color: "bg-amber-100 text-amber-700",   Icon: Clock },
  upcoming:  { label: "Upcoming",  color: "bg-blue-100 text-blue-700",     Icon: Clock },
  submitted: { label: "Submitted", color: "bg-emerald-100 text-emerald-700", Icon: CheckCircle },
  overdue:   { label: "Overdue",   color: "bg-red-100 text-red-700",       Icon: AlertCircle },
};

const courseColors: Record<string, string> = {
  blue:    "bg-blue-100 text-blue-700",
  purple:  "bg-purple-100 text-purple-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber:   "bg-amber-100 text-amber-700",
  indigo:  "bg-indigo-100 text-indigo-700",
  rose:    "bg-rose-100 text-rose-700",
};

const statCards = [
  { label: "Total",     key: "all",       color: "text-foreground", bg: "" },
  { label: "Pending",   key: "pending",   color: "text-amber-600",  bg: "bg-amber-50 border-amber-100" },
  { label: "Submitted", key: "submitted", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  { label: "Overdue",   key: "overdue",   color: "text-red-600",    bg: "bg-red-50 border-red-100" },
];

export default function AssignmentsPage() {
  const [tab, setTab] = useState("all");

  const counts = {
    all:       assignments.length,
    pending:   assignments.filter(a => a.status === "pending").length,
    submitted: assignments.filter(a => a.status === "submitted").length,
    overdue:   assignments.filter(a => a.status === "overdue").length,
  };

  const filtered = tab === "all" ? assignments : assignments.filter(a => a.status === tab);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Track and submit your coursework</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assignments..."
              className="w-52 h-10 pl-9 pr-4 rounded-lg bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2 h-10"><Filter className="w-4 h-4" /> Filter</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map(s => (
          <Card key={s.key} className={cn("border-border/60 shadow-sm", s.bg)}>
            <CardContent className="p-4">
              <div className={cn("text-3xl font-extrabold", s.color)}>
                {counts[s.key as keyof typeof counts]}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit border border-border/40">
        {["all", "pending", "upcoming", "submitted", "overdue"].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all",
              tab === t ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(a => {
          const s = statusConfig[a.status as keyof typeof statusConfig];
          const StatusIcon = s.Icon;
          return (
            <Card key={a.id} className="border-border/60 shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{a.title}</h3>
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", courseColors[a.courseColor])}>
                        {a.course}
                      </span>
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1", s.color)}>
                        <StatusIcon className="w-3 h-3" />{s.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{a.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Due: {a.due}
                      </span>
                      <span className={a.status === "overdue" ? "text-red-500 font-semibold" : ""}>
                        {a.dueIn}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    {a.status === "submitted" ? (
                      <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Submitted
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="gap-1.5 bg-primary hover:bg-primary/90"
                        disabled={a.status === "overdue"}
                      >
                        <Upload className="w-3.5 h-3.5" /> Submit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
