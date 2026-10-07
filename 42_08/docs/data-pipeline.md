# KeralAI Data Pipeline

## 1. Objective

The frontend currently uses static demonstration data. The production platform should instead acquire the latest commodity data automatically.

The critical design principle is:

> Integrate with the data source, not with a manually maintained copy of the dataset.

## 2. Target Pipeline

```text
Official / trusted source
          |
          v
Scheduled acquisition
          |
          v
Raw snapshot
          |
          v
Schema validation
          |
          v
Normalization
          |
          v
Deduplication
          |
          v
Outlier / anomaly checks
          |
          v
Quality scoring
          |
          v
Historical database
          |
          v
Analytics
          |
          v
API
          |
          v
React dashboard
```

## 3. Acquisition Methods

The actual method must be selected after verifying the source.

Possible mechanisms:

### API

Preferred when an official API exists.

### Stable file endpoint

If a government portal exposes a predictable CSV/Excel download URL, a scheduled worker can retrieve the latest file.

### Open-data endpoint

Use an official open-data interface when available.

### Web extraction

Only where technically and legally permitted.

## 4. Raw Data Layer

Never immediately discard the original source file.

Store:

```text
source
retrieved_at
filename
checksum
raw_payload
```

Example:

```text
raw/
  2026/
    10/
      07/
        source_snapshot.csv
```

## 5. Validation

Validate:

- required columns
- data types
- valid dates
- valid prices
- valid units
- known commodities
- known markets

## 6. Normalization

Convert source-specific units into canonical units.

For example:

```text
₹/quintal
₹/kg
₹/tonne
```

should be normalized where appropriate.

Do not silently convert ambiguous units. Flag them for review.

## 7. Duplicate Detection

A production record can use a logical key such as:

```text
commodity + market + observation_date + grade
```

The exact key depends on the source.

## 8. Outlier Detection

Large price movements should be flagged rather than automatically discarded.

Potential techniques:

- historical threshold
- IQR
- z-score
- rolling deviation
- Isolation Forest

The first implementation should prefer explainable rules.

## 9. Quality Status

Recommended statuses:

```text
VALID
REVIEW
REJECTED
STALE
```

## 10. Scheduling

If the source updates daily:

```text
Scheduled job
     |
     v
Fetch latest source
     |
     v
Validate
     |
     v
Persist
     |
     v
Recalculate analytics
     |
     v
Evaluate alerts
```

The schedule should match the source's actual publication/update cycle.

## 11. Frontend Integration

Current:

```text
commoditiesData.js
        |
        v
React
```

Target:

```text
Database
   |
   v
FastAPI
   |
   v
React
```

This is the most important architectural change required to turn the current prototype into a continuously updated platform.
