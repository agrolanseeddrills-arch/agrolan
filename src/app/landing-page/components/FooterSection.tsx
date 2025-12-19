import Icon from '@/components/ui/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-headline font-bold text-xl">Agrolan</span>
            </div>
            <p className="font-body text-sm text-background/70 mb-4">
              Українське виробництво професійного сільськогосподарського обладнання
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" aria-label="Facebook">
                <Icon name="ShareIcon" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" aria-label="Instagram">
                <Icon name="CameraIcon" size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors" aria-label="YouTube">
                <Icon name="PlayIcon" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-headline font-bold text-base mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon name="PhoneIcon" size={16} className="flex-shrink-0 mt-0.5" />
                <a href="tel:+380673820518" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                  +380 67 382 05 18
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="EnvelopeIcon" size={16} className="flex-shrink-0 mt-0.5" />
                <a href="mailto:agrolan.seed.drills@gmail.com" className="font-body text-sm text-background/70 hover:text-background transition-colors">
                  agrolan.seed.drills@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPinIcon" size={16} className="flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-background/70">
                  вул. Романа Шухевича, 41<br />м. Хмельницький, 29001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="font-body text-sm text-background/70">
              &copy; {currentYear} Agrolan. Всі права захищені.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;