'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PartnerBenefit {
  icon: string;
  title: string;
  description: string;
}

const PartnershipSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    region: '',
    businessType: 'dealer'
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const benefits: PartnerBenefit[] = [
    {
      icon: 'CurrencyDollarIcon',
      title: 'Висока маржа',
      description: 'До 30% прибутку з кожної одиниці обладнання'
    },
    {
      icon: 'TruckIcon',
      title: 'Швидка доставка',
      description: 'Відправка замовлень протягом 1-2 робочих днів'
    },
    {
      icon: 'AcademicCapIcon',
      title: 'Навчання',
      description: 'Безкоштовне навчання продажам та технічній підтримці'
    },
    {
      icon: 'MegaphoneIcon',
      title: 'Маркетингова підтримка',
      description: 'Готові матеріали для реклами та промо-акції'
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Гарантійна підтримка',
      description: 'Повна підтримка гарантійних випадків від виробника'
    },
    {
      icon: 'ChartBarIcon',
      title: 'Ексклюзивність',
      description: 'Можливість отримати ексклюзивні права на регіон'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Відправка через Next.js API route (напряму на Gmail)
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          phone: formData.phone,
          region: formData.region,
          businessType: formData.businessType,
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка відправки форми');
      }
      
      setSubmitStatus('success');
      setFormData({ companyName: '', contactPerson: '', phone: '', region: '', businessType: 'dealer' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isHydrated) {
    return (
      <section id="partnership-section" className="py-16 md:py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
              Партнерство з Agrolan
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="partnership-section" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-secondary/30 mb-6">
            <Icon name="BriefcaseIcon" size={20} className="text-secondary" />
            <span className="font-body font-semibold text-sm text-secondary">ПАРТНЕРСТВО</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            Станьте офіційним дилером Agrolan
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Приєднуйтесь до мережі успішних партнерів та отримайте доступ до високоякісного обладнання з високою маржею
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-headline font-bold text-xl md:text-2xl text-foreground mb-4 md:mb-6">Переваги партнерства</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card p-4 rounded-lg shadow-form">
                  <Icon name={benefit.icon as any} size={32} className="text-primary mb-3" />
                  <h4 className="font-headline font-bold text-base md:text-lg text-foreground mb-2">{benefit.title}</h4>
                  <p className="font-body text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border-2 border-accent">
              <h4 className="font-headline font-bold text-base md:text-lg text-foreground mb-4">Калькулятор прибутку</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-foreground">Ціна для дилера:</span>
                  <span className="font-headline font-bold text-lg text-foreground">17 500 грн</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-foreground">Рекомендована ціна:</span>
                  <span className="font-headline font-bold text-lg text-foreground">25 000 грн</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="font-body font-semibold text-base text-foreground">Ваш прибуток:</span>
                  <span className="font-headline font-bold text-2xl text-accent">7 500 грн</span>
                </div>
                <p className="font-body text-xs text-muted-foreground">
                  При продажу 10 одиниць на місяць - 75 000 грн прибутку
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-form">
            <h3 className="font-headline font-bold text-xl md:text-2xl text-foreground mb-4 md:mb-6">Заявка на партнерство</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Назва компанії *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="ТОВ 'Агротехніка'"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Контактна особа *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Іван Петренко"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+380 12 345 67 89"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Регіон *
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Оберіть регіон</option>
                  <option value="vinnytsia">Вінницька область</option>
                  <option value="volyn">Волинська область</option>
                  <option value="dnipro">Дніпропетровська область</option>
                  <option value="donetsk">Донецька область</option>
                  <option value="zhytomyr">Житомирська область</option>
                  <option value="zakarpattia">Закарпатська область</option>
                  <option value="zaporizhzhia">Запорізька область</option>
                  <option value="ivano-frankivsk">Івано-Франківська область</option>
                  <option value="kyiv">Київська область</option>
                  <option value="kirovohrad">Кіровоградська область</option>
                  <option value="luhansk">Луганська область</option>
                  <option value="lviv">Львівська область</option>
                  <option value="mykolaiv">Миколаївська область</option>
                  <option value="odesa">Одеська область</option>
                  <option value="poltava">Полтавська область</option>
                  <option value="rivne">Рівненська область</option>
                  <option value="sumy">Сумська область</option>
                  <option value="ternopil">Тернопільська область</option>
                  <option value="kharkiv">Харківська область</option>
                  <option value="kherson">Херсонська область</option>
                  <option value="khmelnytskyi">Хмельницька область</option>
                  <option value="cherkasy">Черкаська область</option>
                  <option value="chernivtsi">Чернівецька область</option>
                  <option value="chernihiv">Чернігівська область</option>
                  <option value="other">Інший регіон</option>
                </select>
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Тип бізнесу *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="dealer">Дилер сільгосптехніки</option>
                  <option value="retailer">Роздрібний магазин</option>
                  <option value="distributor">Дистриб'ютор</option>
                  <option value="other">Інше</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-4 py-3 md:px-6 md:py-4 font-cta font-bold text-sm md:text-lg bg-accent text-accent-foreground rounded-xl shadow-xl hover:bg-accent/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 md:gap-3 border border-accent/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 disabled:translate-x-[-100%]"></div>
                {isSubmitting ? (
                  <div className="relative z-10 flex items-center gap-2 md:gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin"></div>
                    <span className="text-xs md:text-base">Відправка...</span>
                  </div>
                ) : (
                  <>
                    <Icon name="PaperAirplaneIcon" size={18} className="md:w-6 md:h-6 relative z-10" />
                    <span className="relative z-10 text-xs md:text-base">ВІДПРАВИТИ ЗАЯВКУ</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-lg">
                  <p className="font-body text-sm text-success text-center">
                    Дякуємо за інтерес до партнерства! Наш менеджер зв'яжеться з вами протягом 24 годин.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-error/10 border border-error/30 rounded-lg">
                  <p className="font-body text-sm text-error text-center">
                    Помилка відправки форми. Будь ласка, спробуйте ще раз або зв'яжіться з нами безпосередньо.
                  </p>
                </div>
              )}

              <p className="font-body text-xs text-muted-foreground text-center mt-4">
                Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;