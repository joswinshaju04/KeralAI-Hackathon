# KeralAI Architecture

## 1. Current Architecture

The current `main` branch is a client-side React application.

```text
Browser
  |
  v
React / Vite
  |
  +--> App.jsx
        |
        +--> Navbar
        +--> PriceDashboard
        +--> HistoricalTrends
        +--> DistrictMap
        +--> PriceAlerts
        +--> MarketInsights
        +--> CommodityDetailModal
        +--> Footer
        |
        +--> Static data modules
              |
              +--> commoditiesData.js
              +--> districtsData.js
              +--> translations.js
```

There is no backend or persistent database in the current implementation.

## 2. Component Responsibilities

### App.jsx

Acts as the application-level coordinator.

It maintains:

- active tab
- language
- persona
- selected commodity

It conditionally renders the primary modules.

### Navbar.jsx

Provides:

- navigation
- persona selection
- English/Malayalam switch
- application branding
- status/ticker presentation

### PriceDashboard.jsx

Provides:

- commodity search
- category filtering
- district filtering
- sorting
- grid/table view
- commodity selection

### HistoricalTrends.jsx

Provides historical price/volume visualization using Recharts.

### DistrictMap.jsx

Provides district-level comparison and prototype transport/margin calculations.

### PriceAlerts.jsx

Provides the prototype alert experience.

### MarketInsights.jsx

Provides the prototype conversational market-insight interface.

### CommodityDetailModal.jsx

Provides detailed commodity information and persona-specific advisory content.

## 3. Target Production Architecture

```text
                 External Data Sources
                         |
                         v
                Data Acquisition Layer
                         |
                         v
                    Raw Storage
                         |
                         v
                  Validation / ETL
                         |
                         v
                PostgreSQL / PostGIS
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
      Analytics      Forecasting      Alerts
          |              |              |
          +--------------+--------------+
                         |
                         v
                    FastAPI API
                         |
                         v
                    React Frontend
                         |
       +-----------------+----------------+
       |                 |                |
       v                 v                v
     Farmer            Trader         Admin/Coop
```

## 4. Architectural Principles

- External data is the source of truth.
- Raw data should be retained before transformation.
- Validated data should be stored historically.
- Frontend should consume backend APIs rather than own production market data.
- AI should consume verified analytics.
- Alert evaluation should happen server-side.
- User roles should be enforced by the backend.

## 5. Future Service Boundaries

Recommended future services/modules:

```text
data-ingestion
data-validation
commodity-api
analytics
forecasting
alerts
notifications
ai-insights
authentication
```

These do not need to become separate microservices immediately. A modular monolith is appropriate for the first production iteration.
