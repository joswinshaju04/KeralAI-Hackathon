import React from 'react';
import { Activity, Phone, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ lang }) {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black shadow-sm">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-slate-900">KeramPulse</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Consolidated commodity market intelligence and real-time price monitoring across all 14 districts of Kerala.
            </p>
          </div>

          {/* Kerala Agri Helplines */}
          <div className="space-y-2">
            <h4 className="text-slate-900 font-bold uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              Kerala Agri Helplines
            </h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              <li>Karshaka Toll Free: <strong className="text-emerald-700">1800-425-1661</strong></li>
              <li>Rubber Board Kottayam: <strong className="text-slate-900">0481-2301231</strong></li>
              <li>Spices Board Idukki: <strong className="text-slate-900">04868-272209</strong></li>
              <li>Matsyafed Fishing Call: <strong className="text-slate-900">0471-2461587</strong></li>
            </ul>
          </div>

          {/* Market Coverage */}
          <div className="space-y-2">
            <h4 className="text-slate-900 font-bold uppercase text-[11px] tracking-wider mb-2">
              Market Coverage
            </h4>
            <ul className="space-y-1 text-slate-600 font-medium">
              <li>Mattancherry Commodity Hub</li>
              <li>Vatakara Copra APMC</li>
              <li>Kottayam Rubber Exchange</li>
              <li>Neendakara Fishing Harbor</li>
              <li>Kalpetta & Nedumangad Mandis</li>
            </ul>
          </div>

          {/* Target Personas Supported */}
          <div className="space-y-2">
            <h4 className="text-slate-900 font-bold uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Built For
            </h4>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 font-bold">Farmers</span>
              <span className="px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 font-bold">Traders</span>
              <span className="px-2.5 py-1 bg-teal-50 rounded-lg border border-teal-200 text-teal-800 font-bold">Cooperatives</span>
              <span className="px-2.5 py-1 bg-cyan-50 rounded-lg border border-cyan-200 text-cyan-800 font-bold">Consumers</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © 2026 KeramPulse Kerala. Powered by APMC & Matsyafed market feeds.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted for Kerala Agriculture & Coastal Ecosystems</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
