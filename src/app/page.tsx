import Link from "next/link";
import {
  Stethoscope,
  Brain,
  Clock,
  CheckCircle2,
  ChevronRight,
  Target,
  BookOpen,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Heart,
  Activity,
  UserCheck,
  Play,
  MessageCircle,
} from "lucide-react";
import { allCases } from "@/data/cases";

const SPECIALTIES = [
  { name: "Emergency", icon: "🚨", count: 2, color: "bg-red-50 border-red-100 text-red-700" },
  { name: "Cardiology", icon: "❤️", count: 3, color: "bg-pink-50 border-pink-100 text-pink-700" },
  { name: "Surgery", icon: "⚕️", count: 2, color: "bg-orange-50 border-orange-100 text-orange-700" },
  { name: "Psychiatry", icon: "🧠", count: 3, color: "bg-purple-50 border-purple-100 text-purple-700" },
  { name: "General Practice", icon: "🏥", count: 4, color: "bg-blue-50 border-blue-100 text-blue-700" },
  { name: "Oncology", icon: "🎗️", count: 2, color: "bg-teal-50 border-teal-100 text-teal-700" },
  { name: "Paediatrics", icon: "👶", count: 3, color: "bg-yellow-50 border-yellow-100 text-yellow-700" },
  { name: "Respiratory", icon: "🫁", count: 2, color: "bg-sky-50 border-sky-100 text-sky-700" },
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Realistic Simulated Patients",
    desc: "Practice with scripted patients or enable AI mode for dynamic, Claude-powered conversations that respond naturally to any question you ask.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: CheckCircle2,
    title: "Structured Marking Schemes",
    desc: "Aligned with Australian medical school standards. Mark yourself against detailed criteria and see exactly what you missed.",
    color: "text-navy-600",
    bg: "bg-navy-50",
  },
  {
    icon: Clock,
    title: "Timed Exam Conditions",
    desc: "Practise under real OSCE conditions with configurable timers. Study mode provides hints; Exam mode mirrors the real thing.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: BookOpen,
    title: "Expert Clinical Debrief",
    desc: "Every station includes teaching points, differentials, Australian guidelines, and what examiners are really looking for.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    desc: "Track your performance across specialties, identify weak areas, and see your improvement over time.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Australian Context",
    desc: "Every case references PBS medications, Australian guidelines (RACGP, RACP, RACS), and the local healthcare system.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

const STEPS = [
  { step: "01", title: "Choose a Station", desc: "Browse cases by specialty, type, or difficulty. Filter for history-taking, examination, communication, or counselling." },
  { step: "02", title: "Read the Brief", desc: "Study your candidate brief and patient info. When ready, start the timer and enter the consultation." },
  { step: "03", title: "Interact with the Patient", desc: "Type your questions or statements. The patient responds naturally — scripted or AI-powered." },
  { step: "04", title: "Self-Assess", desc: "Work through the structured marking scheme. Be honest — this is how you improve." },
  { step: "05", title: "Review & Learn", desc: "Read the debrief: teaching points, Australian guidelines, what you missed, and what the examiner was looking for." },
];

// TODO (next step): Collect real student testimonials once the platform has active users.
// This requires a backend or form submission pipeline — not applicable to the current static build.
// When ready, replace this placeholder section with genuine, attributed reviews.

export default function HomePage() {
  const sampleCases = allCases.slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm font-medium text-teal-300 mb-6">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered OSCE Practice — Built for Australia
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Become the doctor
              <br />
              <span className="text-gradient">your patients deserve</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
              Practice OSCE stations with clinically accurate simulated patients. Master history-taking, examinations, breaking bad news, and counselling — with expert debrief and Australian guidelines built in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/cases"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-teal-500/25 text-base"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Practising Free
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass hover:bg-white/15 text-white font-semibold rounded-xl transition-all duration-200 text-base"
              >
                How it works
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "6+", label: "OSCE Stations" },
                { value: "12+", label: "Specialties" },
                { value: "AMC", label: "Aligned" },
                { value: "Free", label: "to Start" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating mock station preview */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80 glass rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-teal-400 font-semibold uppercase tracking-wide">Active Station</p>
              <p className="text-white font-bold text-sm">Chest Pain History</p>
            </div>
            <div className="bg-red-500/20 text-red-300 text-sm font-bold px-2.5 py-1 rounded-lg">
              06:42
            </div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="bg-white/10 rounded-lg p-2.5 text-xs text-slate-300">
              <span className="text-teal-400 font-medium">You:</span> Where exactly is the pain?
            </div>
            <div className="bg-white/5 rounded-lg p-2.5 text-xs text-slate-300">
              <span className="text-amber-400 font-medium">Patient:</span> Right in the middle of my chest — like something is sitting on me...
            </div>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Activity className="w-3 h-3" /> Scripted patient active
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <div className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium text-slate-600">
            {["History Taking", "Clinical Examination", "Breaking Bad News", "Mental Health", "GP Counselling", "Australian Guidelines", "AMC Aligned"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">Everything you need to ace your OSCE</h2>
            <p className="section-sub max-w-2xl mx-auto">
              Designed by clinicians for the realities of Australian medical education — not generic international content.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-bold text-navy-900 text-base mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="section-heading mb-2">Featured OSCE Stations</h2>
              <p className="text-slate-600">Clinically accurate, examiner-designed, and Australian-specific.</p>
            </div>
            <Link href="/cases" className="btn-secondary text-sm whitespace-nowrap">
              View all cases <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleCases.map((c) => (
              <div key={c.id} className="card overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-2 gradient-teal" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge bg-teal-50 text-teal-700 border border-teal-100">{c.specialty}</span>
                    <span className="badge bg-slate-100 text-slate-600">{c.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-2 group-hover:text-teal-700 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{c.candidateBrief.split("\n")[0].replace(/^\*\*.*\*\*\n?/, '')}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {c.timeMinutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" />
                      {c.type}
                    </span>
                  </div>
                  <Link
                    href={`/cases/${c.id}`}
                    className="block text-center py-2 text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                  >
                    Open Station →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">How OSCEready works</h2>
            <p className="section-sub max-w-xl mx-auto">Five simple steps to structured, effective OSCE preparation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="card p-5 text-center h-full">
                  <div className="w-12 h-12 gradient-navy text-white text-lg font-extrabold rounded-xl flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialties" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-heading mb-4">Specialties covered</h2>
            <p className="section-sub max-w-xl mx-auto">From Emergency to Psychiatry — all major OSCE domains represented.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SPECIALTIES.map((s) => (
              <Link
                key={s.name}
                href={`/cases?specialty=${encodeURIComponent(s.name)}`}
                className={`card p-4 text-center hover:shadow-md transition-all border ${s.color} group`}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="font-semibold text-sm">{s.name}</p>
                <p className="text-xs opacity-70 mt-1">{s.count} stations</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Student Reviews — coming soon once real feedback is collected */}
      <section className="py-20 bg-navy-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-7 h-7 text-teal-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Student reviews</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-6 leading-relaxed">
            We&apos;re in early access. Once students have had a chance to practise, real reviews will appear here.
          </p>
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-slate-300 font-medium">
            Coming soon — be the first to share your experience
          </span>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-navy-800 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to ace your OSCE?</h2>
          <p className="text-lg text-teal-100 mb-8 leading-relaxed">
            Start with our free OSCE stations today. No account required. Your progress is saved locally so you can pick up where you left off.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cases"
              className="px-8 py-4 bg-white text-navy-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-xl text-base"
            >
              Browse All Stations →
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 glass hover:bg-white/15 text-white font-semibold rounded-xl transition-all text-base"
            >
              View My Progress
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
