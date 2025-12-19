'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  platform: 'youtube' | 'tiktok';
}

interface VideoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  videos: Video[];
  initialVideoId?: string;
}

const VideoGalleryModal = ({ isOpen, onClose, videos, initialVideoId }: VideoGalleryModalProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (initialVideoId) {
      const index = videos.findIndex(v => v.id === initialVideoId);
      if (index !== -1) {
        setCurrentVideoIndex(index);
      }
    }
  }, [initialVideoId, videos]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsPlaying(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  const handleShare = () => {
    const currentVideo = videos[currentVideoIndex];
    if (navigator.share) {
      navigator.share({
        title: currentVideo.title,
        url: currentVideo.url,
      });
    } else {
      navigator.clipboard.writeText(currentVideo.url);
      alert('Посилання скопійовано в буфер обміну');
    }
  };

  if (!isOpen) return null;

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-accent transition-colors z-10"
        aria-label="Закрити відео галерею"
      >
        <Icon name="XMarkIcon" size={32} />
      </button>

      <div className="w-full h-full md:w-[90vw] md:h-[90vh] flex flex-col md:flex-row gap-4 p-4 md:p-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {currentVideo.platform === 'youtube' ? (
                <iframe
                  src={`${currentVideo.url}${isPlaying ? '?autoplay=1' : ''}`}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={currentVideo.url}
                  controls
                  autoPlay={isPlaying}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 px-2">
            <button
              onClick={handlePrevious}
              className="p-2 text-white hover:text-accent transition-colors"
              aria-label="Попереднє відео"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>

            <div className="flex-1 text-center">
              <h3 className="font-headline font-bold text-lg text-white mb-1">{currentVideo.title}</h3>
              <p className="font-body text-sm text-white/70">
                {currentVideoIndex + 1} з {videos.length} • {currentVideo.duration}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="p-2 text-white hover:text-accent transition-colors"
              aria-label="Наступне відео"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleShare}
              className="px-4 py-2 font-cta font-bold text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-250 ease-out flex items-center gap-2"
              aria-label="Поділитися відео"
            >
              <Icon name="ShareIcon" size={18} />
              <span>Поділитися</span>
            </button>
          </div>
        </div>

        <div className="md:w-80 overflow-y-auto">
          <h4 className="font-headline font-bold text-base text-white mb-4 px-2">Плейлист ({videos.length})</h4>
          <div className="space-y-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                className={`w-full p-3 rounded-lg transition-all duration-250 ease-out flex gap-3 ${
                  index === currentVideoIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                aria-label={`Відтворити ${video.title}`}
              >
                <div className="relative w-20 h-14 flex-shrink-0 bg-black rounded overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="PlayIcon" size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body font-semibold text-sm line-clamp-2 mb-1">{video.title}</p>
                  <p className="font-body text-xs opacity-70">{video.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGalleryModal;