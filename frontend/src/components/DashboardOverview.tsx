import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import type { CommodityPrice } from '../types/commodity';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Bell, 
  ArrowRight, 
  RefreshCw, 
  Sparkles, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { KERALA_DISTRICTS } from '../data/mockData';

export const DashboardOverview: React.FC = () => {
  const { 
    language, 
    role, 
    t, 
    setSelectedCommodityId, 
    setActiveTab, 
    setRubberModalOpen, 
    setCreateAlertModalOpen,
    setAlertPreselectedCommodity,
    triggerToast
  } = useApp();

  const [commodities, setCommodities] = useState<CommodityPrice[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedDistrict]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getCommodities(selectedCategory, selectedDistrict);
      setCommodities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateSync = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadData();
      triggerToast(
        language === 'ml' ? 'ഡാറ്റ വിജയകരമായി പുതുക്കി' : 'Live Data Synchronized',
        language === 'ml' 
          ? 'കേരള അഗ്രികൾച്ചർ മാർക്കറ്റ് ഫീഡിലെ ഏറ്റവും പുതിയ നിരക്കുകൾ അപ്ഡേറ്റ് ചെയ്തു.'
          : 'Latest spot mandi rates fetched and verified from live daily feed.',
        'success'
      );
    }, 700);
  };

  const categories = [
    { id: 'all', label: t('allCategories') },
    { id: 'plantation', label: t('plantation') },
    { id: 'spices', label: t('spices') },
    { id: 'fruits', label: t('fruits') },
    { id: 'vegetables', label: t('vegetables') },
    { id: 'fisheries', label: t('fisheries') },
  ];

  const filteredCommodities = commodities.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(q) ||
      item.nameMl.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.marketName.toLowerCase().includes(q);
    return matchesSearch;
  });

  const getRoleAdvisory = () => {
    switch (role) {
      case 'farmer':
        return {
          title: language === 'ml' ? 'കർഷകർക്കായുള്ള ഇന്നത്തെ മാർക്കറ്റ് ടിപ്പ്' : "Farmer's Daily Market Advisory",
          desc: language === 'ml'
            ? 'റബ്ബർ RSS-4 വില കോട്ടയത്ത് ₹208/kg ആയി ഉയർന്നു. ടാപ്പിംഗ് കുറഞ്ഞതിനാൽ ഉണങ്ങിയ ഷീറ്റുകൾ രണ്ടാഴ്ച കൂടി സൂക്ഷിക്കുന്നത് കൂടുതൽ ലാഭം നൽകും.'
            : 'Natural Rubber RSS-4 spot prices are surging (+2.97% to ₹208/kg). Holding dry sheets for 10-14 days recommended due to rain disruptions.',
          tag: 'Selling Strategy',
        };
      case 'trader':
        return {
          title: language === 'ml' ? 'വ്യാപാരികൾക്കായുള്ള ആർബിട്രേജ് അവസരം' : 'Trader Inter-District Arbitrage Opportunity',
          desc: language === 'ml'
            ? 'ചാള/മത്തി കൊച്ചി ഹാർബറിൽ ₹165/kg ആണ്, എന്നാൽ ഇടുക്കി/കോട്ടയം ജില്ലകളിൽ ₹210/kg ആണ്. ₹45/kg മാർജിൻ ലഭ്യമാണ്.'
            : 'Oil Sardine harbor rate in Kochi dropped to ₹165/kg vs ₹210/kg in inland Kottayam. Potential ₹45/kg distribution spread.',
          tag: 'Arbitrage Window',
        };
      case 'cooperative':
        return {
          title: language === 'ml' ? 'സഹകരണ സംഘങ്ങൾക്കുള്ള സംഭരണ നിർദ്ദേശം' : 'Cooperative Procurement & MSP Benchmark',
          desc: language === 'ml'
            ? 'കൊപ്ര നിലവിലെ ഓപ്പൺ മാർക്കറ്റ് നിരക്ക് ₹10,850/ക്വിന്റൽ ആണ്, ഇത് സർക്കാർ താങ്ങുവിലയോട് (MSP ₹10,860) തുല്യമാണ്. സംഭരണം വേഗത്തിലാക്കുക.'
            : 'Copra modal price (₹10,850/qtl) matches MSP (₹10,860/qtl). PACS can safely accelerate procurement without downside risk.',
          tag: 'MSP Parity',
        };
      case 'consumer':
        return {
          title: language === 'ml' ? 'ഉപഭോക്താക്കൾക്കായുള്ള ചില്ലറവിൽപ്പന വിവരങ്ങൾ' : 'Consumer Fair Price Radar',
          desc: language === 'ml'
            ? 'ചെറിയ ഉള്ളി വിലയിൽ 5.1% കുറവ് വന്നിട്ടുണ്ട്. ഹോർട്ടികോർപ്പ് കേന്ദ്രങ്ങളിൽ നേന്ത്രപ്പഴം വില ന്യായമായ നിരക്കിൽ ലഭ്യമാണ്.'
            : 'Shallots & Sardine prices dropped today. Check nearby Horticorp / Triveni supermarkets for subsidized agricultural produce.',
          tag: 'Consumer Budget',
        };
    }
  };

  const roleAdvisory = getRoleAdvisory();

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Featured Challenge Spotlight: Rubber Farmer Sell Decision */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t('scenarioBannerTitle')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {language === 'ml'
                ? 'റബ്ബർ കർഷകൻ: കഴിഞ്ഞ 3 മാസത്തെ വിലയും വരാനിരിക്കുന്ന ട്രെൻഡും'
                : 'Rubber Farmer Decision Intelligence: 3-Month Price Trajectory & Sell Timing'}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t('scenarioBannerDesc')}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveTab('rubber-scenario');
                setRubberModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t('exploreScenarioBtn')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleSimulateSync}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-sm font-semibold transition-colors"
              title="Refresh and simulate daily Agmarknet sync"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Sync Live Feed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Dynamic Advisory Bar */}
      <div className="rounded-xl bg-white border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-100/70 text-emerald-800 shrink-0 mt-0.5">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {roleAdvisory.tag}
              </span>
              <h3 className="font-semibold text-slate-900 text-sm">
                {roleAdvisory.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {roleAdvisory.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Controls: Category Pills, District Filter, Search & View Mode */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Top controls: Search and filters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>

          {/* District Selector & View Mode */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">
                  {language === 'ml' ? 'എല്ലാ ജില്ലകളും (All Kerala)' : 'All Districts (Kerala)'}
                </option>
                {KERALA_DISTRICTS.map((d) => (
                  <option key={d.en} value={d.en}>
                    {language === 'ml' ? d.ml : d.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommodities.map((item) => {
            const isPos = item.changePercent > 0;
            const isZero = item.changePercent === 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">
                        {item.category}
                      </span>
                      {item.msp && (
                        <span className="ml-1.5 text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3 text-amber-600" />
                          MSP ₹{item.msp}
                        </span>
                      )}
                      <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                        {language === 'ml' ? item.nameMl : item.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {language === 'ml' ? item.name : item.nameMl} • {item.variety}
                      </p>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        isPos
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isZero
                          ? 'bg-slate-50 text-slate-600 border border-slate-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {isPos ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : isZero ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5" />
                      )}
                      <span>
                        {isPos ? '+' : ''}
                        {item.changePercent}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        {t('todayModalPrice')}
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                          ₹{item.modalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 ml-1 font-medium">
                          {item.unit}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <div className="flex justify-between text-xs text-slate-600 mb-1.5 font-medium">
                        <span>Min: ₹{item.minPrice.toLocaleString('en-IN')}</span>
                        <span className="text-slate-400">Range</span>
                        <span>Max: ₹{item.maxPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(15, ((item.modalPrice - item.minPrice) / (item.maxPrice - item.minPrice || 1)) * 100)
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-500 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          <span>{item.district}</span>
                        </span>
                        <span className="font-medium text-slate-700 truncate max-w-[170px]" title={item.marketName}>
                          {item.marketName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Arrivals: {item.arrivalVolume.toLocaleString()} units</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedCommodityId(item.id);
                      setActiveTab('trends');
                    }}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors text-center"
                  >
                    {language === 'ml' ? 'ട്രെൻഡ് കാണുക' : 'Trends & AI'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCommodityId(item.id);
                      setActiveTab('districts');
                    }}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-center"
                  >
                    {language === 'ml' ? 'ജില്ലാ താരതമ്യം' : '14 Districts'}
                  </button>
                  <button
                    onClick={() => {
                      setAlertPreselectedCommodity(item.id);
                      setCreateAlertModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 transition-colors"
                    title={t('setPriceAlert')}
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Commodity</th>
                  <th className="py-3.5 px-4">Market / District</th>
                  <th className="py-3.5 px-4 text-right">{t('todayModalPrice')}</th>
                  <th className="py-3.5 px-4 text-center">{t('rangeMinMax')}</th>
                  <th className="py-3.5 px-4 text-right">24h Change</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCommodities.map((item) => {
                  const isPos = item.changePercent > 0;
                  const isZero = item.changePercent === 0;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          {language === 'ml' ? item.nameMl : item.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {language === 'ml' ? item.name : item.nameMl} • {item.variety}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{item.marketName}</div>
                        <div className="text-xs text-slate-500">{item.district}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-extrabold text-slate-900 text-base">
                          ₹{item.modalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 ml-1 font-normal">{item.unit}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-medium text-slate-600">
                        ₹{item.minPrice} - ₹{item.maxPrice}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded font-bold text-xs ${
                            isPos
                              ? 'text-emerald-700 bg-emerald-50'
                              : isZero
                              ? 'text-slate-600 bg-slate-50'
                              : 'text-rose-700 bg-rose-50'
                          }`}
                        >
                          {isPos ? '+' : ''}
                          {item.changePercent}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedCommodityId(item.id);
                              setActiveTab('trends');
                            }}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                          >
                            Trends
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCommodityId(item.id);
                              setActiveTab('districts');
                            }}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                          >
                            Districts
                          </button>
                          <button
                            onClick={() => {
                              setAlertPreselectedCommodity(item.id);
                              setCreateAlertModalOpen(true);
                            }}
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-emerald-700"
                          >
                            <Bell className="h-4 w-4" />
                          </button>
                        </div>
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
};
