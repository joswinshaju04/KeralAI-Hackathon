import React, { useState } from 'react';
import { keralaDistricts } from '../data/districtsData';
import { MapPin, ArrowRight, Truck, DollarSign, Lightbulb, Compass } from 'lucide-react';

export default function DistrictMap({ commodities, lang, t }) {
  const [selectedCommodityId, setSelectedCommodityId] = useState(commodities[0]?.id || 'rubber-rss4');
  const [activeDistrictId, setActiveDistrictId] = useState('KTM');
  
  // Arbitrage calculator states
  const [sourceDistrictId, setSourceDistrictId] = useState('WYD');
  const [destDistrictId, setDestDistrictId] = useState('TVM');

  const activeCommodity = commodities.find((c) => c.id === selectedCommodityId) || commodities[0];
  const activeDistrict = keralaDistricts.find((d) => d.id === activeDistrictId) || keralaDistricts[0];

  // Arbitrage calculations
  const sourceDistrictObj = keralaDistricts.find((d) => d.id === sourceDistrictId);
  const destDistrictObj = keralaDistricts.find((d) => d.id === destDistrictId);

  const sourcePrice = activeCommodity.districtPrices[sourceDistrictId] || activeCommodity.mandiPrice;
  const destPrice = activeCommodity.districtPrices[destDistrictId] || activeCommodity.mandiPrice;

  // Calculate distance factor between source & dest
  const dx = (sourceDistrictObj?.coordinates.x || 0) - (destDistrictObj?.coordinates.x || 0);
  const dy = (sourceDistrictObj?.coordinates.y || 0) - (destDistrictObj?.coordinates.y || 0);
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Freight estimate (approx ₹0.08 per unit distance + base handling)
  const estTransportCost = Math.round((distance * 0.08 + 2.5) * 100) / 100;
  const grossSpread = Math.round((destPrice - sourcePrice) * 100) / 100;
  const netMargin = Math.round((grossSpread - estTransportCost) * 100) / 100;

  // Price intensity color helper for heatmap
  const getPriceIntensityColor = (districtId) => {
    const price = activeCommodity.districtPrices[districtId] || activeCommodity.mandiPrice;
    const allPrices = Object.values(activeCommodity.districtPrices);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const range = max - min || 1;
    const norm = (price - min) / range;

    if (districtId === activeDistrictId) return '#059669'; // Active green highlight
    if (norm > 0.75) return '#dc2626'; // High red
    if (norm > 0.4) return '#d97706';  // Mid amber
    return '#2563eb';                  // Low blue
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              {t.map.title}
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Kerala 14-District Commodity Price Map
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              {t.map.subtitle}
            </p>
          </div>

          {/* Commodity Heatmap Selector */}
          <div className="w-full md:w-72">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t.map.selectCommodityMap}
            </label>
            <select
              value={selectedCommodityId}
              onChange={(e) => setSelectedCommodityId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-600 focus:outline-none cursor-pointer"
            >
              {commodities.map((c) => (
                <option key={c.id} value={c.id}>
                  {lang === 'ml' ? c.nameMl : c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Map & District Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Map Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-xs font-bold text-slate-600 mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            Click any district to view market hub breakdown ({activeCommodity.name})
          </div>

          {/* Map Canvas */}
          <div className="w-full max-w-md h-[460px] bg-emerald-50/40 rounded-2xl border border-emerald-100 p-4 relative flex items-center justify-center">
            <svg viewBox="0 0 260 440" className="w-full h-full drop-shadow">
              {/* Kerala Coast Line outline background */}
              <path
                d="M 30 20 L 70 60 L 120 75 L 85 110 L 115 140 L 160 160 L 125 190 L 135 230 L 190 245 L 150 280 L 125 305 L 170 320 L 150 355 L 175 395 L 155 425 Z"
                fill="#ecfdf5"
                stroke="#a7f3d0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* District Node Markers */}
              {keralaDistricts.map((district) => {
                const color = getPriceIntensityColor(district.id);
                const isSelected = district.id === activeDistrictId;
                const price = activeCommodity.districtPrices[district.id] || activeCommodity.mandiPrice;

                return (
                  <g
                    key={district.id}
                    onClick={() => setActiveDistrictId(district.id)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for selected district */}
                    {isSelected && (
                      <circle
                        cx={district.coordinates.x}
                        cy={district.coordinates.y}
                        r="18"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                        className="animate-ping opacity-60"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      cx={district.coordinates.x}
                      cy={district.coordinates.y}
                      r={isSelected ? "14" : "11"}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="2"
                      className="transition-all duration-300 group-hover:scale-125 shadow-md"
                    />

                    {/* District ID Text Label */}
                    <text
                      x={district.coordinates.x}
                      y={district.coordinates.y + 4}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {district.id}
                    </text>

                    {/* Floating Price Tag */}
                    <rect
                      x={district.coordinates.x + 14}
                      y={district.coordinates.y - 10}
                      width="54"
                      height="18"
                      rx="4"
                      fill="#ffffff"
                      stroke="#cbd5e1"
                      strokeWidth="1"
                    />
                    <text
                      x={district.coordinates.x + 41}
                      y={district.coordinates.y + 2}
                      fill="#047857"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ₹{price}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-[11px] font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span> Lower Price Hub
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-600"></span> Mid Price Hub
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-600"></span> High Price Hub
            </span>
          </div>
        </div>

        {/* District Inspector Info Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                  Selected District Hub
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {lang === 'ml' ? activeDistrict.nameMl : activeDistrict.name} ({activeDistrict.id})
                </h3>
              </div>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
                {activeDistrict.zone}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Primary Wholesale Mandi / Harbor</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {activeDistrict.primaryHub}
                </span>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                <span className="text-slate-600 font-semibold block mb-1">
                  {activeCommodity.name} Rate in {activeDistrict.name}
                </span>
                <span className="text-2xl font-black text-emerald-800">
                  ₹{activeCommodity.districtPrices[activeDistrict.id] || activeCommodity.mandiPrice}
                  <span className="text-xs text-slate-500 font-medium"> / {activeCommodity.unit}</span>
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-2">Major Commodities Produced / Traded</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeDistrict.mainCommodities.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white text-slate-700 rounded-lg text-[11px] font-semibold border border-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inter-District Arbitrage Calculator Section */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {t.map.arbitrageTitle} ({activeCommodity.name})
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Calculate transport logistics costs and profit margins between any two Kerala district APMC markets
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.map.sourceDistrict}
            </label>
            <select
              value={sourceDistrictId}
              onChange={(e) => setSourceDistrictId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-600 focus:outline-none"
            >
              {keralaDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} (₹{activeCommodity.districtPrices[d.id] || activeCommodity.mandiPrice})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.map.destDistrict}
            </label>
            <select
              value={destDistrictId}
              onChange={(e) => setDestDistrictId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-emerald-600 focus:outline-none"
            >
              {keralaDistricts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} (₹{activeCommodity.districtPrices[d.id] || activeCommodity.mandiPrice})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-cyan-50/60 p-3 rounded-xl border border-cyan-200">
            <span className="text-[11px] text-cyan-800 font-bold block flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-cyan-600" />
              {t.map.estTransport}
            </span>
            <span className="text-lg font-black text-cyan-950 mt-1 block">
              ₹{estTransportCost} <span className="text-xs text-slate-600 font-normal">/ {activeCommodity.unit}</span>
            </span>
          </div>

          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
            <span className="text-[11px] text-emerald-800 font-bold block flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              {t.map.netProfitMargin}
            </span>
            <span className={`text-lg font-black mt-1 block ${netMargin >= 0 ? 'text-emerald-800' : 'text-rose-700'}`}>
              {netMargin >= 0 ? '+' : ''}₹{netMargin} <span className="text-xs text-slate-600 font-normal">/ {activeCommodity.unit}</span>
            </span>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-slate-700 font-medium leading-relaxed">
            {t.map.arbitrageTip}
          </p>
        </div>
      </div>
    </div>
  );
}
