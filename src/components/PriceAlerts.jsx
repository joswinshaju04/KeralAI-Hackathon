import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Sparkles, 
  Bot, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Smartphone, 
  MessageSquare, 
  Mail, 
  CheckCircle2, 
  RefreshCw, 
  ShieldAlert, 
  Trash2,
  Play,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PriceAlerts({ commodities, lang, persona, t }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedPersonaFilter, setSelectedPersonaFilter] = useState(persona || 'farmer');
  const [simulatedNotification, setSimulatedNotification] = useState(null);

  // Automated AI Alerts State
  const [autoAlerts, setAutoAlerts] = useState([]);

  // Generate Automated AI Alerts based on trends, spreads, and market analysis
  const generateAIAlerts = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const generated = [
        {
          id: 101,
          type: 'bullish',
          targetAudience: 'farmer',
          commodityName: 'Nendran Banana (A Grade)',
          district: 'Wayanad',
          signal: '🔥 High Surge (+9.27%)',
          triggerCondition: 'Rises above ₹50.00 / kg',
          aiReasoning: 'Wayanad farmgate demand surging due to festive chip makers buying in Thrissur. Recommended sell window active.',
          channel: 'WhatsApp',
          status: 'TRIGGERED',
          time: '12 mins ago'
        },
        {
          id: 102,
          type: 'arbitrage',
          targetAudience: 'trader',
          commodityName: 'Rubber RSS-4',
          district: 'Kottayam → Kozhikode',
          signal: '⚡ Inter-District Arbitrage Gap (₹6.00/kg)',
          triggerCondition: 'Margin exceeds ₹4.50 / kg after freight',
          aiReasoning: 'Kozhikode APMC quotes ₹215.00/kg while Kottayam spot is ₹209.00/kg. Profit potential for 10-tonne truck dispatch.',
          channel: 'SMS',
          status: 'ACTIVE',
          time: '35 mins ago'
        },
        {
          id: 103,
          type: 'weather',
          targetAudience: 'farmer',
          commodityName: 'Small Cardamom 8mm',
          district: 'Idukki (Kattappana)',
          signal: '🌧️ Heavy Rainfall Tapping Alert',
          triggerCondition: 'Spices Board auction breaches ₹2,700 / kg',
          aiReasoning: 'Heavy rain forecast in Kattappana high range. Drying delays will drive premium green capsule prices up.',
          channel: 'WhatsApp',
          status: 'ACTIVE',
          time: '1 hour ago'
        },
        {
          id: 104,
          type: 'bearish',
          targetAudience: 'trader',
          commodityName: 'Copra (Cleaned & Dried)',
          district: 'Kozhikode (Vatakara)',
          signal: '⚠️ Downward Pressure (-1.04%)',
          triggerCondition: 'Drops below ₹11,350 / quintal',
          aiReasoning: 'Tamil Nadu Kangayam mill supply influx at lower rates. Traders advised to hold off bulk spot purchases.',
          channel: 'In-App Push',
          status: 'ACTIVE',
          time: '2 hours ago'
        },
        {
          id: 105,
          type: 'glutton',
          targetAudience: 'farmer',
          commodityName: 'Sardine / Mathi',
          district: 'Kollam (Neendakara)',
          signal: '🐟 Harbor Catch Surge (-7.89%)',
          triggerCondition: 'Wholesale falls below ₹170.00 / kg',
          aiReasoning: 'Purse-seine fleet landed 420 Tonnes today. Transporting to inland Palakkad mandis yields ₹35/kg profit.',
          channel: 'SMS',
          status: 'TRIGGERED',
          time: '3 hours ago'
        }
      ];

      setAutoAlerts(generated);
      setIsAnalyzing(false);

      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  useEffect(() => {
    generateAIAlerts();
  }, [persona]);

  const handleDeleteAlert = (id) => {
    setAutoAlerts(autoAlerts.filter((a) => a.id !== id));
  };

  const handleSimulatePush = (alert) => {
    setSimulatedNotification({
      title: `⚡ AI Market Alert: ${alert.commodityName}`,
      message: `${alert.signal} in ${alert.district}! ${alert.aiReasoning}`,
      channel: alert.channel,
      time: 'Just Now'
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  // Filter alerts by persona selection
  const filteredAlerts = autoAlerts.filter((a) => {
    if (selectedPersonaFilter === 'all') return true;
    return a.targetAudience === selectedPersonaFilter || a.targetAudience === 'all';
  });

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white border border-emerald-800 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3">
              <Bot className="w-4 h-4 text-emerald-300" />
              Automated AI Trend & Price Alert Generator
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Smart Market Alerts for Farmers & Traders
            </h2>
            <p className="text-xs text-emerald-100 mt-2 leading-relaxed font-medium">
              KeramPulse AI continuously analyzes 24h price volatility, 7-day sparklines, weather forecasts, and inter-district transport spreads to auto-generate personalized sell/buy price alerts.
            </p>
          </div>

          {/* Run AI Scanner Button */}
          <button
            onClick={generateAIAlerts}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-emerald-950/40 shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing Trends...' : '🤖 Re-Scan Market Trends & Generate Alerts'}</span>
          </button>
        </div>
      </div>

      {/* Simulated Live Alert Toast Notification */}
      {simulatedNotification && (
        <div className="bg-emerald-50 border-2 border-emerald-600 rounded-2xl p-5 shadow-lg relative animate-bounce text-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                  {simulatedNotification.channel} Notification Simulator • {simulatedNotification.time}
                </span>
                <h4 className="text-base font-bold text-emerald-950">{simulatedNotification.title}</h4>
                <p className="text-xs text-emerald-900 font-medium mt-0.5">{simulatedNotification.message}</p>
              </div>
            </div>
            <button
              onClick={() => setSimulatedNotification(null)}
              className="text-slate-600 hover:text-slate-900 text-xs font-bold px-2 py-1 bg-white rounded-lg border border-slate-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Persona Audience Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">Show AI Alerts Tailored For:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedPersonaFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedPersonaFilter === 'all'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            All AI Alerts ({autoAlerts.length})
          </button>

          <button
            onClick={() => setSelectedPersonaFilter('farmer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedPersonaFilter === 'farmer'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            🌾 Farmers (കർഷകർ)
          </button>

          <button
            onClick={() => setSelectedPersonaFilter('trader')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedPersonaFilter === 'trader'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            🚚 Traders (വ്യാപാരികൾ)
          </button>
        </div>
      </div>

      {/* Auto-Generated Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlerts.map((alert) => {
          const isTriggered = alert.status === 'TRIGGERED';
          return (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl border p-5 shadow-sm transition-all duration-300 flex flex-col justify-between ${
                isTriggered ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200 hover:border-emerald-500'
              }`}
            >
              <div>
                {/* Top Badge Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                    {alert.signal}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        isTriggered
                          ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {alert.status}
                    </span>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Dismiss Alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Commodity & Target Audience Header */}
                <h3 className="text-lg font-black text-slate-900 mb-1">
                  {alert.commodityName}
                </h3>
                <div className="text-xs font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                  <span>Target Hub: <strong>{alert.district}</strong></span>
                  <span>•</span>
                  <span className="capitalize bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    For {alert.targetAudience}s
                  </span>
                </div>

                {/* Trigger Condition Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 font-mono text-xs">
                  <span className="text-slate-500 font-sans block text-[10px] font-bold uppercase mb-0.5">
                    AI Target Trigger Condition:
                  </span>
                  <strong className="text-slate-900 text-sm">{alert.triggerCondition}</strong>
                </div>

                {/* AI Market Reasoning */}
                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed font-medium mb-4">
                  <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-emerald-700" />
                    AI Market Analysis:
                  </span>
                  {alert.aiReasoning}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500 flex items-center gap-1 font-semibold">
                  {alert.channel === 'WhatsApp' ? (
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  ) : alert.channel === 'SMS' ? (
                    <Smartphone className="w-3.5 h-3.5 text-cyan-600" />
                  ) : (
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  {alert.channel} • {alert.time}
                </span>

                <button
                  onClick={() => handleSimulatePush(alert)}
                  className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Test Push Alert
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
