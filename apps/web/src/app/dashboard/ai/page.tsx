"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, User, RotateCcw, BookOpen, GraduationCap, ClipboardList } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: BookOpen, label: "Summarize my courses", prompt: "Give me a summary of my current courses and what I should focus on this week." },
  { icon: GraduationCap, label: "Study plan for exams", prompt: "Help me create a study plan for my upcoming exams." },
  { icon: ClipboardList, label: "Assignment help", prompt: "I have an assignment due soon. Can you help me structure my approach?" },
  { icon: Sparkles, label: "Explain a concept", prompt: "Can you explain the concept of data structures and algorithms in simple terms?" },
];

const WELCOME_MESSAGE = "I'm your Acadia AI Study Assistant! I can help you with study plans, concept explanations, assignment guidance, and more. What would you like help with today?";

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("study plan") || lower.includes("exam"))
    return "Great question! Here's a structured study plan:\n\n**Week 1-2:** Review all lecture notes and identify weak areas.\n**Week 3:** Practice past questions and work through textbook examples.\n**Week 4:** Focus sessions on your weak areas and timed mock exams.\n\nRemember to take 5-10 minute breaks every 45 minutes using the Pomodoro technique. Would you like me to tailor this to a specific course?";
  if (lower.includes("assignment") || lower.includes("essay") || lower.includes("project"))
    return "Here's how I'd approach that assignment:\n\n1. **Understand the brief** — Re-read the requirements carefully and highlight key deliverables.\n2. **Research phase** — Gather at least 3-5 credible sources before writing.\n3. **Outline first** — Draft a structure before writing full paragraphs.\n4. **Draft, then revise** — Write freely first, polish on the second pass.\n5. **Check plagiarism** — Use a tool like Turnitin before submission.\n\nWhich part do you need the most help with?";
  if (lower.includes("data structure") || lower.includes("algorithm"))
    return "**Data Structures** are ways of organizing data in memory so it can be used efficiently.\n\nCommon types include:\n- **Arrays** — Fixed-size sequential storage\n- **Linked Lists** — Nodes connected by pointers\n- **Stacks/Queues** — LIFO/FIFO access patterns\n- **Trees** — Hierarchical structure (BST, AVL, Heap)\n- **Hash Tables** — Key-value pairs with O(1) average lookup\n\n**Algorithms** are step-by-step procedures to solve a problem. They're evaluated by **Time Complexity** (how fast) and **Space Complexity** (how much memory).\n\nWant me to dive deeper into any specific structure?";
  if (lower.includes("course") || lower.includes("summary") || lower.includes("focus"))
    return "Based on your enrollment, here's what I'd prioritize this week:\n\n📚 **CSC 301 - Data Structures** — You have an assignment due in 3 days. Start with linked lists.\n📊 **MTH 201 - Calculus** — Focus on integration by parts before the upcoming test.\n💻 **CSC 303 - Software Engineering** — Review the SDLC models for your quiz.\n\nYour attendance is good overall, but you've missed 2 classes in MTH 201 — worth catching up on those notes. Want a focused plan for any specific course?";
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey"))
    return "Hello! 👋 I'm your Acadia AI Study Assistant. I'm here to help you study smarter — whether you need help with concepts, assignments, study plans, or exam prep. What can I help you with today?";
  return "That's a great question! Let me help you with that.\n\nAs your AI Study Assistant, I can:\n- Explain complex concepts in simple terms\n- Help you structure essays and assignments\n- Create personalised study schedules\n- Suggest resources for your courses\n- Help you practice with mock questions\n\nCould you give me a bit more detail about what you're working on? The more specific you are, the better I can help!";
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function handleSuggestion(prompt: string) {
    setInput(prompt);
    inputRef.current?.focus();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 900 + Math.random() * 600));

    const reply = getMockResponse(text);
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: reply,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMsg]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  }

  function reset() {
    setMessages([{
      id: "welcome-reset",
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    }]);
    setInput("");
  }

  function renderContent(content: string) {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i} style={{ whiteSpace: "pre-line" }}>{part}</span>;
    });
  }

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[900px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Study Assistant</h1>
            <p className="text-xs text-muted-foreground">Powered by Acadia AI · Always ready to help</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-muted/20 rounded-2xl border border-border/60 p-4 md:p-6 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === "assistant"
                  ? "bg-linear-to-br from-violet-500 to-indigo-600 shadow shadow-indigo-200"
                  : "bg-primary/10"
              }`}>
                {msg.role === "assistant"
                  ? <Sparkles className="w-4 h-4 text-white" />
                  : <User className="w-4 h-4 text-primary" />
                }
              </div>

              <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "assistant"
                  ? "bg-white border border-border/60 text-foreground shadow-sm"
                  : "bg-primary text-white"
              }`}>
                {renderContent(msg.content)}
                <div className={`text-[10px] mt-1.5 ${msg.role === "assistant" ? "text-muted-foreground" : "text-white/60"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow shadow-indigo-200">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-border/60 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center h-5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground/40"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map(({ icon: Icon, label, prompt }) => (
            <button
              key={label}
              type="button"
              onClick={() => handleSuggestion(prompt)}
              className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl border border-border/70 bg-white hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all text-slate-600"
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your studies..."
            rows={1}
            className="w-full resize-none rounded-2xl border border-border/70 bg-white px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm min-h-[48px] max-h-32 custom-scrollbar"
            style={{ lineHeight: "1.5" }}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      <p className="text-center text-[10px] text-muted-foreground mt-2">
        AI responses are for study guidance only. Always verify with your course materials.
      </p>
    </div>
  );
}
