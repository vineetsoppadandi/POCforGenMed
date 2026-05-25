"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowLeft,
  Play,
  RefreshCw,
  Lightbulb,
  Award,
  Info,
  AlertTriangle,
  Zap,
  User,
  Bot,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import Anthropic from "@anthropic-ai/sdk";
import { OSCECase, ChatMessage } from "@/lib/types";
import { saveAttempt, getApiKey, setApiKey as persistApiKey } from "@/lib/progress";
import { matchScriptedResponse } from "@/lib/scripted-chat";

type Phase = "briefing" | "active" | "marking" | "debrief";

type SessionSnapshot = {
  caseId: string;
  phase: Phase;
  messages: ChatMessage[];
  timeLeft: number;
  markedItems: Record<string, number>;
  studyMode: boolean;
};

const SESSION_KEY = "osce_session";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function loadSession(caseId: string): SessionSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SessionSnapshot;
    if (data.caseId !== caseId) return null;
    if (data.phase === "briefing" || data.phase === "debrief") return null;
    return data;
  } catch {
    return null;
  }
}

function saveSession(snapshot: SessionSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(snapshot));
  } catch {
    /* quota / disabled storage */
  }
}

function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export default function StationClient({ osce }: { osce: OSCECase }) {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>("briefing");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [timeLeft, setTimeLeft] = useState(osce.timeMinutes * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [markedItems, setMarkedItems] = useState<Record<string, number>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [aiMode, setAiMode] = useState(false);
  const [apiKey, setApiKeyState] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [studyMode, setStudyMode] = useState(true);
  const [activeDebriefSection, setActiveDebriefSection] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKeyState(savedKey);
      setAiMode(true);
    }
    const restored = loadSession(osce.id);
    if (restored) {
      setPhase(restored.phase);
      setMessages(restored.messages);
      setTimeLeft(restored.timeLeft);
      setMarkedItems(restored.markedItems);
      setStudyMode(restored.studyMode);
      if (restored.phase === "active" && restored.timeLeft > 0) setTimerRunning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [osce.id]);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Persist in-progress session so refresh doesn't wipe it
  useEffect(() => {
    if (phase === "active" || phase === "marking") {
      saveSession({ caseId: osce.id, phase, messages, timeLeft, markedItems, studyMode });
    }
  }, [phase, messages, timeLeft, markedItems, studyMode, osce.id]);

  // Warn user before unloading tab/window during an in-progress session
  useEffect(() => {
    if (phase !== "active" && phase !== "marking") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  const totalMarks = osce.markingCategories.reduce(
    (sum, cat) => sum + cat.items.reduce((s, item) => s + item.marks, 0),
    0
  );
  const awardedMarks = Object.values(markedItems).reduce((sum, v) => sum + v, 0);
  const scorePercent = totalMarks > 0 ? Math.round((awardedMarks / totalMarks) * 100) : 0;

  function startStation() {
    setPhase("active");
    setTimerRunning(true);
    const welcome: ChatMessage = {
      role: "patient",
      content: `(${osce.patientName} looks up as you enter) Hello, doctor. Come in, please sit down.`,
      timestamp: new Date().toISOString(),
    };
    setMessages([welcome]);
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      role: "student",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 500 + Math.random() * 800));

    if (aiMode && apiKey) {
      try {
        const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
        const allMessages = [...messages, userMsg];
        const response = await client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: osce.patientSystemPrompt,
          messages: allMessages.slice(-10).map((m) => ({
            role: m.role === "student" ? "user" : "assistant",
            content: m.content,
          })),
        });
        const content = response.content[0];
        if (content.type === "text") {
          const patientMsg: ChatMessage = {
            role: "patient",
            content: content.text,
            timestamp: new Date().toISOString(),
          };
          setIsTyping(false);
          setMessages((prev) => [...prev, patientMsg]);
          return;
        }
      } catch {
        // fall through to scripted
      }
    }

    const response = matchScriptedResponse(input.trim(), osce);
    const patientMsg: ChatMessage = {
      role: "patient",
      content: response,
      timestamp: new Date().toISOString(),
    };
    setIsTyping(false);
    setMessages((prev) => [...prev, patientMsg]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function goToMarking() {
    setTimerRunning(false);
    setPhase("marking");
    const expanded: Record<string, boolean> = {};
    osce.markingCategories.forEach((c) => (expanded[c.id] = true));
    setExpandedCategories(expanded);
  }

  function goToDebrief() {
    const attempt = {
      caseId: osce.id,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      markedItems,
      totalScore: awardedMarks,
      maxScore: totalMarks,
      mode: studyMode ? ("study" as const) : ("exam" as const),
      chatHistory: messages,
    };
    saveAttempt(attempt);
    clearSession();
    setPhase("debrief");
  }

  function resetStation(skipConfirm = false) {
    if (!skipConfirm && (phase === "active" || phase === "marking")) {
      const ok = window.confirm(
        "Reset this station? Your chat and any marks will be lost. This cannot be undone."
      );
      if (!ok) return;
    }
    clearSession();
    setPhase("briefing");
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setTimeLeft(osce.timeMinutes * 60);
    setTimerRunning(false);
    setMarkedItems({});
    setExpandedCategories({});
    setActiveDebriefSection(0);
  }

  function handleBackToLibrary(e: React.MouseEvent) {
    if (phase === "active" || phase === "marking") {
      const ok = window.confirm(
        "Leave this station? Your chat and any marks will be lost. This cannot be undone."
      );
      if (!ok) {
        e.preventDefault();
        return;
      }
      clearSession();
    }
  }

  function getGrade(percent: number): { label: string; color: string } {
    const pm = osce.passMark ?? 60;
    if (percent >= 85) return { label: "Distinction", color: "text-emerald-600" };
    if (percent >= 70) return { label: "Credit", color: "text-blue-600" };
    if (percent >= pm) return { label: "Pass", color: "text-teal-600" };
    return { label: "Fail", color: "text-red-600" };
  }

  const grade = getGrade(scorePercent);
  const timerWarning = timeLeft < 90 && timeLeft > 0;
  const timerExpired = timeLeft === 0;

  const debriefIcons: Record<string, typeof Info> = {
    info: Info,
    warning: AlertTriangle,
    tip: Lightbulb,
    diagnosis: Award,
  };

  const debriefColors: Record<string, string> = {
    info: "bg-blue-50 border-blue-100 text-blue-800",
    warning: "bg-amber-50 border-amber-100 text-amber-800",
    tip: "bg-green-50 border-green-100 text-green-800",
    diagnosis: "bg-purple-50 border-purple-100 text-purple-800",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Station header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/cases"
              onClick={handleBackToLibrary}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
            </Link>
            <div className="min-w-0">
              <h1 className="font-bold text-navy-900 text-sm truncate">{osce.title}</h1>
              <p className="text-xs text-slate-500 truncate">{osce.specialty} · {osce.type} · {osce.difficulty}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {phase === "active" && (
              <div
                className={clsx(
                  "font-mono font-bold text-sm px-3 py-1.5 rounded-lg",
                  timerExpired
                    ? "bg-red-100 text-red-700"
                    : timerWarning
                    ? "bg-amber-100 text-amber-700 timer-warning"
                    : "bg-slate-100 text-slate-700"
                )}
              >
                <Clock className="w-3.5 h-3.5 inline mr-1" />
                {formatTime(timeLeft)}
              </div>
            )}

            {phase === "active" && (
              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  aiMode && apiKey
                    ? "bg-teal-100 text-teal-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
                title="AI patient mode"
              >
                {aiMode && apiKey ? <Zap className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                {aiMode && apiKey ? "AI Active" : "Enable AI"}
              </button>
            )}

            {phase === "active" && (
              <button onClick={goToMarking} className="btn-primary text-sm py-1.5 px-4">
                Finish Station
              </button>
            )}

            {phase !== "briefing" && (
              <button onClick={() => resetStation()} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Reset station">
                <RefreshCw className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>
        </div>

        {showApiKeyInput && (
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 max-w-xl">
              <div className="flex-1">
                <input
                  type="password"
                  placeholder="Enter your Anthropic API key (sk-ant-...)"
                  value={apiKey}
                  onChange={(e) => setApiKeyState(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
              </div>
              <button
                onClick={() => {
                  persistApiKey(apiKey);
                  setAiMode(!!apiKey);
                  setShowApiKeyInput(false);
                }}
                className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                {apiKey ? "Enable AI" : "Use Scripted"}
              </button>
              <p className="text-xs text-slate-500 shrink-0">Stored locally only</p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ─────────── BRIEFING PHASE ─────────── */}
        {phase === "briefing" && (
          <div className="max-w-3xl mx-auto">
            <div className="card overflow-hidden mb-6">
              <div className="gradient-navy px-6 py-4 text-white">
                <p className="text-xs text-teal-300 font-semibold uppercase tracking-wide mb-1">Candidate Brief</p>
                <h2 className="text-xl font-bold">{osce.title}</h2>
              </div>
              <div className="p-6">
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                  {osce.candidateBrief}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="card p-4 text-center">
                <p className="text-2xl font-extrabold text-navy-900">{osce.timeMinutes}</p>
                <p className="text-xs text-slate-500 mt-1">Minutes</p>
              </div>
              <div className="card p-4 text-center">
                <p className="text-2xl font-extrabold text-navy-900">{totalMarks}</p>
                <p className="text-xs text-slate-500 mt-1">Total marks</p>
              </div>
              <div className="card p-4 text-center">
                <p className="text-2xl font-extrabold text-navy-900">{osce.passMark}%</p>
                <p className="text-xs text-slate-500 mt-1">Pass mark</p>
              </div>
            </div>

            <div className="card p-5 mb-6">
              <p className="text-sm font-semibold text-navy-900 mb-3">Select practice mode</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStudyMode(true)}
                  className={clsx(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    studyMode ? "border-teal-500 bg-teal-50" : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span className="font-semibold text-sm text-navy-900">Study Mode</span>
                  </div>
                  <p className="text-xs text-slate-500">Teaching points visible. Take as long as you need.</p>
                </button>
                <button
                  onClick={() => setStudyMode(false)}
                  className={clsx(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    !studyMode ? "border-navy-500 bg-navy-50" : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-navy-600" />
                    <span className="font-semibold text-sm text-navy-900">Exam Mode</span>
                  </div>
                  <p className="text-xs text-slate-500">Timed. No hints. Mirrors real OSCE conditions.</p>
                </button>
              </div>
            </div>

            <button
              onClick={startStation}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-navy-700 text-white font-bold text-base rounded-xl hover:opacity-95 transition-opacity shadow-lg flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Start Station — {osce.timeMinutes} minute timer begins
            </button>
          </div>
        )}

        {/* ─────────── ACTIVE PHASE ─────────── */}
        {phase === "active" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1">
              <div className="card p-5 sticky top-36">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-600 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                    {osce.patientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm">{osce.patientName}</p>
                    <p className="text-xs text-slate-500">{osce.patientAge} y/o · {osce.patientGender}</p>
                    <p className="text-xs text-slate-500">{osce.patientOccupation}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-700 mb-2">Setting:</p>
                  <p className="leading-relaxed">{osce.settingDescription}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className={clsx(
                    "flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg",
                    aiMode && apiKey ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {aiMode && apiKey ? (
                      <><Zap className="w-3.5 h-3.5" /> AI patient mode active</>
                    ) : (
                      <><Bot className="w-3.5 h-3.5" /> Scripted patient mode</>
                    )}
                  </div>
                </div>

                {studyMode && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1 mb-1">
                      <Lightbulb className="w-3.5 h-3.5" /> Study mode tip
                    </p>
                    <p className="text-xs text-amber-700">
                      Ask open questions first, then follow up. Use the marking scheme tab to stay on track.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col h-[600px]">
              <div className="card flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto p-5 space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={clsx(
                        "chat-bubble flex gap-2.5 max-w-[85%]",
                        msg.role === "student" ? "ml-auto flex-row-reverse" : "mr-auto"
                      )}
                    >
                      <div
                        className={clsx(
                          "w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5",
                          msg.role === "student" ? "bg-navy-600" : "bg-teal-600"
                        )}
                      >
                        {msg.role === "student" ? <User className="w-3.5 h-3.5" /> : <span>{osce.patientName.charAt(0)}</span>}
                      </div>
                      <div
                        className={clsx(
                          "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                          msg.role === "student"
                            ? "bg-navy-700 text-white rounded-tr-md"
                            : "bg-white border border-slate-100 text-slate-800 rounded-tl-md shadow-sm"
                        )}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="chat-bubble flex gap-2.5 max-w-[85%] mr-auto">
                      <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {osce.patientName.charAt(0)}
                      </div>
                      <div className="px-4 py-3 rounded-2xl bg-white border border-slate-100 shadow-sm rounded-tl-md">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full bg-slate-300"
                              style={{ animation: `bounce 1.2s ${i * 0.2}s infinite` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {timerExpired && (
                  <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-center">
                    <p className="text-xs font-semibold text-red-600">Time is up — station complete. Finish the consultation and proceed to marking.</p>
                  </div>
                )}

                <div className="p-4 border-t border-slate-100">
                  <div className="flex gap-3">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your question or statement to the patient... (Enter to send, Shift+Enter for new line)"
                      rows={2}
                      className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 resize-none transition-colors"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || isTyping}
                      className="px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-colors flex items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 px-1">
                    {aiMode && apiKey
                      ? "AI patient mode — dynamic responses"
                      : "Scripted patient mode — keyword-matched responses"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────── MARKING PHASE ─────────── */}
        {phase === "marking" && (
          <div className="max-w-4xl mx-auto">
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold text-navy-900 mb-2">Self-Assessment Marking</h2>
              <p className="text-sm text-slate-600 mb-4">
                Go through each criterion honestly. Click an item to award marks. This is how you improve.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Current score</p>
                  <p className="text-4xl font-extrabold text-navy-900">
                    {awardedMarks}
                    <span className="text-xl text-slate-400 font-normal"> / {totalMarks}</span>
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-3xl font-extrabold ${grade.color}`}>{scorePercent}%</p>
                  <p className={`text-sm font-semibold ${grade.color}`}>{grade.label}</p>
                  <p className="text-xs text-slate-500">Pass mark: {osce.passMark}%</p>
                </div>
                <div className="w-full sm:w-40 bg-slate-200 rounded-full h-3">
                  <div
                    className={clsx(
                      "h-3 rounded-full transition-all duration-500",
                      scorePercent >= osce.passMark ? "bg-teal-500" : "bg-red-400"
                    )}
                    style={{ width: `${scorePercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {osce.markingCategories.map((cat) => {
                const catTotal = cat.items.reduce((s, i) => s + i.marks, 0);
                const catAwarded = cat.items.reduce((s, i) => s + (markedItems[i.id] ?? 0), 0);
                const isExpanded = expandedCategories[cat.id] !== false;

                return (
                  <div key={cat.id} className="card overflow-hidden">
                    <button
                      onClick={() => setExpandedCategories((prev) => ({ ...prev, [cat.id]: !isExpanded }))}
                      className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-navy-900">{cat.name}</span>
                        <span className="text-xs text-slate-500">{catAwarded}/{catTotal} marks</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-slate-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-teal-500 transition-all"
                            style={{ width: `${catTotal > 0 ? (catAwarded / catTotal) * 100 : 0}%` }}
                          />
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-slate-100 divide-y divide-slate-50">
                        {cat.items.map((item) => {
                          const awarded = markedItems[item.id] ?? 0;

                          return (
                            <div key={item.id} className="px-5 py-4">
                              <div className="flex items-start gap-3">
                                <div className="flex gap-1 shrink-0 mt-0.5">
                                  {Array.from({ length: item.marks + 1 }, (_, i) => (
                                    <button
                                      key={i}
                                      onClick={() => setMarkedItems((prev) => ({ ...prev, [item.id]: i }))}
                                      className={clsx(
                                        "w-7 h-7 rounded-lg text-xs font-bold transition-all border",
                                        markedItems[item.id] === i
                                          ? i === 0
                                            ? "bg-slate-100 border-slate-300 text-slate-600"
                                            : i === item.marks
                                            ? "bg-teal-500 border-teal-500 text-white"
                                            : "bg-amber-400 border-amber-400 text-white"
                                          : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                                      )}
                                    >
                                      {i}
                                    </button>
                                  ))}
                                </div>

                                <div className="flex-1">
                                  <p className="text-sm text-slate-800 font-medium leading-snug">{item.description}</p>
                                  {item.detail && (
                                    <p className="text-xs text-slate-500 mt-1 italic">{item.detail}</p>
                                  )}
                                  {studyMode && item.teachingPoint && (
                                    <div className="mt-2 p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
                                      <p className="text-xs text-amber-800 leading-relaxed">
                                        <Lightbulb className="w-3 h-3 inline mr-1" />
                                        {item.teachingPoint}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <div className="text-xs font-bold text-slate-500 shrink-0">/{item.marks}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={goToDebrief}
              className="w-full py-4 bg-gradient-to-r from-teal-600 to-navy-700 text-white font-bold text-base rounded-xl hover:opacity-95 transition-opacity shadow-lg flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              View Expert Debrief &amp; Teaching Points
            </button>
          </div>
        )}

        {/* ─────────── DEBRIEF PHASE ─────────── */}
        {phase === "debrief" && (
          <div className="max-w-4xl mx-auto">
            <div className={clsx(
              "rounded-2xl p-6 mb-6 text-white",
              scorePercent >= osce.passMark ? "gradient-teal" : "bg-gradient-to-br from-red-600 to-red-800"
            )}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5" />
                    <p className="font-semibold text-sm opacity-90">Station Complete</p>
                  </div>
                  <h2 className="text-2xl font-extrabold">{grade.label}</h2>
                  <p className="text-sm opacity-80 mt-1">
                    {awardedMarks} / {totalMarks} marks · {scorePercent}% · Pass mark: {osce.passMark}%
                  </p>
                </div>
                <div className="text-center glass rounded-2xl px-8 py-4">
                  <p className="text-5xl font-extrabold">{scorePercent}%</p>
                </div>
              </div>
            </div>

            <div className="card p-5 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-navy-900">Diagnosis / Clinical Answer</h3>
              </div>
              <p className="text-sm font-semibold text-purple-800 bg-purple-50 rounded-xl px-4 py-3 mb-3">
                {osce.diagnosis}
              </p>
              {osce.differentialDiagnoses.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2">Key differentials:</p>
                  <ul className="space-y-1">
                    {osce.differentialDiagnoses.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <ChevronDown className="w-3 h-3 mt-0.5 text-slate-400 rotate-[-90deg]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {osce.debriefSections.map((section, i) => {
                const Icon = debriefIcons[section.type] ?? Info;
                const colorClass = debriefColors[section.type] ?? debriefColors.info;
                return (
                  <div key={i} className={`rounded-2xl border p-5 ${colorClass}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4" />
                      <h3 className="font-bold text-sm">{section.heading}</h3>
                    </div>
                    <p className="text-sm leading-relaxed">{section.content}</p>
                  </div>
                );
              })}
            </div>

            <div className="card p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-navy-900">Key Learning Points</h3>
              </div>
              <ul className="space-y-2.5">
                {osce.keyLearningPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {osce.australianContext && (
              <div className="card p-5 mb-6 border-l-4 border-l-green-500">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🇦🇺</span>
                  <h3 className="font-bold text-navy-900">Australian Clinical Context</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{osce.australianContext}</p>
                {osce.relevantGuidelines && osce.relevantGuidelines.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Relevant guidelines:</p>
                    <ul className="space-y-1">
                      {osce.relevantGuidelines.map((g, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <BookOpen className="w-3 h-3 text-slate-400" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="card p-5 mb-6">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-slate-500" />
                Your Marking Breakdown
              </h3>
              <div className="space-y-3">
                {osce.markingCategories.map((cat) => {
                  const catTotal = cat.items.reduce((s, i) => s + i.marks, 0);
                  const catAwarded = cat.items.reduce((s, i) => s + (markedItems[i.id] ?? 0), 0);
                  const pct = catTotal > 0 ? Math.round((catAwarded / catTotal) * 100) : 0;
                  return (
                    <div key={cat.id} className="flex items-center gap-3">
                      <div className="w-36 text-xs text-slate-600 font-medium truncate">{cat.name}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={clsx("h-2 rounded-full", pct >= osce.passMark ? "bg-teal-500" : "bg-red-400")}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-xs font-semibold text-slate-700 w-16 text-right">
                        {catAwarded}/{catTotal} ({pct}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={() => resetStation(true)} className="btn-secondary justify-center py-3">
                <RefreshCw className="w-4 h-4" /> Retry this station
              </button>
              <Link href="/cases" className="btn-primary justify-center py-3">
                Next case <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
