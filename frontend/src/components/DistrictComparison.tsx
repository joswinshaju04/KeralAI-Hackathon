import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { MOCK_COMMODITIES } from '../data/mockData';
import type { DistrictPriceComparison, CommodityPrice } from '../types/commodity';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { 
  MapPin, 
  Award, 
  Scale, 
  Bell 
} from 'lucide-react';

export const DistrictComparison: React.FC = () => {
  const { 
    selectedCommodityId, 
    setSelectedCommodityId, 
    language, 
    t, 
    setAlertPreselectedCommodity, 
    setCreateAlertModalOpen 
  } = useApp();

  const [districts, setDistricts] = useState<DistrictPriceComparison[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityPrice | undefined>(undefined);

  useEffect(() => {
    loadData();
  }, [selectedCommodityId]);

  const loadData = async () => {
    try {
      const comm = await apiService.getCommodityById(selectedCommodityId);
      setSelectedCommodity(comm || MOCK_COMMODITIES[0]);

      const data = await apiService.getDistrictComparisons(selectedCommodityId);
      setDistricts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const highestDistrict = districts.length > 0 ? districts[0] : null;
  const lowestDistrict = districts.length > 0 ? districts[districts.length - 1] : null;
  const spread = highestDistrict && lowestDistrict ? highestDistrict.modalPrice - lowestDistrict.modalPrice : 0;
  const spreadPct = lowestDistrict && lowestDistrict.modalPrice > 0 
    ? Number(((spread / lowestDistrict.modalPrice) * 100).toFixed(1)) 
    : 0;

  const averagePrice = districts.length > 0
    ? Math.round(districts.reduce((sum, d) => sum + d.modalPrice, 0) / districts.length)
    : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header and Commodity Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              14 Districts Comparison
            </span>
            <span className="text-xs text-slate-500">
              {language === 'ml' ? 'കേരളത്തിലെ 14 ജില്ലകളിലെ വില നിലവാരം' : 'Statewide Mandi Price Benchmarking'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {language === 'ml' ? selectedCommodity?.nameMl : selectedCommodity?.name} Across Kerala
          </h1>
          <p className="text-xs text-slate-500">
            Compare spot rates, find the best market to sell or procure, and capitalize on inter-district price spreads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-500 hidden sm:inline">Commodity:</label>
          <select
            value={selectedCommodityId}
            onChange={(e) => setSelectedCommodityId(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500"
          >
            {MOCK_COMMODITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {language === 'ml' ? c.nameMl : c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Highest Paying District */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-emerald-600" />
              {t('bestSellingDistrict')}
            </span>
            <span className="text-[10px] font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">
              HIGHEST
            </span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900">
              {language === 'ml' ? highestDistrict?.districtMl : highestDistrict?.district}
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 tracking-tight">
              ₹{highestDistrict?.modalPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-500">{selectedCommodity?.unit}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block truncate">
            {highestDistrict?.marketName}
          </span>
        </div>

        {/* Lowest Price District */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {t('bestBuyingDistrict')}
            </span>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
              LOWEST
            </span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900">
              {language === 'ml' ? lowestDistrict?.districtMl : lowestDistrict?.district}
            </div>
            <div className="text-2xl font-extrabold text-slate-800 tracking-tight">
              ₹{lowestDistrict?.modalPrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-500">{selectedCommodity?.unit}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block truncate">
            {lowestDistrict?.marketName}
          </span>
        </div>

        {/* Arbitrage Spread */}
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1">
              <Scale className="h-3.5 w-3.5 text-amber-700" />
              {t('arbitrageSpread')}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-amber-900">
              ₹{spread.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-semibold text-amber-700">({spreadPct}%)</span>
            </div>
            <p className="text-xs text-amber-800 mt-1">
              Between {highestDistrict?.district} & {lowestDistrict?.district}
            </p>
          </div>
          <span className="text-[10px] text-amber-700 font-medium block mt-1">
            Transport feasibility: Highly profitable for bulk transit
          </span>
        </div>

        {/* State Average Benchmark */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Kerala State Average
          </span>
          <div className="mt-2">
            <div className="text-2xl font-extrabold text-slate-900">
              ₹{averagePrice.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-normal text-slate-500">{selectedCommodity?.unit}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Across 14 APMC Mandis
            </p>
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            Aggregated in real-time
          </span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'ml' ? 'ജില്ല തിരിച്ചുള്ള വില ബാർ ചാർട്ട്' : 'District Price Ranking (High to Low)'}
          </h3>
          <p className="text-xs text-slate-500">
            Modal prices across all 14 Kerala districts. Bars colored green indicate rates above the state average.
          </p>
        </div>

        <div className="h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={districts}
              margin={{ top: 20, right: 10, left: -10, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="district"
                angle={-40}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 11, fill: '#475569' }}
              />
              <YAxis
                domain={['dataMin - 10', 'dataMax + 10']}
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as DistrictPriceComparison;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                        <div className="font-bold text-white text-sm">
                          {data.district} ({data.districtMl})
                        </div>
                        <div className="text-emerald-400 font-bold text-base">
                          ₹{data.modalPrice} {selectedCommodity?.unit}
                        </div>
                        <div className="text-slate-300">
                          Market: {data.marketName}
                        </div>
                        <div className="text-slate-400">
                          Min-Max: ₹{data.minPrice} - ₹{data.maxPrice}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="modalPrice" radius={[6, 6, 0, 0]}>
                {districts.map((entry) => (
                  <Cell
                    key={entry.district}
                    fill={entry.modalPrice >= averagePrice ? '#059669' : '#94a3b8'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* District Detail Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h4 className="font-bold text-slate-900 text-sm">
            {language === 'ml' ? 'ജില്ലാ അടിസ്ഥാന വിവര പട്ടിക' : 'Detailed District Mandi Directory'}
          </h4>
          <span className="text-xs text-slate-500 font-medium">14 Districts Synced</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">Market / Mandi</th>
                <th className="py-3 px-4 text-right">Modal Price</th>
                <th className="py-3 px-4 text-center">Day Range</th>
                <th className="py-3 px-4 text-right">Diff vs Avg</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {districts.map((item, idx) => {
                const diff = item.modalPrice - averagePrice;
                const isAbove = diff >= 0;

                return (
                  <tr key={item.district} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        {idx === 0 && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            TOP
                          </span>
                        )}
                        <span>{item.district}</span>
                        <span className="text-xs text-slate-400 font-normal">({item.districtMl})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.marketName}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 text-base">
                      ₹{item.modalPrice}{' '}
                      <span className="text-xs font-normal text-slate-500">{selectedCommodity?.unit}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 font-medium">
                      ₹{item.minPrice} - ₹{item.maxPrice}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center font-bold text-xs ${
                          isAbove ? 'text-emerald-700' : 'text-slate-600'
                        }`}
                      >
                        {isAbove ? `+₹${diff}` : `-₹${Math.abs(diff)}`}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setAlertPreselectedCommodity(selectedCommodityId);
                          setCreateAlertModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-md transition-colors"
                        title="Alert on this district"
                      >
                        <Bell className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
