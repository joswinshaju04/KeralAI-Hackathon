import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import type { PriceAlert } from '../types/commodity';
import { MOCK_COMMODITIES, KERALA_DISTRICTS } from '../data/mockData';
import { 
  Bell, 
  Plus, 
  Trash2, 
  MessageSquare, 
  PhoneCall, 
  Sparkles, 
  Zap 
} from 'lucide-react';

export const PriceAlerts: React.FC = () => {
  const { language, triggerToast, alertPreselectedCommodity, setAlertPreselectedCommodity } = useApp();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [commodityId, setCommodityId] = useState<string>(alertPreselectedCommodity || 'rubber-rss4');
  const [district, setDistrict] = useState<string>('Kottayam');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [targetPrice, setTargetPrice] = useState<number>(215);
  const [notifyMethod, setNotifyMethod] = useState<'whatsapp' | 'sms' | 'browser'>('whatsapp');
  const [contact, setContact] = useState<string>('+91 98470 12345');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    loadAlerts();
    if (alertPreselectedCommodity) {
      setCommodityId(alertPreselectedCommodity);
      const selected = MOCK_COMMODITIES.find((c) => c.id === alertPreselectedCommodity);
      if (selected) {
        setTargetPrice(Math.round(selected.modalPrice * 1.05));
      }
    }
  }, [alertPreselectedCommodity]);

  const loadAlerts = async () => {
    const list = await apiService.getAlerts();
    setAlerts(list);
  };

  const handleCommodityChange = (id: string) => {
    setCommodityId(id);
    const selected = MOCK_COMMODITIES.find((c) => c.id === id);
    if (selected) {
      setTargetPrice(Math.round(selected.modalPrice * (condition === 'above' ? 1.05 : 0.95)));
      setDistrict(selected.district);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const comm = MOCK_COMMODITIES.find((c) => c.id === commodityId);
    
    try {
      const newAlert = await apiService.createAlert({
        commodityId,
        commodityName: comm ? (language === 'ml' ? comm.nameMl : comm.name) : 'Commodity',
        targetPrice,
        condition,
        district,
        userEmailOrPhone: contact,
        notifyMethod,
      });

      setAlerts([newAlert, ...alerts]);
      triggerToast(
        language === 'ml' ? 'വില അറിയിപ്പ് സേവ് ചെയ്തു' : 'Alert Activated',
        `${comm?.name} in ${district} will alert you when price goes ${condition} ₹${targetPrice}.`,
        'success'
      );
      setAlertPreselectedCommodity(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    await apiService.deleteAlert(id);
    setAlerts(alerts.filter((a) => a.id !== id));
    triggerToast('Alert Removed', 'The price alert was deleted successfully.', 'info');
  };

  const handleSimulateTrigger = (alert: PriceAlert) => {
    const currentSimulatedPrice = alert.condition === 'above' ? alert.targetPrice + 4 : alert.targetPrice - 3;
    triggerToast(
      `🚨 Price Alert: ${alert.commodityName}`,
      `Threshold crossed! Mandi price in ${alert.district} reached ₹${currentSimulatedPrice} (${alert.condition} your target of ₹${alert.targetPrice}).`,
      'alert'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Bell className="h-3.5 w-3.5" />
              Automated Alert Dispatcher
            </span>
            <span className="text-xs text-slate-500">
              WhatsApp • SMS • In-App Push
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {language === 'ml' ? 'തത്സമയ വില അറിയിപ്പുകൾ' : 'Commodity Price Volatility & Spike Alerts'}
          </h1>
          <p className="text-xs text-slate-500">
            Never miss a selling or buying window. Get instant notifications when mandi prices cross your custom thresholds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Alert Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Plus className="h-4 w-4 text-emerald-600 font-bold" />
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'ml' ? 'പുതിയ വില അറിയിപ്പ് നൽകുക' : 'Configure New Alert'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Select Commodity
              </label>
              <select
                value={commodityId}
                onChange={(e) => handleCommodityChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
              >
                {MOCK_COMMODITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Current: ₹{c.modalPrice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Target District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="All Kerala">All Kerala Mandis</option>
                {KERALA_DISTRICTS.map((d) => (
                  <option key={d.en} value={d.en}>
                    {d.en} ({d.ml})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Trigger Condition
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCondition('above')}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    condition === 'above'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Price Rises Above (≥)
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('below')}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    condition === 'below'
                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  Price Drops Below (≤)
                </button>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Target Threshold Price (₹)
              </label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
                min="1"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Notification Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setNotifyMethod('whatsapp')}
                  className={`p-2 rounded-xl font-medium border text-center transition-all flex flex-col items-center gap-1 ${
                    notifyMethod === 'whatsapp'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <MessageSquare className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNotifyMethod('sms')}
                  className={`p-2 rounded-xl font-medium border text-center transition-all flex flex-col items-center gap-1 ${
                    notifyMethod === 'sms'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <PhoneCall className="h-4 w-4 text-emerald-600" />
                  <span>SMS</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNotifyMethod('browser')}
                  className={`p-2 rounded-xl font-medium border text-center transition-all flex flex-col items-center gap-1 ${
                    notifyMethod === 'browser'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <Bell className="h-4 w-4 text-emerald-600" />
                  <span>In-App Push</span>
                </button>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Recipient Mobile / WhatsApp Number
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+91 98470 12345"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              {isSubmitting ? 'Activating...' : 'Activate Price Alert'}
            </button>
          </form>
        </div>

        {/* Active Alerts List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Active Monitored Price Triggers ({alerts.length})
              </h3>
              <p className="text-xs text-slate-500">
                Real-time monitors listening to daily Agmarknet and Kerala state mandi data feeds.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p>No active price alerts set. Use the form on the left to set your first alert.</p>
              </div>
            ) : (
              alerts.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-4 border border-slate-200 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {item.commodityName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.condition === 'above'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.condition === 'above' ? '≥ CROSSES ABOVE' : '≤ DROPS BELOW'}
                      </span>
                      <span className="text-xs text-slate-500">in {item.district}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-600">
                      <span className="font-extrabold text-slate-900 text-base">
                        Target: ₹{item.targetPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span>Via {item.notifyMethod.toUpperCase()} ({item.userEmailOrPhone})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleSimulateTrigger(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 text-xs font-semibold border border-amber-300 transition-colors"
                      title="Test simulated notification"
                    >
                      <Zap className="h-3.5 w-3.5 text-amber-600" />
                      <span>Simulate Trigger</span>
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete alert"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5 mt-4">
            <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Live Agmarknet Dispatch Engine: </span>
              Alerts evaluate immediately upon the daily 6:00 AM mandi synchronization job. If a threshold is crossed, SMS / WhatsApp messages are dispatched via the Kerala State IT Mission gateway.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
