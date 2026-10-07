export type UserRole = 'farmer' | 'trader' | 'cooperative' | 'consumer';
export type Language = 'en' | 'ml';

export type CommodityCategory = 
  | 'plantation' 
  | 'spices' 
  | 'fruits' 
  | 'vegetables' 
  | 'fisheries' 
  | 'cereals';

export interface CommodityPrice {
  id: string;
  name: string;
  nameMl: string;
  category: CommodityCategory;
  variety: string;
  unit: string; // 'kg', 'quintal', '100 nuts', 'box'
  minPrice: number;
  maxPrice: number;
  modalPrice: number; // Most common prevailing price
  previousPrice: number;
  changePercent: number; // e.g. +3.4% or -1.2%
  district: string;
  marketName: string;
  arrivalVolume: number; // in tonnes or quintals
  updatedAt: string; // ISO string
  msp?: number; // Minimum Support Price if applicable
  status: 'surging' | 'falling' | 'stable';
}

export interface HistoricalDataPoint {
  date: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  forecastPrice?: number;
  isForecast?: boolean;
  volume?: number;
}

export interface DistrictPriceComparison {
  district: string;
  districtMl: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  marketName: string;
  trend: 'up' | 'down' | 'flat';
  change24h: number;
  arrivalVolume: number;
}

export interface PriceAlert {
  id: string;
  commodityId: string;
  commodityName: string;
  targetPrice: number;
  condition: 'above' | 'below';
  district: string;
  userEmailOrPhone: string;
  notifyMethod: 'whatsapp' | 'sms' | 'browser';
  createdAt: string;
  active: boolean;
  triggered?: boolean;
}

export interface MarketInsight {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  category: 'weather' | 'supply' | 'policy' | 'demand';
  impact: 'positive' | 'negative' | 'neutral';
  affectedCommodities: string[];
  confidenceScore: number; // e.g. 92%
  date: string;
  actionableTip: string;
  actionableTipMl: string;
}

export interface RubberDecisionInsight {
  currentPrice: number;
  threeMonthAgoPrice: number;
  predicted30DayPrice: number;
  recommendation: 'SELL_NOW' | 'HOLD' | 'SELL_PARTIAL';
  recommendationRationale: string;
  recommendationRationaleMl: string;
  keyDrivers: string[];
  historicalSeries: HistoricalDataPoint[];
}
