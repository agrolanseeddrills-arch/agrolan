'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const faqs: FAQ[] = [
    {
      question: 'Чи підходить SVR1 для моїх культур?',
      answer: 'SVR1 універсальний і працює з 15+ типами культур: овочі (морква, буряк, цибуля, редис), баштанні (кавун, диня, гарбуз), спеціальні культури (соняшник, кукурудза, соя) та зелень. У комплекті 6 дисків для різних розмірів насіння.'
    },
    {
      question: 'Яка точність висіву SVR1?',
      answer: 'SVR1 забезпечує точність висіву 98%, що відповідає рівню дорогих імпортних аналогів. Вакуумна технологія гарантує, що кожне насіння потрапляє точно на своє місце з заданою відстанню.'
    },
    {
      question: 'Чи потрібен трактор для роботи SVR1?',
      answer: 'Ні, SVR1 працює від акумуляторної батареї, яка входить у комплект. Повного заряду вистачає на 8 годин безперервної роботи. Це робить сівач ідеальним для невеликих та середніх господарств.'
    },
    {
      question: 'Яка гарантія на обладнання?',
      answer: 'На SVR1 надається гарантія 2 роки на всі компоненти. Також ми пропонуємо 30-денний період повернення коштів, якщо обладнання вас не влаштує. Всі запчастини доступні в Україні.'
    },
    {
      question: 'Скільки часу займає доставка?',
      answer: 'Доставка по Україні займає 1-3 робочі дні. Доставка безкоштовна. При замовленні ви отримаєте трек-номер для відстеження посилки.'
    },
    {
      question: 'Чи складно навчитися працювати з SVR1?',
      answer: 'SVR1 дуже простий у використанні. При доставці наш спеціаліст проведе безкоштовну демонстрацію та навчання прямо на вашому полі. Також ви отримаєте детальну інструкцію українською мовою.'
    },
    {
      question: 'Як швидко окупиться інвестиція?',
      answer: 'SVR1 окупається за перший сезон завдяки економії насіння (до 40%), зменшенню витрат на робочу силу та збільшенню врожайності (до 30%). Для господарства 100 га економія складає близько 200 000 грн за сезон.'
    },
    {
      question: 'Чи можна купити SVR1 в кредит?',
      answer: 'Так, ми працюємо з провідними банками України та пропонуємо програми кредитування на вигідних умовах. Також доступна розстрочка платежу. Зв\'яжіться з нами для детальної консультації.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!isHydrated) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
              Часті питання
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-primary/30 mb-6">
            <Icon name="QuestionMarkCircleIcon" size={20} className="text-primary" />
            <span className="font-body font-semibold text-sm text-primary">FAQ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            Часті питання про SVR1
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Відповіді на найпопулярніші питання про вакуумний сівач Agrolan
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card rounded-xl shadow-form overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-muted transition-colors duration-250"
                aria-expanded={openIndex === index}
              >
                <span className="font-headline font-bold text-base md:text-lg text-foreground">
                  {faq.question}
                </span>
                <Icon
                  name="ChevronDownIcon"
                  size={24}
                  className={`text-primary flex-shrink-0 transition-transform duration-250 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-body text-base text-muted-foreground mb-4">
            Не знайшли відповідь на своє питання?
          </p>
          <a
            href="tel:+380673820518"
            className="group relative px-6 py-3 font-cta font-bold text-sm bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 overflow-hidden max-w-fit mx-auto"
            aria-label="Зателефонувати"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Icon name="PhoneIcon" size={18} className="relative z-10" />
            <span className="relative z-10">+380 67 382 05 18</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;