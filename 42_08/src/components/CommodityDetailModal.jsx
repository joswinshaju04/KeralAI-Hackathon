import React from 'react';
import { X, ShieldAlert, Sparkles, Building2, Store, Sprout, TrendingUp, Info } from 'lucide-react';

export default function CommodityDetailModal({ commodity, onClose, lang, persona, t }) {
  if (!commodity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] relative text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
              {lang === 'ml' ? commodity.categoryNameMl : commodity.categoryNameEn}
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              {lang === 'ml' ? commodity.nameMl : commodity.name}
            </h2>
          </div>
        </div>

        {/* Quality Spec Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-teal-600" />
            {t.modal.grade}
          </div>
          <p className="text-sm font-bold text-emerald-900">
            {commodity.grade}
          </p>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Primary District Hub: <strong className="text-slate-900">{commodity.primaryDistrict}</strong> | Daily Volume: <strong className="text-slate-900">{commodity.volume}</strong>
          </p>
        </div>

        {/* Price Spread Comparison */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          {t.modal.spread}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
              <Sprout className="w-4 h-4 text-emerald-600" />
              {t.modal.farmgate}
            </div>
            <div className="text-xl font-black text-emerald-950">
              ₹{commodity.farmgatePrice.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">Direct Farmer Payout</div>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
              <Building2 className="w-4 h-4 text-amber-600" />
              {t.modal.mandi}
            </div>
            <div className="text-xl font-black text-amber-950">
              ₹{commodity.mandiPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">APMC Wholesale Rate</div>
          </div>

          <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-200">
            <div className="flex items-center gap-2 text-teal-800 text-xs font-bold mb-1">
              <Store className="w-4 h-4 text-teal-600" />
              {t.modal.retail}
            </div>
            <div className="text-xl font-black text-teal-950">
              ₹{commodity.retailPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-teal-700 font-medium mt-1">Consumer Retail Market</div>
          </div>
        </div>

        {/* Persona Tailored Advisory Note */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 rounded-2xl border border-emerald-200 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            {t.modal.advisory} ({t.personas[persona]})
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {commodity.advisory[persona]}
          </p>
        </div>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md text-xs"
        >
          {t.modal.close}
        </button>
      </div>
    </div>
  );
}
