"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { getProgress, clearAttempt } from "@/lib/progress";
import { getCaseById } from "@/data/cases";
import { UserProgress, CaseAttempt } from "@/lib/types";
import clsx from "clsx";

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  function handleClearAttempt(caseId: string) {
    clearAttempt(caseId);
    setProgress(getProgress());
  }

  if (!progress) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-500">
        Loading progress...
      </div>
    );
  }

  const completed = progress.attempts.filter((a) => a.completedAt && a.totalScore !== undefined);
  const avgScore =
    completed.length > 0
      ? Math.round(
          completed.reduce((sum, a) => sum + (a.totalScore! / (a.maxScore || 1)) * 100, 0) / completed.length
        )
      : 0;

  function getGradeColor(pct: number, passMark: number = 60): string {
    if (pct >= 85) return "text-emerald-600";
    if (pct >= 70) return "text-blue-600";
    if (pct >= passMark) return "text-teal-600";
    return "text-red-500";
  }

  function getGradeLabel(pct: number, passMark: number = 60): string {
    if (pct >= 85) return "Distinction";
    if (pct >= 70) return "Credit";
    if (pct >= passMark) return "Pass";
    return "Fail";
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">My Progress</h1>
        <p className="text-slate-600">Your OSCE practice history and performance analytics.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: BookOpen,
            label: "Cases Attempted",
            value: progress.attempts.length,
            color: "text-navy-600",
            bg: "bg-navy-50",
          },
          {
            icon: CheckCircle2,
            label: "Completed",
            value: completed.length,
            color: "text-teal-600",
            bg: "bg-teal-50",
          },
          {
            icon: BarChart3,
            label: "Average Score",
            value: `${avgScore}%`,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            icon: Award,
            label: "Pass Rate",
            value: completed.length > 0
              ? `${Math.round((completed.filter((a) => (a.totalScore! / (a.maxScore || 1)) * 100 >= 60).length / completed.length) * 100)}%`
              : "—",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-extrabold text-navy-900">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {progress.attempts.length === 0 ? (
        <div className="card p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-navy-900 mb-2">No cases attempted yet</h2>
          <p className="text-slate-500 text-sm mb-6">
            Start practising OSCE stations to track your progress here.
          </p>
          <Link href="/cases" className="btn-teal">
            Browse Cases <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold text-navy-900 mb-4">Station History</h2>
          <div className="space-y-3">
            {progress.attempts
              .slice()
              .reverse()
              .map((attempt) => {
                const caseData = getCaseById(attempt.caseId);
                if (!caseData) return null;
                const pct =
                  attempt.totalScore !== undefined && attempt.maxScore
                    ? Math.round((attempt.totalScore / attempt.maxScore) * 100)
                    : null;

                return (
                  <div key={attempt.caseId} className="card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-navy-900 text-sm truncate">{caseData.title}</h3>
                        {attempt.mode === "exam" && (
                          <span className="badge bg-navy-100 text-navy-700 shrink-0">Exam</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {caseData.specialty} · {new Date(attempt.startedAt).toLocaleDateString("en-AU")}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {pct !== null ? (
                        <div className="text-right">
                          <p className={`text-xl font-extrabold ${getGradeColor(pct, caseData.passMark)}`}>
                            {pct}%
                          </p>
                          <p className={`text-xs font-semibold ${getGradeColor(pct, caseData.passMark)}`}>
                            {getGradeLabel(pct, caseData.passMark)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">In progress</p>
                      )}

                      <div className="flex gap-2">
                        <Link
                          href={`/cases/${attempt.caseId}`}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Retry case"
                        >
                          <RefreshCw className="w-4 h-4 text-slate-500" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-8 text-center">
            <Link href="/cases" className="btn-teal">
              Practice Another Station <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
