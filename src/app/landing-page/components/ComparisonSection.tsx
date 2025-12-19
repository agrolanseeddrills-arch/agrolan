import Icon from '@/components/ui/AppIcon';

interface ComparisonItem {
  feature: string;
  svr1: string | boolean;
  imported: string | boolean;
  traditional: string | boolean;
}

const ComparisonSection = () => {
  const comparisons: ComparisonItem[] = [
    { feature: 'Ціна', svr1: '25 000 грн', imported: '80 000 - 120 000 грн', traditional: '15 000 грн' },
    { feature: 'Точність висіву', svr1: '98%', imported: '95-98%', traditional: '60-70%' },
    { feature: 'Виробництво', svr1: 'Україна', imported: 'Імпорт', traditional: 'Україна/Імпорт' },
    { feature: 'Комплектація дисків', svr1: true, imported: false, traditional: false },
    { feature: 'Акумулятор в комплекті', svr1: true, imported: false, traditional: false },
    { feature: 'Гарантія', svr1: '2 роки', imported: '1 рік', traditional: '6 місяців' },
    { feature: 'Запчастини в Україні', svr1: true, imported: false, traditional: true },
    { feature: 'Швидка доставка', svr1: '1-3 дні', imported: '2-4 тижні', traditional: '1-2 тижні' },
    { feature: 'Технічна підтримка', svr1: 'Українською', imported: 'Через перекладача', traditional: 'Обмежена' },
    { feature: 'Навчання роботі', svr1: true, imported: false, traditional: false },
    { feature: 'Окупність', svr1: '1 сезон', imported: '2-3 сезони', traditional: 'Не окупається' },
    { feature: 'Економія насіння', svr1: 'До 40%', imported: 'До 35%', traditional: '0%' }
  ];

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="CheckCircleIcon" size={24} className="text-success mx-auto" />
      ) : (
        <Icon name="XCircleIcon" size={24} className="text-destructive mx-auto" />
      );
    }
    return <span className="font-body text-sm text-foreground">{value}</span>;
  };

  return (
    <section id="comparison-section" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-secondary/30 mb-6">
            <Icon name="ScaleIcon" size={20} className="text-secondary" />
            <span className="font-body font-semibold text-sm text-secondary">ПОРІВНЯННЯ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            SVR1 vs Імпортні vs Традиційні сівачі
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Детальне порівняння характеристик та переваг різних типів обладнання
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-form overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-muted">
                  <th className="px-6 py-4 text-left font-headline font-bold text-base text-foreground">
                    Характеристика
                  </th>
                  <th className="px-6 py-4 text-center font-headline font-bold text-base text-success bg-success/10">
                    SVR1 Agrolan
                  </th>
                  <th className="px-6 py-4 text-center font-headline font-bold text-base text-foreground">
                    Імпортні
                  </th>
                  <th className="px-6 py-4 text-center font-headline font-bold text-base text-foreground">
                    Традиційні
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    <td className="px-6 py-4 font-body font-semibold text-sm text-foreground">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center bg-success/5">
                      {renderValue(item.svr1)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderValue(item.imported)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderValue(item.traditional)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-card p-6 rounded-xl shadow-form text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TrophyIcon" size={32} className="text-success" />
            </div>
            <h3 className="font-headline font-bold text-base md:text-lg text-foreground mb-2">Найкраща ціна</h3>
            <p className="font-body text-sm text-muted-foreground">
              SVR1 на 70% дешевший за імпортні аналоги при однаковій якості висіву
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-form text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ShieldCheckIcon" size={32} className="text-primary" />
            </div>
            <h3 className="font-headline font-bold text-base md:text-lg text-foreground mb-2">Українська якість</h3>
            <p className="font-body text-sm text-muted-foreground">
              Виробництво в Україні гарантує швидку доставку та доступність запчастин
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-form text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="RocketLaunchIcon" size={32} className="text-accent" />
            </div>
            <h3 className="font-headline font-bold text-base md:text-lg text-foreground mb-2">Швидка окупність</h3>
            <p className="font-body text-sm text-muted-foreground">
              Окупається за перший сезон завдяки економії насіння та збільшенню врожаю
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;