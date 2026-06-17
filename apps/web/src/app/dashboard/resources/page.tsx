"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileText, Video, Download, Filter, BookOpen, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const resources = [
  { id: 1, course: "CSC301", courseName: "Data Structures",    title: "Week 1 – Introduction to Data Structures", type: "PDF",   size: "2.3 MB",  date: "Jun 1, 2026",  color: "blue" },
  { id: 2, course: "CSC301", courseName: "Data Structures",    title: "Binary Trees Lecture Slides",              type: "PPTX",  size: "5.1 MB",  date: "Jun 5, 2026",  color: "blue" },
  { id: 3, course: "CSC303", courseName: "Database Systems",   title: "SQL Fundamentals – Video Lecture",         type: "VIDEO", size: "450 MB",  date: "Jun 3, 2026",  color: "purple" },
  { id: 4, course: "CSC303", courseName: "Database Systems",   title: "Normalization Notes",                      type: "DOCX",  size: "1.2 MB",  date: "Jun 6, 2026",  color: "purple" },
  { id: 5, course: "MTH301", courseName: "Discrete Mathematics", title: "Graph Theory Handout",                   type: "PDF",   size: "3.8 MB",  date: "Jun 2, 2026",  color: "emerald" },
  { id: 6, course: "CSC305", courseName: "Operating Systems",  title: "Process Management Slides",               type: "PPTX",  size: "7.2 MB",  date: "Jun 7, 2026",  color: "indigo" },
  { id: 7, course: "CSC305", courseName: "Operating Systems",  title: "CPU Scheduling Demo",                     type: "VIDEO", size: "280 MB",  date: "Jun 8, 2026",  color: "indigo" },
  { id: 8, course: "GST301", courseName: "Use of English",     title: "Academic Writing Guide",                  type: "PDF",   size: "1.8 MB",  date: "Jun 1, 2026",  color: "amber" },
];

const typeConfig: Record<string, { Icon: React.ElementType; color: string; label: string }> = {
  PDF:   { Icon: FileText, color: "bg-red-100 text-red-600",    label: "PDF" },
  DOCX:  { Icon: FileText, color: "bg-blue-100 text-blue-600",  label: "DOCX" },
  PPTX:  { Icon: FileText, color: "bg-orange-100 text-orange-600", label: "PPTX" },
  VIDEO: { Icon: Video,    color: "bg-purple-100 text-purple-600", label: "VIDEO" },
};

const leftBorder: Record<string, string> = {
  blue:    "border-l-blue-500",
  purple:  "border-l-purple-500",
  emerald: "border-l-emerald-500",
  amber:   "border-l-amber-500",
  indigo:  "border-l-indigo-500",
  rose:    "border-l-rose-500",
};

export default function ResourcesPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = resources.filter(r => {
    const matchType   = filter === "all" || r.type === filter;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const grouped = filtered.reduce<Record<string, { name: string; color: string; items: typeof resources }>>((acc, r) => {
    if (!acc[r.course]) acc[r.course] = { name: r.courseName, color: r.color, items: [] };
    acc[r.course].items.push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resources</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Course materials, notes, and lecture recordings</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Search resources..."
              className="w-52 h-10 pl-9 pr-4 rounded-lg bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="outline" className="gap-2 h-10"><Filter className="w-4 h-4" /> Filter</Button>
        </div>
      </div>

      {/* Type filter pills */}
      <div className="flex gap-2 flex-wrap">
        {["all", "PDF", "PPTX", "DOCX", "VIDEO"].map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
              filter === t
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            )}
          >
            {t === "all" ? "All Files" : t}
          </button>
        ))}
      </div>

      {/* Grouped by course */}
      {Object.entries(grouped).map(([courseId, group]) => (
        <div key={courseId} className="space-y-2">
          <div className="flex items-center gap-2 pb-1">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground text-sm">{courseId} – {group.name}</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/50">
              {group.items.length} files
            </span>
          </div>

          {group.items.map(r => {
            const t = typeConfig[r.type];
            const TypeIcon = t.Icon;
            return (
              <Card key={r.id} className={cn("border-border/60 shadow-sm hover:shadow-md transition-all duration-200 border-l-4", leftBorder[group.color])}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", t.color)}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-sm truncate">{r.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className={cn("font-bold px-2 py-0.5 rounded", t.color)}>{r.type}</span>
                        <span>{r.size}</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ))}

      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No resources found</p>
        </div>
      )}
    </div>
  );
}
