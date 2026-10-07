import type {
  CommodityPrice,
  DistrictPriceComparison,
  HistoricalDataPoint,
  MarketInsight,
  PriceAlert,
  RubberDecisionInsight,
} from '../types/commodity';
import {
  MOCK_COMMODITIES,
  MOCK_INSIGHTS,
  MOCK_RUBBER_DECISION,
  generateHistoricalData,
  getDistrictComparisons,
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

const STORAGE_KEY_ALERTS = 'kerala_commodity_alerts';

const getStoredAlerts = (): PriceAlert[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALERTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Could not read alerts from localStorage', e);
  }
  return [
    {
      id: 'alert-1',
      commodityId: 'rubber-rss4',
      commodityName: 'Natural Rubber (RSS-4)',
      targetPrice: 215,
      condition: 'above',
      district: 'Kottayam',
      userEmailOrPhone: '+91 98470 12345',
      notifyMethod: 'whatsapp',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      active: true,
    },
    {
      id: 'alert-2',
      commodityId: 'coconut-copra',
      commodityName: 'Copra (Milling Grade)',
      targetPrice: 10500,
      condition: 'below',
      district: 'Thrissur',
      userEmailOrPhone: 'farmer_coop@kerala.org',
      notifyMethod: 'sms',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      active: true,
    },
  ];
};

const saveStoredAlerts = (alerts: PriceAlert[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(alerts));
  } catch (e) {
    console.warn('Could not save alerts', e);
  }
};

export const apiService = {
  async getCommodities(category?: string, district?: string): Promise<CommodityPrice[]> {
    if (USE_MOCK_API) {
      let result = [...MOCK_COMMODITIES];
      if (category && category !== 'all') {
        result = result.filter((c) => c.category === category);
      }
      if (district && district !== 'all') {
        result = result.filter((c) => c.district.toLowerCase() === district.toLowerCase());
      }
      return result;
    }

    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (district && district !== 'all') params.append('district', district);

    const res = await fetch(`${API_BASE_URL}/commodities?${params.toString()}`);
    if (!res.ok) throw new Error(`Failed to fetch commodities: ${res.statusText}`);
    return res.json();
  },

  async getCommodityById(id: string): Promise<CommodityPrice | undefined> {
    if (USE_MOCK_API) {
      return MOCK_COMMODITIES.find((c) => c.id === id);
    }
    const res = await fetch(`${API_BASE_URL}/commodities/${id}`);
    if (!res.ok) throw new Error(`Commodity not found: ${id}`);
    return res.json();
  },

  async getHistoricalTrends(commodityId: string, days: number = 90): Promise<HistoricalDataPoint[]> {
    if (USE_MOCK_API) {
      const comm = MOCK_COMMODITIES.find((c) => c.id === commodityId) || MOCK_COMMODITIES[0];
      const trend = comm.status === 'surging' ? 'up' : comm.status === 'falling' ? 'down' : 'volatile';
      return generateHistoricalData(comm.modalPrice, days, trend);
    }

    const res = await fetch(`${API_BASE_URL}/commodities/${commodityId}/history?days=${days}`);
    if (!res.ok) throw new Error(`Failed to fetch history for ${commodityId}`);
    return res.json();
  },

  async getDistrictComparisons(commodityId: string): Promise<DistrictPriceComparison[]> {
    if (USE_MOCK_API) {
      return getDistrictComparisons(commodityId);
    }

    const res = await fetch(`${API_BASE_URL}/commodities/${commodityId}/districts`);
    if (!res.ok) throw new Error(`Failed to fetch district comparison for ${commodityId}`);
    return res.json();
  },

  async getMarketInsights(): Promise<MarketInsight[]> {
    if (USE_MOCK_API) {
      return MOCK_INSIGHTS;
    }

    const res = await fetch(`${API_BASE_URL}/insights`);
    if (!res.ok) throw new Error('Failed to fetch market insights');
    return res.json();
  },

  async getRubberScenario(): Promise<RubberDecisionInsight> {
    if (USE_MOCK_API) {
      return MOCK_RUBBER_DECISION;
    }

    const res = await fetch(`${API_BASE_URL}/scenarios/rubber-farmer`);
    if (!res.ok) throw new Error('Failed to fetch rubber scenario');
    return res.json();
  },

  async getAlerts(): Promise<PriceAlert[]> {
    if (USE_MOCK_API) {
      return getStoredAlerts();
    }

    const res = await fetch(`${API_BASE_URL}/alerts`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  async createAlert(alertData: Omit<PriceAlert, 'id' | 'createdAt' | 'active'>): Promise<PriceAlert> {
    if (USE_MOCK_API) {
      const newAlert: PriceAlert = {
        ...alertData,
        id: `alert-${Date.now()}`,
        createdAt: new Date().toISOString(),
        active: true,
      };
      const existing = getStoredAlerts();
      const updated = [newAlert, ...existing];
      saveStoredAlerts(updated);
      return newAlert;
    }

    const res = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData),
    });
    if (!res.ok) throw new Error('Failed to create alert');
    return res.json();
  },

  async deleteAlert(alertId: string): Promise<boolean> {
    if (USE_MOCK_API) {
      const existing = getStoredAlerts();
      const filtered = existing.filter((a) => a.id !== alertId);
      saveStoredAlerts(filtered);
      return true;
    }

    const res = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};
