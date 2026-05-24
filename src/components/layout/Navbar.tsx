"use client";

import { useState } from "react";
import Link from "next/link";
import { Stethoscope, Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-navy-700 to-teal-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-navy-900 tracking-tight">OSCE<span className="text-teal-600">ready</span></span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Australia</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/cases">Case Library</NavLink>
            <NavLink href="/dashboard">My Progress</NavLink>
            <NavLink href="/#how-it-works">How It Works</NavLink>
            <NavLink href="/#specialties">Specialties</NavLink>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/cases"
              className="px-4 py-2 text-sm font-semibold text-navy-700 hover:bg-navy-50 rounded-lg transition-colors"
            >
              Browse Cases
            </Link>
            <Link
              href="/cases"
              className="px-4 py-2 text-sm font-semibold bg-navy-800 text-white rounded-lg hover:bg-navy-900 transition-colors shadow-sm"
            >
              Start Practising →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          <MobileNavLink href="/cases" onClick={() => setMobileOpen(false)}>Case Library</MobileNavLink>
          <MobileNavLink href="/dashboard" onClick={() => setMobileOpen(false)}>My Progress</MobileNavLink>
          <MobileNavLink href="/#how-it-works" onClick={() => setMobileOpen(false)}>How It Works</MobileNavLink>
          <MobileNavLink href="/#specialties" onClick={() => setMobileOpen(false)}>Specialties</MobileNavLink>
          <div className="pt-3 border-t border-slate-100 mt-3">
            <Link
              href="/cases"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-2.5 bg-navy-800 text-white font-semibold rounded-xl text-sm"
            >
              Start Practising →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy-800 hover:bg-slate-50 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}
