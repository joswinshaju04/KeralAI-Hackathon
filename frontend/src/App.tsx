import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { TickerBanner } from './components/TickerBanner';
import { DashboardOverview } from './components/DashboardOverview';
import { HistoricalTrends } from './components/HistoricalTrends';
import { DistrictComparison } from './components/DistrictComparison';
import { PriceAlerts } from './components/PriceAlerts';
import { MarketInsights } from './components/MarketInsights';
import { RubberScenarioModal } from './components/RubberScenarioModal';
import { CreateAlertDialog } from './components/CreateAlertDialog';
import { Toast } from './components/Toast';
import { Activity, ShieldCheck, Database, GitBranch } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <TickerBanner />

      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'trends' && <HistoricalTrends />}
        {activeTab === 'districts' && <DistrictComparison />}
        {activeTab === 'rubber-scenario' && (
          <div className="space-y-6">
            <DashboardOverview />
          </div>
        )}
        {activeTab === 'alerts' && <PriceAlerts />}
        {activeTab === 'insights' && <MarketInsights />}
      </main>

      {/* Global Modals & Notifications */}
      <RubberScenarioModal />
      <CreateAlertDialog />
      <Toast />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <span className="text-white font-bold text-sm tracking-tight">
                  Kerala Commodity Price Intelligence Platform
                </span>
                <p className="text-[11px] text-slate-400">
                  Built for IBM x Kerala Government Hackathon 2026 • Challenge 8
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                Agmarknet & Rubber Board Live Feeds
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Govt MSP Benchmarks
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <GitBranch className="h-3.5 w-3.5" />
                API-Ready for GitHub Backend Integration
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              Target Users: Farmers • Traders • Cooperatives (PACS) • Consumers Across 14 Kerala Districts.
            </p>
            <p className="text-slate-400">
              Frontend Module • Team of 5 Architecture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
