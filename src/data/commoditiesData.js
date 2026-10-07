export const commodities = [
  {
    id: "rubber-rss4",
    name: "Rubber RSS-4",
    nameMl: "റബ്ബർ RSS-4",
    category: "plantation",
    categoryNameEn: "Plantation & Spices",
    categoryNameMl: "തോട്ടവിളകളും സുഗന്ധവ്യഞ്ജനങ്ങളും",
    unit: "kg",
    grade: "RSS-4 (Ribbed Smoked Sheet)",
    primaryDistrict: "Kottayam",
    farmgatePrice: 204.00,
    mandiPrice: 212.50,
    retailPrice: 226.00,
    change24h: 3.40,
    change24hPercent: 1.63,
    volume: "1,450 Qtl",
    sparkline: [205, 206, 204, 208, 210, 209, 212.5],
    districtPrices: {
      KTM: 212.50, EKM: 211.00, PTA: 210.50, IDK: 209.00,
      TCR: 213.00, PKD: 214.00, MLP: 213.50, KKD: 215.00,
      WYD: 208.50, KNR: 214.50, KSG: 215.50, KLM: 211.50,
      TVM: 213.00, ALP: 212.00
    },
    advisory: {
      farmer: "Demand for RSS-4 is high due to tyre manufacturing orders. Hold stock if you have dry storage; prices expected to test ₹220/kg.",
      trader: "Arbitrage gap between Idukki (₹209) and Kozhikode (₹215) is ₹6.00/kg. Freight cost approx ₹1.80/kg.",
      cooperative: "Procurement targets for Kottayam region achieved at 84%. Recommended payout to farmers: ₹206/kg.",
      consumer: "Industrial commodity - indirect impact on vehicle tyres and rubber footwear."
    },
    history1M: [
      { date: "Sep 07", price: 198, volume: 1100 },
      { date: "Sep 12", price: 201, volume: 1250 },
      { date: "Sep 17", price: 200, volume: 1180 },
      { date: "Sep 22", price: 204, volume: 1300 },
      { date: "Sep 27", price: 207, volume: 1380 },
      { date: "Oct 02", price: 209, volume: 1410 },
      { date: "Oct 07", price: 212.5, volume: 1450 }
    ]
  },
  {
    id: "copra-mandi",
    name: "Copra (Cleaned & Dried)",
    nameMl: "കൊപ്ര (ഉണക്കിയത്)",
    category: "coconut",
    categoryNameEn: "Coconut & Derivatives",
    categoryNameMl: "തെങ്ങ് & നാളികേര ഉൽപ്പന്നങ്ങൾ",
    unit: "quintal",
    grade: "Grade A Oil Grade",
    primaryDistrict: "Kozhikode",
    farmgatePrice: 10800.00,
    mandiPrice: 11450.00,
    retailPrice: 12200.00,
    change24h: -120.00,
    change24hPercent: -1.04,
    volume: "3,200 Qtl",
    sparkline: [11600, 11580, 11550, 11500, 11480, 11470, 11450],
    districtPrices: {
      KKD: 11450, KSG: 11300, KNR: 11380, MLP: 11400,
      TCR: 11500, EKM: 11550, KTM: 11480, ALP: 11520,
      KLM: 11600, TVM: 11650, PKD: 11420, WYD: 11250,
      IDK: 11200, PTA: 11490
    },
    advisory: {
      farmer: "Moisture content must be below 6% to avoid deduction at Vatakara APMC.",
      trader: "Tamil Nadu copra influx at Kangayam market exerting mild downward pressure.",
      cooperative: "NAFED procurement ongoing at MSP ₹11,160/quintal.",
      consumer: "Coconut oil prices likely to stabilize around ₹165/litre next week."
    },
    history1M: [
      { date: "Sep 07", price: 11800, volume: 2900 },
      { date: "Sep 12", price: 11750, volume: 3000 },
      { date: "Sep 17", price: 11650, volume: 3100 },
      { date: "Sep 22", price: 11600, volume: 3050 },
      { date: "Sep 27", price: 11520, volume: 3150 },
      { date: "Oct 02", price: 11490, volume: 3180 },
      { date: "Oct 07", price: 11450, volume: 3200 }
    ]
  },
  {
    id: "coconut-oil",
    name: "Pure Coconut Oil",
    nameMl: "വെളിച്ചെണ്ണ (ശുദ്ധമായത്)",
    category: "coconut",
    categoryNameEn: "Coconut & Derivatives",
    categoryNameMl: "തെങ്ങ് & നാളികേര ഉൽപ്പന്നങ്ങൾ",
    unit: "litre",
    grade: "Agmark Certified 100% Pure",
    primaryDistrict: "Kollam",
    farmgatePrice: 154.00,
    mandiPrice: 168.00,
    retailPrice: 182.00,
    change24h: 1.50,
    change24hPercent: 0.90,
    volume: "45,000 L",
    sparkline: [165, 166, 165.5, 167, 167.5, 168, 168],
    districtPrices: {
      KLM: 168, TVM: 172, EKM: 170, TCR: 169,
      KKD: 166, KNR: 167, KSG: 165, PKD: 167,
      MLP: 168, KTM: 170, ALP: 169, PTA: 171,
      IDK: 173, WYD: 174
    },
    advisory: {
      farmer: "Millers offering premium for organic sulfur-free copra lots.",
      trader: "Festive season stocking starting; steady consumer demand across Kerala & Gulf exports.",
      cooperative: "KERAFED retail packs priced at ₹178/Litre.",
      consumer: "Stock up during current stable pricing window."
    },
    history1M: [
      { date: "Sep 07", price: 162, volume: 40000 },
      { date: "Sep 12", price: 163, volume: 42000 },
      { date: "Sep 17", price: 165, volume: 41000 },
      { date: "Sep 22", price: 166, volume: 43000 },
      { date: "Sep 27", price: 167, volume: 44000 },
      { date: "Oct 02", price: 167.5, volume: 44500 },
      { date: "Oct 07", price: 168, volume: 45000 }
    ]
  },
  {
    id: "nendran-banana",
    name: "Nendran Banana (A Grade)",
    nameMl: "നേന്ത്രപ്പഴം (A ഗ്രേഡ്)",
    category: "fruits",
    categoryNameEn: "Fruits & Bananas",
    categoryNameMl: "പഴവർഗ്ഗങ്ങൾ & നേന്ത്രൻ",
    unit: "kg",
    grade: "Grade A Extra Length (Export/Chips)",
    primaryDistrict: "Wayanad",
    farmgatePrice: 42.00,
    mandiPrice: 49.50,
    retailPrice: 62.00,
    change24h: 4.20,
    change24hPercent: 9.27,
    volume: "850 Tonnes",
    sparkline: [44, 43.5, 45, 46, 47.5, 48, 49.5],
    districtPrices: {
      WYD: 49.5, PKD: 48.0, TCR: 52.0, EKM: 54.0,
      TVM: 56.0, KLM: 55.0, KTM: 53.0, MLP: 50.0,
      KKD: 51.5, KNR: 52.5, IDK: 47.5, PTA: 54.5,
      ALP: 55.5, KSG: 53.0
    },
    advisory: {
      farmer: "Wayanad & Palakkad crop harvest volume picking up. High demand for banana chips processing.",
      trader: "Huge price gap between Wayanad (₹49.5) and Thiruvananthapuram (₹56.0). High margin transport corridor.",
      cooperative: "VFPCK offering ₹44/kg direct farmgate buyback for registered farmers.",
      consumer: "Retail price elevated due to wedding and temple festival season."
    },
    history1M: [
      { date: "Sep 07", price: 41, volume: 720 },
      { date: "Sep 12", price: 42, volume: 750 },
      { date: "Sep 17", price: 43.5, volume: 790 },
      { date: "Sep 22", price: 45, volume: 810 },
      { date: "Sep 27", price: 47, volume: 830 },
      { date: "Oct 02", price: 48.5, volume: 845 },
      { date: "Oct 07", price: 49.5, volume: 850 }
    ]
  },
  {
    id: "cardamom-green",
    name: "Small Cardamom 8mm",
    nameMl: "ഏലയ്ക്ക 8mm (ഗ്രീൻ)",
    category: "plantation",
    categoryNameEn: "Plantation & Spices",
    categoryNameMl: "തോട്ടവിളകളും സുഗന്ധവ്യഞ്ജനങ്ങളും",
    unit: "kg",
    grade: "8mm Bold Extra Green",
    primaryDistrict: "Idukki",
    farmgatePrice: 2450.00,
    mandiPrice: 2680.00,
    retailPrice: 3100.00,
    change24h: 85.00,
    change24hPercent: 3.28,
    volume: "68 Tonnes",
    sparkline: [2520, 2550, 2580, 2600, 2620, 2650, 2680],
    districtPrices: {
      IDK: 2680, EKM: 2720, KTM: 2710, TCR: 2730,
      TVM: 2750, KKD: 2740, WYD: 2690, PKD: 2730,
      MLP: 2745, KLM: 2755, KNR: 2750, KSG: 2760,
      ALP: 2740, PTA: 2725
    },
    advisory: {
      farmer: "Spices Board auction average price breached ₹2,650/kg. Rains in Bodinayakanur & Kattappana improved capsule size.",
      trader: "North Indian winter festive & marriage buyer inquiries pushing prices upward.",
      cooperative: "Farmers recommended to grade capsules carefully (8mm commands ₹350/kg premium over 7mm).",
      consumer: "High grade retail packs premium product."
    },
    history1M: [
      { date: "Sep 07", price: 2380, volume: 55 },
      { date: "Sep 12", price: 2420, volume: 58 },
      { date: "Sep 17", price: 2490, volume: 60 },
      { date: "Sep 22", price: 2560, volume: 62 },
      { date: "Sep 27", price: 2610, volume: 65 },
      { date: "Oct 02", price: 2640, volume: 66 },
      { date: "Oct 07", price: 2680, volume: 68 }
    ]
  },
  {
    id: "tapioca-kappa",
    name: "Tapioca / Kappa (Fresh)",
    nameMl: "കപ്പ / മരച്ചീനി",
    category: "tubers",
    categoryNameEn: "Tubers & Vegetables",
    categoryNameMl: "കിഴങ്ങുവർഗ്ഗങ്ങളും പച്ചക്കറികളും",
    unit: "kg",
    grade: "Raw Fresh White Root",
    primaryDistrict: "Thiruvananthapuram",
    farmgatePrice: 18.00,
    mandiPrice: 24.00,
    retailPrice: 32.00,
    change24h: -0.80,
    change24hPercent: -3.23,
    volume: "1,200 Tonnes",
    sparkline: [26, 25.5, 25, 24.8, 24.5, 24.2, 24.0],
    districtPrices: {
      TVM: 24.0, KLM: 24.5, PTA: 23.5, KTM: 23.0,
      IDK: 21.0, EKM: 25.0, TCR: 25.5, PKD: 26.0,
      MLP: 26.5, KKD: 27.0, WYD: 22.0, KNR: 27.5,
      KSG: 28.0, ALP: 24.8
    },
    advisory: {
      farmer: "Peak harvest arrivals from Nedumangad & Adoor mandis. Starch factory demand steady.",
      trader: "High supply pressure; short shelf life requires fast dispatch to Northern districts.",
      cooperative: "Value addition into dried chips (Vaattu Kappa) advised to lock higher margins.",
      consumer: "Very affordable retail rates across local markets."
    },
    history1M: [
      { date: "Sep 07", price: 28, volume: 950 },
      { date: "Sep 12", price: 27, volume: 1020 },
      { date: "Sep 17", price: 26.5, volume: 1100 },
      { date: "Sep 22", price: 25.5, volume: 1150 },
      { date: "Sep 27", price: 24.8, volume: 1180 },
      { date: "Oct 02", price: 24.3, volume: 1190 },
      { date: "Oct 07", price: 24.0, volume: 1200 }
    ]
  },
  {
    id: "fish-sardine",
    name: "Sardine / Mathi (Fresh Landing)",
    nameMl: "മത്തി / ചാള (ഫ്രഷ്)",
    category: "marine",
    categoryNameEn: "Marine & Fisheries",
    categoryNameMl: "മത്സ്യ സമ്പത്ത്",
    unit: "kg",
    grade: "Fresh Harbor Landing Grade 1",
    primaryDistrict: "Kollam",
    farmgatePrice: 140.00,
    mandiPrice: 175.00,
    retailPrice: 210.00,
    change24h: -15.00,
    change24hPercent: -7.89,
    volume: "420 Tonnes",
    sparkline: [210, 205, 195, 190, 185, 180, 175],
    districtPrices: {
      KLM: 175, TVM: 185, ALP: 170, EKM: 180,
      TCR: 185, KKD: 172, KNR: 175, KSG: 178,
      PKD: 198, MLP: 182, KTM: 192, PTA: 195,
      IDK: 210, WYD: 215
    },
    advisory: {
      farmer: "Traditional purse-seine boats reporting high catches off Neendakara & Munambam coast.",
      trader: "Supply glut at coastal harbors; inland markets (Palakkad, Wayanad) present ₹40/kg price premium.",
      cooperative: "Matsyafed fish markets maintaining price stability at ₹185/kg.",
      consumer: "Excellent fresh catch availability; prices 15% lower than last month."
    },
    history1M: [
      { date: "Sep 07", price: 230, volume: 210 },
      { date: "Sep 12", price: 220, volume: 260 },
      { date: "Sep 17", price: 205, volume: 310 },
      { date: "Sep 22", price: 195, volume: 360 },
      { date: "Sep 27", price: 185, volume: 390 },
      { date: "Oct 02", price: 180, volume: 410 },
      { date: "Oct 07", price: 175, volume: 420 }
    ]
  },
  {
    id: "fish-neymeen",
    name: "Seer Fish / Neymeen (Kingfish)",
    nameMl: "നെയ്യ്മീൻ / കിംഗ് ഫിഷ്",
    category: "marine",
    categoryNameEn: "Marine & Fisheries",
    categoryNameMl: "മത്സ്യ സമ്പത്ത്",
    unit: "kg",
    grade: "Large Whole Fish (> 3kg)",
    primaryDistrict: "Ernakulam",
    farmgatePrice: 720.00,
    mandiPrice: 850.00,
    retailPrice: 980.00,
    change24h: 30.00,
    change24hPercent: 3.66,
    volume: "45 Tonnes",
    sparkline: [800, 810, 820, 815, 830, 840, 850],
    districtPrices: {
      EKM: 850, TVM: 880, KLM: 860, ALP: 855,
      TCR: 870, KKD: 840, KNR: 845, KSG: 850,
      KTM: 890, PTA: 900, PKD: 910, MLP: 865,
      IDK: 940, WYD: 950
    },
    advisory: {
      farmer: "Deep-sea gillnet vessels landing prime catches at Thoppumpady harbor.",
      trader: "Strong export demand and restaurant sector buying.",
      cooperative: "Harbor auction bidding active.",
      consumer: "High-end premium fish species; stable demand."
    },
    history1M: [
      { date: "Sep 07", price: 790, volume: 38 },
      { date: "Sep 12", price: 805, volume: 40 },
      { date: "Sep 17", price: 815, volume: 42 },
      { date: "Sep 22", price: 830, volume: 41 },
      { date: "Sep 27", price: 835, volume: 43 },
      { date: "Oct 02", price: 842, volume: 44 },
      { date: "Oct 07", price: 850, volume: 45 }
    ]
  },
  {
    id: "black-pepper",
    name: "Black Pepper (Garbled)",
    nameMl: "കുരുമുളക് (ഗാർബിൾഡ്)",
    category: "plantation",
    categoryNameEn: "Plantation & Spices",
    categoryNameMl: "തോട്ടവിളകളും സുഗന്ധവ്യഞ്ജനങ്ങളും",
    unit: "kg",
    grade: "Ungarbled Malabar Black 550 g/l",
    primaryDistrict: "Wayanad",
    farmgatePrice: 625.00,
    mandiPrice: 665.00,
    retailPrice: 720.00,
    change24h: 5.00,
    change24hPercent: 0.76,
    volume: "180 Tonnes",
    sparkline: [650, 652, 655, 658, 660, 662, 665],
    districtPrices: {
      WYD: 665, IDK: 660, KTM: 662, EKM: 670,
      TCR: 668, KKD: 672, KNR: 670, KSG: 668,
      TVM: 675, KLM: 673, PTA: 665, ALP: 670,
      PKD: 669, MLP: 671
    },
    advisory: {
      farmer: "International pepper prices firm. Hold stock for better ungarbled rates above ₹680/kg.",
      trader: "Export buyers at IPSTA Kochi offering tight quotes.",
      cooperative: "Quality testing available at Sulthan Bathery lab.",
      consumer: "Spices market holding steady."
    },
    history1M: [
      { date: "Sep 07", price: 640, volume: 150 },
      { date: "Sep 12", price: 648, volume: 160 },
      { date: "Sep 17", price: 652, volume: 168 },
      { date: "Sep 22", price: 658, volume: 172 },
      { date: "Sep 27", price: 660, volume: 175 },
      { date: "Oct 02", price: 663, volume: 178 },
      { date: "Oct 07", price: 665, volume: 180 }
    ]
  },
  {
    id: "pineapple-vazhakulam",
    name: "Pineapple (Mauritius)",
    nameMl: "കൈതച്ചക്ക (മൗറീഷ്യസ്)",
    category: "fruits",
    categoryNameEn: "Fruits & Bananas",
    categoryNameMl: "പഴവർഗ്ഗങ്ങൾ & നേന്ത്രൻ",
    unit: "kg",
    grade: "Vazhakulam GI Tagged Grade A",
    primaryDistrict: "Ernakulam",
    farmgatePrice: 32.00,
    mandiPrice: 38.00,
    retailPrice: 48.00,
    change24h: 2.00,
    change24hPercent: 5.56,
    volume: "650 Tonnes",
    sparkline: [34, 35, 36, 36.5, 37, 37.5, 38],
    districtPrices: {
      EKM: 38, KTM: 37.5, PTA: 39, IDK: 36.5,
      TCR: 39.5, PKD: 40, MLP: 41, KKD: 41.5,
      WYD: 42, KNR: 42.5, KSG: 43, KLM: 39,
      TVM: 40.5, ALP: 38.5
    },
    advisory: {
      farmer: "GI tagged Mauritius variety receiving strong inter-state demand in Delhi and Mumbai.",
      trader: "Vazhakulam market turnover is steady; good profit margins for northern dispatches.",
      cooperative: "Pineapple Farmers Association maintaining baseline procurement rates.",
      consumer: "Fresh sweet pineapple available across local retail markets."
    },
    history1M: [
      { date: "Sep 07", price: 33, volume: 580 },
      { date: "Sep 12", price: 34, volume: 600 },
      { date: "Sep 17", price: 35.5, volume: 620 },
      { date: "Sep 22", price: 36, volume: 635 },
      { date: "Sep 27", price: 37, volume: 640 },
      { date: "Oct 02", price: 37.5, volume: 645 },
      { date: "Oct 07", price: 38, volume: 650 }
    ]
  },
  {
    id: "paddy-jyothi",
    name: "Paddy / Rice (Jyothi)",
    nameMl: "നെല്ല് (ജ്യോതി)",
    category: "tubers",
    categoryNameEn: "Tubers & Vegetables",
    categoryNameMl: "കിഴങ്ങുവർഗ്ഗങ്ങളും പച്ചക്കറികളും",
    unit: "quintal",
    grade: "Raw Paddy Grade A (14% Moisture)",
    primaryDistrict: "Palakkad",
    farmgatePrice: 2820.00,
    mandiPrice: 2950.00,
    retailPrice: 3250.00,
    change24h: 15.00,
    change24hPercent: 0.51,
    volume: "4,500 Qtl",
    sparkline: [2920, 2930, 2935, 2940, 2945, 2948, 2950],
    districtPrices: {
      PKD: 2950, ALP: 2940, TCR: 2960, KLM: 2970,
      TVM: 2980, KTM: 2955, PTA: 2965, EKM: 2975,
      MLP: 2960, KKD: 2970, WYD: 2930, KNR: 2985,
      KSG: 2990, IDK: 2950
    },
    advisory: {
      farmer: "Supplyco paddy procurement ongoing at ₹28.20/kg. Ensure moisture content is verified before delivery.",
      trader: "Alathur and Kuttanad harvesting arrivals meeting mill processing capacity.",
      cooperative: "Paddy Farmers Cooperative societies disbursing procurement incentives.",
      consumer: "Matta rice retail prices expected to hold stable."
    },
    history1M: [
      { date: "Sep 07", price: 2900, volume: 4100 },
      { date: "Sep 12", price: 2915, volume: 4200 },
      { date: "Sep 17", price: 2925, volume: 4300 },
      { date: "Sep 22", price: 2935, volume: 4400 },
      { date: "Sep 27", price: 2940, volume: 4450 },
      { date: "Oct 02", price: 2945, volume: 4480 },
      { date: "Oct 07", price: 2950, volume: 4500 }
    ]
  }
];
