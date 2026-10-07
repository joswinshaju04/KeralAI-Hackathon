import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { MOCK_COMMODITIES, KERALA_DISTRICTS } from '../data/mockData';
import { X, Bell } from 'lucide-react';

export const CreateAlertDialog: React.FC = () => {
  const { 
    createAlertModalOpen, 
    setCreateAlertModalOpen, 
    alertPreselectedCommodity, 
    setAlertPreselectedCommodity, 
    triggerToast,
    language 
  } = useApp();

  const [commodityId, setCommodityId] = useState<string>('rubber-rss4');
  const [district, setDistrict] = useState<string>('Kottayam');
  const [condition, setCondition] = useState<'above' | 'below'>('above');
  const [targetPrice, setTargetPrice] = useState<number>(215);
  const [notifyMethod, setNotifyMethod] = useState<'whatsapp' | 'sms' | 'browser'>('whatsapp');
  const [contact, setContact] = useState<string>('+91 98470 12345');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (alertPreselectedCommodity) {
      setCommodityId(alertPreselectedCommodity);
      const selected = MOCK_COMMODITIES.find((c) => c.id === alertPreselectedCommodity);
      if (selected) {
        setTargetPrice(Math.round(selected.modalPrice * 1.05));
        setDistrict(selected.district);
      }
    }
  }, [alertPreselectedCommodity, createAlertModalOpen]);

  if (!createAlertModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const comm = MOCK_COMMODITIES.find((c) => c.id === commodityId);

    try {
      await apiService.createAlert({
        commodityId,
        commodityName: comm ? (language === 'ml' ? comm.nameMl : comm.name) : 'Commodity',
        targetPrice,
        condition,
        district,
        userEmailOrPhone: contact,
        notifyMethod,
      });

      triggerToast(
        language === 'ml' ? 'വില അറിയിപ്പ് സേവ് ചെയ്തു' : 'Alert Activated',
        `${comm?.name} in ${district} will alert you when price goes ${condition} ₹${targetPrice}.`,
        'success'
      );
      setCreateAlertModalOpen(false);
      setAlertPreselectedCommodity(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-300" />
            <h3 className="font-bold text-base">
              {language === 'ml' ? 'വില അറിയിപ്പ് സജ്ജമാക്കുക' : 'Set Commodity Price Alert'}
            </h3>
          </div>
          <button
            onClick={() => setCreateAlertModalOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Commodity</label>
            <select
              value={commodityId}
              onChange={(e) => {
                setCommodityId(e.target.value);
                const s = MOCK_COMMODITIES.find((c) => c.id === e.target.value);
                if (s) {
                  setTargetPrice(Math.round(s.modalPrice * 1.05));
                  setDistrict(s.district);
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              {MOCK_COMMODITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (Now: ₹{c.modalPrice})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All Kerala">All Kerala Mandis</option>
              {KERALA_DISTRICTS.map((d) => (
                <option key={d.en} value={d.en}>
                  {d.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Trigger Condition</label>
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
                Rises Above (≥)
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
                Drops Below (≤)
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Threshold Price (₹)</label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-sm text-slate-900 focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Channel & Contact</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setNotifyMethod('whatsapp')}
                className={`p-2 rounded-xl text-center font-medium border ${
                  notifyMethod === 'whatsapp'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setNotifyMethod('sms')}
                className={`p-2 rounded-xl text-center font-medium border ${
                  notifyMethod === 'sms'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                SMS
              </button>
              <button
                type="button"
                onClick={() => setNotifyMethod('browser')}
                className={`p-2 rounded-xl text-center font-medium border ${
                  notifyMethod === 'browser'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Browser
              </button>
            </div>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+91 98470 12345"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setCreateAlertModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors"
            >
              {isSubmitting ? 'Saving...' : 'Set Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
