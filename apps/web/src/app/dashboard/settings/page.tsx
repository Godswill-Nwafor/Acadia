"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Bell, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const profileFields = [
  { label: "First Name",    value: "Ayomide" },
  { label: "Last Name",     value: "Taiwo" },
  { label: "Email Address", value: "ayomide.t@mtu.edu.ng" },
  { label: "Phone Number",  value: "+234 800 000 0000" },
  { label: "Matric Number", value: "CSC/21/0042" },
  { label: "Department",    value: "Computer Science" },
];

const notifPrefs = [
  { label: "Assignment Reminders",   desc: "Get notified before assignment deadlines",            enabled: true },
  { label: "New Announcements",      desc: "Receive alerts for new institutional announcements",  enabled: true },
  { label: "Grade Published",        desc: "Be notified when results are available",              enabled: true },
  { label: "Messages",               desc: "Notifications for new messages and group mentions",   enabled: false },
  { label: "Class Cancellations",    desc: "Instant alerts when a class is cancelled",            enabled: true },
];

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div className={cn("w-11 h-6 rounded-full relative cursor-pointer transition-colors", enabled ? "bg-primary" : "bg-muted border border-border")}>
      <div className={cn("absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all", enabled ? "right-0.5" : "left-0.5")} />
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");

  const tabs = [
    { key: "profile",       label: "Profile",       Icon: Camera },
    { key: "notifications", label: "Notifications", Icon: Bell },
    { key: "security",      label: "Security",      Icon: Shield },
  ];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your account and preferences</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit border border-border/40">
        {tabs.map(t => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              tab === t.key ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.Icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {/* Profile tab */}
        {tab === "profile" && (
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-2 border-primary/20">
                    <AvatarImage src="https://i.pravatar.cc/150?u=ayomide" />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">AT</AvatarFallback>
                  </Avatar>
                  <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Ayomide Taiwo</h3>
                  <p className="text-sm text-muted-foreground">Student · 300 Level · Computer Science</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Mountain Top University</p>
                </div>
              </div>

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileFields.map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.value}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                ))}
              </div>

              <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notifications tab */}
        {tab === "notifications" && (
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-5">Choose which notifications you&apos;d like to receive.</p>
              <div className="space-y-1 divide-y divide-border/40">
                {notifPrefs.map(n => (
                  <div key={n.label} className="flex items-center justify-between py-4">
                    <div className="pr-6">
                      <h4 className="font-semibold text-foreground text-sm">{n.label}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                    </div>
                    <Toggle enabled={n.enabled} />
                  </div>
                ))}
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white px-6 mt-5">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Security tab */}
        {tab === "security" && (
          <Card className="border-border/60 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Current Password",  placeholder: "Enter current password" },
                  { label: "New Password",       placeholder: "Enter new password" },
                  { label: "Confirm New Password", placeholder: "Confirm new password" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      {f.label}
                    </label>
                    <input
                      type="password"
                      placeholder={f.placeholder}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="px-6 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                Update Password
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
