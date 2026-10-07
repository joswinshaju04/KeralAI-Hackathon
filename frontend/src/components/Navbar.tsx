import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  MapPin, 
  Bell, 
  Sparkles, 
  Target, 
  Layers, 
  Globe, 
  Activity
} from 'lucide-react';
import type { UserRole } from '../types/commodity';

export const Navbar: React.FC = () => {
  const { language, setLanguage, role, setRole, activeTab, setActiveTab, t, setRubberModalOpen } = useApp();

  const roleOptions: { value: UserRole; labelEn: string; labelMl: string }[] = [
    { value: 'farmer', labelEn: 'Farmer (കർഷകൻ)', labelMl: 'കർഷകൻ' },
    { value: 'trader', labelEn: 'Trader (വ്യാപാരി)', labelMl: 'വ്യാപാരി' },
    { value: 'cooperative', labelEn: 'Cooperative (സഹകരണ സംഘം)', labelMl: 'സഹകരണ സംഘം' },
    { value: 'consumer', labelEn: 'Consumer (ഉപഭോക്താവ്)', labelMl: 'ഉപഭോക്താവ്' },
  ];

  const navItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: Layers },
    { id: 'trends', label: t('navTrends'), icon: TrendingUp },
    { id: 'districts', label: t('navDistricts'), icon: MapPin },
    { id: 'rubber-scenario', label: t('navRubberScenario'), icon: Target, isHighlight: true },
    { id: 'alerts', label: t('navAlerts'), icon: Bell },
    { id: 'insights', label: t('navInsights'), icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro bar: Hackathon indicator & live status */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full uppercase">
            IBM x Kerala Govt 2026
          </span>
          <span className="hidden sm:inline text-emerald-100 font-medium">
            Challenge 8: Kerala Commodity Price Intelligence Platform
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-emerald-200">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-medium text-emerald-100">{t('liveSyncBadge')}</span>
          </div>
          <span className="hidden md:inline text-emerald-300/70">|</span>
          <span className="hidden md:inline text-emerald-200/90">{t('syncedJustNow')}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Activity className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Kerala<span className="text-emerald-600">PriceIntel</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  AI v2.6
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {language === 'ml' ? 'തത്സമയ വിപണി വിവര പ്ലാറ്റ്‌ഫോം' : 'Daily Market Price & Forecasting Network'}
              </p>
            </div>
          </div>

          {/* Persona Switcher & Language Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* User Role Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium px-2 hidden lg:inline">
                {t('roleLabel')}:
              </span>
              <div className="flex gap-1">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRole(opt.value)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all text-xs ${
                      role === opt.value
                        ? 'bg-white text-emerald-700 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'ml' ? opt.labelMl : opt.value.charAt(0).toUpperCase() + opt.value.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              title="Toggle English / Malayalam"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'rubber-scenario') {
                    setActiveTab('rubber-scenario');
                    setRubberModalOpen(true);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                    : item.isHighlight
                    ? 'bg-amber-50 text-amber-900 border border-amber-300/80 hover:bg-amber-100 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.isHighlight ? 'text-amber-700' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.isHighlight && (
                  <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider">
                    Prompt
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
