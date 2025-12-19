'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CallToActionBarProps {
  onConsultationClick?: () => void;
  onPurchaseClick?: () => void;
}

const CallToActionBar = ({ onConsultationClick, onPurchaseClick }: CallToActionBarProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Завжди використовуємо режим консультації
  const primaryAction = 'consultation';

  const handlePrimaryClick = () => {
    if (onConsultationClick) {
      onConsultationClick();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="hidden md:block fixed bottom-8 right-8 z-[90]">
        <div className="flex flex-col gap-3">
          <button
            onClick={handlePrimaryClick}
            className="group relative px-6 py-4 font-cta font-bold text-base bg-accent text-accent-foreground rounded-xl shadow-2xl hover:bg-accent/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-3xl flex items-center gap-3 border border-accent/20 backdrop-blur-sm overflow-hidden"
            aria-label="Записатися на консультацію"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Icon name="CalendarIcon" size={20} className="relative z-10" />
            <span className="relative z-10">Безкоштовна консультація</span>
          </button>
          
          <a
            href="tel:+380673820518"
            className="group relative px-6 py-3 font-cta font-bold text-sm bg-white text-foreground rounded-xl hover:bg-white/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center gap-2 overflow-hidden"
            aria-label="Зателефонувати"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Icon name="PhoneIcon" size={18} className="relative z-10" />
            <span className="relative z-10">+380 67 382 05 18</span>
          </a>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-card border-t border-border shadow-2xl">
        <div className="px-3 py-2 flex gap-2">
          <a
            href="tel:+380673820518"
            className="group relative flex-1 px-2.5 py-2 font-cta font-bold text-[11px] bg-primary text-primary-foreground rounded-lg active:bg-primary/90 transition-all duration-300 ease-out flex items-center justify-center gap-1 shadow-lg border border-primary/20 overflow-hidden"
            aria-label="Зателефонувати"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Icon name="PhoneIcon" size={14} className="relative z-10" />
            <span className="relative z-10">Дзвінок</span>
          </a>
          
          <button
            onClick={handlePrimaryClick}
            className="group relative flex-[2] px-3 py-2 font-cta font-bold text-xs bg-accent text-accent-foreground rounded-lg active:bg-accent/90 transition-all duration-300 ease-out flex items-center justify-center gap-1.5 border border-accent/20 overflow-hidden shadow-lg"
            aria-label="Записатися на консультацію"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Icon name="CalendarIcon" size={16} className="relative z-10" />
            <span className="relative z-10">Консультація</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CallToActionBar;