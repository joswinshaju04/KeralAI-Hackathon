export const translations = {
  en: {
    brandName: "KeramPulse",
    brandSubtitle: "Kerala Market Intelligence & Price Monitoring",
    persona: "User Role",
    personas: {
      farmer: "Farmer / കർഷകൻ",
      trader: "Trader / വ്യാപാരി",
      cooperative: "Cooperative / സഹകരണം",
      consumer: "Consumer / ഉപഭോക്താവ്"
    },
    personaBadges: {
      farmer: "Farmgate & Mandi Focus",
      trader: "Wholesale & Arbitrage Focus",
      cooperative: "Bulk Supply & Aggregation Focus",
      consumer: "Retail & Price Trends Focus"
    },
    nav: {
      dashboard: "Market Dashboard",
      trends: "Historical Trends",
      districtMap: "District Map & Arbitrage",
      alerts: "Price Alerts",
      insights: "AI Insights & Weather"
    },
    ticker: {
      status: "MARKETS LIVE",
      lastUpdated: "Updated 10 mins ago",
      topGainers: "Top Gainer",
      topLosers: "Top Loser"
    },
    dashboard: {
      title: "Kerala Commodity Market Overview",
      subtitle: "Live prices, daily fluctuations, and grade spreads across 14 Kerala districts",
      searchPlaceholder: "Search commodity (e.g. Rubber RSS-4, Copra, Sardine, Nendran)...",
      allDistricts: "All 14 Districts",
      allCategories: "All Categories",
      categories: {
        plantation: "Plantation & Spices",
        coconut: "Coconut & Derivatives",
        fruits: "Fruits & Bananas",
        tubers: "Tubers & Vegetables",
        marine: "Marine & Fisheries"
      },
      stats: {
        totalTracked: "Commodities Tracked",
        avgDailyVol: "Daily Market Volume",
        topGain: "Highest Surge Today",
        arbitrageOpp: "Active Arbitrage Gaps"
      },
      tableHeaders: {
        commodity: "Commodity / Grade",
        category: "Category",
        district: "Primary Market Hub",
        farmgatePrice: "Farmgate Rate",
        mandiPrice: "Wholesale Mandi",
        retailPrice: "Retail Price",
        change24h: "24h Change",
        trend: "7-Day Sparkline",
        action: "Details"
      },
      perUnit: "per"
    },
    modal: {
      grade: "Quality Grade Spec",
      spread: "Price Spread Analysis",
      farmgate: "Farmgate Price",
      mandi: "APMC / Mandi Wholesale",
      retail: "Consumer Retail",
      advisory: "Persona Advisory",
      close: "Close"
    },
    trends: {
      title: "Historical Trends & Seasonality",
      subtitle: "Multi-timeframe price analytics with monsoon and festival demand overlays",
      selectCommodity: "Primary Commodity",
      compareWith: "Compare With (Optional)",
      timeframes: {
        "1W": "1 Week",
        "1M": "1 Month",
        "6M": "6 Months",
        "1Y": "1 Year"
      },
      chartTitle: "Price Movement (₹ / Unit)",
      volumeChartTitle: "Trade Volume Index",
      monsoonEvent: "SW Monsoon Heavy Rain Impact",
      onamEvent: "Onam Festival High Demand Peak",
      movingAvg: "30-Day Moving Average"
    },
    map: {
      title: "District Heatmap & Arbitrage Finder",
      subtitle: "Explore price distribution across Kerala's 14 districts and find profitable transport gaps",
      selectCommodityMap: "Select Commodity to View Heatmap",
      arbitrageTitle: "Inter-District Arbitrage Calculator",
      sourceDistrict: "Source Market (Buy Here)",
      destDistrict: "Destination Market (Sell Here)",
      estTransport: "Est. Transport Cost",
      netProfitMargin: "Net Profit Margin",
      arbitrageTip: "Pro Trader Tip: Buy at Kottayam APMC, transport to Kozhikode for ₹14.5/kg profit margin!"
    },
    alerts: {
      title: "Price Alert Center",
      subtitle: "Set custom triggers for WhatsApp, SMS, or In-App notifications when prices shift",
      createAlert: "Create New Price Alert",
      commodityLabel: "Commodity",
      targetPrice: "Target Price (₹)",
      condition: "Condition",
      conditions: {
        above: "Rises Above (≥)",
        below: "Drops Below (≤)"
      },
      channel: "Notification Channel",
      addBtn: "Set Alert Trigger",
      activeAlerts: "Active Alert Monitors",
      simulatedNotice: "Simulated Live Alert Test",
      triggerSimBtn: "Simulate Price Shift & Trigger Alert"
    },
    insights: {
      title: "AI Market Advisory & Weather Bulletins",
      subtitle: "Real-time AI insights, crop weather impacts, marine surge alerts, and KeramBot Assistant",
      weatherTitle: "Kerala Weather & Harvesting Impact Bulletin",
      aiAnalystTitle: "AI Market Commentary",
      askKeramBot: "Ask KeramBot (Kerala Agri-AI)",
      botPlaceholder: "e.g. Should I sell RSS-4 Rubber now or wait for monsoon? Or fish landings in Kollam?",
      send: "Ask",
      exportReport: "Download Kerala Market Intelligence Report (PDF/CSV)"
    }
  },
  ml: {
    brandName: "കേരം പൾസ്",
    brandSubtitle: "കേരള വിപണി വിലനിലവാര സൂചികയും തത്സമയ വിവരങ്ങളും",
    persona: "ഉപയോക്തൃ പങ്ക്",
    personas: {
      farmer: "കർഷകൻ",
      trader: "വ്യാപാരി",
      cooperative: "സഹകരണ സംഘം",
      consumer: "ഉപഭോക്താവ്"
    },
    personaBadges: {
      farmer: "തോട്ടവിലയും മണ്ടി നിരക്കും",
      trader: "മൊത്തവ്യാപാരവും ആർബിട്രേജും",
      cooperative: "മൊത്ത സംഭരണ നിരക്കുകൾ",
      consumer: "ചില്ലറ വിൽപ്പന വിലനിലവാരം"
    },
    nav: {
      dashboard: "വിപണി ഡാഷ്‌ബോർഡ്",
      trends: "വില ചരിത്ര ട്രെൻഡുകൾ",
      districtMap: "ജില്ലാ ഭൂപടവും വില വ്യത്യാസവും",
      alerts: "വില അറിയിപ്പുകൾ (Alerts)",
      insights: "AI വിവരങ്ങളും കാലാവസ്ഥയും"
    },
    ticker: {
      status: "ലൈവ് വിപണി",
      lastUpdated: "10 മിനിറ്റ് മുമ്പ് അപ്‌ഡേറ്റ് ചെയ്തു",
      topGainers: "കൂടിയത്",
      topLosers: "കുറഞ്ഞത്"
    },
    dashboard: {
      title: "കേരള വിപണി വില അവലോകനം",
      subtitle: "14 ജില്ലകളിലെ തത്സമയ തോട്ടവില, മണ്ടി നിരക്കുകൾ, ചില്ലറ വില വിവരങ്ങൾ",
      searchPlaceholder: "ഉൽപ്പന്നം തിരയുക (ഉദാ: റബ്ബർ, കൊപ്ര, മത്തി, നേന്ത്രപ്പഴം)...",
      allDistricts: "എല്ലാ 14 ജില്ലകളും",
      allCategories: "എല്ലാ വിഭാഗങ്ങളും",
      categories: {
        plantation: "തോട്ടവിളകളും സുഗന്ധവ്യഞ്ജനങ്ങളും",
        coconut: "തെങ്ങ് & നാളികേര ഉൽപ്പന്നങ്ങൾ",
        fruits: "പഴവർഗ്ഗങ്ങൾ & നേന്ത്രൻ",
        tubers: "കിഴങ്ങുവർഗ്ഗങ്ങളും പച്ചക്കറികളും",
        marine: "മത്സ്യ സമ്പത്ത്"
      },
      stats: {
        totalTracked: "ഉൽപ്പന്നങ്ങൾ",
        avgDailyVol: "പ്രതിദിന വ്യാപാരം",
        topGain: "ഇന്നത്തെ വലിയ കയറ്റം",
        arbitrageOpp: "ലാഭകരമായ വിപണി വ്യത്യാസങ്ങൾ"
      },
      tableHeaders: {
        commodity: "ഉൽപ്പന്നം / ഗ്രേഡ്",
        category: "വിഭാഗം",
        district: "പ്രധാന വിപണി",
        farmgatePrice: "തോട്ടവില",
        mandiPrice: "മണ്ടി നിരക്ക്",
        retailPrice: "ചില്ലറ വില",
        change24h: "24 മണിക്കൂർ മാറ്റം",
        trend: "7-ദിവസത്തെ ട്രെൻഡ്",
        action: "വിശദാംശങ്ങൾ"
      },
      perUnit: "യൂണിറ്റിന്"
    },
    modal: {
      grade: "ഗുണനിലവാര ഗ്രേഡ് സ്പെസിഫിക്കേഷൻ",
      spread: "വില വ്യത്യാസ വിശകലനം",
      farmgate: "തോട്ടവില (Farmgate)",
      mandi: "മണ്ടി വില (APMC Market)",
      retail: "ചില്ലറ വില (Retail)",
      advisory: "ഉപദേശം",
      close: "അടയ്ക്കുക"
    },
    trends: {
      title: "വില ചരിത്രവും കാലാനുസൃത മാറ്റങ്ങളും",
      subtitle: "കാലവർഷവും ഓണച്ചന്ത ആവശ്യകതയും ഉൾപ്പെടുത്തിയ ചാർട്ട് ട്രെൻഡുകൾ",
      selectCommodity: "പ്രധാന ഉൽപ്പന്നം",
      compareWith: "താരതമ്യം ചെയ്യുക",
      timeframes: {
        "1W": "1 ആഴ്ച",
        "1M": "1 മാസം",
        "6M": "6 മാസം",
        "1Y": "1 വർഷം"
      },
      chartTitle: "വിലനിലവാരം (₹)",
      volumeChartTitle: "വ്യാപാര സൂചിക",
      monsoonEvent: "ശക്തമായ കാലവർഷം മൂലമുള്ള വിലക്കയറ്റം",
      onamEvent: "ഓണം വിപണി ഡിമാൻഡ്",
      movingAvg: "30-ദിവസത്തെ ശരാശരി"
    },
    map: {
      title: "ജില്ലാ വില ഭൂപടവും ആർബിട്രേജ് കണക്കുകൂട്ടലും",
      subtitle: "കേരളത്തിലെ 14 ജില്ലകളിലെ വില വ്യത്യാസവും ലാഭകരമായ വിപണികളും കണ്ടെത്തുക",
      selectCommodityMap: "വിലനിലവാരം കാണാൻ ഉൽപ്പന്നം തിരഞ്ഞെടുക്കുക",
      arbitrageTitle: "ജില്ലാ വിപണി വ്യത്യാസ ആർബിട്രേജ് കാൽക്കുലേറ്റർ",
      sourceDistrict: "വാങ്ങുന്ന വിപണി",
      destDistrict: "വിൽക്കുന്ന വിപണി",
      estTransport: "ഗതാഗത ചെലവ് (ഏകദേശം)",
      netProfitMargin: "ചെലവ് കഴിച്ചുള്ള ലാഭം",
      arbitrageTip: "വ്യാപാരികൾക്കുള്ള നിർദ്ദേശം: കോട്ടയം മണ്ടിയിൽ നിന്ന് വാങ്ങി കോഴിക്കോട് വിറ്റാൽ കിലോയ്ക്ക് ₹14.5 ലാഭം!"
    },
    alerts: {
      title: "വില അറിയിപ്പ് കേന്ദ്രം (Alerts)",
      subtitle: "വില മാറ്റങ്ങൾ അപ്പോൾ തന്നെ WhatsApp, SMS വഴിയോ ആപ്പ് വഴിയോ അറിയാം",
      createAlert: "പുതിയ വില അറിയിപ്പ് നൽകുക",
      commodityLabel: "ഉൽപ്പന്നം",
      targetPrice: "ലക്ഷ്യ വില (₹)",
      condition: "നിബന്ധന",
      conditions: {
        above: "മുകളിലേക്ക് ഉയർന്നാൽ (≥)",
        below: "താഴേക്ക് പതിച്ചാൽ (≤)"
      },
      channel: "അറിയിപ്പ് മാർഗ്ഗം",
      addBtn: "അലേർട്ട് ക്രമീകരിക്കുക",
      activeAlerts: "സജീവമായ അലേർട്ടുകൾ",
      simulatedNotice: "തത്സമയ അലേർട്ട് പരിശോധന",
      triggerSimBtn: "വില മാറ്റം സൃഷ്ടിച്ച് അലേർട്ട് പരിശോധിക്കുക"
    },
    insights: {
      title: "AI വിപണി അവലോകനവും കാലാവസ്ഥാ വിവരങ്ങളും",
      subtitle: "കൃഷി ഉപദേശങ്ങൾ, കടൽക്കാറ്റ്/തീരദേശ വിവരങ്ങൾ, കേരംബോട്ട് AI സഹായം",
      weatherTitle: "കേരള കാലാവസ്ഥയും വിളവെടുപ്പ് സ്വാധീനവും",
      aiAnalystTitle: "AI വിപണി അവലോകനം",
      askKeramBot: "കേരംബോട്ട് (Agri-AI) ചോദിക്കുക",
      botPlaceholder: "ഉദാ: റബ്ബർ ഇപ്പോൾ വിൽക്കണമോ? മഴക്കാലത്ത് വില കൂടുമോ?",
      send: "ചോദിക്കുക",
      exportReport: "കേരള വിപണി റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക (PDF/CSV)"
    }
  }
};
