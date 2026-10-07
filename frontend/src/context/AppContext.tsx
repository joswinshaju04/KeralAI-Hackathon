import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language, UserRole } from '../types/commodity';
import { TRANSLATIONS } from '../data/translations';

interface ToastData {
  id: string;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'alert';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCommodityId: string;
  setSelectedCommodityId: (id: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (dist: string) => void;
  toast: ToastData | null;
  triggerToast: (title: string, desc: string, type?: 'info' | 'success' | 'alert') => void;
  dismissToast: () => void;
  rubberModalOpen: boolean;
  setRubberModalOpen: (open: boolean) => void;
  createAlertModalOpen: boolean;
  setCreateAlertModalOpen: (open: boolean) => void;
  alertPreselectedCommodity: string | null;
  setAlertPreselectedCommodity: (id: string | null) => void;
  t: (key: keyof typeof TRANSLATIONS.en) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>('farmer');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>('rubber-rss4');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [toast, setToast] = useState<ToastData | null>(null);
  const [rubberModalOpen, setRubberModalOpen] = useState<boolean>(false);
  const [createAlertModalOpen, setCreateAlertModalOpen] = useState<boolean>(false);
  const [alertPreselectedCommodity, setAlertPreselectedCommodity] = useState<string | null>(null);

  const triggerToast = (title: string, desc: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, title, desc, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 5000);
  };

  const dismissToast = () => setToast(null);

  const t = (key: keyof typeof TRANSLATIONS.en): string => {
    return TRANSLATIONS[language][key] || TRANSLATIONS.en[key] || String(key);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        activeTab,
        setActiveTab,
        selectedCommodityId,
        setSelectedCommodityId,
        selectedDistrict,
        setSelectedDistrict,
        toast,
        triggerToast,
        dismissToast,
        rubberModalOpen,
        setRubberModalOpen,
        createAlertModalOpen,
        setCreateAlertModalOpen,
        alertPreselectedCommodity,
        setAlertPreselectedCommodity,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
