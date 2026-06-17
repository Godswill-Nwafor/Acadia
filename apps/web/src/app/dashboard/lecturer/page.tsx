import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen, Users, FileText, UserCheck,
  CheckCircle2, Activity, ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function LecturerDashboard() {
  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back, Dr. John 👋</h1>
        <p className="text-muted-foreground mt-1">Here&apos;s an overview of your teaching activities.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm font-medium text-muted-foreground">Courses Teaching</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">128</div>
              <div className="text-sm font-medium text-muted-foreground">Total Students</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm font-medium text-muted-foreground">Assignments</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">96%</div>
              <div className="text-sm font-medium text-muted-foreground">Avg. Attendance</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - My Courses */}
        <div className="xl:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">My Courses</h2>
            <Link href="/dashboard/courses" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          
          <Card className="shadow-sm border-border/60">
            <div className="divide-y divide-border/60">
              {[
                { id: "CSC301", title: "Data Structures", students: "128 students" },
                { id: "CSC201", title: "Introduction to Programming", students: "95 students" },
                { id: "CSC401", title: "Algorithms", students: "87 students" },
                { id: "CSC499", title: "Final Year Project", students: "24 students" },
              ].map((course, i) => (
                <div key={i} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{course.id} - {course.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{course.students}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center justify-between mt-8">
            <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
          </div>
          
          <Card className="shadow-sm border-border/60">
            <div className="divide-y divide-border/60">
              {[
                { text: "New assignment created for CSC301", time: "2 hours ago", icon: <FileText className="w-4 h-4"/> },
                { text: "Ayomide T. submitted assignment", time: "3 hours ago", icon: <UserCheck className="w-4 h-4"/> },
                { text: "New student enrolled in CSC201", time: "5 hours ago", icon: <Users className="w-4 h-4"/> },
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-muted-foreground">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Multi Grid */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pending Tasks */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Pending Tasks</h2>
            </div>
            
            <Card className="shadow-sm border-border/60">
              <div className="divide-y divide-border/60">
                {[
                  { title: "Grade 28 Submissions", desc: "CSC301 Assignment", icon: <CheckCircle2 className="w-4 h-4 text-amber-600"/>, light: "bg-amber-100" },
                  { title: "Take Attendance", desc: "CSC301 - 10:00 AM", icon: <UserCheck className="w-4 h-4 text-blue-600"/>, light: "bg-blue-100" },
                  { title: "Review 15 Quiz Attempts", desc: "CSC201 Quiz", icon: <Activity className="w-4 h-4 text-purple-600"/>, light: "bg-purple-100" },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.light}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Attendance Overview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Attendance Overview</h2>
            </div>
            
            <Card className="shadow-sm border-border/60 flex flex-col items-center justify-center p-6 min-h-[250px]">
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Simulated Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted/30"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-emerald-500"
                    strokeDasharray="96, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold">96%</span>
                  <span className="text-xs text-muted-foreground">Average</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 mt-6 w-full text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Present <span className="font-medium ml-1">385 (96%)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Absent <span className="font-medium ml-1">15 (4%)</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
