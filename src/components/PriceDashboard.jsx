import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  LayoutGrid, 
  ListFilter, 
  TrendingUp, 
  Activity, 
  Zap, 
  ArrowUpRight, 
  Layers,
  ArrowUpDown
} from 'lucide-react';
import CommodityCard from './CommodityCard';
import { keralaDistricts } from '../data/districtsData';

export default function PriceDashboard({ commodities, onSelectCommodity, lang, persona, t }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all'); // District ID or 'all'
  const [sortBy, setSortBy] = useState('surge'); // 'surge' | 'price-desc' | 'price-asc' | 'name'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filtered and sorted commodities according to category, district selection, search query, and sorting parameter
  const processedCommodities = useMemo(() => {
    let result = commodities.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameMl.includes(searchQuery) ||
        item.grade.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // If a district filter is set, check if the commodity is mapped to that district
      let matchesDistrict = true;
      if (selectedDistrict !== 'all') {
        matchesDistrict = item.districtPrices && item.districtPrices[selectedDistrict] !== undefined;
      }

      return matchesSearch && matchesCategory && matchesDistrict;
    });

    // Sorting logic
    result.sort((a, b) => {
      // Get applicable prices for sorting (use district specific price if district is selected)
      let priceA = selectedDistrict !== 'all' && a.districtPrices ? (a.districtPrices[selectedDistrict] || a.mandiPrice) : a.mandiPrice;
      let priceB = selectedDistrict !== 'all' && b.districtPrices ? (b.districtPrices[selectedDistrict] || b.mandiPrice) : b.mandiPrice;

      if (sortBy === 'price-desc') {
        return priceB - priceA;
      } else if (sortBy === 'price-asc') {
        return priceA - priceB;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // default: surge (% 24h change desc)
        return b.change24hPercent - a.change24hPercent;
      }
    });

    return result;
  }, [commodities, searchQuery, selectedCategory, selectedDistrict, sortBy]);

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Header Banner & Stats */}
      <div className="bg-gradient-to-br from-white via-emerald-50/70 to-teal-50/50 border border-emerald-200/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3">
            <Activity className="w-3.5 h-3.5 text-emerald-700" />
            Kerala APMC & Harbor Market Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.dashboard.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-emerald-200/60">
          <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
              {t.dashboard.stats.totalTracked}
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">11 Major</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Across 14 Districts</div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
              {t.dashboard.stats.avgDailyVol}
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">₹18.4 Cr</div>
            <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Estimated Daily Turnout</div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
              {t.dashboard.stats.topGain}
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">+9.27%</div>
            <div className="text-[11px] text-slate-600 font-medium mt-0.5">Nendran Banana (Wayanad)</div>
          </div>

          <div className="bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
              {t.dashboard.stats.arbitrageOpp}
              <ArrowUpRight className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-teal-800">₹14.5 / kg</div>
            <div className="text-[11px] text-teal-700 font-semibold mt-0.5">Max Inter-District Gap</div>
          </div>
        </div>
      </div>

      {/* Filter & Sorting Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.dashboard.searchPlaceholder}
              className="w-full bg-slate-50 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none text-xs transition-colors font-medium"
            />
          </div>

          {/* District Dropdown Filter for 14 Districts */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full md:w-auto bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-600 focus:outline-none cursor-pointer"
            >
              <option value="all">{t.dashboard.allDistricts}</option>
              {keralaDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {lang === 'ml' ? d.nameMl : d.name} ({d.primaryHub})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <ArrowUpDown className="w-4 h-4 text-emerald-600 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-600 focus:outline-none cursor-pointer"
            >
              <option value="surge">Sort by Highest 24h Surge</option>
              <option value="price-desc">Sort by Price: High to Low</option>
              <option value="price-asc">Sort by Price: Low to High</option>
              <option value="name">Sort by Name (A-Z)</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-black'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {t.dashboard.allCategories}
          </button>
          {Object.entries(t.dashboard.categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === key
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-black'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid or Table Display */}
      {processedCommodities.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center shadow-sm">
          <Filter className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No commodities match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the district or category filter.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedCommodities.map((item) => (
            <CommodityCard
              key={item.id}
              commodity={item}
              onSelect={onSelectCommodity}
              lang={lang}
              persona={persona}
              selectedDistrict={selectedDistrict}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase border-b border-slate-200">
                  <th className="py-4 px-6">{t.dashboard.tableHeaders.commodity}</th>
                  <th className="py-4 px-4">{t.dashboard.tableHeaders.district}</th>
                  <th className="py-4 px-4">{t.dashboard.tableHeaders.farmgatePrice}</th>
                  <th className="py-4 px-4">{t.dashboard.tableHeaders.mandiPrice}</th>
                  <th className="py-4 px-4">{t.dashboard.tableHeaders.retailPrice}</th>
                  <th className="py-4 px-4">{t.dashboard.tableHeaders.change24h}</th>
                  <th className="py-4 px-6 text-right">{t.dashboard.tableHeaders.action}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                {processedCommodities.map((item) => {
                  const displayMandi = selectedDistrict !== 'all' && item.districtPrices
                    ? (item.districtPrices[selectedDistrict] || item.mandiPrice)
                    : item.mandiPrice;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div>{lang === 'ml' ? item.nameMl : item.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{item.grade}</div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <div className="flex items-center gap-1 font-semibold">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          {selectedDistrict !== 'all' ? selectedDistrict : item.primaryDistrict}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-emerald-700">
                        ₹{item.farmgatePrice.toLocaleString()} / {item.unit}
                      </td>
                      <td className="py-4 px-4 font-black text-slate-900">
                        ₹{displayMandi.toLocaleString()} / {item.unit}
                      </td>
                      <td className="py-4 px-4 font-semibold text-teal-700">
                        ₹{item.retailPrice.toLocaleString()} / {item.unit}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-0.5 font-bold ${
                          item.change24h >= 0 ? 'text-emerald-700' : 'text-rose-700'
                        }`}>
                          {item.change24h >= 0 ? '+' : ''}{item.change24hPercent}%
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => onSelectCommodity(item)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm"
                        >
                          {t.dashboard.tableHeaders.action}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
