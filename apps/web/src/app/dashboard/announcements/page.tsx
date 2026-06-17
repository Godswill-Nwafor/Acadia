import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Building, BookOpen, Users, AlertCircle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const announcements = [
  {
    id: 1, title: "Mid-Semester Examination Timetable Released",
    body: "The timetable for the mid-semester examination has been released. Students are advised to check the departmental notice board or the student portal for the full schedule.",
    date: "Jun 14, 2026", type: "institution", author: "Registry Office", urgent: true,
  },
  {
    id: 2, title: "CSC301 Quiz Rescheduled to Friday",
    body: "Please note that the previously scheduled quiz for CSC301 has been moved from Thursday to Friday, June 20. All other arrangements remain the same. Attendance is compulsory.",
    date: "Jun 13, 2026", type: "course", author: "Dr. John O.", urgent: false,
  },
  {
    id: 3, title: "New Reading Materials Available in Library",
    body: "Additional reading materials for CSC305 and MTH301 have been added to the library's digital collection. Students can access them via the online library portal using their matric numbers.",
    date: "Jun 12, 2026", type: "department", author: "Computer Science Dept.", urgent: false,
  },
  {
    id: 4, title: "Student Union General Meeting – All Students Invited",
    body: "The Student Union invites all students to the quarterly general meeting scheduled for Saturday, June 21 at 10:00 AM in the Main Auditorium. Refreshments will be provided.",
    date: "Jun 11, 2026", type: "institution", author: "Student Affairs", urgent: false,
  },
  {
    id: 5, title: "Database Systems Lab Cancelled for Today",
    body: "Due to unforeseen circumstances, the Database Systems practical session for today has been cancelled. A makeup class will be scheduled next week. Students will be notified.",
    date: "Jun 10, 2026", type: "course", author: "Dr. Sarah M.", urgent: true,
  },
  {
    id: 6, title: "Departmental Seminar – Guest Lecturer on AI & Education",
    body: "The Department of Computer Science is pleased to host Dr. Emeka Nwosu from MIT on Friday, June 27. Topic: 'The Future of AI in Higher Education'. Venue: Faculty Auditorium.",
    date: "Jun 9, 2026", type: "department", author: "HOD, Computer Science", urgent: false,
  },
];

const typeConfig: Record<string, { Icon: React.ElementType; color: string; label: string }> = {
  institution: { Icon: Building,  color: "bg-blue-100 text-blue-600",    label: "Institution" },
  course:      { Icon: BookOpen,  color: "bg-purple-100 text-purple-600", label: "Course" },
  department:  { Icon: Users,     color: "bg-emerald-100 text-emerald-600", label: "Department" },
  faculty:     { Icon: Megaphone, color: "bg-amber-100 text-amber-600",   label: "Faculty" },
};

export default function AnnouncementsPage() {
  const urgentCount = announcements.filter(a => a.urgent).length;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Stay up to date with important notices</p>
        </div>
        {urgentCount > 0 && (
          <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-3 py-1.5 rounded-full">
            <Bell className="w-4 h-4" />
            {urgentCount} urgent
          </div>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map(ann => {
          const t = typeConfig[ann.type] ?? typeConfig.institution;
          const TypeIcon = t.Icon;
          return (
            <Card
              key={ann.id}
              className={cn(
                "border-border/60 shadow-sm hover:shadow-md transition-all duration-200",
                ann.urgent && "border-l-4 border-l-red-500"
              )}
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5", t.color)}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="font-bold text-foreground">{ann.title}</h3>
                      {ann.urgent && (
                        <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />Urgent
                        </span>
                      )}
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", t.color)}>
                        {t.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{ann.body}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/70">{ann.author}</span>
                      <span>·</span>
                      <span>{ann.date}</span>
                    </div>
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
