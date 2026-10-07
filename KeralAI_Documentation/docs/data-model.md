# KeralAI Data Model

## 1. Current Frontend Data

The current prototype stores market information in JavaScript objects.

Primary files:

```text
src/data/commoditiesData.js
src/data/districtsData.js
src/data/translations.js
```

## 2. Commodity Object

Conceptually:

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

## 3. Recommended Production Schema

### commodities

```text
id
name
name_ml
category
unit
grade
active
created_at
updated_at
```

### districts

```text
id
code
name
name_ml
latitude
longitude
geometry
created_at
updated_at
```

### markets

```text
id
name
district_id
market_type
latitude
longitude
active
```

### price_sources

```text
id
name
source_type
source_url
reliability_score
active
```

### price_records

```text
id
commodity_id
market_id
observed_at
retrieved_at
farmgate_price
mandi_price
retail_price
unit
volume
source_id
source_record_id
quality_status
```

### alerts

```text
id
user_id
commodity_id
district_id
condition_type
threshold_value
enabled
created_at
updated_at
```

### alert_events

```text
id
alert_id
triggered_at
observed_price
delivery_status
```

### market_insights

```text
id
commodity_id
district_id
generated_at
metrics_snapshot
insight_text
model_version
```

## 4. Data Relationships

```text
District
  |
  +---- Market
          |
          +---- PriceRecord ---- Commodity
                                  |
                                  +---- Alert
```

## 5. Historical Data Rule

Production ingestion should append new observations instead of overwriting the previous day's values.

This allows:

- trend analysis
- anomaly detection
- forecasting
- auditing
- source verification

## 6. Data Provenance

Every production price should retain:

```text
source
source_record_id
observed_at
retrieved_at
quality_status
```

This makes each displayed market value traceable.
