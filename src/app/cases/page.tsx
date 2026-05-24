"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, Clock, Target, ChevronRight, BookOpen, Stethoscope } from "lucide-react";
import { allCases } from "@/data/cases";
import { CaseType, Difficulty, Specialty } from "@/lib/types";
import clsx from "clsx";

const TYPE_LABELS: Record<CaseType, { label: string; color: string; icon: string }> = {
  history: { label: "History", color: "bg-blue-100 text-blue-700", icon: "📋" },
  examination: { label: "Examination", color: "bg-green-100 text-green-700", icon: "🩺" },
  communication: { label: "Communication", color: "bg-purple-100 text-purple-700", icon: "💬" },
  psychiatry: { label: "Psychiatry", color: "bg-indigo-100 text-indigo-700", icon: "🧠" },
  counselling: { label: "Counselling", color: "bg-teal-100 text-teal-700", icon: "🤝" },
  procedural: { label: "Procedural", color: "bg-orange-100 text-orange-700", icon: "⚙️" },
};

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  "Year 3": "bg-emerald-100 text-emerald-700",
  "Year 4": "bg-amber-100 text-amber-700",
  "Year 5": "bg-orange-100 text-orange-700",
  Intern: "bg-red-100 text-red-700",
  AMC: "bg-purple-100 text-purple-700",
};

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<CaseType | "all">("all");
  const [selectedDiff, setSelectedDiff] = useState<Difficulty | "all">("all");

  const types = Array.from(new Set(allCases.map((c) => c.type)));
  const difficulties = Array.from(new Set(allCases.map((c) => c.difficulty)));

  const filtered = useMemo(() => {
    return allCases.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.specialty.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchType = selectedType === "all" || c.type === selectedType;
      const matchDiff = selectedDiff === "all" || c.difficulty === selectedDiff;
      return matchSearch && matchType && matchDiff;
    });
  }, [search, selectedType, selectedDiff]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">OSCE Case Library</h1>
        <p className="text-slate-600">
          {allCases.length} stations across {new Set(allCases.map((c) => c.specialty)).size} specialties. Each case
          includes a full marking scheme and expert clinical debrief.
        </p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic, specialty, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-colors"
          />
        </div>

        {/* Type filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as CaseType | "all")}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 text-slate-700"
        >
          <option value="all">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]?.label ?? t}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={selectedDiff}
          onChange={(e) => setSelectedDiff(e.target.value as Difficulty | "all")}
          className="px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 text-slate-700"
        >
          <option value="all">All Levels</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        Showing {filtered.length} of {allCases.length} stations
      </p>

      {/* Cases grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="font-semibold">No cases match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search or clearing the filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => {
            const typeInfo = TYPE_LABELS[c.type];
            return (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="card overflow-hidden hover:shadow-lg transition-all duration-200 group block"
              >
                {/* Top accent */}
                <div className="h-1.5 gradient-teal" />

                <div className="p-5">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`badge ${typeInfo?.color ?? "bg-slate-100 text-slate-600"}`}>
                      {typeInfo?.icon} {typeInfo?.label}
                    </span>
                    <span className={`badge ${DIFFICULTY_COLORS[c.difficulty]}`}>{c.difficulty}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-navy-900 text-base mb-1.5 group-hover:text-teal-700 transition-colors leading-snug">
                    {c.title}
                  </h3>

                  {/* Specialty */}
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    <Stethoscope className="w-3 h-3 inline mr-1" />
                    {c.specialty}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {c.timeMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5" />
                        Pass: {c.passMark}%
                      </span>
                    </div>
                    <span className="text-teal-600 text-sm font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                      Open <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Coming soon banner */}
      <div className="mt-12 gradient-navy text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-lg">More stations coming soon</p>
          <p className="text-slate-300 text-sm mt-1">
            Paediatrics, O&G, Neurology, Dermatology, and more specialties are in development.
          </p>
        </div>
        <div className="shrink-0 px-5 py-2.5 glass rounded-xl text-sm font-semibold cursor-default">
          Stay tuned →
        </div>
      </div>
    </div>
  );
}
