import React, { useState } from 'react';
import { 
  CloudRain, 
  BrainCircuit, 
  Send, 
  Download, 
  Sparkles, 
  Compass, 
  ShieldAlert, 
  FileSpreadsheet, 
  Sun,
  Waves
} from 'lucide-react';

export default function MarketInsights({ commodities, lang, t }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaskaram! I am KeramBot, your AI Market Assistant. Ask me about rubber trends, copra MSP, fish landing prices, or transport advisories across Kerala.'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInputMessage('');

    // Generate intelligent AI reply based on Kerala agri context
    setTimeout(() => {
      let reply = "Based on our latest APMC market data and regional weather feeds:";
      const lower = userText.toLowerCase();

      if (lower.includes('rubber') || lower.includes('റബ്ബർ')) {
        reply = "Rubber RSS-4 is currently trading strong at ₹212.50/kg in Kottayam. Tire manufacturers are placing heavy Q4 procurement orders. Hold dry sheet stock if possible as prices are projected to touch ₹220/kg before monsoon tapping delays.";
      } else if (lower.includes('copra') || lower.includes('coconut') || lower.includes('കൊപ്ര')) {
        reply = "Vatakara Copra market rate is ₹114.50/kg. Tamil Nadu Kangayam oil mills are supplying copra at competitive rates, keeping domestic surge capped. NAFED MSP buyback is active at ₹111.60/kg.";
      } else if (lower.includes('fish') || lower.includes('sardine') || lower.includes('മത്തി')) {
        reply = "Sardine (Mathi) landings at Neendakara (Kollam) are strong today at ₹175/kg wholesale. Inland districts like Palakkad and Wayanad offer arbitrage sale potential up to ₹215/kg.";
      } else if (lower.includes('banana') || lower.includes('nendran') || lower.includes('നേന്ത്രൻ')) {
        reply = "Nendran Banana is surging (+9.27%) due to upcoming temple festival demand and high chip maker buying in Palakkad and Thrissur. Current Wayanad farmgate is ₹42/kg.";
      } else {
        reply = "Market summary: Rubber, Cardamom, and Nendran Bananas are showing positive price momentum across central Kerala. Marine fish arrivals remain robust off the Kollam and Ernakulam coasts.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Commodity,Category,Primary District,Farmgate Price (INR),Mandi Price (INR),Retail Price (INR),24h Change (%)\n";
    commodities.forEach((c) => {
      csvContent += `"${c.name}","${c.categoryNameEn}","${c.primaryDistrict}",${c.farmgatePrice},${c.mandiPrice},${c.retailPrice},${c.change24hPercent}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Kerala_Market_Intelligence_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-300 mb-2">
            <BrainCircuit className="w-3.5 h-3.5 text-teal-700" />
            {t.insights.title}
          </div>
          <h2 className="text-2xl font-black text-slate-900">Kerala Market Intelligence & AI Hub</h2>
          <p className="text-xs text-slate-600 font-medium mt-1">{t.insights.subtitle}</p>
        </div>

        {/* Download CSV Report */}
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md self-start md:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>{t.insights.exportReport}</span>
        </button>
      </div>

      {/* Grid: Weather Impact & AI Commentary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weather Bulletins */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <CloudRain className="w-5 h-5 text-cyan-600" />
            {t.insights.weatherTitle}
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-cyan-50/60 p-4 rounded-2xl border border-cyan-200">
              <div className="flex items-center justify-between font-bold text-cyan-900 mb-1">
                <span className="flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-cyan-600" />
                  Idukki & Wayanad High-Range Rainfall
                </span>
                <span className="text-[10px] bg-cyan-200 text-cyan-800 px-2 py-0.5 rounded font-bold">ACTIVE</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                Moderate to heavy shower forecast in Kattappana cardamom belt. Tapping delays in rubber plantations expected for next 48 hours; dry RSS-4 prices expected to stay elevated.
              </p>
            </div>

            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
                <span className="flex items-center gap-1.5">
                  <Waves className="w-4 h-4 text-amber-600" />
                  Coastal High Wave & Wind Alert (Kollam & Kozhikode)
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded font-bold">ADVISORY</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                Fishermen advised caution along Neendakara and Beypore coastlines. Deep-sea landings may reduce by 15% tomorrow, expected to nudge Seer Fish and Prawn prices upwards.
              </p>
            </div>
          </div>
        </div>

        {/* AI Market Commentary */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="w-5 h-5 text-amber-600" />
            {t.insights.aiAnalystTitle}
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-emerald-800 font-bold block mb-1">📈 Rubber RSS-4 Bullish Signal</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                International synthetic rubber prices surged +2.4% on Tokyo Exchange. Domestic Kottayam APMC spot market maintaining healthy buying interest from automobile tyre manufacturers.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-teal-800 font-bold block mb-1">🥥 Copra & Coconut Oil Stability</span>
              <p className="text-slate-700 leading-relaxed font-medium">
                Raw coconut prices holding firm at ₹36/nut in Vatakara. Kerafed procurement drives helping prevent steep declines despite Kangayam mill supply arrivals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KeramBot Interactive AI Assistant */}
      <div className="bg-white border border-teal-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-300 flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t.insights.askKeramBot}</h3>
            <p className="text-xs text-slate-500 font-medium">Ask any question on Kerala commodity prices, harvesting timing, or district trade strategies</p>
          </div>
        </div>

        {/* Chat Log Window */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 h-64 overflow-y-auto space-y-3 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl font-medium leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={t.insights.botPlaceholder}
            className="flex-1 bg-slate-50 text-slate-900 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:border-teal-600 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>{t.insights.send}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
