# Kerala Commodity Price Intelligence Platform (Frontend)
### IBM x Kerala Government Hackathon 2026 • Challenge 8

A modern, responsive, real-time commodity market intelligence and predictive price platform designed for **Farmers**, **Traders**, **Cooperatives**, and **Consumers** across **Kerala's 14 districts**.

---

## 🌟 Key Features Implemented

1. **Market Price Dashboard (`DashboardOverview.tsx`)**
   - Real-time spot prices for major Kerala commodities (Rubber RSS-4 & RSS-5, Copra, Raw Coconut, Nendran & Robusta Bananas, Black Pepper, Cardamom, Oil Sardine, Mackerel, Tapioca, Shallots).
   - Min, Max, Modal prices, 24h change %, arrival volumes, and Government MSP benchmarks.
   - Filtering by agricultural category and Kerala district; Search bar; Grid and Table view toggles.
   - Persona-tailored daily advisories (Farmer, Trader, Cooperative, Consumer).

2. **Historical Trends & 14-Day AI Forecast (`HistoricalTrends.tsx`)**
   - Interactive Recharts area chart with 7D, 30D (1M), 90D (3M), 6M, and 1Y timeframe views.
   - Forward-looking 14-day ML forecast trajectory with confidence scores.
   - Period high/low ranges, moving average indicators, and seasonal trend commentary.

3. **Featured Challenge Scenario: Rubber Farmer Decision Advisor (`RubberScenarioModal.tsx`)**
   - Directly addresses the PDF challenge prompt: *"A rubber farmer wants to understand how prices have moved across Kerala over the last three months before deciding when to sell."*
   - 3-Month price trajectory from ₹178 to ₹208 (+16.8% gain).
   - High-confidence **"HOLD (Next 10-14 Days)"** AI recommendation with meteorological & supply chain justification.
   - **Interactive Holding Profit Calculator**: Input inventory in kg (e.g., 1,000 kg) and calculate net extra profit against holding/preservation costs.

4. **14-District Statewide Comparison (`DistrictComparison.tsx`)**
   - Complete benchmarking across all 14 Kerala districts (Thiruvananthapuram, Kollam, Pathanamthitta, Alappuzha, Kottayam, Idukki, Ernakulam, Thrissur, Palakkad, Malappuram, Kozhikode, Wayanad, Kannur, Kasaragod).
   - **Best Mandi to Sell** vs **Lowest District Price**.
   - **Inter-district Arbitrage Spread metric** for bulk transit opportunities.
   - Dynamic Bar Chart sorted by price with color-coding against Kerala state average.

5. **Automated Price Alerts Engine (`PriceAlerts.tsx`)**
   - Configure threshold triggers: commodity, district, condition (rises above / drops below), and notification channel (WhatsApp, SMS, In-App).
   - Active monitored alerts feed.
   - **Simulate Trigger Button**: Instant live demo toast notification simulating a sudden mandi price spike.

6. **AI Market Insights Hub (`MarketInsights.tsx`)**
   - Categorized intelligence on Weather Disruptions (monsoon latex stoppage), Supply Chain bottlenecks, Festive Demand surges, and MSP benchmark parity.
   - Actionable tips in both **English** and **Malayalam (മലയാളം)**.

7. **Hackathon Edge Factors**
   - **Persona Switcher**: Dynamic dashboard view adapted for Farmers, Traders, Cooperatives, or Consumers.
   - **Dual-Language**: English & Malayalam (മലയാളം) localization for farmers and cooperatives.
   - **Live Mandi Ticker**: Continuous ticker displaying live price fluctuations.

---

## 🚀 How to Run the Frontend Locally

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies (already installed)
npm install

# 3. Start the development server
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## 🔌 Backend Team Integration Guide (API Contracts)

This frontend contains an API Service layer (`src/services/api.ts`).

### Step 1: Connecting your Teammate's Backend
When your backend team has deployed or is running their API server locally:
1. Open `.env`
2. Change `VITE_API_BASE_URL` to point to their server (e.g. `http://localhost:8000/api`)
3. Change `VITE_USE_MOCK_API=false`

### Step 2: REST Endpoints Expected by the Frontend

#### 1. `GET /api/commodities?category={cat}&district={dist}`
Returns an array of commodity items:
```json
[
  {
    "id": "rubber-rss4",
    "name": "Natural Rubber (RSS-4)",
    "nameMl": "റബ്ബർ (RSS-4)",
    "category": "plantation",
    "variety": "Sheet RSS-4",
    "unit": "₹ / kg",
    "minPrice": 198,
    "maxPrice": 215,
    "modalPrice": 208,
    "previousPrice": 202,
    "changePercent": 2.97,
    "district": "Kottayam",
    "marketName": "Kottayam Rubber Board Market",
    "arrivalVolume": 420,
    "updatedAt": "2026-10-07T06:00:00Z",
    "msp": 180,
    "status": "surging"
  }
]
```

#### 2. `GET /api/commodities/{id}/history?days=90`
Returns time-series daily data points with ML forecast:
```json
[
  {
    "date": "2026-07-08",
    "modalPrice": 178,
    "minPrice": 170,
    "maxPrice": 185,
    "volume": 350,
    "isForecast": false
  },
  {
    "date": "2026-10-15",
    "modalPrice": 222,
    "minPrice": 210,
    "maxPrice": 230,
    "forecastPrice": 222,
    "isForecast": true
  }
]
```

#### 3. `GET /api/commodities/{id}/districts`
Returns cross-district price comparison across Kerala's 14 districts:
```json
[
  {
    "district": "Kottayam",
    "districtMl": "കോട്ടയം",
    "modalPrice": 214,
    "minPrice": 202,
    "maxPrice": 225,
    "marketName": "Rubber Board Main Yard",
    "trend": "up",
    "change24h": 3.1,
    "arrivalVolume": 520
  }
]
```

#### 4. `GET /api/scenarios/rubber-farmer`
Returns the decision insight for the challenge's featured scenario:
```json
{
  "currentPrice": 208,
  "threeMonthAgoPrice": 178,
  "predicted30DayPrice": 224,
  "recommendation": "HOLD",
  "recommendationRationale": "Heavy monsoon rains disrupt tapping...",
  "recommendationRationaleMl": "കോട്ടയം പത്തനംതിട്ട മേഖലകളിൽ...",
  "keyDrivers": ["Tapping disrupted by 35%", "..."],
  "historicalSeries": []
}
```

#### 5. `GET /api/alerts` & `POST /api/alerts`
Retrieves or creates threshold price alerts.

#### 6. `GET /api/insights`
Retrieves AI-generated market commentary articles and tips.

---

## 🛠️ Project Structure

```
frontend/
├── src/
│   ├── types/
│   │   └── commodity.ts          # TypeScript interfaces for API contracts
│   ├── data/
│   │   ├── mockData.ts           # Realistic Kerala market dataset & historical generator
│   │   └── translations.ts       # English & Malayalam localization dictionaries
│   ├── services/
│   │   └── api.ts                # Plug-and-play API client (Mock fallback <-> Live API)
│   ├── context/
│   │   └── AppContext.tsx        # Global state (Role, Language, Selected items, Toasts)
│   ├── components/
│   │   ├── Navbar.tsx            # Header with role switcher, language toggle, and sync status
│   │   ├── TickerBanner.tsx      # Real-time Kerala mandi ticker bar
│   │   ├── DashboardOverview.tsx # Spot price cards, filters, and dynamic persona tips
│   │   ├── HistoricalTrends.tsx  # Interactive Recharts price area chart & 14-day ML forecast
│   │   ├── RubberScenarioModal.tsx# Hackathon scenario: 3-month rubber trend & profit calculator
│   │   ├── DistrictComparison.tsx# 14 Kerala districts comparison & arbitrage analysis
│   │   ├── PriceAlerts.tsx       # Threshold alerts manager & simulation trigger
│   │   ├── MarketInsights.tsx    # Multi-source AI intelligence cards & tips
│   │   ├── CreateAlertDialog.tsx # Modal dialog for quick alert creation
│   │   └── Toast.tsx             # Notification toast banner
│   ├── App.tsx                   # Main layout container
│   ├── main.tsx                  # React DOM entry
│   └── index.css                 # Tailwind CSS styles
├── .env                          # Local environment settings
├── .env.example                  # Backend integration environment template
└── package.json
```
