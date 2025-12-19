'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const ContactSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hectares: '',
    crop: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+380|380|0)?[0-9]{9}$/;
    const cleaned = phone.replace(/\s|-|\(|\)/g, '');
    return phoneRegex.test(cleaned);
  };

  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('380')) {
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
    }
    if (cleaned.startsWith('0')) {
      return `+380 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)}`;
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валідація
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Будь ласка, введіть ваше ім\'я';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Будь ласка, введіть номер телефону';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введіть коректний номер телефону';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Відправка через Next.js API route (напряму на Gmail)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          hectares: formData.hectares || 'Не вказано',
          crop: formData.crop || 'Не вказано',
          message: formData.message || 'Немає',
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка відправки форми');
      }
      
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', hectares: '', crop: '', message: '' });
      
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Очищаємо помилку при зміні поля
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  if (!isHydrated) {
    return (
      <section id="contact-section" className="py-16 md:py-24 bg-muted">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
              Замовити консультацію
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-section" className="py-16 md:py-24 bg-muted">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-primary/30 mb-6">
            <Icon name="PhoneIcon" size={20} className="text-primary" />
            <span className="font-body font-semibold text-sm text-primary">КОНТАКТИ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            Замовте безкоштовну консультацію та демонстрацію
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Наш спеціаліст зв'яжеться з вами протягом 15 хвилин та відповість на всі питання
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="glass-card p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/40">
              <h3 className="font-headline font-bold text-xl md:text-2xl text-foreground mb-4 md:mb-6">Контактна інформація</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="PhoneIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-base text-foreground mb-1">Телефон</p>
                    <a href="tel:+380673820518" className="font-body text-lg text-primary hover:underline">
                      +380 67 382 05 18
                    </a>
                    <p className="font-body text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="EnvelopeIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-base text-foreground mb-1">Email</p>
                    <a href="mailto:agrolan.seed.drills@gmail.com" className="font-body text-lg text-primary hover:underline">
                      agrolan.seed.drills@gmail.com
                    </a>
                    <p className="font-body text-sm text-muted-foreground">Відповідаємо протягом 2 годин</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPinIcon" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-base text-foreground mb-1">Адреса</p>
                    <p className="font-body text-base text-foreground">вул. Романа Шухевича, 41</p>
                    <p className="font-body text-base text-foreground">м. Хмельницький, 29001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-4 md:p-6 rounded-xl border border-white/40">
              <h4 className="font-headline font-bold text-base md:text-lg text-foreground mb-3 md:mb-4">Наші гарантії</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground">Безкоштовна демонстрація на вашому полі</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground">Гарантія 2 роки на всі компоненти</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground">30 днів на повернення коштів</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-foreground">Безкоштовна доставка по Україні</span>
                </li>
              </ul>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Agrolan Factory Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=49.4231,26.9871&z=14&output=embed"
                className="border-0"
              />
            </div>
          </div>

          <div className="glass-card p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/40">
            <h3 className="font-headline font-bold text-xl md:text-2xl text-foreground mb-4 md:mb-6">Форма зворотного зв'язку</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-success/10 border-2 border-success rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" />
                  <div>
                    <p className="font-body font-bold text-base text-success mb-1">Заявку відправлено!</p>
                    <p className="font-body text-sm text-foreground">
                      Дякуємо за звернення! Наш менеджер зв'яжеться з вами протягом 15 хвилин.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-error/10 border-2 border-error rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="XCircleIcon" size={24} className="text-error flex-shrink-0" />
                  <div>
                    <p className="font-body font-bold text-base text-error mb-1">Помилка відправки</p>
                    <p className="font-body text-sm text-foreground">
                      Будь ласка, спробуйте ще раз або зателефонуйте нам безпосередньо.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Ваше ім'я *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 bg-background border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-error focus:ring-error' : 'border-border focus:ring-primary'
                  }`}
                  placeholder="Іван Петренко"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <Icon name="ExclamationCircleIcon" size={16} />
                    {errors.name}
                  </p>
                )}
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
                  className={`w-full px-4 py-3 bg-background border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-error focus:ring-error' : 'border-border focus:ring-primary'
                  }`}
                  placeholder="+380 67 382 05 18"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-error flex items-center gap-1">
                    <Icon name="ExclamationCircleIcon" size={16} />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Площа господарства (га)
                </label>
                <input
                  type="number"
                  name="hectares"
                  value={formData.hectares}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Які культури вирощуєте?
                </label>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Оберіть культуру</option>
                  <option value="vegetables">Овочі</option>
                  <option value="melons">Баштанні</option>
                  <option value="specialty">Спеціальні культури</option>
                  <option value="mixed">Різні культури</option>
                </select>
              </div>

              <div>
                <label className="block font-body font-semibold text-sm text-foreground mb-2">
                  Коментар
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Розкажіть про ваші потреби..."
                />
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
                    <span className="text-xs md:text-base">ВІДПРАВЛЯЄТЬСЯ...</span>
                  </div>
                ) : (
                  <div className="relative z-10 flex items-center gap-2 md:gap-3">
                    <Icon name="PaperAirplaneIcon" size={18} className="md:w-6 md:h-6" />
                    <span className="text-xs md:text-base">ВІДПРАВИТИ ЗАЯВКУ</span>
                  </div>
                )}
              </button>

              <p className="font-body text-xs text-muted-foreground text-center">
                Натискаючи кнопку, ви погоджуєтесь з <a href="#" className="text-primary hover:underline">політикою конфіденційності</a>
              </p>
            </form>

            <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success">
              <div className="flex items-start gap-3">
                <Icon name="ClockIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-body font-semibold text-sm text-success mb-1">Швидка відповідь</p>
                  <p className="font-body text-xs text-muted-foreground">
                    Наш менеджер зв'яжеться з вами протягом 15 хвилин у робочий час
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;