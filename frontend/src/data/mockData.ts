import type {
  CommodityPrice,
  DistrictPriceComparison,
  HistoricalDataPoint,
  MarketInsight,
  RubberDecisionInsight,
} from '../types/commodity';

export const KERALA_DISTRICTS = [
  { en: 'Thiruvananthapuram', ml: 'തിരുവനന്തപുരം' },
  { en: 'Kollam', ml: 'കൊല്ലം' },
  { en: 'Pathanamthitta', ml: 'പത്തനംതിട്ട' },
  { en: 'Alappuzha', ml: 'ആലപ്പുഴ' },
  { en: 'Kottayam', ml: 'കോട്ടയം' },
  { en: 'Idukki', ml: 'ഇടുക്കി' },
  { en: 'Ernakulam', ml: 'എറണാകുളം' },
  { en: 'Thrissur', ml: 'തൃശ്ശൂർ' },
  { en: 'Palakkad', ml: 'പാലക്കാട്' },
  { en: 'Malappuram', ml: 'മലപ്പുറം' },
  { en: 'Kozhikode', ml: 'കോഴിക്കോട്' },
  { en: 'Wayanad', ml: 'വയനാട്' },
  { en: 'Kannur', ml: 'കണ്ണൂർ' },
  { en: 'Kasaragod', ml: 'കാസർഗോഡ്' },
];

export const MOCK_COMMODITIES: CommodityPrice[] = [
  {
    id: 'rubber-rss4',
    name: 'Natural Rubber (RSS-4)',
    nameMl: 'റബ്ബർ (RSS-4)',
    category: 'plantation',
    variety: 'Sheet RSS-4',
    unit: '₹ / kg',
    minPrice: 198,
    maxPrice: 215,
    modalPrice: 208,
    previousPrice: 202,
    changePercent: 2.97,
    district: 'Kottayam',
    marketName: 'Kottayam Rubber Board Market',
    arrivalVolume: 420,
    updatedAt: new Date().toISOString(),
    msp: 180,
    status: 'surging',
  },
  {
    id: 'rubber-rss5',
    name: 'Natural Rubber (RSS-5)',
    nameMl: 'റബ്ബർ (RSS-5)',
    category: 'plantation',
    variety: 'Sheet RSS-5',
    unit: '₹ / kg',
    minPrice: 185,
    maxPrice: 196,
    modalPrice: 192,
    previousPrice: 189,
    changePercent: 1.59,
    district: 'Pathanamthitta',
    marketName: 'Adoor Market',
    arrivalVolume: 210,
    updatedAt: new Date().toISOString(),
    msp: 170,
    status: 'stable',
  },
  {
    id: 'coconut-dehusked',
    name: 'Raw Coconut (Dehusked)',
    nameMl: 'പച്ചത്തേങ്ങ',
    category: 'plantation',
    variety: 'Clean Large',
    unit: '₹ / kg',
    minPrice: 38,
    maxPrice: 46,
    modalPrice: 42,
    previousPrice: 44,
    changePercent: -4.55,
    district: 'Kozhikode',
    marketName: 'Vatakara Mandi',
    arrivalVolume: 1850,
    updatedAt: new Date().toISOString(),
    msp: 35,
    status: 'falling',
  },
  {
    id: 'coconut-copra',
    name: 'Copra (Milling Grade)',
    nameMl: 'കൊപ്ര (മില്ലിംഗ്)',
    category: 'plantation',
    variety: 'FAQ',
    unit: '₹ / quintal',
    minPrice: 10400,
    maxPrice: 11200,
    modalPrice: 10850,
    previousPrice: 10500,
    changePercent: 3.33,
    district: 'Thrissur',
    marketName: 'Thrissur Wholesale APMC',
    arrivalVolume: 920,
    updatedAt: new Date().toISOString(),
    msp: 10860,
    status: 'surging',
  },
  {
    id: 'banana-nendran',
    name: 'Banana (Nendran)',
    nameMl: 'നേന്ത്രപ്പഴം (ഏത്തക്ക)',
    category: 'fruits',
    variety: 'First Grade Local',
    unit: '₹ / kg',
    minPrice: 48,
    maxPrice: 62,
    modalPrice: 56,
    previousPrice: 52,
    changePercent: 7.69,
    district: 'Thrissur',
    marketName: 'Pazhayannur Banana Market',
    arrivalVolume: 1250,
    updatedAt: new Date().toISOString(),
    status: 'surging',
  },
  {
    id: 'banana-robusta',
    name: 'Banana (Robusta)',
    nameMl: 'റോബസ്റ്റ പഴം',
    category: 'fruits',
    variety: 'Green Cavendish',
    unit: '₹ / kg',
    minPrice: 26,
    maxPrice: 34,
    modalPrice: 30,
    previousPrice: 31,
    changePercent: -3.23,
    district: 'Palakkad',
    marketName: 'Palakkad Big Bazaar',
    arrivalVolume: 850,
    updatedAt: new Date().toISOString(),
    status: 'falling',
  },
  {
    id: 'pepper-black',
    name: 'Black Pepper (Garbled)',
    nameMl: 'കുരുമുളക് (ഗാർബിൾഡ്)',
    category: 'spices',
    variety: 'Malabar Grade 1',
    unit: '₹ / kg',
    minPrice: 630,
    maxPrice: 685,
    modalPrice: 660,
    previousPrice: 655,
    changePercent: 0.76,
    district: 'Idukki',
    marketName: 'Nedumkandam Spices Yard',
    arrivalVolume: 320,
    updatedAt: new Date().toISOString(),
    status: 'stable',
  },
  {
    id: 'cardamom-small',
    name: 'Small Cardamom',
    nameMl: 'ഏലക്കായ് (ചെറുത്)',
    category: 'spices',
    variety: '7-8mm Green Bold',
    unit: '₹ / kg',
    minPrice: 2150,
    maxPrice: 2480,
    modalPrice: 2320,
    previousPrice: 2280,
    changePercent: 1.75,
    district: 'Idukki',
    marketName: 'Bodinayakanur / Vandanmedu Spices Board',
    arrivalVolume: 140,
    updatedAt: new Date().toISOString(),
    status: 'surging',
  },
  {
    id: 'fish-sardine',
    name: 'Oil Sardine (Mathi / Chaala)',
    nameMl: 'മത്തി / ചാള',
    category: 'fisheries',
    variety: 'Fresh Marine Catch',
    unit: '₹ / kg',
    minPrice: 140,
    maxPrice: 190,
    modalPrice: 165,
    previousPrice: 180,
    changePercent: -8.33,
    district: 'Ernakulam',
    marketName: 'Kochi Harbour Wharf',
    arrivalVolume: 4200,
    updatedAt: new Date().toISOString(),
    status: 'falling',
  },
  {
    id: 'fish-mackerel',
    name: 'Indian Mackerel (Ayala)',
    nameMl: 'അയല',
    category: 'fisheries',
    variety: 'Medium Fresh',
    unit: '₹ / kg',
    minPrice: 220,
    maxPrice: 270,
    modalPrice: 245,
    previousPrice: 240,
    changePercent: 2.08,
    district: 'Kollam',
    marketName: 'Neendakara Fishing Port',
    arrivalVolume: 2600,
    updatedAt: new Date().toISOString(),
    status: 'stable',
  },
  {
    id: 'tapioca-raw',
    name: 'Tapioca (Kappa)',
    nameMl: 'കപ്പ (മരച്ചീനി)',
    category: 'vegetables',
    variety: 'Edible Fresh Tubers',
    unit: '₹ / kg',
    minPrice: 22,
    maxPrice: 29,
    modalPrice: 25,
    previousPrice: 24,
    changePercent: 4.17,
    district: 'Kottayam',
    marketName: 'Ettumanoor Wholesale Mandi',
    arrivalVolume: 1600,
    updatedAt: new Date().toISOString(),
    status: 'surging',
  },
  {
    id: 'shallots-small-onion',
    name: 'Small Onion (Shallots / Cheriyulli)',
    nameMl: 'ചെറിയ ഉള്ളി (ചുവന്നുള്ളി)',
    category: 'vegetables',
    variety: 'Grade A Local & Tamilnadu Inflow',
    unit: '₹ / kg',
    minPrice: 65,
    maxPrice: 85,
    modalPrice: 74,
    previousPrice: 78,
    changePercent: -5.13,
    district: 'Palakkad',
    marketName: 'Palakkad Vadakkanthara Market',
    arrivalVolume: 2100,
    updatedAt: new Date().toISOString(),
    status: 'falling',
  },
];

export const generateHistoricalData = (
  basePrice: number,
  days: number = 90,
  trendDirection: 'up' | 'down' | 'volatile' = 'up'
): HistoricalDataPoint[] => {
  const points: HistoricalDataPoint[] = [];
  const now = new Date();
  let price = basePrice * (trendDirection === 'up' ? 0.88 : trendDirection === 'down' ? 1.12 : 0.98);

  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const drift = trendDirection === 'up' ? 0.0018 : trendDirection === 'down' ? -0.0015 : 0.0002;
    const noise = (Math.random() - 0.48) * 0.025;
    price = price * (1 + drift + noise);

    const modal = Math.round(price);
    const min = Math.round(modal * 0.94);
    const max = Math.round(modal * 1.06);
    const volume = Math.round(300 + Math.random() * 400);

    points.push({
      date: dateStr,
      modalPrice: modal,
      minPrice: min,
      maxPrice: max,
      volume,
      isForecast: false,
    });
  }

  let lastPrice = points[points.length - 1].modalPrice;
  for (let f = 1; f <= 14; f++) {
    const fd = new Date(now);
    fd.setDate(fd.getDate() + f);
    const dateStr = fd.toISOString().split('T')[0];

    const fDrift = trendDirection === 'up' ? 0.003 : -0.002;
    lastPrice = lastPrice * (1 + fDrift + (Math.random() - 0.49) * 0.008);

    points.push({
      date: dateStr,
      modalPrice: Math.round(lastPrice),
      minPrice: Math.round(lastPrice * 0.95),
      maxPrice: Math.round(lastPrice * 1.05),
      forecastPrice: Math.round(lastPrice),
      isForecast: true,
      volume: 380,
    });
  }

  return points;
};

export const getDistrictComparisons = (commodityId: string): DistrictPriceComparison[] => {
  const baseCommodity = MOCK_COMMODITIES.find((c) => c.id === commodityId) || MOCK_COMMODITIES[0];
  const base = baseCommodity.modalPrice;

  const districtVariances: Record<string, { multiplier: number; market: string; trend: 'up' | 'down' | 'flat' }> = {
    Kottayam: { multiplier: 1.03, market: 'Rubber Board Main Yard', trend: 'up' },
    Pathanamthitta: { multiplier: 0.99, market: 'Adoor Central Mandi', trend: 'flat' },
    Ernakulam: { multiplier: 1.02, market: 'Kochi APMC Yard', trend: 'up' },
    Idukki: { multiplier: 1.05, market: 'Nedumkandam Yard', trend: 'up' },
    Thrissur: { multiplier: 1.01, market: 'Thrissur Wholesale', trend: 'flat' },
    Palakkad: { multiplier: 0.96, market: 'Palakkad APMC', trend: 'down' },
    Kozhikode: { multiplier: 0.98, market: 'Valayanad Mandi', trend: 'up' },
    Wayanad: { multiplier: 1.04, market: 'Kalpetta Agro Market', trend: 'up' },
    Alappuzha: { multiplier: 0.97, market: 'Mavelikkara Mandi', trend: 'down' },
    Kollam: { multiplier: 0.98, market: 'Kottarakkara Market', trend: 'flat' },
    Thiruvananthapuram: { multiplier: 1.01, market: 'Chala Wholesale Market', trend: 'up' },
    Malappuram: { multiplier: 0.96, market: 'Manjeri Agro Market', trend: 'down' },
    Kannur: { multiplier: 0.99, market: 'Thalassery Mandi', trend: 'flat' },
    Kasaragod: { multiplier: 0.95, market: 'Kanhangad Market', trend: 'down' },
  };

  return KERALA_DISTRICTS.map((d) => {
    const config = districtVariances[d.en] || { multiplier: 1.0, market: `${d.en} Town Market`, trend: 'flat' };
    const modal = Math.round(base * config.multiplier);
    const min = Math.round(modal * 0.95);
    const max = Math.round(modal * 1.06);
    const change = Number(((config.multiplier - 1) * 10 + (Math.random() * 2 - 1)).toFixed(1));

    return {
      district: d.en,
      districtMl: d.ml,
      modalPrice: modal,
      minPrice: min,
      maxPrice: max,
      marketName: config.market,
      trend: config.trend,
      change24h: change,
      arrivalVolume: Math.round(150 + Math.random() * 850),
    };
  }).sort((a, b) => b.modalPrice - a.modalPrice);
};

export const MOCK_RUBBER_DECISION: RubberDecisionInsight = {
  currentPrice: 208,
  threeMonthAgoPrice: 178,
  predicted30DayPrice: 224,
  recommendation: 'HOLD',
  recommendationRationale:
    'Prices have rallied +16.8% over the past 3 months. Due to heavy monsoon unseasonal rains disrupting sheet tapping across Kottayam & Pathanamthitta, combined with rising international crude oil prices boosting synthetic rubber costs, Indian domestic RSS-4 prices are forecasted to hit ₹220 - ₹225 / kg over the next 15-20 days. Recommend holding inventory for another 2 weeks or releasing in phased tranches.',
  recommendationRationaleMl:
    'കഴിഞ്ഞ 3 മാസത്തിനിടെ റബ്ബർ വിലയിൽ +16.8% വർദ്ധനവ് ഉണ്ടായിട്ടുണ്ട്. കോട്ടയം, പത്തനംതിട്ട മേഖലകളിൽ മഴ കാരണം ടാപ്പിംഗ് തടസ്സപ്പെട്ടതിനാലും രാജ്യാന്തര വില കൂടിയതിനാലും അടുത്ത രണ്ടാഴ്ചക്കുള്ളിൽ RSS-4 വില ₹220 - ₹225 എത്തുവാൻ സാധ്യതയുണ്ട്. അതിനാൽ ഇപ്പോൾ പൂർണ്ണമായി വിൽക്കാതെ രണ്ടാഴ്ച കൂടി കാത്തിരിക്കുകയോ ഗഡുക്കളായി വിൽക്കുകയോ ചെയ്യുന്നത് ഉചിതമായിരിക്കും.',
  keyDrivers: [
    'Tapping disrupted by 35% across central Travancore districts',
    'Automotive tyre manufacturing demand up 8.4% month-on-month',
    'Import parity price of Bangkok RSS-3 remains high at ₹218/kg',
    'Kerala Rubber Production Incentive Scheme (RPIS) benchmark at ₹180/kg provides solid floor support',
  ],
  historicalSeries: generateHistoricalData(208, 90, 'up'),
};

export const MOCK_INSIGHTS: MarketInsight[] = [
  {
    id: 'ins-1',
    title: 'Monsoon Delays Disrupting Central Kerala Rubber Tapping',
    titleMl: 'കാലവർഷം: മധ്യകേരളത്തിൽ റബ്ബർ ടാപ്പിംഗ് തടസ്സപ്പെട്ടു',
    description:
      'Continuous rains across Kottayam, Idukki, and Pathanamthitta have curtailed latex yields by ~35%. Domestic tyre manufacturers are ramping up local procurement as import duties remain strict.',
    descriptionMl:
      'കോട്ടയം, ഇടുക്കി, പത്തനംതിട്ട ജില്ലകളിൽ പെയ്യുന്ന മഴ കാരണം റബ്ബർ ഉൽപാദനം 35% കുറഞ്ഞു. ടയർ കമ്പനികൾ പ്രാദേശിക വിപണിയിൽ നിന്ന് കൂടുതൽ വാങ്ങുന്നു.',
    category: 'weather',
    impact: 'positive',
    affectedCommodities: ['Natural Rubber (RSS-4)', 'Natural Rubber (RSS-5)'],
    confidenceScore: 94,
    date: 'Today, 09:30 AM',
    actionableTip: 'Farmers with dry RSS-4 stock can wait for another 10-14 days as prices approach ₹220/kg.',
    actionableTipMl: 'ഉണങ്ങിയ ഷീറ്റുകൾ ഉള്ള കർഷകർക്ക് രണ്ടാഴ്ച കൂടി കാത്തിരുന്നാൽ കൂടുതൽ വില ലഭിക്കും.',
  },
  {
    id: 'ins-2',
    title: 'Copra Milling Demand Rebounds Ahead of Festive Month',
    titleMl: 'ഉത്സവ സീസൺ: കൊപ്ര മില്ലിംഗ് ഡിമാൻഡ് ഉയരുന്നു',
    description:
      'Milling copra arrivals in Thrissur and Kozhikode have tightened. Edible oil millers in Tamil Nadu and Kerala are actively booking forward contracts, pushing prices above ₹10,800/quintal.',
    descriptionMl:
      'തൃശ്ശൂർ, കോഴിക്കോട് മാർക്കറ്റുകളിൽ കൊപ്ര വരവ് കുറഞ്ഞു. വെളിച്ചെണ്ണ മില്ലുകൾ കൂടിയ വിലയ്ക്ക് കൊപ്ര ശേഖരിക്കുന്നു.',
    category: 'demand',
    impact: 'positive',
    affectedCommodities: ['Copra (Milling Grade)', 'Raw Coconut (Dehusked)'],
    confidenceScore: 89,
    date: 'Yesterday, 04:15 PM',
    actionableTip: 'Cooperative societies can pool dehusked copra to negotiate higher spot prices with bulk millers.',
    actionableTipMl: 'സഹകരണ സംഘങ്ങൾക്ക് കർഷകരുടെ കൊപ്ര ഒന്നിച്ച് ശേഖരിച്ച് മില്ലുകൾക്ക് കൂടിയ വിലയ്ക്ക് നൽകാം.',
  },
  {
    id: 'ins-3',
    title: 'Banana (Nendran) Supply Gap Boosts Spot Rates in Thrissur',
    titleMl: 'നേന്ത്രക്കായ: തൃശ്ശൂരിൽ വില കുതിച്ചുയരുന്നു',
    description:
      'Pazhayannur and Ernakulam markets report 22% lower arrivals due to early harvest wrap-up in Wayanad and high chip processing demand.',
    descriptionMl:
      'വയനാട്ടിൽ വിളവെടുപ്പ് പൂർത്തിയായതിനാലും ചിപ്സ് നിർമ്മാതാക്കളുടെ ഡിമാൻഡ് കൂടിയതിനാലും നേന്ത്രക്കായ വില ₹56/കിലോയിലെത്തി.',
    category: 'supply',
    impact: 'positive',
    affectedCommodities: ['Banana (Nendran)'],
    confidenceScore: 91,
    date: '05 Oct 2026',
    actionableTip: 'Peak harvest farmers in Palakkad and Thrissur are advised to liquidate within 4-6 days while chip demand peaks.',
    actionableTipMl: 'പാലക്കാട്, തൃശ്ശൂർ കർഷകർക്ക് ഇപ്പോൾ നല്ല വിലയിൽ വിൽക്കാൻ അനുയോജ്യമായ സമയമാണ്.',
  },
  {
    id: 'ins-4',
    title: 'Marine Fishing Inflow Spikes: Sardine & Mackerel Prices Cool',
    titleMl: 'മത്സ്യ ലഭ്യത കൂടി: മത്തി, അയല വില കുറഞ്ഞു',
    description:
      'Favorable sea conditions along Kochi and Neendakara harbour have yielded bumper pelagic catches over the last 48 hours, causing local wholesale fish prices to drop ~8%.',
    descriptionMl:
      'കൊച്ചി, നീണ്ടകര തീരങ്ങളിൽ വൻതോതിൽ മത്തിയും അയലയും ലഭിച്ചതോടെ മൊത്തവിലയിൽ 8% കുറവ് രേഖപ്പെടുത്തി.',
    category: 'supply',
    impact: 'negative',
    affectedCommodities: ['Oil Sardine (Mathi / Chaala)', 'Indian Mackerel (Ayala)'],
    confidenceScore: 87,
    date: '04 Oct 2026',
    actionableTip: 'Wholesale traders can leverage cold chain storage or route surplus catch toward inland districts (Idukki, Kottayam) for higher retail margins.',
    actionableTipMl: 'വ്യാപാരികൾ ഉൾനാടൻ ജില്ലകളിലേക്ക് മത്സ്യം എത്തിച്ചാൽ കൂടുതൽ ലാഭം നേടാം.',
  },
];
