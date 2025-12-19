'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CostComparison {
  type: string;
  price: number;
  features: string[];
  color: string;
}

const ProblemSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedHectares, setSelectedHectares] = useState<number>(100);
  const [selectedCrop, setSelectedCrop] = useState<string>('vegetables');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleHectaresChange = (value: number) => {
    setIsAnimating(true);
    setSelectedHectares(value);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleConsultationClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const costComparisons: CostComparison[] = [
    {
      type: 'Імпортні сівачі',
      price: 100000,
      features: ['Висока ціна', 'Складне обслуговування', 'Дорогі запчастини', 'Довга доставка'],
      color: 'destructive'
    },
    {
      type: 'Звичайні сівачі',
      price: 15000,
      features: ['Низька точність', 'Перевитрата насіння', 'Нерівномірні сходи', 'Ручне прорідження'],
      color: 'warning'
    },
    {
      type: 'SVR1 Agrolan',
      price: 25000,
      features: ['Точність 98%', 'Повна комплектація', 'Українське виробництво', 'Швидка доставка'],
      color: 'success'
    }
  ];

  const calculateSavings = () => {
    const seedWaste = selectedHectares * 2000;
    const laborSavings = selectedHectares * 500;
    const yieldIncrease = selectedHectares * 3000;
    return seedWaste + laborSavings + yieldIncrease;
  };

  if (!isHydrated) {
    return (
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
              Проблема дорогого імпортного обладнання
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-destructive/30 mb-6">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-destructive" />
            <span className="font-body font-semibold text-sm text-destructive">ПРОБЛЕМА</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            Чому фермери переплачують за імпортне обладнання?
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Імпортні вакуумні сівачі коштують 80 000 - 120 000 грн, але не гарантують кращої якості висіву
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {costComparisons.map((comparison, index) => (
            <div
              key={index}
              className={`p-4 md:p-6 glass-card rounded-xl md:rounded-2xl border transition-all duration-300 ease-out hover:shadow-2xl hover:scale-[1.02] ${
                comparison.color === 'success' 
                  ? 'border-success/40 hover:border-success/60' 
                  : 'border-white/30 hover:border-white/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline font-bold text-xl text-foreground">{comparison.type}</h3>
                {comparison.color === 'success' && (
                  <Icon name="CheckBadgeIcon" size={24} className="text-success" />
                )}
              </div>
              <div className="mb-6">
                <p className={`font-headline font-bold text-3xl ${
                  comparison.color === 'success' ? 'text-success' : 
                  comparison.color === 'warning' ? 'text-warning' : 'text-destructive'
                }`}>
                  {comparison.price.toLocaleString('uk-UA')} грн
                </p>
              </div>
              <ul className="space-y-3">
                {comparison.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon 
                      name={comparison.color === 'success' ? 'CheckCircleIcon' : 'XCircleIcon'} 
                      size={20} 
                      className={comparison.color === 'success' ? 'text-success' : 'text-destructive'} 
                    />
                    <span className="font-body text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-card p-4 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/40 relative overflow-hidden">
          {/* Декоративні елементи */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-success/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-primary/30 mb-4">
                <Icon name="CalculatorIcon" size={20} className="text-primary" />
                <span className="font-body font-semibold text-sm text-primary">КАЛЬКУЛЯТОР ЕКОНОМІЇ</span>
              </div>
              <h3 className="font-headline font-bold text-3xl lg:text-4xl text-foreground mb-3">
                Розрахуйте вашу економію
              </h3>
              <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
                Введіть параметри вашого господарства та отримайте точний розрахунок економії
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block font-body font-bold text-base text-foreground">
                    Площа посіву (га)
                  </label>
                  <div className="px-3 py-1 glass rounded-lg border border-primary/20">
                    <span className="font-headline font-bold text-xl text-primary">{selectedHectares}</span>
                    <span className="font-body text-sm text-muted-foreground ml-1">га</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="range-input-wrapper" style={{
                    '--range-fill-percent': `${((selectedHectares - 50) / (500 - 50)) * 100}%`
                  } as React.CSSProperties}>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={selectedHectares}
                      onChange={(e) => handleHectaresChange(Number(e.target.value))}
                      className="w-full range-input"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="font-body text-xs text-muted-foreground">50 га</span>
                    <span className="font-body text-xs text-muted-foreground">500 га</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block font-body font-bold text-base text-foreground mb-3">
                  Тип культури
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-4 py-4 glass rounded-xl border border-white/30 font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all duration-300"
                >
                  <option value="vegetables">Овочі</option>
                  <option value="melons">Баштанні</option>
                  <option value="specialty">Спеціальні культури</option>
                </select>
              </div>
            </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className={`group relative p-4 md:p-6 glass-card rounded-xl md:rounded-2xl text-center transition-all duration-300 border border-success/30 hover:border-success/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center ${isAnimating ? 'scale-105' : ''}`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-success/20 transition-colors duration-300"></div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-success/20 group-hover:border-success/40 transition-colors duration-300">
                  <Icon name="CurrencyDollarIcon" size={24} className="md:w-7 md:h-7 text-success" />
                </div>
                <p className="font-body text-xs md:text-sm font-semibold text-muted-foreground mb-2">Економія на насінні</p>
                <p className={`font-headline font-bold text-3xl md:text-4xl text-success mb-1 transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                  {(selectedHectares * 2000).toLocaleString('uk-UA')}
                </p>
                <p className="font-body text-xs text-muted-foreground">грн</p>
              </div>
            </div>

            <div className={`group relative p-4 md:p-6 glass-card rounded-xl md:rounded-2xl text-center transition-all duration-300 border border-success/30 hover:border-success/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center ${isAnimating ? 'scale-105' : ''}`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-success/20 transition-colors duration-300"></div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-success/20 group-hover:border-success/40 transition-colors duration-300">
                  <Icon name="UserGroupIcon" size={24} className="md:w-7 md:h-7 text-success" />
                </div>
                <p className="font-body text-xs md:text-sm font-semibold text-muted-foreground mb-2">Економія на робочій силі</p>
                <p className={`font-headline font-bold text-3xl md:text-4xl text-success mb-1 transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                  {(selectedHectares * 500).toLocaleString('uk-UA')}
                </p>
                <p className="font-body text-xs text-muted-foreground">грн</p>
              </div>
            </div>

            <div className={`group relative p-4 md:p-6 glass-card rounded-xl md:rounded-2xl text-center transition-all duration-300 border border-success/30 hover:border-success/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center ${isAnimating ? 'scale-105' : ''}`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-success/20 transition-colors duration-300"></div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-success/20 group-hover:border-success/40 transition-colors duration-300">
                  <Icon name="ChartBarIcon" size={24} className="md:w-7 md:h-7 text-success" />
                </div>
                <p className="font-body text-xs md:text-sm font-semibold text-muted-foreground mb-2">Збільшення врожаю</p>
                <p className={`font-headline font-bold text-3xl md:text-4xl text-success mb-1 transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                  {(selectedHectares * 3000).toLocaleString('uk-UA')}
                </p>
                <p className="font-body text-xs text-muted-foreground">грн</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            {/* Головна картка з результатом */}
            <div className="relative mb-6">
              <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-12 border border-white/30 overflow-hidden relative">
                {/* Декоративний градієнт */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-success/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full -ml-36 -mb-36 blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
                    {/* Ліва частина - Головна сума */}
                    <div className="flex-1 text-center lg:text-left">
                      <p className="font-body text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 uppercase tracking-wider">
                        Загальна економія
                      </p>
                      <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-1.5 md:gap-2 lg:gap-3 mb-2">
                        <p className={`font-headline font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-success transition-all duration-500 break-words ${isAnimating ? 'scale-105' : ''}`}>
                          {calculateSavings().toLocaleString('uk-UA')}
                        </p>
                        <span className="font-headline font-bold text-xl md:text-3xl lg:text-4xl text-muted-foreground whitespace-nowrap">грн</span>
                      </div>
                      <p className="font-body text-sm md:text-base text-muted-foreground">
                        за один сезон використання
                      </p>
                    </div>

                    {/* Права частина - Метрики */}
                    <div className="flex gap-3 md:gap-4 lg:gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 border border-success/20 mx-auto">
                          <Icon name="ArrowTrendingUpIcon" size={24} className="md:w-8 md:h-8 text-success" />
                        </div>
                        <p className="font-headline font-bold text-2xl md:text-3xl text-success mb-1">
                          {Math.round((calculateSavings() / 25000) * 100)}%
                        </p>
                        <p className="font-body text-[10px] md:text-xs text-muted-foreground font-semibold">Прибутковість</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 border border-primary/20 mx-auto">
                          <Icon name="ClockIcon" size={24} className="md:w-8 md:h-8 text-primary" />
                        </div>
                        <p className="font-headline font-bold text-2xl md:text-3xl text-primary mb-1">1</p>
                        <p className="font-body text-[10px] md:text-xs text-muted-foreground font-semibold">Сезон</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Нижній блок з інформацією та CTA */}
            <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
              {/* Інформаційний блок */}
              <div className="glass-card rounded-xl p-3 md:p-4 border border-white/30">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 glass rounded-lg flex items-center justify-center flex-shrink-0 border border-success/20">
                    <Icon name="CheckBadgeIcon" size={16} className="md:w-5 md:h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-body text-xs md:text-sm text-foreground leading-relaxed">
                      <span className="font-bold text-success">SVR1 окупається за перший сезон</span> використання завдяки економії насіння, зменшенню витрат на робочу силу та збільшенню врожаю
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA кнопка */}
              <button
                onClick={handleConsultationClick}
                className="group relative px-4 py-3 md:px-6 md:py-4 font-cta font-bold text-xs md:text-sm bg-accent text-accent-foreground rounded-lg md:rounded-xl shadow-xl hover:bg-accent/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-1.5 md:gap-2 border border-accent/20 overflow-hidden min-w-[140px] md:min-w-[160px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Icon name="PhoneIcon" size={20} className="relative z-10" />
                <span className="relative z-10 whitespace-nowrap">ЗАМОВИТИ</span>
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;