import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface HeroIntroductionProps {
  onNext: () => void;
}

export const HeroIntroduction: React.FC<HeroIntroductionProps> = ({ onNext }) => {
  const { playSfx } = useAudio();

  const handleStart = () => {
    playSfx('click');
    onNext();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <span>Special Edition</span>
            <span>•</span>
            <span>Raksha Bandhan 2024</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-white">
            MANASU
          </h2>
          
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-rose-500/50" />
            <span className="text-2xl sm:text-3xl font-display font-black text-rose-500 tracking-wider">
              RAKSHASI
            </span>
            <span className="h-px w-12 bg-rose-500/50" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-amber-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10 text-rose-500 pointer-events-none">
            <Flame size={120} />
          </div>

          <p className="text-lg sm:text-xl font-light text-neutral-300">
            My little sister.
          </p>

          <p className="text-xl sm:text-2xl font-serif italic text-rose-400 font-semibold">
            My professional headache.
          </p>

          <div className="py-2">
            <p className="text-2xl sm:text-3xl font-display font-bold text-amber-300 flex items-center justify-center gap-2">
              <span>My favourite little Rakshasi.</span>
              <span className="text-xl">😂❤️</span>
            </p>
          </div>

          <div className="pt-3 border-t border-amber-500/20">
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Let's go through some of the reasons you are impossible.
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={handleStart}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#181014] border border-amber-500/40 hover:border-amber-400 text-amber-200 font-semibold text-base shadow-lg hover:shadow-amber-500/20 transition-all hover:scale-105"
          >
            <span>START INSPECTION</span>
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
