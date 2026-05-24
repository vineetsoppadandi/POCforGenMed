import Link from "next/link";
import { Stethoscope, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-navy-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white">OSCE<span className="text-teal-400">ready</span></span>
                <p className="text-[10px] text-slate-500 tracking-wide uppercase">Australia</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AI-powered OSCE preparation for Australian medical students. Practice with realistic simulated patients, structured marking schemes, and expert clinical feedback.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Aligned with AMC, RACGP, RACS, and RACP guidelines.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Practice</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/cases" className="hover:text-white transition-colors">All Cases</Link></li>
              <li><Link href="/cases?type=history" className="hover:text-white transition-colors">History Taking</Link></li>
              <li><Link href="/cases?type=examination" className="hover:text-white transition-colors">Examinations</Link></li>
              <li><Link href="/cases?type=communication" className="hover:text-white transition-colors">Communication</Link></li>
              <li><Link href="/cases?type=counselling" className="hover:text-white transition-colors">Counselling</Link></li>
              <li><Link href="/cases?type=psychiatry" className="hover:text-white transition-colors">Psychiatry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">My Progress</Link></li>
              <li><a href="https://www.amc.org.au" target="_blank" rel="noopener" className="hover:text-white transition-colors">AMC Guidelines</a></li>
              <li><a href="https://www.racgp.org.au" target="_blank" rel="noopener" className="hover:text-white transition-colors">RACGP</a></li>
              <li><a href="https://www.beyondblue.org.au" target="_blank" rel="noopener" className="hover:text-white transition-colors">Beyond Blue</a></li>
              <li><a href="https://www.cancercouncil.com.au" target="_blank" rel="noopener" className="hover:text-white transition-colors">Cancer Council AU</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} OSCEready Australia. Educational use only — not a substitute for clinical training.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-400 fill-current" /> for Australian medical students
          </p>
        </div>
      </div>
    </footer>
  );
}
