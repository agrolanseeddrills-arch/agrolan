'use client';

import Icon from '@/components/ui/AppIcon';

interface PartnershipToggleProps {
  isPartnerMode: boolean;
  onToggle: () => void;
}

const PartnershipToggle = ({ isPartnerMode, onToggle }: PartnershipToggleProps) => {
  return (
    <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
      <button
        onClick={() => !isPartnerMode && onToggle()}
        className={`px-4 py-2 font-cta font-bold text-sm rounded-md transition-all duration-250 ease-out flex items-center gap-2 ${
          !isPartnerMode
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Режим для фермерів"
        aria-pressed={!isPartnerMode}
      >
        <Icon name="UserIcon" size={16} />
        <span className="hidden sm:inline">Фермерам</span>
      </button>
      
      <button
        onClick={() => isPartnerMode && onToggle()}
        className={`px-4 py-2 font-cta font-bold text-sm rounded-md transition-all duration-250 ease-out flex items-center gap-2 ${
          isPartnerMode
            ? 'bg-secondary text-secondary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label="Режим для партнерів"
        aria-pressed={isPartnerMode}
      >
        <Icon name="BriefcaseIcon" size={16} />
        <span className="hidden sm:inline">Партнерам</span>
      </button>
    </div>
  );
};

export default PartnershipToggle;