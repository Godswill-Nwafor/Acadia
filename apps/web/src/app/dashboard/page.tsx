import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen, FileText, Megaphone, UserCheck, Calendar,
  Plus, BotMessageSquare, User
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Good morning, Ayomide 👋</h1>
        <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening in your academic world today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">6</div>
              <div className="text-sm font-medium text-muted-foreground">Courses</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm font-medium text-muted-foreground">Assignments Due</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm font-medium text-muted-foreground">Announcements</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">92%</div>
              <div className="text-sm font-medium text-muted-foreground">Attendance</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/60">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Today&apos;s Classes</div>
              <div className="text-sm font-medium text-muted-foreground">3 Classes</div>
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
          
          <div className="space-y-4">
            {[
              { id: "CSC301", title: "Data Structures", lecturer: "Dr. John O.", level: "300 Level", progress: 75, color: "bg-blue-500", light: "bg-blue-100", text: "text-blue-600" },
              { id: "CSC303", title: "Database Systems", lecturer: "Dr. Sarah M.", level: "300 Level", progress: 60, color: "bg-purple-500", light: "bg-purple-100", text: "text-purple-600" },
              { id: "MTH301", title: "Discrete Mathematics", lecturer: "Dr. K. Ibrahim", level: "300 Level", progress: 80, color: "bg-emerald-500", light: "bg-emerald-100", text: "text-emerald-600" },
              { id: "GST301", title: "Use of English", lecturer: "Dr. B. Okon", level: "300 Level", progress: 90, color: "bg-amber-500", light: "bg-amber-100", text: "text-amber-600" },
              { id: "CSC305", title: "Operating Systems", lecturer: "Prof. A. Adewale", level: "300 Level", progress: 65, color: "bg-indigo-500", light: "bg-indigo-100", text: "text-indigo-600" },
            ].map((course, i) => (
              <Card key={i} className="shadow-sm border-border/60 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 w-full">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shrink-0 ${course.light} ${course.text}`}>
                      {course.id.substring(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground text-sm truncate pr-2">{course.id} - {course.title}</h3>
                        <span className="text-xs font-bold text-foreground">{course.progress}%</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate mb-2">
                        {course.lecturer} • {course.level}
                      </div>
                      <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${course.color}`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Multi Grid */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Upcoming */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Upcoming</h2>
              <Link href="/dashboard/calendar" className="text-sm font-medium text-primary hover:underline">View calendar</Link>
            </div>
            
            <Card className="shadow-sm border-border/60">
              <div className="divide-y divide-border/60">
                {[
                  { title: "Data Structures Assignment", due: "Due in 2 days", icon: <FileText className="w-4 h-4 text-blue-600"/>, light: "bg-blue-100" },
                  { title: "Database Systems Quiz", due: "Due in 3 days", icon: <FileText className="w-4 h-4 text-purple-600"/>, light: "bg-purple-100" },
                  { title: "Operating Systems Test", due: "May 16, 2024", icon: <FileText className="w-4 h-4 text-emerald-600"/>, light: "bg-emerald-100" },
                  { title: "Discrete Mathematics Assignment", due: "May 18, 2024", icon: <FileText className="w-4 h-4 text-amber-600"/>, light: "bg-amber-100" },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.light}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.due}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border/60">
                <Button variant="ghost" className="w-full text-sm font-medium text-muted-foreground hover:text-foreground">
                  <Plus className="w-4 h-4 mr-2" /> Add Reminder
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Announcements */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Recent Announcements</h2>
              <Link href="/dashboard/announcements" className="text-sm font-medium text-primary hover:underline">View all</Link>
            </div>
            
            <Card className="shadow-sm border-border/60">
              <div className="divide-y divide-border/60">
                {[
                  { title: "Department Meeting", date: "May 10, 2024" },
                  { title: "New Lecture Notes Uploaded", date: "May 9, 2024" },
                  { title: "CSC301 Class Cancelled", date: "May 8, 2024" },
                  { title: "Change in Timetable", date: "May 7, 2024" },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Megaphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Assistant Callout */}
            <Card className="shadow-sm border-none bg-linear-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
              <CardContent className="p-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-md">
                  <BotMessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">AI Study Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-[200px]">Get instant help with your studies anytime.</p>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                  Start Chat
                </Button>
              </CardContent>
              {/* Decorative circle */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 opacity-80 mix-blend-multiply">
                 {/* Robot icon placeholder mimicking the illustration */}
                 <div className="w-full h-full bg-blue-200/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/40">
                   <BotMessageSquare className="w-10 h-10 text-primary" />
                 </div>
              </div>
            </Card>
          </div>

          {/* Timetable - Today */}
          <div className="space-y-6 md:col-span-2">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Timetable - Today</h2>
                    <Link href="/dashboard/timetable" className="text-sm font-medium text-primary hover:underline">View full timetable</Link>
                  </div>
                  
                  <Card className="shadow-sm border-border/60">
                    <CardContent className="p-0">
                      <div className="relative pl-6 py-6 border-l-2 border-border/40 ml-8 space-y-8">
                        
                        {/* Event 1 */}
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                            <div className="text-sm font-bold text-foreground w-20">08:00 AM</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-sm text-foreground">Data Structures</h4>
                              <p className="text-xs text-muted-foreground">CSC301 - LT1</p>
                            </div>
                            <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md">
                              Ongoing
                            </div>
                          </div>
                        </div>

                        {/* Event 2 */}
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                            <div className="text-sm font-bold text-foreground w-20">10:00 AM</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-sm text-foreground">Discrete Mathematics</h4>
                              <p className="text-xs text-muted-foreground">MTH301 - LT3</p>
                            </div>
                            <div className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">
                              Soon
                            </div>
                          </div>
                        </div>

                        {/* Event 3 */}
                        <div className="relative">
                          <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                            <div className="text-sm font-bold text-foreground w-20">01:00 PM</div>
                            <div className="flex-1">
                              <h4 className="font-bold text-sm text-foreground">Use of English</h4>
                              <p className="text-xs text-muted-foreground">GST301 - LT2</p>
                            </div>
                            <div className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-md">
                              Soon
                            </div>
                          </div>
                        </div>

                      </div>
                    </CardContent>
                  </Card>
               </div>

               {/* Recent Activity */}
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
                    <Link href="/dashboard" className="text-sm font-medium text-primary hover:underline">View all</Link>
                  </div>
                  
                  <Card className="shadow-sm border-border/60">
                    <div className="divide-y divide-border/60">
                      {[
                        { text: "New assignment posted in CSC301", time: "2 hours ago", icon: <FileText className="w-4 h-4"/> },
                        { text: "Ayomide T. submitted assignment", time: "3 hours ago", icon: <User className="w-4 h-4"/> },
                        { text: "New lecture notes in MTH301", time: "5 hours ago", icon: <BookOpen className="w-4 h-4"/> },
                        { text: "Grade published in CSC303", time: "1 day ago", icon: <User className="w-4 h-4"/> },
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
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
