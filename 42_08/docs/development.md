# KeralAI Development Guide

## 1. Prerequisites

Install:

- Node.js
- npm
- Git

## 2. Clone the Repository

Clone the repository and enter the project directory.

```bash
git clone <repository>
cd KeralAI-Hackathon
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start Development

```bash
npm run dev
```

Vite will start the development server.

## 5. Build

```bash
npm run build
```

## 6. Preview Production Build

```bash
npm run preview
```

## 7. Lint

```bash
npm run lint
```

## 8. Development Structure

When adding frontend functionality:

```text
src/components/
```

should contain reusable UI/application components.

Static prototype data currently belongs in:

```text
src/data/
```

When live backend integration is introduced, production market data should move out of frontend source files.

## 9. Recommended Future Structure

```text
KeralAI-Hackathon/
│
├── frontend/
│   └── ...
│
├── backend/
│   ├── app/
│   ├── api/
│   ├── models/
│   ├── services/
│   └── tests/
│
├── data-pipeline/
│   ├── ingestion/
│   ├── validation/
│   └── normalization/
│
├── docs/
│
└── README.md
```

This restructuring should be done only when the backend/data pipeline is actually introduced.

## 10. Pull Request Checklist

Before opening a pull request:

- [ ] Feature works locally
- [ ] Existing features still work
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] No secrets committed
- [ ] Data changes are documented
- [ ] UI is usable on mobile
- [ ] Malayalam labels are updated where necessary
- [ ] README/docs are updated for architectural changes

## 11. Data Changes

When changing the commodity schema:

1. Search all consumers of the changed fields.
2. Update dashboard components.
3. Update charts.
4. Update detail modal.
5. Update filters/sorting.
6. Update documentation.
7. Test both English and Malayalam modes.

## 12. Backend Transition

When replacing static data:

Current:

```js
import { commodities } from './data/commoditiesData';
```

Target:

```text
React
  |
  v
GET /api/v1/commodities
  |
  v
FastAPI
  |
  v
PostgreSQL
```

The transition should be incremental so the current UI remains usable while APIs are developed.
