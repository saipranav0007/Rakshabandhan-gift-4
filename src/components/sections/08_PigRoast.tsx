import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const TITLES = [
  { rank: '01', name: 'MANASU', badge: 'Legal Identity', icon: '✨', bg: 'border-amber-500/30' },
  { rank: '02', name: 'RAKSHASI', badge: 'Combat Alias', icon: '😈', bg: 'border-rose-500/40' },
  { rank: '03', name: 'PIG 🐷', badge: 'Supreme Crown', icon: '👑', bg: 'border-pink-500/50 shadow-[0_0_30px_rgba(244,114,182,0.3)]' },
];

export const PigRoast: React.FC = () => {
  const { playSfx, setMood } = useAudio();
  const [revealIndex, setRevealIndex] = useState(0);

  const nextTitle = () => {
    if (revealIndex < TITLES.length) {
      playSfx('boing-roast');
      setRevealIndex(prev => prev + 1);
      if (revealIndex === 1) setMood('roast');
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-mono uppercase tracking-widest">
            <Award size={14} /> Chapter 04 • Official Honours
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            "Let's discuss your official titles."
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            Awarded by the Highest Authority (Annaya)
          </p>
        </div>

        <div className="space-y-4">
          {TITLES.slice(0, Math.max(1, revealIndex)).map((title) => (
            <div
              key={title.name}
              className={`rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#1c1017] to-[#120a0e] border ${title.bg} transition-all duration-500 flex items-center justify-between shadow-xl animate-fade-in`}
            >
              <div className="flex items-center gap-4 text-left">
                <span className="font-mono text-xs text-neutral-500">{title.rank}</span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    {title.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-cream">
                    {title.name}
                  </h3>
                </div>
              </div>
              <span className="text-3xl">{title.icon}</span>
            </div>
          ))}
        </div>

        {revealIndex < TITLES.length ? (
          <button
            onClick={nextTitle}
            className="px-6 py-3 rounded-full bg-[#20121a] hover:bg-[#2c1824] border border-pink-500/40 text-pink-300 font-semibold text-sm shadow-md transition-all hover:scale-105"
          >
            Reveal Next Title ({revealIndex + 1}/3)
          </button>
        ) : (
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-pink-500/40 shadow-2xl animate-fade-in">
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">
              "Yes."
            </p>
            <p className="text-3xl sm:text-4xl font-display font-black text-pink-400 drop-shadow-[0_0_20px_rgba(244,114,182,0.4)]">
              "You're my pig." 🐷
            </p>
            <p className="text-lg font-serif italic text-amber-200">
              "Don't argue." 😂
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
