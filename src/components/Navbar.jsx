import React from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Bell, 
  BrainCircuit, 
  Globe, 
  UserCheck, 
  Activity,
  Layers
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  lang, 
  setLang, 
  persona, 
  setPersona, 
  t 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm text-slate-900">
      {/* Top Meta Bar */}
      <div className="bg-emerald-800 text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
            {t.ticker.status}
          </span>
          <span className="text-emerald-600">|</span>
          <span className="text-emerald-100">{t.ticker.lastUpdated}</span>
          <span className="hidden md:inline text-emerald-600">|</span>
          <span className="hidden md:inline text-amber-200 font-medium">
            🔥 {t.ticker.topGainers}: <strong className="text-white">Nendran Banana (+9.27%)</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Persona View Switcher */}
          <div className="flex items-center gap-1.5 bg-emerald-900/80 rounded-lg px-2.5 py-0.5 border border-emerald-700/60">
            <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-emerald-200 font-medium hidden sm:inline">{t.persona}:</span>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="farmer" className="bg-emerald-900 text-white">{t.personas.farmer}</option>
              <option value="trader" className="bg-emerald-900 text-white">{t.personas.trader}</option>
              <option value="cooperative" className="bg-emerald-900 text-white">{t.personas.cooperative}</option>
              <option value="consumer" className="bg-emerald-900 text-white">{t.personas.consumer}</option>
            </select>
          </div>

          {/* Language Selector Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}
            className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded-full border border-white/30 text-xs font-bold transition-all shadow-sm"
            title="Toggle English / Malayalam"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-100" />
            <span>{lang === 'en' ? 'മലയാളം' : 'English'}</span>
          </button>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                {t.brandName}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                KERALA AGRI
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Persona Indicator Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span className="text-slate-600 font-medium">Mode:</span>
          <span className="text-emerald-800 font-bold">{t.personaBadges[persona]}</span>
        </div>

        {/* Tab Links */}
        <nav className="flex items-center overflow-x-auto gap-1.5 py-1 sm:py-0 border-t border-slate-100 md:border-none">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.nav.dashboard}</span>
          </button>

          <button
            onClick={() => setCurrentTab('trends')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'trends'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{t.nav.trends}</span>
          </button>

          <button
            onClick={() => setCurrentTab('map')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'map'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t.nav.districtMap}</span>
          </button>

          <button
            onClick={() => setCurrentTab('alerts')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${
              currentTab === 'alerts'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-500" />
            <span>{t.nav.alerts}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </button>

          <button
            onClick={() => setCurrentTab('insights')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              currentTab === 'insights'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-teal-200" />
            <span>{t.nav.insights}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
