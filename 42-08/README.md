# KeramPulse — Kerala Commodity Price Intelligence Platform

> **IBM × Kerala Government Hackathon 2026 — Challenge 8: Kerala Commodity Price Intelligence**

KeralAI is a web-based commodity market intelligence prototype designed to help farmers, traders, cooperatives, and consumers understand commodity prices across Kerala.

The current `main` branch implements a **React + Vite frontend prototype** with locally defined demonstration data. It provides commodity price dashboards, historical trend visualization, district-level comparisons, price-alert workflows, market insights, persona-based views, and English/Malayalam localization.

> **Important:** This document describes the implementation that exists in the `main` branch. The separate frontend branch is intentionally out of scope. Features such as live daily data ingestion, a production backend, persistent database storage, real notifications, and production ML/LLM services are described as future architecture rather than existing functionality.

---

## 1. Problem Statement

Commodity prices can vary significantly across Kerala because of supply, demand, transportation, weather, seasonality, market conditions, and other factors.

The hackathon challenge asks for a platform that helps users understand and monitor commodity prices across Kerala through capabilities such as:

- Market price dashboard
- Historical trends
- District-wise comparison
- Price alerts
- Market insights

The KeramPulse prototype addresses these requirements through a single interactive dashboard experience.

---

## 2. Goals

### Primary goals

1. Present commodity prices in an understandable format.
2. Allow users to compare prices across Kerala districts.
3. Visualize historical price movement.
4. Provide role/persona-specific market guidance.
5. Provide price-alert workflows.
6. Provide market explanations and insights.
7. Support both English and Malayalam interfaces.
8. Establish a frontend foundation that can later be connected to a live commodity-data pipeline.

### Target personas

The application currently supports four persona modes:

- **Farmer**
- **Trader**
- **Cooperative**
- **Consumer**

The persona is selected from the top navigation and is passed into the dashboard and commodity-detail components so that advisory content can be contextualized.

---

## 3. Current Feature Set

### 3.1 Market Dashboard

The dashboard provides:

- Commodity cards
- Search
- Category filtering
- District filtering
- Sorting
- Grid/table view
- Farm-gate price
- Mandi price
- Retail price
- 24-hour price change
- Commodity detail modal

The dashboard can use a district-specific price from the commodity's `districtPrices` object when a district is selected.

### 3.2 Historical Trends

The trends section provides interactive charts using Recharts.

The current data model includes historical observations with:

- Date
- Price
- Volume

The trend view is designed to compare commodity movement over time.

### 3.3 District Map

The district section presents Kerala district-level commodity information and supports district selection.

The current prototype includes:

- 14 Kerala districts
- District coordinates
- Primary hubs
- Major commodity information
- District commodity prices
- Transport-related values
- Inter-district comparison
- Estimated transport cost
- Estimated net margin calculations

The current implementation is a frontend visualization and calculation layer; it is not connected to a live GIS or logistics service.

### 3.4 Price Alerts

The alerts section presents price-alert workflows and alert information.

The current implementation is a prototype UI/data flow. Alerts are not yet persisted to a backend and are not connected to a live market-price event stream.

### 3.5 Market Insights

The market insights section provides a conversational-style market assistant.

The current implementation uses locally defined logic and responses rather than a live external AI model or LLM API.

This is intentionally documented as a prototype insight layer.

### 3.6 Commodity Details

Selecting a commodity opens a detailed modal containing additional commodity information and persona-specific guidance.

### 3.7 Persona-Based Experience

The UI supports:

```text
Farmer
Trader
Cooperative
Consumer
```

The selected persona is stored in React state and passed to relevant components.

### 3.8 English / Malayalam

The application supports switching between:

- English
- Malayalam

Translations are maintained in `src/data/translations.js`.

---

## 4. Technology Stack

| Layer | Technology |
|---|---|
| UI | React |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Utility classes | clsx, tailwind-merge |
| Visual effect | canvas-confetti |
| Linting | Oxlint |
| Language | JavaScript / JSX |
| Current persistence | In-memory/static JavaScript data |
| Backend | Not currently implemented |
| Database | Not currently implemented |
| External API | Not currently implemented |

The repository's package configuration defines React, React DOM, Tailwind CSS, Recharts, Lucide React, Vite, and Oxlint among its dependencies and development dependencies.

---

## 5. Repository Structure

The `main` branch currently follows a lightweight Vite/React structure:

```text
KeramPulse-Hackathon/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── PriceDashboard.jsx
│   │   ├── CommodityCard.jsx
│   │   ├── CommodityDetailModal.jsx
│   │   ├── HistoricalTrends.jsx
│   │   ├── DistrictMap.jsx
│   │   ├── PriceAlerts.jsx
│   │   ├── MarketInsights.jsx
│   │   └── Footer.jsx
│   │
│   ├── data/
│   │   ├── commoditiesData.js
│   │   ├── districtsData.js
│   │   └── translations.js
│   │
│   ├── App.jsx
│   └── ...
│
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

The exact component list may grow as development continues.

---

## 6. Application Architecture — Current Implementation

The current application is a client-side React application.

```text
                         React Application
                                |
              +-----------------+-----------------+
              |                 |                 |
              v                 v                 v
       Static Data          React State       Translations
              |                 |                 |
              +-----------------+-----------------+
                                |
                                v
                         App.jsx Router
                                |
       +------------+------------+------------+------------+
       |            |            |            |            |
       v            v            v            v            v
   Dashboard     Trends       Districts      Alerts     Insights
       |            |            |            |            |
       +------------+------------+------------+------------+
                                |
                                v
                       Commodity Detail Modal
```

There is currently no backend/API boundary in the `main` branch.

---

## 7. Application State

`src/App.jsx` manages the primary application state:

```text
currentTab
lang
persona
selectedCommodity
```

### `currentTab`

Controls which primary application section is displayed:

```text
dashboard
trends
map
alerts
insights
```

### `lang`

Controls:

```text
en
ml
```

### `persona`

Controls:

```text
farmer
trader
cooperative
consumer
```

### `selectedCommodity`

Controls whether the commodity detail modal is visible and which commodity is shown.

---

## 8. Data Model — Current Prototype

The main commodity data is stored in:

```text
src/data/commoditiesData.js
```

A commodity object contains fields such as:

```js
{
  id,
  name,
  nameMl,
  category,
  categoryNameEn,
  categoryNameMl,
  unit,
  grade,
  primaryDistrict,
  farmgatePrice,
  mandiPrice,
  retailPrice,
  change24h,
  change24hPercent,
  volume,
  sparkline,
  districtPrices,
  advisory,
  history1M
}
```

### Price fields

The prototype distinguishes between:

- Farm-gate price
- Mandi price
- Retail price

### District prices

Each commodity contains a district-price map using district codes.

Example structure:

```js
districtPrices: {
  KTM: 212.50,
  EKM: 211.00,
  PTA: 210.50
}
```

### Historical data

Historical observations are currently represented as:

```js
history1M: [
  {
    date: "Sep 07",
    price: 198,
    volume: 1100
  },
  ...
]
```

### Advisory content

The prototype contains separate advisory text for:

```text
farmer
trader
cooperative
consumer
```

---

## 9. District Data Model

District information is stored in:

```text
src/data/districtsData.js
```

The dataset contains the 14 Kerala districts and associated information such as:

- District name
- Malayalam name
- Short district ID/code
- Coordinates
- Primary market/hub information
- Major commodities
- Transport-related values

The district data is used by the dashboard filters and district visualization.

---

## 10. Dashboard Processing Logic

The dashboard uses React state and `useMemo()` to derive the displayed commodity list.

Filtering can use:

1. Search text
2. Category
3. District

Sorting supports:

```text
Highest 24h surge
Price high → low
Price low → high
Name A → Z
```

When a district is selected, the dashboard uses the corresponding district price when available; otherwise it falls back to the commodity's mandi price.

The interface can render either:

```text
Grid view
```

or:

```text
Table view
```

---

## 11. Historical Trend Architecture

The historical trend component uses Recharts.

The data flow is:

```text
commoditiesData.js
        |
        v
Selected commodity
        |
        v
history1M
        |
        v
Recharts
        |
        +---- Price chart
        |
        +---- Volume chart
```

This allows the prototype to visually communicate market movement over time without requiring a backend.

---

## 12. District Comparison Logic

The district visualization combines:

```text
Commodity district prices
+
District metadata
+
Transport assumptions
```

to provide comparative information.

The prototype can calculate a transport cost and use it to estimate a net-margin opportunity.

Conceptually:

```text
Destination Price
        -
Source Price
        -
Estimated Transport Cost
        =
Estimated Net Margin
```

This should be treated as a **prototype decision-support calculation**, not as a verified logistics quotation.

For a production system, transport cost should come from a configurable logistics model or external service.

---

## 13. Market Insights

The current Market Insights module is a prototype conversational interface.

Current architecture:

```text
User question
     |
     v
Keyword / local logic
     |
     v
Predefined market response
     |
     v
UI response
```

It is **not currently connected to a production LLM**.

### Future architecture

A production version should use:

```text
Verified market data
        |
        v
Analytics engine
        |
        v
Structured insight object
        |
        v
LLM / AI explanation layer
        |
        v
User-facing explanation
```

The AI layer should not be allowed to invent numerical market values. Numerical claims should come from the analytics/data layer.

---

## 14. Price Alert Architecture

### Current implementation

The current frontend demonstrates the alert experience but does not provide:

- Persistent user accounts
- Database-backed alert rules
- Server-side scheduled evaluation
- Real push/SMS/email delivery

### Production architecture

```text
Daily market update
       |
       v
Price validation
       |
       v
Alert engine
       |
       v
Evaluate user rules
       |
       +---- condition false → continue
       |
       +---- condition true
                 |
                 v
          Notification service
                 |
          +------+------+
          |             |
          v             v
        Push          SMS/Email
```

---

## 15. Daily Data Integration — Critical Next Step

The current repository does **not** have a live commodity-data ingestion service.

This is important because the hackathon dataset is updated daily and should not be treated as a static file copied into the frontend.

The recommended production design is:

```text
Official / trusted data source
          |
          v
Data acquisition connector
          |
          v
Raw data archive
          |
          v
Validation + normalization
          |
          v
Historical database
          |
          v
Backend API
          |
          v
React frontend
```

### Why not place the daily file directly in `src/data/`?

Because doing so would require manual source-code changes and deployments whenever the data changes.

Instead, the application should integrate with the **source of the data**.

Possible acquisition mechanisms, depending on the actual source:

- Official API
- Stable download endpoint
- Scheduled CSV/Excel retrieval
- Government open-data endpoint
- Web extraction where permitted

The exact method should only be selected after inspecting the source's actual publication mechanism and access terms.

---

## 16. Recommended Production Architecture

The current frontend can become the presentation layer of a larger system:

```text
                    EXTERNAL DATA SOURCES
                              |
                              v
                  +------------------------+
                  | Data Acquisition Layer |
                  | API / Fetch / Import   |
                  +-----------+------------+
                              |
                              v
                  +------------------------+
                  | Raw Data Storage       |
                  +-----------+------------+
                              |
                              v
                  +------------------------+
                  | ETL / Validation       |
                  | - Schema validation    |
                  | - Unit normalization   |
                  | - Deduplication        |
                  | - Outlier detection    |
                  +-----------+------------+
                              |
                              v
                  +------------------------+
                  | PostgreSQL / PostGIS   |
                  +-----------+------------+
                              |
                +-------------+-------------+
                |             |             |
                v             v             v
          Analytics       Forecasting     Alerts
                |             |             |
                +-------------+-------------+
                              |
                              v
                    Backend REST API
                              |
                              v
                       React Frontend
                              |
            +-----------------+----------------+
            |                 |                |
            v                 v                v
         Farmer            Trader          Admin/
         View              View          Cooperative
```

---

## 17. Recommended Backend

A suitable next-stage backend would be:

```text
Python
FastAPI
PostgreSQL
PostGIS
```

Potential API groups:

```text
/api/v1/commodities
/api/v1/prices
/api/v1/districts
/api/v1/markets
/api/v1/trends
/api/v1/alerts
/api/v1/insights
```

The current React application can then replace direct imports from `src/data/commoditiesData.js` with API calls.

---

## 18. Recommended Database Model

A production database should separate entities that are currently embedded in JavaScript.

Suggested entities:

```text
commodities
districts
markets
price_records
price_sources
users
alerts
alert_events
market_insights
data_quality_records
```

Conceptual relationship:

```text
Commodity
    |
    +---- Price Record ---- Market ---- District
    |
    +---- Historical prices
    |
    +---- Alerts
```

---

## 19. Data Quality

A production ingestion system should validate:

### Schema

- Commodity exists
- Market exists
- Date is valid
- Price is numeric
- Unit is known

### Data consistency

- Duplicate detection
- Missing values
- Impossible prices
- Unexpected unit changes
- Large unexplained price jumps

### Provenance

Every price record should retain:

```text
source
source_timestamp
retrieved_timestamp
original_record_id
quality_status
```

This is particularly important for a market-intelligence platform because users need to know whether a number is current and trustworthy.

---

## 20. Forecasting

The current repository does not contain a production forecasting model.

A future forecasting service could begin with simple statistical baselines:

```text
Moving average
Trend analysis
Seasonal baseline
```

and later evaluate more advanced models.

Forecast output should preferably be expressed as a range:

```text
Expected range:
₹180–₹187/kg

Confidence:
Medium
```

rather than presenting a precise prediction as a certainty.

---

## 21. Security Requirements for Production

The current prototype is client-side and does not implement a production authentication/security layer.

For the future backend:

- HTTPS
- Authentication
- Role-based authorization
- Input validation
- Rate limiting
- Secure environment variables
- Database access controls
- Audit logging
- Server-side validation of alert rules

Never place secret API keys directly in frontend JavaScript.

---

## 22. Accessibility and Localization

The current application provides English/Malayalam switching.

For production, localization should also cover:

- Dates
- Numbers
- Currency formatting
- Units
- Accessibility labels
- Error messages
- Alert messages
- Screen-reader descriptions

Farmer-facing workflows should prioritize simple language and clear visual indicators.

---

## 23. Local Development

### Prerequisites

Install:

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Vite will start the development server and provide a local URL.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

---

## 24. Development Workflow

Recommended workflow:

```text
1. Create a feature branch
2. Implement the feature
3. Run npm run lint
4. Run npm run build
5. Test the UI
6. Commit changes
7. Open a pull request
8. Review
9. Merge into main
```

Avoid directly changing production data structures without checking every component that consumes them.

---

## 25. Current Limitations

The current `main` branch is a frontend prototype, so the following limitations should be understood:

### Data

- Commodity data is locally defined.
- Data is not automatically refreshed from the external daily source.
- Historical data is currently represented by frontend data objects.
- There is no source-provenance database.

### Backend

- No backend service is currently included.
- No REST API is currently included.
- No persistent database is currently included.

### Authentication

- No production user authentication exists.
- Persona selection is a UI state rather than an authenticated role.

### Alerts

- Alerts are not persisted server-side.
- There is no production notification service.

### AI

- Market insights are prototype logic rather than a production LLM integration.

### Forecasting

- No production forecasting model is included.

### Mapping

- District visualization is implemented within the frontend rather than through a live GIS platform.

---

## 26. Roadmap

### Phase 1 — Current Prototype

- [x] Commodity dashboard
- [x] Historical trend visualization
- [x] District comparison
- [x] Price alert UI
- [x] Market insights UI
- [x] Persona switching
- [x] English/Malayalam UI

### Phase 2 — Data Platform

- [ ] Identify official daily data source
- [ ] Build automated data acquisition
- [ ] Store raw source snapshots
- [ ] Build validation pipeline
- [ ] Normalize units
- [ ] Store historical prices
- [ ] Add source/provenance metadata

### Phase 3 — Backend

- [ ] FastAPI service
- [ ] PostgreSQL
- [ ] REST APIs
- [ ] User accounts
- [ ] Persistent alert rules

### Phase 4 — Intelligence

- [ ] Statistical trend engine
- [ ] Forecasting baseline
- [ ] Anomaly detection
- [ ] Market opportunity detection
- [ ] AI-generated explanations grounded in verified metrics

### Phase 5 — Notifications

- [ ] Web push
- [ ] Email
- [ ] SMS/WhatsApp where appropriate and permitted

### Phase 6 — Government/Cooperative Analytics

- [ ] Data quality dashboard
- [ ] District-level monitoring
- [ ] Market anomaly monitoring
- [ ] Commodity supply/demand indicators
- [ ] Administrative reporting

---

## 27. Design Principles

### 1. Data first

The frontend should never be the source of truth for market prices.

### 2. Separate acquisition from presentation

The daily data source should be handled by a backend data pipeline, not by manually editing frontend files.

### 3. Keep historical records

New daily values should be appended/versioned rather than replacing previous observations.

### 4. Make AI explain verified data

AI should explain structured analytics rather than inventing prices.

### 5. Preserve source provenance

Every production price should be traceable to its source and retrieval time.

### 6. Design for Kerala users

The application should work well for farmers and non-technical users, including Malayalam-speaking users.

---

## 28. Hackathon Demo Story

A recommended demonstration flow is:

```text
1. Open KeralAI
       ↓
2. Select Farmer persona
       ↓
3. Search/select Rubber
       ↓
4. Show current farm-gate / mandi / retail prices
       ↓
5. Select Kottayam
       ↓
6. Compare district prices
       ↓
7. Open Historical Trends
       ↓
8. Show price movement over time
       ↓
9. Open District Map
       ↓
10. Demonstrate inter-district price opportunity
       ↓
11. Open Alerts
       ↓
12. Demonstrate a price threshold
       ↓
13. Open Market Insights
       ↓
14. Demonstrate the market-assistant workflow
```

The key message should be:

> **KeralAI turns commodity-price information into understandable market intelligence for Kerala's farmers, traders, cooperatives, and consumers.**

---

## 29. Current vs Target Architecture

| Capability | Current `main` | Target |
|---|---:|---:|
| React UI | Yes | Yes |
| Vite | Yes | Yes |
| Commodity dashboard | Yes | Yes |
| Historical charts | Yes | Yes |
| District comparison | Yes | Yes |
| Persona views | Yes | Yes |
| Malayalam | Yes | Yes |
| Static demonstration data | Yes | No |
| Automated daily ingestion | No | Yes |
| Data validation | No | Yes |
| Persistent database | No | Yes |
| Backend API | No | Yes |
| User accounts | No | Yes |
| Persistent alerts | No | Yes |
| Real notifications | No | Yes |
| Production AI/LLM | No | Yes |
| Forecasting service | No | Yes |
| Data provenance | No | Yes |

---

## 30. Documentation Scope

This README documents the current `main` branch and the recommended path toward a production-ready platform.

The separate frontend branch is intentionally excluded from this documentation.

For implementation-specific details, see:

- `docs/architecture.md`
- `docs/data-model.md`
- `docs/data-pipeline.md`
- `docs/development.md`
- `docs/roadmap.md`
