# KeralAI Current State and Roadmap

## Current State

The `main` branch is a polished frontend prototype built with React and Vite.

Implemented areas include:

- Commodity market dashboard
- Commodity filtering/search
- District filtering
- Sorting
- Grid/table views
- Historical trend charts
- District comparison
- Prototype transport/margin calculations
- Price alert interface
- Market insight assistant interface
- Persona switching
- English/Malayalam localization
- Commodity detail modal

## Not Yet Implemented

The following should not be described as production capabilities until they are added:

- Live daily data acquisition
- Backend API
- Database
- Persistent user accounts
- Persistent alert storage
- Real notifications
- Production forecasting model
- Production LLM integration
- Automated anomaly detection
- Source provenance system
- Government/admin backend

## Recommended Roadmap

### Milestone 1 — Data Source

- Identify official source.
- Determine whether an API or stable download endpoint exists.
- Determine update schedule.
- Determine licensing/access constraints.
- Define source schema.

### Milestone 2 — Ingestion

- Build scheduled fetcher.
- Archive raw data.
- Add validation.
- Normalize units.
- Deduplicate.
- Store historical records.

### Milestone 3 — Backend

- FastAPI.
- PostgreSQL/PostGIS.
- Commodity endpoints.
- District endpoints.
- Historical-price endpoints.

### Milestone 4 — Intelligence

- Moving averages.
- Trend detection.
- District spread.
- Anomaly detection.
- Forecast baseline.
- Market opportunity scoring.

### Milestone 5 — AI

- Generate structured metrics first.
- Pass verified metrics to an LLM.
- Require explanations to be grounded in supplied metrics.
- Track model/version for generated insights.

### Milestone 6 — Alerts

- User accounts.
- Alert rules.
- Scheduled evaluation.
- Notification delivery.
- Delivery history.

### Milestone 7 — Operations

- Monitoring.
- Logging.
- Data-quality dashboard.
- Audit trail.
- Backup/recovery.

## Architecture Evolution

```text
CURRENT

Static JS data
     ↓
React UI


TARGET

External source
     ↓
Automated ingestion
     ↓
Validation
     ↓
Database
     ↓
Analytics
     ↓
FastAPI
     ↓
React UI
     ↓
Notifications / AI
```

## Success Criteria

The production platform should be able to:

1. Acquire new market data without editing frontend source code.
2. Preserve historical observations.
3. Explain where each price came from.
4. Compare districts consistently.
5. Detect suspicious data.
6. Provide user-configurable alerts.
7. Generate AI explanations from verified metrics.
8. Continue functioning as the source publishes new daily data.
