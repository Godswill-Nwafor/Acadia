import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const attendance = [
  { course: "CSC301", title: "Data Structures",    attended: 24, total: 26, percent: 92, color: "blue" },
  { course: "CSC303", title: "Database Systems",   attended: 20, total: 24, percent: 83, color: "purple" },
  { course: "MTH301", title: "Discrete Mathematics", attended: 22, total: 24, percent: 92, color: "emerald" },
  { course: "GST301", title: "Use of English",     attended: 18, total: 20, percent: 90, color: "amber" },
  { course: "CSC305", title: "Operating Systems",  attended: 19, total: 26, percent: 73, color: "indigo" },
  { course: "CSC307", title: "Computer Networks",  attended: 21, total: 24, percent: 88, color: "rose" },
];

const colorMap: Record<string, { bar: string; text: string; bg: string }> = {
  blue:    { bar: "bg-blue-500",    text: "text-blue-600",    bg: "bg-blue-100" },
  purple:  { bar: "bg-purple-500",  text: "text-purple-600",  bg: "bg-purple-100" },
  emerald: { bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-100" },
  amber:   { bar: "bg-amber-500",   text: "text-amber-600",   bg: "bg-amber-100" },
  indigo:  { bar: "bg-indigo-500",  text: "text-indigo-600",  bg: "bg-indigo-100" },
  rose:    { bar: "bg-rose-500",    text: "text-rose-600",    bg: "bg-rose-100" },
};

export default function AttendancePage() {
  const overall = Math.round(attendance.reduce((s, a) => s + a.percent, 0) / attendance.length);
  const totalAttended = attendance.reduce((s, a) => s + a.attended, 0);
  const totalClasses  = attendance.reduce((s, a) => s + a.total, 0);
  const atRiskCount   = attendance.filter(a => a.percent < 75).length;

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (overall / 100) * circumference;

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Your attendance record across all courses</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Donut */}
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative w-28 h-28 mb-4">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke="#2563eb" strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold text-foreground">{overall}%</span>
              </div>
            </div>
            <h3 className="font-bold text-foreground">Overall Attendance</h3>
            <p className="text-sm text-muted-foreground mt-1">Across all {attendance.length} courses</p>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {[
            { label: "Classes Attended", value: totalAttended, Icon: UserCheck,   color: "bg-emerald-100 text-emerald-600" },
            { label: "Classes Missed",   value: totalClasses - totalAttended, Icon: AlertCircle, color: "bg-red-100 text-red-600" },
            { label: "Total Classes",    value: totalClasses,  Icon: UserCheck,   color: "bg-blue-100 text-blue-600" },
            { label: "At-Risk Courses",  value: atRiskCount,   Icon: AlertCircle, color: "bg-amber-100 text-amber-600" },
          ].map(s => (
            <Card key={s.label} className="border-border/60 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", s.color)}>
                  <s.Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Per course breakdown */}
      <div>
        <h2 className="font-bold text-foreground text-lg mb-4">Per Course Breakdown</h2>
        <div className="space-y-3">
          {attendance.map(a => {
            const c = colorMap[a.color];
            const atRisk = a.percent < 75;
            return (
              <Card key={a.course} className="border-border/60 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0", c.bg, c.text)}>
                      {a.course.substring(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-semibold text-foreground text-sm">{a.course}</span>
                          <span className="text-muted-foreground text-sm ml-2">– {a.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {atRisk && (
                            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />At Risk
                            </span>
                          )}
                          <span className={cn("text-sm font-bold", atRisk ? "text-red-600" : c.text)}>
                            {a.percent}%
                          </span>
                          <span className="text-xs text-muted-foreground">({a.attended}/{a.total})</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-700", atRisk ? "bg-red-500" : c.bar)}
                          style={{ width: `${a.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
