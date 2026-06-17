"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Eye, Plus, Search, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

const threads = [
  {
    id: 1, course: "CSC301", author: "Chioma P.", init: "CP", time: "2 hours ago",
    title: "Best resources for Binary Trees?",
    body: "I'm struggling with binary trees in CSC301. Can anyone share good resources or explain the deletion algorithm more clearly?",
    replies: 12, views: 145, likes: 24, pinned: true,
  },
  {
    id: 2, course: "CSC303", author: "Tunde A.", init: "TA", time: "5 hours ago",
    title: "Help with SQL JOINs in CSC303",
    body: "I can't seem to differentiate between LEFT JOIN and INNER JOIN in practice. Can someone give a real-world example?",
    replies: 8, views: 89, likes: 15, pinned: false,
  },
  {
    id: 3, course: "MTH301", author: "Favour E.", init: "FE", time: "1 day ago",
    title: "Group study for MTH301 exam?",
    body: "Anyone interested in forming a study group for the upcoming Discrete Mathematics test? We can meet in the library Saturday morning.",
    replies: 20, views: 210, likes: 38, pinned: false,
  },
  {
    id: 4, course: "CSC305", author: "Emeka N.", init: "EN", time: "2 days ago",
    title: "CPU Scheduling algorithms comparison table",
    body: "I created a detailed comparison table for all scheduling algorithms we've covered — FCFS, SJF, Round Robin, and Priority. Drop a reply to get it.",
    replies: 6, views: 67, likes: 19, pinned: false,
  },
  {
    id: 5, course: "CSC301", author: "Amaka U.", init: "AU", time: "3 days ago",
    title: "Stack vs Queue – when to use which?",
    body: "I understand both data structures individually but still struggle to decide which one to use in a given problem. Any pointers?",
    replies: 14, views: 130, likes: 27, pinned: false,
  },
];

const courseColors: Record<string, string> = {
  CSC301: "bg-blue-100 text-blue-700",
  CSC303: "bg-purple-100 text-purple-700",
  MTH301: "bg-emerald-100 text-emerald-700",
  CSC305: "bg-indigo-100 text-indigo-700",
  GST301: "bg-amber-100 text-amber-700",
};

const courseTabs = ["All Courses", "CSC301", "CSC303", "MTH301", "CSC305"];

export default function DiscussionsPage() {
  const [tab, setTab] = useState("All Courses");

  const filtered = tab === "All Courses"
    ? threads
    : threads.filter(t => t.course === tab);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discussions</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Engage with peers and lecturers on course topics</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-white w-fit">
          <Plus className="w-4 h-4" /> New Thread
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search discussions..."
          className="w-full h-10 pl-9 pr-4 rounded-lg bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Course tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit border border-border/40 flex-wrap">
        {courseTabs.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              tab === t ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="space-y-3">
        {filtered.map(thread => (
          <Card key={thread.id} className="border-border/60 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 shrink-0 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">{thread.init}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {thread.pinned && (
                      <span className="text-xs font-bold text-primary flex items-center gap-1">
                        <Pin className="w-3 h-3" />Pinned
                      </span>
                    )}
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", courseColors[thread.course] ?? "bg-gray-100 text-gray-700")}>
                      {thread.course}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{thread.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{thread.body}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/70">{thread.author}</span>
                    <span>·</span>
                    <span>{thread.time}</span>
                    <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" />{thread.replies}</span>
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{thread.views}</span>
                    <span className="flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5" />{thread.likes}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
