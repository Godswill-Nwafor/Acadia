"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Filter, ChevronRight, Clock, Users } from "lucide-react";

const courses = [
  { id: "CSC301", title: "Data Structures", lecturer: "Dr. John O.", level: "300 Level", units: 3, progress: 75, enrolled: 128, schedule: "Mon/Wed 8AM", color: "blue" },
  { id: "CSC303", title: "Database Systems", lecturer: "Dr. Sarah M.", level: "300 Level", units: 3, progress: 60, enrolled: 115, schedule: "Tue/Thu 10AM", color: "purple" },
  { id: "MTH301", title: "Discrete Mathematics", lecturer: "Dr. K. Ibrahim", level: "300 Level", units: 2, progress: 80, enrolled: 200, schedule: "Mon/Fri 10AM", color: "emerald" },
  { id: "GST301", title: "Use of English", lecturer: "Dr. B. Okon", level: "300 Level", units: 2, progress: 90, enrolled: 320, schedule: "Tue 1PM", color: "amber" },
  { id: "CSC305", title: "Operating Systems", lecturer: "Prof. A. Adewale", level: "300 Level", units: 3, progress: 65, enrolled: 110, schedule: "Wed/Fri 2PM", color: "indigo" },
  { id: "CSC307", title: "Computer Networks", lecturer: "Dr. E. Balogun", level: "300 Level", units: 3, progress: 45, enrolled: 98, schedule: "Thu 8AM", color: "rose" },
];

const colorMap: Record<string, { bg: string; text: string; bar: string; badge: string }> = {
  blue:    { bg: "bg-blue-100",    text: "text-blue-700",    bar: "bg-blue-500",    badge: "bg-blue-600" },
  purple:  { bg: "bg-purple-100",  text: "text-purple-700",  bar: "bg-purple-500",  badge: "bg-purple-600" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-700", bar: "bg-emerald-500", badge: "bg-emerald-600" },
  amber:   { bg: "bg-amber-100",   text: "text-amber-700",   bar: "bg-amber-500",   badge: "bg-amber-600" },
  indigo:  { bg: "bg-indigo-100",  text: "text-indigo-700",  bar: "bg-indigo-500",  badge: "bg-indigo-600" },
  rose:    { bg: "bg-rose-100",    text: "text-rose-700",    bar: "bg-rose-500",    badge: "bg-rose-600" },
};

export default function CoursesPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = courses.filter(c => {
    const matchTab = tab === "all" || (tab === "ongoing" ? c.progress < 100 : c.progress === 100);
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground text-sm mt-0.5">You&apos;re enrolled in {courses.length} courses this semester</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/5 border border-primary/20 rounded-full px-3 py-1.5">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="font-semibold text-primary">{courses.reduce((s, c) => s + c.units, 0)} Total Units</span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search courses..."
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <Button variant="outline" className="gap-2 h-10 border-border">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit border border-border/40">
        {[
          { key: "all", label: "All Courses" },
          { key: "ongoing", label: "Ongoing" },
          { key: "completed", label: "Completed" },
        ].map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              tab === t.key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(course => {
          const c = colorMap[course.color];
          return (
            <Card key={course.id} className="border-border/60 shadow-sm hover:shadow-lg transition-all duration-250 hover:-translate-y-0.5 group cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${c.bg} ${c.text}`}>
                    {course.id.substring(0, 3)}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${c.badge}`}>
                    {course.units} Units
                  </span>
                </div>

                <h3 className="font-bold text-foreground mb-0.5">{course.id} – {course.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{course.lecturer}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1.5"><Users className="w-3 h-3" />{course.enrolled} students</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{course.schedule}</span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={c.text}>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.bar} transition-all duration-700`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full text-sm h-9 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200"
                >
                  View Course <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No courses found</p>
        </div>
      )}
    </div>
  );
}
