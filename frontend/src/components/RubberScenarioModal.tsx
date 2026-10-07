import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_RUBBER_DECISION } from '../data/mockData';
import { 
  X, 
  Sparkles, 
  Calculator, 
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const RubberScenarioModal: React.FC = () => {
  const { rubberModalOpen, setRubberModalOpen, language } = useApp();
  const [stockQuantityKg, setStockQuantityKg] = useState<number>(1000);

  if (!rubberModalOpen) return null;

  const data = MOCK_RUBBER_DECISION;
  const currentVal = stockQuantityKg * data.currentPrice;
  const predictedVal = stockQuantityKg * data.predicted30DayPrice;
  const storageCostEstimate = Math.round(stockQuantityKg * 0.8);
  const netProjectedGain = predictedVal - currentVal - storageCostEstimate;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={() => setRubberModalOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Hackathon Target Persona Scenario
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ml' 
              ? 'റബ്ബർ കർഷകരുടെ വിപണന സമയം: AI ഉപദേശം'
              : 'Rubber Farmer Sell Decision Intelligence'}
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {language === 'ml'
              ? 'കഴിഞ്ഞ 3 മാസത്തെ കേരള മാർക്കറ്റ് വില വിവരങ്ങളും അടുത്ത 14 ദിവസത്തെ പ്രവചനവും വിശകലനം ചെയ്യുന്നു.'
              : 'Evaluating 3-month Kerala price trajectory, weather disruptions, and demand drivers to advise on whether to sell now or hold inventory.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Recommendation Banner */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-white text-emerald-800 text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                  AI RECOMMENDATION
                </span>
                <span className="text-emerald-100 text-xs font-semibold">
                  Confidence: 94%
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                {language === 'ml' ? 'ഹോൾഡ് ചെയ്യുക (കാത്തിരിക്കുക)' : 'HOLD INVENTORY (Next 10-14 Days)'}
              </h3>
              <p className="text-emerald-50 text-xs sm:text-sm max-w-xl">
                {language === 'ml' ? data.recommendationRationaleMl : data.recommendationRationale}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center shrink-0 w-full md:w-auto">
              <div className="text-xs uppercase font-medium text-emerald-100">Expected 14-Day Price</div>
              <div className="text-3xl font-extrabold text-white mt-1">
                ₹{data.predicted30DayPrice}
                <span className="text-sm font-normal text-emerald-100"> / kg</span>
              </div>
              <div className="text-xs text-amber-300 font-bold mt-1">
                +₹{data.predicted30DayPrice - data.currentPrice}/kg (+7.7% gain)
              </div>
            </div>
          </div>

          {/* 3-Month Historical Price Trajectory Chart */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {language === 'ml' ? '3 മാസത്തെ വില ചരിത്രം (റബ്ബർ RSS-4)' : '3-Month Historical Trend & 14-Day Forward Curve'}
                </h4>
                <p className="text-xs text-slate-500">
                  Kottayam Rubber Board Market benchmark from ₹{data.threeMonthAgoPrice} to ₹{data.currentPrice}/kg (+16.8%).
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                +16.8% In 90 Days
              </span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.historicalSeries}>
                  <defs>
                    <linearGradient id="rubberGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(v) => v.split('-').slice(1).join('/')}
                  />
                  <YAxis 
                    domain={['dataMin - 10', 'dataMax + 10']}
                    tick={{ fontSize: 10, fill: '#64748b' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const p = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs">
                            <span className="text-slate-400">{p.date} {p.isForecast ? '(Forecast)' : ''}</span>
                            <div className="font-bold text-emerald-400 text-sm">₹{p.modalPrice} / kg</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="modalPrice" 
                    stroke="#059669" 
                    strokeWidth={2.5} 
                    fill="url(#rubberGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-base">
                {language === 'ml' ? 'കർഷക ലാഭ കണക്കുകൂട്ടൽ യന്ത്രം' : 'Interactive Holding Profit Calculator'}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Your Rubber Inventory (Kg)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={stockQuantityKg}
                    onChange={(e) => setStockQuantityKg(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-lg focus:ring-2 focus:ring-emerald-500"
                    min="1"
                    step="50"
                  />
                  <span className="text-sm font-semibold text-slate-500">kg</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[250, 500, 1000, 2500].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setStockQuantityKg(preset)}
                      className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                        stockQuantityKg === preset
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {preset} kg
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs border-y md:border-y-0 md:border-x border-slate-100 py-3 md:py-0 md:px-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Value if sold today (₹{data.currentPrice}/kg):</span>
                  <span className="font-bold text-slate-800">₹{currentVal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Projected value in 14 days (₹{data.predicted30DayPrice}/kg):</span>
                  <span className="font-bold text-emerald-700">₹{predictedVal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Est. holding/storage cost:</span>
                  <span>-₹{storageCostEstimate.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Net Extra Profit by Holding
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight block mt-1">
                  +₹{netProjectedGain.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                  Over next 14-20 days
                </span>
              </div>
            </div>
          </div>

          {/* Key Market Drivers */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">
              Key Drivers Supporting Price Rally
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.keyDrivers.map((driver, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{driver}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Official Rubber Board data integrated with meteorological rainfall models.
          </span>
          <button
            onClick={() => setRubberModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Close Advisor
          </button>
        </div>
      </div>
    </div>
  );
};
