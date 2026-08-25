import React from 'react';
import { useAudio } from '../../context/AudioContext';

const SUPPORT_FLOWS = [
  { trigger: 'WHEN YOU NEED TO TALK', response: 'ANNAYA', highlight: false },
  { trigger: 'WHEN YOU HAVE A SCHOOL STORY', response: 'ANNAYA', highlight: false },
  { trigger: 'WHEN YOU HAVE A FRIEND STORY', response: 'ANNAYA', highlight: false },
  { trigger: 'WHEN SOMETHING HAPPENS WITH YOUR DOG', response: 'ANNAYA', highlight: false },
  { trigger: 'WHEN YOU WANT TO FIGHT', response: 'ANNAYA 😂', highlight: true },
];

export const SupportSection: React.FC = () => {
  const { playSfx } = useAudio();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Support Protocol
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            "Your 24/7 Designated Contact"
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            No matter the situation or topic
          </p>
        </div>

        <div className="space-y-3">
          {SUPPORT_FLOWS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => playSfx('heart-pop')}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left cursor-pointer hover:scale-[1.02] ${
                item.highlight
                  ? 'bg-gradient-to-r from-rose-950/60 to-[#190d14] border-rose-500/40 shadow-lg shadow-rose-950/30'
                  : 'bg-[#150d11]/80 border-amber-500/20 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs sm:text-sm text-neutral-300 font-semibold tracking-wide">
                  {item.trigger}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-neutral-500 font-mono">➔</span>
                <span className={`font-display font-black text-base sm:text-lg ${
                  item.highlight ? 'text-rose-400' : 'text-amber-300'
                }`}>
                  {item.response}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-gold rounded-3xl p-6 sm:p-8 space-y-2 border border-amber-500/30 shadow-2xl max-w-xl mx-auto">
          <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Basically...
          </p>
          <p className="text-2xl sm:text-3xl font-display font-black text-amber-200">
            "You can always come to me." ❤️
          </p>
        </div>
      </div>
    </section>
  );
};
