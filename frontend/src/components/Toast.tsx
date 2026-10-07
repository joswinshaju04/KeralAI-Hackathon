import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 animate-bounce" />;
      default:
        return <Info className="h-5 w-5 text-sky-500 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-500/40 bg-emerald-950/90 text-white';
      case 'alert':
        return 'border-amber-500/50 bg-slate-900/95 text-white';
      default:
        return 'border-sky-500/40 bg-slate-900/90 text-white';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`rounded-2xl p-4 shadow-2xl border backdrop-blur-md flex items-start gap-3 ${getBorderColor()}`}
      >
        {getIcon()}
        <div className="flex-1 text-xs">
          <div className="font-bold text-sm tracking-tight text-white mb-0.5">
            {toast.title}
          </div>
          <div className="text-slate-200 leading-relaxed font-normal">
            {toast.desc}
          </div>
        </div>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
