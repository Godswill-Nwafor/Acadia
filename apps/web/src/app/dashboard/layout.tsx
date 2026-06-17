"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home, BookOpen, FileText, CalendarClock, Megaphone,
  MessageSquare, Folder, GraduationCap, UserCheck,
  Users, Calendar, Settings, Search, Bell, Menu, X, Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/courses", icon: BookOpen, label: "Courses" },
  { href: "/dashboard/assignments", icon: FileText, label: "Assignments" },
  { href: "/dashboard/timetable", icon: CalendarClock, label: "Timetable" },
  { href: "/dashboard/announcements", icon: Megaphone, label: "Announcements" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages", badge: 12 },
  { href: "/dashboard/resources", icon: Folder, label: "Resources" },
  { href: "/dashboard/grades", icon: GraduationCap, label: "Grades" },
  { href: "/dashboard/attendance", icon: UserCheck, label: "Attendance" },
  { href: "/dashboard/discussions", icon: Users, label: "Discussions" },
  { href: "/dashboard/calendar", icon: Calendar, label: "Calendar" },
  { href: "/dashboard/ai", icon: Sparkles, label: "AI Assistant" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

function SidebarContent({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <>
      <div className="h-16 flex items-center px-5 border-b border-white/10 justify-between shrink-0">
        <Image
          src="/LOGO.png"
          alt="Acadia"
          width={120}
          height={32}
          className="brightness-0 invert"
          priority
          style={{ height: "auto" }}
        />
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-white/50 hover:text-white transition-colors p-1 rounded-md"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 custom-scrollbar">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 group",
                isActive
                  ? "bg-primary text-white shadow-sm shadow-primary/30"
                  : "text-sidebar-foreground/60 hover:text-white hover:bg-white/10"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform duration-150",
                    !isActive && "group-hover:scale-110"
                  )}
                />
                <span className="font-medium text-sm">{label}</span>
              </div>
              {badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center",
                    isActive ? "bg-white/25 text-white" : "bg-primary text-white"
                  )}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
            M
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-white/80 text-sm truncate">
              Mountain Top
            </div>
            <div className="text-xs text-white/40">University</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar — sticky */}
      <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground flex-col shrink-0 h-screen sticky top-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile sidebar — fixed slide-in drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground flex flex-col md:hidden",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-md"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-xs hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            <button
              type="button"
              className="relative text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>

            <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-5 border-l border-border">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-foreground leading-none">
                  Ayomide T.
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Student</div>
              </div>
              <Avatar className="w-9 h-9 border-2 border-primary/20 cursor-pointer">
                <AvatarImage src="https://i.pravatar.cc/150?u=ayomide" />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  AT
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-background p-4 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
