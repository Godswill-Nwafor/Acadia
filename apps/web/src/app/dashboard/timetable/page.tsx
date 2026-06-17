"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

type ScheduleEntry = {
  day: number; startTime: string; endTime: string;
  course: string; title: string; room: string; color: string; lecturer: string;
};

const schedule: ScheduleEntry[] = [
  { day: 0, startTime: "8:00",  endTime: "10:00", course: "CSC301", title: "Data Structures",    room: "LT1", color: "blue",    lecturer: "Dr. John O." },
  { day: 2, startTime: "8:00",  endTime: "10:00", course: "CSC301", title: "Data Structures",    room: "LT1", color: "blue",    lecturer: "Dr. John O." },
  { day: 1, startTime: "10:00", endTime: "12:00", course: "CSC303", title: "Database Systems",   room: "LT2", color: "purple",  lecturer: "Dr. Sarah M." },
  { day: 3, startTime: "10:00", endTime: "12:00", course: "CSC303", title: "Database Systems",   room: "LT2", color: "purple",  lecturer: "Dr. Sarah M." },
  { day: 0, startTime: "10:00", endTime: "12:00", course: "MTH301", title: "Discrete Maths",     room: "LT3", color: "emerald", lecturer: "Dr. K. Ibrahim" },
  { day: 4, startTime: "10:00", endTime: "12:00", course: "MTH301", title: "Discrete Maths",     room: "LT3", color: "emerald", lecturer: "Dr. K. Ibrahim" },
  { day: 1, startTime: "13:00", endTime: "14:00", course: "GST301", title: "Use of English",     room: "LT4", color: "amber",   lecturer: "Dr. B. Okon" },
  { day: 2, startTime: "14:00", endTime: "16:00", course: "CSC305", title: "Operating Systems",  room: "LT5", color: "indigo",  lecturer: "Prof. A. Adewale" },
  { day: 4, startTime: "14:00", endTime: "16:00", course: "CSC305", title: "Operating Systems",  room: "LT5", color: "indigo",  lecturer: "Prof. A. Adewale" },
  { day: 3, startTime: "8:00",  endTime: "10:00", course: "CSC307", title: "Computer Networks",  room: "LT6", color: "rose",    lecturer: "Dr. E. Balogun" },
];

const colorMap: Record<string, { bg: string; text: string; border: string; leftBorder: string }> = {
  blue:    { bg: "bg-blue-100",    text: "text-blue-800",    border: "border-blue-200",    leftBorder: "border-l-blue-500" },
  purple:  { bg: "bg-purple-100",  text: "text-purple-800",  border: "border-purple-200",  leftBorder: "border-l-purple-500" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200", leftBorder: "border-l-emerald-500" },
  amber:   { bg: "bg-amber-100",   text: "text-amber-800",   border: "border-amber-200",   leftBorder: "border-l-amber-500" },
  indigo:  { bg: "bg-indigo-100",  text: "text-indigo-800",  border: "border-indigo-200",  leftBorder: "border-l-indigo-500" },
  rose:    { bg: "bg-rose-100",    text: "text-rose-800",    border: "border-rose-200",    leftBorder: "border-l-rose-500" },
};

export default function TimetablePage() {
  const [view, setView] = useState<"week" | "day">("week");

  const getEntry = (dayIndex: number, time: string) =>
    schedule.find(s => s.day === dayIndex && s.startTime === time);

  const isOccupied = (dayIndex: number, time: string) =>
    schedule.some(s => {
      const start = parseInt(s.startTime);
      const end   = parseInt(s.endTime);
      const t     = parseInt(time);
      return s.day === dayIndex && t > start && t < end;
    });

  const todayClasses = schedule.filter(s => s.day === 0);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Timetable</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Your weekly class schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg border border-border/40">
            {(["week", "day"] as const).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all",
                  view === v ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9"><ChevronLeft className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="h-9 w-9"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <p className="text-sm font-medium text-muted-foreground -mt-2">Week of June 16 – 20, 2026</p>

      {/* Weekly Grid */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b border-border/60">
                  <th className="p-3 text-xs font-semibold text-muted-foreground w-16 text-left">Time</th>
                  {days.map(day => (
                    <th key={day} className="p-3 text-xs font-semibold text-muted-foreground text-center">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map(time => (
                  <tr key={time} className="border-b border-border/30 last:border-0">
                    <td className="p-2 text-xs text-muted-foreground font-medium align-top pl-3 pt-3 w-16">{time}</td>
                    {days.map((_, dayIndex) => {
                      const entry = getEntry(dayIndex, time);
                      const occupied = isOccupied(dayIndex, time);
                      if (occupied) return <td key={dayIndex} />;
                      if (!entry) return <td key={dayIndex} className="p-1 h-14" />;
                      const durationHours = parseInt(entry.endTime) - parseInt(entry.startTime);
                      const c = colorMap[entry.color];
                      return (
                        <td key={dayIndex} className="p-1 align-top" rowSpan={durationHours}>
                          <div className={cn("rounded-lg p-2.5 h-full min-h-[52px] border cursor-pointer hover:opacity-90 transition-opacity", c.bg, c.text, c.border)}>
                            <div className="font-bold text-xs truncate">{entry.title}</div>
                            <div className="text-[10px] opacity-70 mt-0.5">{entry.course}</div>
                            <div className="text-[10px] opacity-60 mt-0.5 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />{entry.startTime}–{entry.endTime}
                            </div>
                            <div className="text-[10px] opacity-60 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />{entry.room}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Today's classes */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">Today&apos;s Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {todayClasses.map((entry, i) => {
            const c = colorMap[entry.color];
            return (
              <Card key={i} className={cn("border-border/60 shadow-sm border-l-4", c.leftBorder)}>
                <CardContent className="p-4">
                  <div className={cn("inline-flex text-xs font-bold px-2 py-0.5 rounded-full mb-2", c.bg, c.text)}>
                    {entry.startTime} – {entry.endTime}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{entry.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.course} · {entry.room}</p>
                  <p className="text-xs text-muted-foreground">{entry.lecturer}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
