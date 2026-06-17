import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical, Paperclip, Send, Users } from "lucide-react";

export default function MessagesInterface() {
  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 pb-2">
      {/* Sidebar - Chat List */}
      <Card className="w-80 flex flex-col border-border/60 shadow-sm overflow-hidden shrink-0">
        <div className="p-4 border-b border-border/60">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-foreground">Messages</h2>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full h-9 pl-9 pr-4 rounded-md bg-muted/50 border border-border/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>
        
        <div className="flex px-4 py-2 border-b border-border/60 gap-4 text-sm font-medium">
          <button className="text-primary border-b-2 border-primary pb-1">All</button>
          <button className="text-muted-foreground hover:text-foreground pb-1">Unread</button>
          <button className="text-muted-foreground hover:text-foreground pb-1">Groups</button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {[
            { name: "CSC301 Discussion Group", desc: "Dr. John O: Don't forget...", time: "12:30 PM", unread: 12, group: true },
            { name: "Dr. Sarah Michael", desc: "Thanks for submitting...", time: "Yesterday", unread: 0, group: false },
            { name: "Course Representatives", desc: "Chioma: I'll share the...", time: "Mon", unread: 5, group: true },
            { name: "MTH301 Students", desc: "Dr. Ibrahim: Please review...", time: "May 6", unread: 0, group: true },
            { name: "Acadia Support", desc: "Your ticket has been updated", time: "May 5", unread: 0, group: false },
          ].map((chat, i) => (
            <div key={i} className={`p-4 border-b border-border/40 flex gap-3 cursor-pointer transition-colors ${i === 0 ? 'bg-primary/5' : 'hover:bg-muted/50'}`}>
              <div className="relative">
                <Avatar className="w-10 h-10 border border-border">
                  <AvatarFallback className={chat.group ? "bg-indigo-100 text-indigo-700" : "bg-slate-100"}>
                    {chat.group ? <Users className="w-5 h-5"/> : chat.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {chat.name.includes("Sarah") && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className={`text-sm truncate pr-2 ${i === 0 ? 'font-bold text-foreground' : 'font-semibold text-foreground/90'}`}>{chat.name}</h4>
                  <span className={`text-xs shrink-0 ${chat.unread > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{chat.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground truncate pr-2">{chat.desc}</p>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col border-border/60 shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="h-16 border-b border-border/60 px-6 flex items-center justify-between shrink-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarFallback className="bg-indigo-100 text-indigo-700"><Users className="w-5 h-5"/></AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-foreground">CSC301 Discussion Group</h3>
              <p className="text-xs text-muted-foreground">128 members</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9"><Search className="w-4 h-4"/></Button>
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9"><MoreVertical className="w-4 h-4"/></Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6 custom-scrollbar">
          
          <div className="flex gap-4">
            <Avatar className="w-8 h-8 shrink-0"><AvatarFallback>JO</AvatarFallback></Avatar>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-sm">Dr. John O.</span>
                <span className="text-xs text-muted-foreground">10:30 AM</span>
              </div>
              <div className="bg-white border border-border/60 p-3 rounded-2xl rounded-tl-sm text-sm text-foreground shadow-sm max-w-md">
                Good morning everyone! Don&apos;t forget we have a quiz this Friday. Make sure to review the trees and graphs topics.
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <Avatar className="w-8 h-8 shrink-0"><AvatarImage src="https://i.pravatar.cc/150?u=ayomide" /><AvatarFallback>AT</AvatarFallback></Avatar>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                <span className="font-semibold text-sm">Ayomide T.</span>
                <span className="text-xs text-muted-foreground">10:33 AM</span>
              </div>
              <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm max-w-md">
                Thank you sir! Will do.
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-row-reverse">
            <Avatar className="w-8 h-8 shrink-0"><AvatarFallback className="bg-pink-100 text-pink-700">CP</AvatarFallback></Avatar>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-2 mb-1 flex-row-reverse">
                <span className="font-semibold text-sm">Chioma P.</span>
                <span className="text-xs text-muted-foreground">10:34 AM</span>
              </div>
              <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm text-sm shadow-sm max-w-md">
                Will the quiz be online or in class?
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Avatar className="w-8 h-8 shrink-0"><AvatarFallback>JO</AvatarFallback></Avatar>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-sm">Dr. John O.</span>
                <span className="text-xs text-muted-foreground">10:35 AM</span>
              </div>
              <div className="bg-white border border-border/60 p-3 rounded-2xl rounded-tl-sm text-sm text-foreground shadow-sm max-w-md">
                It will be in class.
              </div>
            </div>
          </div>

        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-border/60 shrink-0">
          <div className="flex items-center gap-2 bg-muted/50 border border-border/60 rounded-full pl-4 pr-2 py-2">
            <button aria-label="Attach file" className="text-muted-foreground hover:text-foreground transition-colors"><Paperclip className="w-5 h-5"/></button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2"
            />
            <Button size="icon" className="rounded-full w-8 h-8 shrink-0">
              <Send className="w-4 h-4 -ml-0.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
