import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const SolutionSection = () => {
  return (
    <section id="features-section" className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-success/30 mb-6">
            <Icon name="CheckCircleIcon" size={20} className="text-success" />
            <span className="font-body font-semibold text-sm text-success">РІШЕННЯ</span>
          </div>
          <h2 className="font-headline font-bold text-3xl md:text-4xl text-foreground mb-4">
            SVR1 Agrolan - Українська якість за доступною ціною
          </h2>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Вакуумна технологія забезпечує точність висіву 98% без необхідності в дорогому імпортному обладнанні
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-destructive/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-warning/20 rounded-full blur-2xl"></div>
            <div className="relative bg-card p-8 rounded-2xl shadow-form">
              <div className="mb-6">
                <h3 className="font-headline font-bold text-xl md:text-2xl text-destructive mb-4">Традиційний висів</h3>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_193186677-1765964200656.png"
                    alt="Traditional broadcasting seeding method showing uneven seed distribution in agricultural field"
                    className="w-full h-full object-cover" />

                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Icon name="XCircleIcon" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Перевитрата насіння до 40%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircleIcon" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Нерівномірні сходи та густота</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircleIcon" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Необхідність ручного прорідження</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="XCircleIcon" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Зниження врожайності до 25%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-success/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="relative bg-card p-8 rounded-2xl shadow-form border-2 border-success">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-headline font-bold text-xl md:text-2xl text-success">Вакуумний висів SVR1</h3>
                  <Icon name="CheckBadgeIcon" size={28} className="text-success" />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_13096ad7f-1765964202131.png"
                    alt="Precision vacuum seeding with SVR1 showing uniform seed placement in rows on agricultural field"
                    className="w-full h-full object-cover" />

                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Точність висіву 98% - кожне насіння на місці</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Рівномірні сходи та оптимальна густота</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Економія насіння до 40% за сезон</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-foreground">Збільшення врожайності до 30%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 rounded-2xl">
          <h3 className="font-headline font-bold text-xl md:text-2xl text-foreground mb-6 md:mb-8 text-center">
            Як працює вакуумна технологія SVR1
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-form text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-headline font-bold text-lg text-primary-foreground">1</span>
                </div>
              </div>
              <h4 className="font-headline font-bold text-base md:text-lg text-foreground mb-2 md:mb-3">Вакуумний захват</h4>
              <p className="font-body text-sm text-muted-foreground">
                Насіння захоплюється вакуумом через спеціальні отвори в диску, забезпечуючи точний підбір кожного насіння
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-form text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-headline font-bold text-lg text-primary-foreground">2</span>
                </div>
              </div>
              <h4 className="font-headline font-bold text-lg text-foreground mb-3">Точне позиціювання</h4>
              <p className="font-body text-sm text-muted-foreground">
                Диск обертається з постійною швидкістю, розміщуючи насіння на заданій відстані одне від одного
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-form text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-headline font-bold text-lg text-primary-foreground">3</span>
                </div>
              </div>
              <h4 className="font-headline font-bold text-lg text-foreground mb-3">Контрольований висів</h4>
              <p className="font-body text-sm text-muted-foreground">
                Насіння відпускається в борозну на точній глибині, забезпечуючи оптимальні умови для проростання
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default SolutionSection;