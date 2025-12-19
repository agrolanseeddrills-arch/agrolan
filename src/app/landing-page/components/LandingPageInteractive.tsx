'use client';

import { useState, useEffect } from 'react';
import SectionNavigation from '@/components/common/SectionNavigation';
import CallToActionBar from '@/components/common/CallToActionBar';
import VideoGalleryModal from '@/components/common/VideoGalleryModal';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import FeaturesSection from './FeaturesSection';
import ComparisonSection from './ComparisonSection';
import TestimonialsSection from './TestimonialsSection';
import PartnershipSection from './PartnershipSection';
import ContactSection from './ContactSection';
import FAQSection from './FAQSection';
import FooterSection from './FooterSection';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  platform: 'youtube' | 'tiktok';
}

const LandingPageInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPartnerMode, setIsPartnerMode] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const videos: Video[] = [
  {
    id: 'video1',
    title: 'SVR1 в дії - Демонстрація висіву моркви',
    thumbnail: "https://images.unsplash.com/photo-1727002667328-0fd177581268",
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:45',
    platform: 'youtube'
  },
  {
    id: 'video2',
    title: 'Порівняння точності висіву SVR1 vs традиційний',
    thumbnail: "https://images.unsplash.com/photo-1727002667328-0fd177581268",
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:20',
    platform: 'youtube'
  },
  {
    id: 'video3',
    title: 'Відгук фермера - Результати після сезону',
    thumbnail: "https://images.unsplash.com/photo-1727002667328-0fd177581268",
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '4:15',
    platform: 'youtube'
  }];


  const handleConsultationClick = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePurchaseClick = () => {
    alert('Дякуємо за інтерес! Наш менеджер зв\'яжеться з вами для оформлення замовлення.');
  };

  const handleVideoClick = () => {
    setIsVideoModalOpen(true);
  };

  const handlePartnerToggle = () => {
    setIsPartnerMode(!isPartnerMode);
    if (!isPartnerMode) {
      const partnershipSection = document.getElementById('partnership-section');
      if (partnershipSection) {
        partnershipSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-body text-lg text-muted-foreground">Завантаження...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <SectionNavigation
        isPartnerMode={isPartnerMode}
        onPartnerToggle={handlePartnerToggle} />

      
      <main>
        <HeroSection
          onConsultationClick={handleConsultationClick}
          onVideoClick={handleVideoClick} />

        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PartnershipSection />
        <ContactSection />
        <FAQSection />
      </main>

      <FooterSection />

      <CallToActionBar
        onConsultationClick={handleConsultationClick}
        onPurchaseClick={handlePurchaseClick} />


      <VideoGalleryModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={videos} />

    </div>);

};

export default LandingPageInteractive;