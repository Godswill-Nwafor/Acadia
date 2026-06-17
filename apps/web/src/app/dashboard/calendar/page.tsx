"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const events = [
  { date: 16, title: "Data Structures Assignment Due", color: "bg-blue-100 text-blue-700",    type: "Assignment" },
  { date: 16, title: "Data Structures – 8AM",          color: "bg-blue-500 text-white",        type: "Class" },
  { date: 17, title: "Database Systems – 10AM",         color: "bg-purple-500 text-white",      type: "Class" },
  { date: 18, title: "Discrete Math – 10AM",            color: "bg-emerald-500 text-white",     type: "Class" },
  { date: 18, title: "Database Systems Quiz",           color: "bg-purple-100 text-purple-700", type: "Quiz" },
  { date: 19, title: "Computer Networks – 8AM",         color: "bg-rose-500 text-white",        type: "Class" },
  { date: 20, title: "Operating Systems Test",          color: "bg-indigo-100 text-indigo-700", type: "Test" },
  { date: 20, title: "Operating Systems – 2PM",         color: "bg-indigo-500 text-white",      type: "Class" },
  { date: 21, title: "Student Union Meeting",           color: "bg-amber-100 text-amber-700",   type: "Event" },
  { date: 22, title: "Discrete Math Assignment Due",    color: "bg-emerald-100 text-emerald-700", type: "Assignment" },
  { date: 27, title: "Guest Lecture on AI",             color: "bg-fuchsia-100 text-fuchsia-700", type: "Event" },
];

export default function CalendarPage() {
  const [month, setMonth] = useState(5); // June
  const [year] = useState(2026);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const upcoming = [...events]
    .filter(e => e.date >= 16)
    .sort((a, b) => a.date - b.date)
    .slice(0, 7);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Academic schedule and events overview</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-white w-fit">
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <Card className="xl:col-span-2 border-border/60 shadow-sm">
          <div className="p-5 border-b border-border/60 flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg">{MONTHS[month]} {year}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setMonth(m => Math.max(0, m - 1))}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setMonth(m => Math.min(11, m + 1))}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                const dayEvents = day ? events.filter(e => e.date === day) : [];
                const isToday = day === 16;
                return (
                  <div
                    key={i}
                    className={cn(
                      "min-h-[68px] p-1 rounded-lg transition-colors",
                      day ? "hover:bg-muted/40 cursor-pointer" : "",
                      isToday && "bg-primary/5 ring-1 ring-primary/25"
                    )}
                  >
                    {day && (
                      <>
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1",
                          isToday ? "bg-primary text-white" : "text-foreground"
                        )}>
                          {day}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map((ev, ei) => (
                            <div key={ei} className={cn("text-[9px] font-semibold px-1 py-0.5 rounded truncate", ev.color)}>
                              {ev.title.split(" ").slice(0, 3).join(" ")}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[9px] text-muted-foreground pl-1">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming events */}
        <Card className="border-border/60 shadow-sm">
          <div className="p-5 border-b border-border/60">
            <h2 className="font-bold text-foreground">Upcoming Events</h2>
          </div>
          <div className="divide-y divide-border/40">
            {upcoming.map((ev, i) => (
              <div key={i} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className={cn("text-xs font-bold px-2 py-0.5 rounded-full w-fit mb-1.5", ev.color)}>
                  {ev.type}
                </div>
                <h4 className="font-semibold text-foreground text-sm leading-tight">{ev.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">June {ev.date}, 2026</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
