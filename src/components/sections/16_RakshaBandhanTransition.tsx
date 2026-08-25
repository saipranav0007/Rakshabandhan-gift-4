import React from 'react';
import { useAudio } from '../../context/AudioContext';

export const RakshaBandhanTransition: React.FC = () => {
  const { playSfx } = useAudio();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 bg-gradient-to-b from-[#0a0708] via-[#12080e] to-[#0a0708]">
      <div className="max-w-2xl w-full mx-auto space-y-8 select-none">
        <div className="space-y-4 text-lg sm:text-2xl font-serif italic text-neutral-300">
          <p>We fight.</p>
          <p className="text-amber-300">You start it.</p>
          <p className="text-rose-300">I continue it.</p>
          <p>We roast each other.</p>
          <p className="text-amber-200">You tell me everything.</p>
        </div>

        <div className="py-6 space-y-4">
          <p className="text-2xl sm:text-3xl font-display font-semibold text-white leading-relaxed">
            "And somehow..."
          </p>
          <p className="text-2xl sm:text-4xl font-display font-extrabold text-amber-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            "You are still one of the people I care about the most."
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-amber-500/20">
          <p className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-neutral-400">
            That's what being siblings is.
          </p>

          <div
            onClick={() => playSfx('rakhi-tie')}
            className="inline-block p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 border border-amber-400/50 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
          >
            <h2 className="text-3xl sm:text-5xl font-display font-black text-cream tracking-wide">
              HAPPY RAKSHA BANDHAN, RAKSHASI ❤️
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
