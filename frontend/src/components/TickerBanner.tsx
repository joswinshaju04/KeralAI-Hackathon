import React from 'react';
import { MOCK_COMMODITIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const TickerBanner: React.FC = () => {
  const { language, setSelectedCommodityId, setActiveTab } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 overflow-hidden relative shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide uppercase text-[11px] shrink-0 pr-3 border-r border-slate-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Kerala Mandi Ticker</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-0.5">
          {MOCK_COMMODITIES.map((c) => {
            const isPos = c.changePercent > 0;
            const isZero = c.changePercent === 0;

            return (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCommodityId(c.id);
                  setActiveTab('trends');
                }}
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/80 px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0"
              >
                <span className="font-medium text-slate-200">
                  {language === 'ml' ? c.nameMl : c.name}
                </span>
                <span className="font-bold text-white tracking-tight">
                  ₹{c.modalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400 font-light">
                  {c.unit}
                </span>

                <div
                  className={`flex items-center text-[11px] font-semibold ${
                    isPos
                      ? 'text-emerald-400'
                      : isZero
                      ? 'text-slate-400'
                      : 'text-rose-400'
                  }`}
                >
                  {isPos ? (
                    <TrendingUp className="h-3 w-3 mr-0.5" />
                  ) : isZero ? (
                    <Minus className="h-3 w-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-0.5" />
                  )}
                  <span>
                    {isPos ? '+' : ''}
                    {c.changePercent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
