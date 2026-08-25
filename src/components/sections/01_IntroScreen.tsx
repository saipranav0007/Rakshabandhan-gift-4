import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const { playSfx, unlockAudio, setMood } = useAudio();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cinematic timed sequence
    const timers = [
      setTimeout(() => setStep(1), 600),   // "RAKSHASI..."
      setTimeout(() => setStep(2), 2200),  // "Yes."
      setTimeout(() => setStep(3), 3600),  // "This is for you."
      setTimeout(() => setStep(4), 5200),  // "And before you start complaining..."
      setTimeout(() => setStep(5), 7000),  // "I know you're going to say something. 😂"
      setTimeout(() => setStep(6), 8800),  // "Come on." + Button
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnterClick = () => {
    unlockAudio();
    playSfx('click');
    setMood('intro');
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0708] flex flex-col items-center justify-center p-6 text-cream select-none overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-rose-950/20 via-amber-950/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-7 relative z-10">
        {step >= 1 && (
          <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-rose-400/90 block mb-2">
              Calling Callsign
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-black tracking-wider text-rose-500 drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]">
              RAKSHASI...
            </h1>
          </div>
        )}

        {step >= 2 && (
          <p className="text-xl sm:text-2xl font-light text-neutral-300 transition-all duration-700">
            Yes.
          </p>
        )}

        {step >= 3 && (
          <p className="text-xl sm:text-2xl font-serif italic text-amber-200 transition-all duration-700">
            This is for you.
          </p>
        )}

        {step >= 4 && (
          <p className="text-lg sm:text-xl text-neutral-300 font-light transition-all duration-700">
            And before you start complaining...
          </p>
        )}

        {step >= 5 && (
          <div className="p-4 rounded-2xl bg-[#170e12]/80 border border-rose-500/30 shadow-xl transition-all duration-700">
            <p className="text-lg sm:text-xl font-medium text-amber-300">
              I know you're going to say something. 😂
            </p>
          </div>
        )}

        {step >= 6 && (
          <div className="pt-6 space-y-4 transition-all duration-700 animate-fade-in">
            <p className="text-sm font-mono tracking-widest text-neutral-400 uppercase">
              Come on.
            </p>
            <button
              onClick={handleEnterClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-[length:200%_auto] hover:bg-right transition-all duration-500 text-white font-semibold text-lg tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] hover:scale-105 active:scale-95"
            >
              <Sparkles size={20} className="text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>ENTER EXPERIENCE</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-neutral-500 font-mono">
              (Tap button to enable sound & music)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
