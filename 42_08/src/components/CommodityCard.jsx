import React from 'react';
import { TrendingUp, TrendingDown, Eye, MapPin, Tag, ShieldCheck } from 'lucide-react';

export default function CommodityCard({ commodity, onSelect, lang, persona, selectedDistrict, t }) {
  const isPositive = commodity.change24h >= 0;

  // Determine key price display according to active user persona & district filter selection
  let displayPrice = commodity.mandiPrice;
  let priceLabel = t.dashboard.tableHeaders.mandiPrice;

  // If a specific district is selected, fetch that district's specific price!
  if (selectedDistrict && selectedDistrict !== 'all' && commodity.districtPrices) {
    displayPrice = commodity.districtPrices[selectedDistrict] || displayPrice;
  } else if (persona === 'farmer') {
    displayPrice = commodity.farmgatePrice;
    priceLabel = t.dashboard.tableHeaders.farmgatePrice;
  } else if (persona === 'consumer') {
    displayPrice = commodity.retailPrice;
    priceLabel = t.dashboard.tableHeaders.retailPrice;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 transition-all duration-300 p-5 flex flex-col justify-between group hover:shadow-xl hover:shadow-slate-200/60 text-slate-900">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70 mb-1.5">
              <Tag className="w-3 h-3 text-emerald-600" />
              {lang === 'ml' ? commodity.categoryNameMl : commodity.categoryNameEn}
            </span>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {lang === 'ml' ? commodity.nameMl : commodity.name}
            </h3>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? '+' : ''}{commodity.change24hPercent}%
          </span>
        </div>

        {/* Grade Specification Badge */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span className="truncate font-medium">{commodity.grade}</span>
        </div>

        {/* Price Information */}
        <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 mb-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
            {priceLabel}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">
              ₹{displayPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ {commodity.unit}</span>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-200/60 text-[11px]">
            <span className="text-slate-600 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-amber-500" />
              {commodity.primaryDistrict} Hub
            </span>
            <span className="text-slate-600 font-medium">
              Vol: <strong className="text-slate-900">{commodity.volume}</strong>
            </span>
          </div>
        </div>

        {/* Sparkline Visual */}
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1 font-semibold">
            <span>7D Trend</span>
            <span>Current: ₹{commodity.mandiPrice}</span>
          </div>
          <div className="h-8 flex items-end gap-1 pt-1">
            {commodity.sparkline.map((val, idx) => {
              const min = Math.min(...commodity.sparkline);
              const max = Math.max(...commodity.sparkline);
              const range = max - min || 1;
              const heightPct = Math.max(15, Math.min(100, ((val - min) / range) * 100));
              return (
                <div
                  key={idx}
                  className={`flex-1 rounded-t transition-all ${
                    isPositive ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'
                  }`}
                  style={{ height: `${heightPct}%` }}
                  title={`Day ${idx + 1}: ₹${val}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <button
        onClick={() => onSelect(commodity)}
        className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 font-bold py-2.5 rounded-xl transition-all border border-slate-200 hover:border-emerald-600 text-xs shadow-sm"
      >
        <Eye className="w-4 h-4" />
        <span>{t.dashboard.tableHeaders.action} & Market Spread</span>
      </button>
    </div>
  );
}
