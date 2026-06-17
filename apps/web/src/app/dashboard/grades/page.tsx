import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const grades = [
  { course: "CSC301", title: "Data Structures",    ca: 38, exam: 62, total: 75, grade: "B", points: 4.0 },
  { course: "CSC303", title: "Database Systems",   ca: 35, exam: 55, total: 68, grade: "C", points: 3.0 },
  { course: "MTH301", title: "Discrete Mathematics", ca: 40, exam: 68, total: 80, grade: "A", points: 5.0 },
  { course: "GST301", title: "Use of English",     ca: 28, exam: 60, total: 73, grade: "B", points: 4.0 },
  { course: "CSC305", title: "Operating Systems",  ca: 36, exam: 58, total: 72, grade: "B", points: 4.0 },
  { course: "CSC307", title: "Computer Networks",  ca: 30, exam: 48, total: 61, grade: "C", points: 3.0 },
];

const gradeColors: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-700",
  B: "bg-blue-100 text-blue-700",
  C: "bg-amber-100 text-amber-700",
  D: "bg-orange-100 text-orange-700",
  F: "bg-red-100 text-red-700",
};

export default function GradesPage() {
  const cgpa = (grades.reduce((sum, g) => sum + g.points, 0) / grades.length).toFixed(2);
  const highest = grades.reduce((a, b) => a.total > b.total ? a : b);
  const passed = grades.filter(g => g.total >= 45).length;

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Grades</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Your academic performance this semester</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md bg-linear-to-br from-primary to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-medium opacity-80">CGPA</span>
            </div>
            <div className="text-5xl font-extrabold tracking-tight">{cgpa}</div>
            <div className="text-sm opacity-60 mt-1">out of 5.0</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="font-medium text-muted-foreground">Best Performance</span>
            </div>
            <div className="text-5xl font-extrabold tracking-tight text-foreground">{highest.grade}</div>
            <div className="text-sm text-muted-foreground mt-1">{highest.title}</div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium text-muted-foreground">Courses Passed</span>
            </div>
            <div className="text-5xl font-extrabold tracking-tight text-foreground">{passed}/{grades.length}</div>
            <div className="text-sm text-muted-foreground mt-1">this semester</div>
          </CardContent>
        </Card>
      </div>

      {/* Grades table */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border/60">
          <h2 className="font-bold text-foreground">2025/2026 First Semester Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30 border-b border-border/40">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">Course</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">Title</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">C.A./40</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">Exam/60</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">Total</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">Grade</th>
                <th className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide p-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={g.course} className={cn("border-t border-border/30 hover:bg-muted/30 transition-colors", i % 2 === 1 && "bg-muted/10")}>
                  <td className="p-4 text-sm font-bold text-primary">{g.course}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{g.title}</td>
                  <td className="p-4 text-sm text-center text-muted-foreground">{g.ca}</td>
                  <td className="p-4 text-sm text-center text-muted-foreground">{g.exam}</td>
                  <td className="p-4 text-sm text-center font-semibold text-foreground">{g.total}</td>
                  <td className="p-4 text-center">
                    <span className={cn("text-xs font-bold px-3 py-1 rounded-full", gradeColors[g.grade])}>
                      {g.grade}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-center font-semibold text-foreground">{g.points.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border/60 bg-muted/20">
                <td colSpan={6} className="p-4 text-sm font-bold text-foreground text-right pr-6">CGPA</td>
                <td className="p-4 text-center font-extrabold text-primary text-base">{cgpa}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
