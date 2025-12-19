'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Feature {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  imageAlt: string;
}

const features: Feature[] = [
  {
    id: 'crops',
    title: 'Універсальність культур',
    description: 'SVR1 працює з 15+ типами культур завдяки змінним дискам у комплекті',
    benefits: [
    'Овочі: морква, буряк, цибуля, редис',
    'Баштанні: кавун, диня, гарбуз',
    'Спеціальні: соняшник, кукурудза, соя',
    'Зелень: петрушка, кріп, салат'],

    image: "/assets/images/seed.jpg",
    imageAlt: 'Variety of fresh vegetables including carrots, beets, onions and leafy greens arranged on wooden surface'
  },
  {
    id: 'battery',
    title: 'Автономна робота',
    description: 'Акумуляторна батарея забезпечує 8 годин безперервної роботи без трактора',
    benefits: [
    'Повний заряд за 4 години',
    'Індикатор рівня заряду',
    'Захист від перезарядки',
    'Робота в будь-яких умовах'],

    image: "/assets/images/akum.webp",
    imageAlt: 'Car battery with terminals and charge indicator for agricultural equipment'
  },
  {
    id: 'discs',
    title: 'Комплект дисків',
    description: 'У комплекті 6 дисків для різних розмірів насіння - готові до роботи одразу',
    benefits: [
    'Дрібне насіння: 0.5-1.5 мм',
    'Середнє насіння: 1.5-3 мм',
    'Велике насіння: 3-6 мм',
    'Швидка заміна за 2 хвилини'],

    image: "/assets/images/disc.png",
    imageAlt: 'Set of precision seeding discs with different hole sizes for various seed types'
  }];

const FeaturesSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('crops');
  const [isImageChanging, setIsImageChanging] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleTabChange = (tabId: string) => {
    setIsImageChanging(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsImageChanging(false);
    }, 150);
  };

  const activeFeature = features.find((f) => f.id === activeTab) || features[0];

  if (!isHydrated) {
    return (
      <section className="py-16 md:py-24 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
              Ключові переваги SVR1
            </h2>
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-primary/30 mb-6">
            <Icon name="SparklesIcon" size={20} className="text-primary" />
            <span className="font-body font-semibold text-sm text-primary">ПЕРЕВАГИ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            Чому фермери обирають SVR1 Agrolan
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Повна комплектація та універсальність для всіх типів культур
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-form overflow-hidden">
          <div className="border-b border-border">
            <div className="flex overflow-x-auto">
              {features.map((feature) =>
              <button
                key={feature.id}
                onClick={() => handleTabChange(feature.id)}
                className={`flex-1 min-w-[200px] px-6 py-4 font-cta font-bold text-sm transition-all duration-250 ease-out ${
                activeTab === feature.id ?
                'text-primary bg-primary/10 border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }
                aria-label={`Перемкнути на ${feature.title}`}>

                  {feature.title}
                </button>
              )}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-headline font-bold text-xl md:text-2xl text-foreground mb-4">
                  {activeFeature.title}
                </h3>
                <p className="font-body text-base md:text-lg text-muted-foreground mb-6">
                  {activeFeature.description}
                </p>
                <ul className="space-y-4">
                  {activeFeature.benefits.map((benefit, index) =>
                  <li key={index} className="flex items-start gap-3">
                      <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="font-body text-base text-foreground">{benefit}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="relative aspect-square rounded-xl overflow-hidden shadow-form">
                <div className="relative w-full h-full">
                  <AppImage
                    key={activeTab}
                    src={activeFeature.image}
                    alt={activeFeature.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={100}
                    className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                      isImageChanging ? 'opacity-0' : 'opacity-100'
                    }`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card p-6 rounded-xl shadow-form text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="BoltIcon" size={32} className="text-primary" />
            </div>
            <h4 className="font-headline font-bold text-base md:text-lg text-foreground mb-2">Швидкий старт</h4>
            <p className="font-body text-sm text-muted-foreground">
              Готовий до роботи одразу після розпакування. Всі диски та аксесуари в комплекті
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-form text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="WrenchScrewdriverIcon" size={32} className="text-primary" />
            </div>
            <h4 className="font-headline font-bold text-lg text-foreground mb-2">Просте обслуговування</h4>
            <p className="font-body text-sm text-muted-foreground">
              Мінімальний догляд. Всі запчастини доступні в Україні з доставкою за 1-2 дні
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-form text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="AcademicCapIcon" size={32} className="text-primary" />
            </div>
            <h4 className="font-headline font-bold text-lg text-foreground mb-2">Навчання включено</h4>
            <p className="font-body text-sm text-muted-foreground">
              Безкоштовна консультація та демонстрація роботи на вашому полі при доставці
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default FeaturesSection;