'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onConsultationClick: () => void;
  onVideoClick: () => void;
}

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  color: 'success' | 'primary';
}

const StatCard = ({ icon, value, label, color }: StatCardProps) => {
  const textColor = color === 'success' ? 'text-success' : 'text-primary';
  const isSuccess = color === 'success';

  return (
    <div className={`group relative glass-card p-3 md:p-4 rounded-lg md:rounded-xl border transition-all duration-300 ease-out overflow-hidden hover:shadow-lg hover:scale-[1.02] flex items-center gap-3 md:gap-4 ${
      isSuccess 
        ? 'border-success/30 hover:border-success/50' 
        : 'border-primary/30 hover:border-primary/50'
    }`}>
      <div className={`absolute top-0 right-0 w-12 h-12 rounded-full -mr-6 -mt-6 blur-xl group-hover:opacity-60 transition-opacity duration-300 ${
        isSuccess ? 'bg-success/10' : 'bg-primary/10'
      }`}></div>
      <div className={`relative z-10 w-8 h-8 md:w-10 md:h-10 glass rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${
        isSuccess 
          ? 'border-success/20 group-hover:border-success/40' 
          : 'border-primary/20 group-hover:border-primary/40'
      }`}>
        <Icon name={icon as any} size={16} className={`md:w-5 md:h-5 ${textColor}`} />
      </div>
      <div className="relative z-10 flex flex-col items-start min-w-0">
        <p className={`font-headline font-bold text-xl md:text-2xl ${textColor} leading-none`}>{value}</p>
        <p className="font-body text-[10px] md:text-xs font-semibold text-muted-foreground whitespace-nowrap">{label}</p>
      </div>
    </div>
  );
};

const HeroSection = ({ onConsultationClick, onVideoClick }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Генерація значення на основі поточної дати (змінюється раз на день)
  const getOrdersToday = () => {
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    // Простий hash для генерації стабільного значення на основі дати
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    // Генеруємо число від 8 до 22 на основі hash
    const value = Math.abs(hash) % 15 + 8;
    return value;
  };

  const [ordersToday] = useState(getOrdersToday());
  
  // Генерація часу останнього замовлення на основі часу дня (збільшується протягом дня)
  const getLastOrderTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Базовий час на початку дня (ранок) - мінімальне значення
    const baseMinutes = 5; // Починаємо з 5 хвилин тому
    
    // Додаємо час на основі поточного часу дня
    // Кожна година додає ~10-15 хвилин до базового часу
    const additionalMinutes = hours * 12 + Math.floor(minutes / 5) * 2;
    
    const totalMinutes = baseMinutes + additionalMinutes;
    
    // Конвертуємо в читабельний формат
    if (totalMinutes < 60) {
      return `${totalMinutes} хвилин тому`;
    } else if (totalMinutes < 120) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      if (mins === 0) {
        return `${hours} ${hours === 1 ? 'годину' : 'години'} тому`;
      }
      return `${hours} ${hours === 1 ? 'годину' : 'години'} ${mins} ${mins === 1 ? 'хвилину' : 'хвилин'} тому`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      return `${hours} ${hours === 1 ? 'годину' : 'годин'} тому`;
    }
  };

  // Отримуємо збережене значення з localStorage або генеруємо нове
  const getInitialLastOrderTime = () => {
    if (typeof window === 'undefined') return getLastOrderTime();
    
    const today = new Date().toDateString();
    const saved = localStorage.getItem('lastOrderTime');
    const savedDate = localStorage.getItem('lastOrderTimeDate');
    
    // Якщо збережене значення для сьогодні, використовуємо його
    if (saved && savedDate === today) {
      const savedMinutes = parseInt(saved);
      const currentMinutes = getLastOrderTimeMinutes();
      // Використовуємо більше значення (не дозволяємо зменшуватися)
      return formatLastOrderTime(Math.max(savedMinutes, currentMinutes));
    }
    
    // Новий день або перший раз - генеруємо нове значення
    const initialMinutes = getLastOrderTimeMinutes();
    localStorage.setItem('lastOrderTime', initialMinutes.toString());
    localStorage.setItem('lastOrderTimeDate', today);
    return formatLastOrderTime(initialMinutes);
  };

  const getLastOrderTimeMinutes = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const baseMinutes = 5;
    const additionalMinutes = hours * 12 + Math.floor(minutes / 5) * 2;
    return baseMinutes + additionalMinutes;
  };

  const formatLastOrderTime = (totalMinutes: number) => {
    if (totalMinutes < 60) {
      return `${totalMinutes} хвилин тому`;
    } else if (totalMinutes < 120) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      if (mins === 0) {
        return `${hours} ${hours === 1 ? 'годину' : 'години'} тому`;
      }
      return `${hours} ${hours === 1 ? 'годину' : 'години'} ${mins} ${mins === 1 ? 'хвилину' : 'хвилин'} тому`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      return `${hours} ${hours === 1 ? 'годину' : 'годин'} тому`;
    }
  };

  const [lastOrderTime, setLastOrderTime] = useState(getInitialLastOrderTime());

  useEffect(() => {
    setIsHydrated(true);
    
    // Оновлюємо час останнього замовлення кожну годину
    const interval = setInterval(() => {
      const currentMinutes = getLastOrderTimeMinutes();
      const today = new Date().toDateString();
      const saved = localStorage.getItem('lastOrderTime');
      const savedDate = localStorage.getItem('lastOrderTimeDate');
      
      // Отримуємо поточне збережене значення
      let savedMinutes = currentMinutes;
      if (saved && savedDate === today) {
        savedMinutes = parseInt(saved);
      }
      
      // Використовуємо більше значення (не дозволяємо зменшуватися)
      const newMinutes = Math.max(savedMinutes, currentMinutes);
      const formatted = formatLastOrderTime(newMinutes);
      
      setLastOrderTime(formatted);
      localStorage.setItem('lastOrderTime', newMinutes.toString());
      localStorage.setItem('lastOrderTimeDate', today);
    }, 60 * 60 * 1000); // 1 година

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Динамічний фон з градієнтами */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/20 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzJFN0QzMiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/30">
              <div className="flex items-center gap-1">
                <div className="w-6 h-4 bg-secondary rounded-sm shadow-sm"></div>
                <div className="w-6 h-4 bg-yellow-400 rounded-sm shadow-sm"></div>
              </div>
              <span className="font-body font-semibold text-sm text-primary">Виробництво України</span>
            </div>

            <h1 className="font-headline font-bold text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              Професійний вакуумний сівач
            </h1>

            <p className="font-body text-base md:text-xl text-muted-foreground">
              Точність імпортного обладнання за 25 000 грн. Повна комплектація з дисками для всіх культур. Готовий до роботи одразу після доставки.
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl relative overflow-hidden border border-primary/30 shadow-2xl bg-gradient-to-br from-primary/5 via-white/40 to-success/5 backdrop-blur-xl">
              {/* Декоративні елементи */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full -mr-24 -mt-24 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-success/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
              {/* Світіння */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              
              <div className="flex-1 relative z-10">
                {/* Бейдж "ОБМЕЖЕНА КІЛЬКІСТЬ" над ціною */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-dark rounded-xl shadow-2xl border border-error/30 mb-3">
                  <div className="w-2.5 h-2.5 bg-error rounded-full animate-blink-pulse-red"></div>
                  <span className="font-body font-bold text-xs text-error">ОБМЕЖЕНА КІЛЬКІСТЬ</span>
                </div>
                
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-headline font-bold text-3xl md:text-5xl text-primary">25 000</span>
                  <span className="font-body font-semibold text-lg md:text-xl text-primary">грн</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border border-success/30">
                    <Icon name="CheckCircleIcon" size={16} className="text-success" />
                    <span className="font-body font-semibold text-sm text-success">ПОВНА КОМПЛЕКТАЦІЯ</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border border-primary/30">
                    <Icon name="FireIcon" size={16} className="text-primary" />
                    <span className="font-body font-semibold text-sm text-primary">{ordersToday} замовлень сьогодні</span>
                  </div>
                </div>
              </div>
              <div className="text-left md:text-right relative z-10">
                <p className="font-body text-sm text-muted-foreground line-through mb-1">Імпортні: 80 000 - 120 000 грн</p>
                <p className="font-body font-semibold text-base text-success mb-2">Економія до 95 000 грн</p>
                <p className="font-body text-xs text-muted-foreground">Останнє замовлення: {lastOrderTime}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-4">
              <button
                onClick={onConsultationClick}
                className="group relative px-6 py-3 md:px-8 md:py-4 font-cta font-bold text-base md:text-lg bg-accent text-accent-foreground rounded-xl shadow-2xl hover:bg-accent/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-3xl flex items-center justify-center gap-2 md:gap-3 border border-accent/20 backdrop-blur-sm overflow-hidden"
                aria-label="Замовити безкоштовну консультацію">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Icon name="PhoneIcon" size={20} className="md:w-6 md:h-6 relative z-10" />
                <span className="relative z-10 text-sm md:text-base">ЗАМОВИТИ КОНСУЛЬТАЦІЮ</span>
              </button>

              <button
                onClick={onVideoClick}
                className="group relative px-6 py-3 md:px-8 md:py-4 font-cta font-bold text-base md:text-lg glass-button text-foreground rounded-xl hover:bg-white/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 md:gap-3 overflow-hidden"
                aria-label="Переглянути відео демонстрацію">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Icon name="PlayIcon" size={20} className="md:w-6 md:h-6 relative z-10" />
                <span className="relative z-10 text-sm md:text-base">ПЕРЕГЛЯНУТИ В ДІЇ</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Icon name="ShieldCheckIcon" size={24} className="text-success" />
                <span className="font-body text-sm text-foreground">Гарантія 2 роки</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="TruckIcon" size={24} className="text-success" />
                <span className="font-body text-sm text-foreground">Безкоштовна доставка</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckBadgeIcon" size={24} className="text-success" />
                <span className="font-body text-sm text-foreground">30 днів повернення</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card border border-white/40 shadow-2xl">
              <AppImage
                src="/assets/images/_1440_x_1080_20251209_193944_0000-Photoroom-1765964849344.jpg"
                alt="SVR1 vacuum seeder machine with yellow base frame and blue seed hopper on dark tilled soil"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 right-4 px-2 py-1 md:px-4 md:py-2 glass-dark rounded-lg md:rounded-xl shadow-xl border border-secondary/30">
                <p className="font-cta font-bold text-xs md:text-sm text-secondary">ВИРОБНИЦТВО УКРАЇНИ</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 md:gap-3">
              <StatCard 
                icon="UserGroupIcon" 
                value="500+" 
                label="Задоволених фермерів" 
                color="success"
              />
              <StatCard 
                icon="SparklesIcon" 
                value="15+" 
                label="Типів культур" 
                color="primary"
              />
              <StatCard 
                icon="CheckBadgeIcon" 
                value="98%" 
                label="Точність висіву" 
                color="success"
              />
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;