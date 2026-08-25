import React, { useState } from 'react';
import { ChevronUp, ChevronDown, List, X, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface NavigationStepperProps {
  currentSection: number;
  totalSections: number;
  sectionTitles: string[];
  onNavigate: (index: number) => void;
}

export const NavigationStepper: React.FC<NavigationStepperProps> = ({
  currentSection,
  totalSections,
  sectionTitles,
  onNavigate,
}) => {
  const { playSfx } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const handleJump = (idx: number) => {
    playSfx('click');
    onNavigate(idx);
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      playSfx('click');
      onNavigate(currentSection + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      playSfx('click');
      onNavigate(currentSection - 1);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-[#140e11]/85 border border-amber-500/30 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl text-cream">
        <button
          onClick={handlePrev}
          disabled={currentSection === 0}
          className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          title="Previous Chapter"
          aria-label="Previous Chapter"
        >
          <ChevronUp size={18} />
        </button>

        <button
          onClick={() => {
            playSfx('click');
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-white/5 transition-all text-xs font-mono text-amber-300"
        >
          <span>{currentSection + 1}/{totalSections}</span>
          <span className="hidden sm:inline-block max-w-[150px] truncate text-neutral-300">
            {sectionTitles[currentSection]}
          </span>
          <List size={14} className="text-amber-400" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentSection === totalSections - 1}
          className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          title="Next Chapter"
          aria-label="Next Chapter"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#171015] border border-amber-500/30 rounded-3xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl text-cream">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-300 font-display font-bold">
                <Sparkles size={18} />
                <span>Story Chapters</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close chapter menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto py-3 space-y-1.5 custom-scrollbar pr-1 mt-2">
              {sectionTitles.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJump(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs sm:text-sm ${
                    currentSection === idx
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                      : 'hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-neutral-500">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{title}</span>
                  </div>
                  {currentSection === idx && (
                    <span className="text-amber-400 font-mono text-[10px] uppercase">
                      Current
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
