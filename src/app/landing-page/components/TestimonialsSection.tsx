'use client';

import { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  farmSize: string;
  image: string;
  imageAlt: string;
  quote: string;
  results: string[];
  rating: number;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Петро Коваленко',
      location: 'Полтавська область',
      farmSize: '150 га',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17b630b37-1765156809908.png",
      imageAlt: 'Middle-aged Ukrainian farmer in plaid shirt standing in vegetable field with green crops',
      quote: 'Купив SVR1 минулого року і не пошкодував. Економія насіння моркви склала майже 35%, а врожай збільшився на 20%. Окупився за перший сезон!',
      results: ['Економія насіння 35%', 'Врожай +20%', 'Окупність 1 сезон'],
      rating: 5
    },
    {
      id: 2,
      name: 'Андрій Бондаренко',
      location: 'Київська область',
      farmSize: '80 га',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d6cf5d6-1765079593854.png",
      imageAlt: 'Middle-aged Ukrainian male farmer in work clothes examining crops in agricultural field',
      quote: 'Раніше використовував звичайний сівач і витрачав багато часу на прорідження. З SVR1 сходи рівномірні, робочої сили потрібно менше. Дуже задоволений!',
      results: ['Рівномірні сходи', 'Менше робочої сили', 'Простота використання'],
      rating: 5
    },
    {
      id: 3,
      name: 'Іван Мельник',
      location: 'Черкаська область',
      farmSize: '200 га',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d1b340b-1764657819823.png",
      imageAlt: 'Senior Ukrainian farmer in cap and work jacket standing in field with farming equipment',
      quote: 'Спочатку сумнівався, чи варто брати вакуумний сівач. Але після демонстрації на полі зрозумів - це те, що потрібно. Точність висіву вражає, а ціна адекватна.',
      results: ['Точність 98%', 'Українське виробництво', 'Швидка доставка'],
      rating: 5
    },
    {
      id: 4,
      name: 'Олександр Шевченко',
      location: 'Вінницька область',
      farmSize: '120 га',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_17b630b37-1765156809908.png",
      imageAlt: 'Ukrainian farmer in field',
      quote: 'Працюю з SVR1 вже другий сезон. Найбільше подобається точність висіву - немає порожніх місць і зайвих рослин. Економлю час та насіння. Відмінна якість за розумну ціну!',
      results: ['Точність висіву', 'Економія часу', 'Якість обладнання'],
      rating: 5
    },
    {
      id: 5,
      name: 'Микола Ткаченко',
      location: 'Харківська область',
      farmSize: '180 га',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d6cf5d6-1765079593854.png",
      imageAlt: 'Ukrainian farmer',
      quote: 'Купив SVR1 для посіву буряка. Результат перевершив очікування - рівномірні рядки, однакова відстань між рослинами. Врожайність зросла на 25% порівняно з попереднім роком. Рекомендую!',
      results: ['Врожайність +25%', 'Рівномірні рядки', 'Для буряка'],
      rating: 5
    },
    {
      id: 6,
      name: 'Василь Петренко',
      location: 'Львівська область',
      farmSize: '95 га',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_10d1b340b-1764657819823.png",
      imageAlt: 'Ukrainian farmer',
      quote: 'Дуже зручний у використанні. Швидко налаштував під свої культури. Технічна підтримка відгукується миттєво. Запчастини завжди в наявності. Справжня українська якість!',
      results: ['Зручність використання', 'Технічна підтримка', 'Запчастини в наявності'],
      rating: 5
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSlidesToShow(3); // Десктоп - 3 карточки
      } else {
        setSlidesToShow(1); // Мобільний - 1 карточка
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Автоматична зміна слайдів кожні 5 секунд (тільки якщо не наведено мишку)
    if (isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Очищаємо попередній інтервал перед створенням нового
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxSlideIndex = Math.max(0, testimonials.length - slidesToShow);
        if (prev >= maxSlideIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    intervalRef.current = interval;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [testimonials.length, slidesToShow, isHovered]);

  const maxIndex = Math.max(0, testimonials.length - slidesToShow);

  const goToSlide = (index: number) => {
    const maxSlideIndex = Math.max(0, testimonials.length - slidesToShow);
    setCurrentIndex(Math.min(index, maxSlideIndex));
    resetAutoScroll(); // Скидаємо таймер при кліку на індикатор
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return maxIndex;
      }
      return prev - 1;
    });
    resetAutoScroll(); // Скидаємо таймер при кліку на кнопку
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0;
      }
      return prev + 1;
    });
    resetAutoScroll(); // Скидаємо таймер при кліку на кнопку
  };

  // Функція для скидання таймера автоматичного скролу
  const resetAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Таймер перезапуститься автоматично через useEffect
  };

  // Drag handlers для миші
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(currentIndex);
    setDragOffset(0);
    resetAutoScroll(); // Скидаємо таймер при початку перетягування
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const container = e.currentTarget as HTMLElement;
    const containerWidth = container.offsetWidth;
    const walk = ((x - startX) / containerWidth) * 100; // Відсоток переміщення
    setDragOffset(walk);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    // Визначаємо, на скільки слайдів переміститися
    const slideWidth = 100 / slidesToShow;
    const slidesMoved = Math.round(-dragOffset / slideWidth);
    const newIndex = Math.max(0, Math.min(maxIndex, currentIndex + slidesMoved));
    
    setCurrentIndex(newIndex);
    setDragOffset(0);
    setIsDragging(false);
    resetAutoScroll(); // Скидаємо таймер після завершення перетягування
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeaveSlider = (e: React.MouseEvent) => {
    setIsDragging(false);
    setIsHovered(false);
  };

  if (!isHydrated) {
    return (
      <section id="testimonials-section" className="py-16 md:py-24 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
              Що кажуть наші клієнти
            </h2>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section id="testimonials-section" className="py-16 md:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-warning/30 mb-6">
            <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-warning" />
            <span className="font-body font-semibold text-sm text-warning">ВІДГУКИ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            Що кажуть наші клієнти
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Реальні історії успіху від фермерів, які вже використовують SVR1 Agrolan
          </p>
        </div>

        {/* Слайдер з відгуками */}
        <div className="relative mb-12">
          {/* Контейнер слайдів */}
          <div 
            className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveSlider}
          >
            <div 
              className={`flex ${isDragging ? '' : 'transition-transform duration-500 ease-in-out'}`}
              style={{ 
                transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% + ${dragOffset}%))`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="px-2 flex-shrink-0"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-card p-4 md:p-5 rounded-xl duration-250 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
                        <AppImage
                          src={testimonial.image}
                          alt={testimonial.imageAlt}
                          className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-headline font-bold text-sm md:text-base text-foreground truncate">{testimonial.name}</h3>
                        <p className="font-body text-xs text-muted-foreground truncate">{testimonial.location}</p>
                        <p className="font-body text-[10px] text-muted-foreground">{testimonial.farmSize}</p>
                      </div>
                    </div>

                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, index) => (
                        <Icon key={index} name="StarIcon" size={14} className="text-warning" variant="solid" />
                      ))}
                    </div>

                    <blockquote className="font-body text-sm md:text-base text-foreground mb-3 italic flex-1 line-clamp-4">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="space-y-1.5 pt-3 border-t border-border">
                      {testimonial.results.map((result, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <Icon name="CheckCircleIcon" size={12} className="text-success flex-shrink-0" />
                          <span className="font-body text-xs text-muted-foreground">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки навігації - на десктопі над слайдером */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center hover:bg-primary hover:text-primary-foreground hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-10 border border-border hover:border-primary group"
            aria-label="Попередній відгук"
          >
            <Icon name="ChevronLeftIcon" size={24} className="text-foreground group-hover:text-primary-foreground transition-colors" />
          </button>
          
          <button
            onClick={goToNext}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full shadow-xl items-center justify-center hover:bg-primary hover:text-primary-foreground hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-10 border border-border hover:border-primary group"
            aria-label="Наступний відгук"
          >
            <Icon name="ChevronRightIcon" size={24} className="text-foreground group-hover:text-primary-foreground transition-colors" />
          </button>

          {/* Індикатори (точки) з кнопками на мобільних */}
          <div className="flex items-center justify-center gap-2 md:gap-2 mt-6">
            {/* Кнопка вліво на мобільних */}
            <button
              onClick={goToPrevious}
              className="md:hidden w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-border hover:border-primary group"
              aria-label="Попередній відгук"
            >
              <Icon name="ChevronLeftIcon" size={18} className="text-foreground group-hover:text-primary-foreground transition-colors" />
            </button>
            
            {/* Індикатори */}
            <div className="flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => {
              // Індикатор активний, якщо поточний індекс дорівнює індексу індикатора
              const isActive = currentIndex === index;
              
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary w-8 h-2' 
                      : 'bg-border hover:bg-primary/50 w-2 h-2'
                  }`}
                  aria-label={`Перейти до слайду ${index + 1}`}
                />
              );
            })}
            </div>
            
            {/* Кнопка вправо на мобільних */}
            <button
              onClick={goToNext}
              className="md:hidden w-8 h-8 bg-card/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-border hover:border-primary group"
              aria-label="Наступний відгук"
            >
              <Icon name="ChevronRightIcon" size={18} className="text-foreground group-hover:text-primary-foreground transition-colors" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="group relative glass-card p-4 md:p-6 rounded-xl md:rounded-2xl text-center transition-all duration-300 ease-out border border-primary/30 hover:border-primary/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-primary/20 transition-colors duration-300"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                <Icon name="UserGroupIcon" size={24} className="md:w-7 md:h-7 text-primary" />
              </div>
              <p className="font-headline font-bold text-3xl md:text-4xl text-primary mb-2">500+</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground font-semibold">Задоволених фермерів</p>
            </div>
          </div>
          
          <div className="group relative glass-card p-4 md:p-6 rounded-xl md:rounded-2xl text-center transition-all duration-300 ease-out border border-primary/30 hover:border-primary/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-primary/20 transition-colors duration-300"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                <Icon name="MapIcon" size={24} className="md:w-7 md:h-7 text-primary" />
              </div>
              <p className="font-headline font-bold text-3xl md:text-4xl text-primary mb-2">15 000+</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground font-semibold">Гектарів оброблено</p>
            </div>
          </div>
          
          <div className="group relative glass-card p-4 md:p-6 rounded-xl md:rounded-2xl text-center transition-all duration-300 ease-out border border-success/30 hover:border-success/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-success/20 transition-colors duration-300"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-success/20 group-hover:border-success/40 transition-colors duration-300">
                <Icon name="HandThumbUpIcon" size={24} className="md:w-7 md:h-7 text-success" />
              </div>
              <p className="font-headline font-bold text-3xl md:text-4xl text-success mb-2">98%</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground font-semibold">Рекомендують друзям</p>
            </div>
          </div>
          
          <div className="group relative glass-card p-4 md:p-6 rounded-xl md:rounded-2xl text-center transition-all duration-300 ease-out border border-warning/30 hover:border-warning/50 hover:shadow-xl hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-16 h-16 bg-warning/10 rounded-full -mr-8 -mt-8 blur-xl group-hover:bg-warning/20 transition-colors duration-300"></div>
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 border border-warning/20 group-hover:border-warning/40 transition-colors duration-300">
                <Icon name="StarIcon" size={24} className="md:w-7 md:h-7 text-warning" />
              </div>
              <p className="font-headline font-bold text-3xl md:text-4xl text-warning mb-2">4.9/5</p>
              <p className="font-body text-xs md:text-sm text-muted-foreground font-semibold">Середня оцінка</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;