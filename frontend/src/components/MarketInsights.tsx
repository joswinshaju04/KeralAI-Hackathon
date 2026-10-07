import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import type { MarketInsight } from '../types/commodity';
import { 
  Sparkles, 
  CloudRain, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  Lightbulb, 
  Calendar
} from 'lucide-react';

export const MarketInsights: React.FC = () => {
  const { language } = useApp();
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const data = await apiService.getMarketInsights();
      setInsights(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather':
        return <CloudRain className="h-5 w-5 text-sky-600" />;
      case 'supply':
        return <Truck className="h-5 w-5 text-amber-600" />;
      case 'policy':
        return <ShieldCheck className="h-5 w-5 text-emerald-600" />;
      case 'demand':
        return <ShoppingBag className="h-5 w-5 text-purple-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-emerald-600" />;
    }
  };

  const filteredInsights = filterCategory === 'all' 
    ? insights 
    : insights.filter((i) => i.category === filterCategory);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              AI Market Intelligence
            </span>
            <span className="text-xs text-slate-500">
              Multi-source synthesis of Mandi data, Weather, & News
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {language === 'ml' ? 'വിപണി അവലോകനങ്ങളും AI നിരീക്ഷണങ്ങളും' : 'Kerala Agricultural & Commodity Market Insights'}
          </h1>
          <p className="text-xs text-slate-500">
            Natural language market analysis explaining the 'why' behind price fluctuations.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {[
            { id: 'all', label: 'All Insights' },
            { id: 'weather', label: 'Weather Impact' },
            { id: 'supply', label: 'Supply Chain' },
            { id: 'demand', label: 'Demand Surges' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterCategory === cat.id
                  ? 'bg-white shadow-xs text-emerald-800 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInsights.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Category & Confidence */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    {item.category.toUpperCase()} FACTOR
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Sparkles className="h-3 w-3" />
                  <span>{item.confidenceScore}% Confidence</span>
                </div>
              </div>

              {/* Title & Date */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {language === 'ml' ? item.titleMl : item.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                <Calendar className="h-3 w-3" />
                <span>{item.date}</span>
                <span>•</span>
                <span>Impact: {item.impact.toUpperCase()}</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {language === 'ml' ? item.descriptionMl : item.description}
              </p>

              {/* Affected Commodities */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.affectedCommodities.map((comm) => (
                  <span
                    key={comm}
                    className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                  >
                    {comm}
                  </span>
                ))}
              </div>
            </div>

            {/* Actionable Tip Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
                    {language === 'ml' ? 'നിങ്ങൾ ചെയ്യേണ്ടത്' : 'Actionable Recommendation'}
                  </span>
                  <p className="text-xs text-amber-950 leading-relaxed font-medium">
                    {language === 'ml' ? item.actionableTipMl : item.actionableTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
