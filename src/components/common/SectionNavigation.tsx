'use client';

import { useState, useEffect } from 'react';

import Icon from '@/components/ui/AppIcon';


interface NavigationItem {
  id: string;
  label: string;
  target: string;
  description: string;
}

interface SectionNavigationProps {
  isPartnerMode?: boolean;
  onPartnerToggle?: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'product', label: 'Продукт', target: '#hero-section', description: 'Огляд продукту та ціни' },
  { id: 'benefits', label: 'Переваги', target: '#features-section', description: 'Технічні переваги' },
  { id: 'comparison', label: 'Порівняння', target: '#comparison-section', description: 'Порівняння з імпортом' },
  { id: 'testimonials', label: 'Відгуки', target: '#testimonials-section', description: 'Відгуки клієнтів' },
  { id: 'partnership', label: 'Партнерство', target: '#partnership-section', description: 'Можливості партнерства' },
  { id: 'contacts', label: 'Контакти', target: '#contact-section', description: 'Зв\'язатися з нами' },
];

const SectionNavigation = ({ isPartnerMode = false, onPartnerToggle }: SectionNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('product');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.querySelector(item.target),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = (element as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false);
  };

  const handleCallClick = () => {
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      const offsetTop = (contactSection as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-card shadow-2xl border-b border-border' 
          : 'bg-card border-b border-border'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-6 bg-secondary rounded-full"></div>
                <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="font-headline font-bold text-xl text-foreground">Agrolan</h1>
              <p className="font-body text-xs text-muted-foreground">SVR1 Вакуумна Сівалка</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.target)}
                className={`px-4 py-2 font-body font-semibold text-sm transition-all duration-250 ease-out rounded-md ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
                aria-label={item.description}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onPartnerToggle}
              className={`group relative px-4 py-2 font-cta font-bold text-sm rounded-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl overflow-hidden ${
                isPartnerMode
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted-foreground/10'
              }`}
              aria-label="Перемкнути режим партнерства"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Icon name="BriefcaseIcon" size={16} className="inline mr-2 relative z-10" />
              <span className="relative z-10">Партнерам</span>
            </button>
            <button
              onClick={handleCallClick}
              className="group relative px-4 py-2 font-cta font-bold text-sm bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl shadow-cta overflow-hidden"
              aria-label="Зателефонувати"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Icon name="PhoneIcon" size={16} className="inline mr-2 relative z-10" />
              <span className="relative z-10">Зателефонувати</span>
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Відкрити меню"
            aria-expanded={isMenuOpen}
          >
            <Icon name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-card shadow-form border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.target)}
                  className={`w-full text-left px-4 py-3 font-body font-semibold text-sm rounded-md transition-all duration-250 ease-out ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                  }`}
                  aria-label={item.description}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2 border-t border-border">
                <button
                  onClick={onPartnerToggle}
                  className={`group relative w-full px-4 py-3 font-cta font-bold text-sm rounded-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl overflow-hidden ${
                    isPartnerMode
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                  aria-label="Перемкнути режим партнерства"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Icon name="BriefcaseIcon" size={16} className="inline mr-2 relative z-10" />
                  <span className="relative z-10">Партнерам</span>
                </button>
                <button
                  onClick={handleCallClick}
                  className="group relative block w-full px-4 py-3 font-cta font-bold text-sm bg-accent text-accent-foreground rounded-md text-center shadow-cta hover:bg-accent/90 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl overflow-hidden"
                  aria-label="Зателефонувати"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Icon name="PhoneIcon" size={16} className="inline mr-2 relative z-10" />
                  <span className="relative z-10">Зателефонувати</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default SectionNavigation;