import React, { useState } from 'react';
import { Swords, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const FIGHT_STEPS = [
  { step: 1, text: 'She starts something.', sub: 'A provocative remark or sudden complaint.' },
  { step: 2, text: 'She starts the fight.', sub: 'Full argument activated.' },
  { step: 3, text: 'I could stop.', sub: 'The logical mature 18-year-old option.' },
  { step: 4, text: "I don't.", sub: 'Self-control: 0%.' },
  { step: 5, text: 'I continue the fight.', sub: 'Annaya counter-offensive deployed.' },
  { step: 6, text: "Now we're both annoyed.", sub: 'Maximum mutual irritation achieved.' },
  { step: 7, text: 'Nobody remembers how it started.', sub: 'Original topic completely lost to history.' },
];

export const FightMachine: React.FC = () => {
  const { playSfx, setMood } = useAudio();
  const [selectedInitiator, setSelectedInitiator] = useState<'me' | 'her' | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const handleChoose = (choice: 'me' | 'her') => {
    if (choice === 'me') {
      playSfx('buzzer-wrong');
      setSelectedInitiator('me');
    } else {
      playSfx('bell-correct');
      setMood('fights');
      setSelectedInitiator('her');
      startSimulation();
    }
  };

  const startSimulation = () => {
    setActiveStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < FIGHT_STEPS.length) {
        playSfx('card-flip');
        setActiveStepIndex(current);
      } else {
        clearInterval(interval);
      }
    }, 700);
  };

  const restartFight = () => {
    playSfx('boing-roast');
    startSimulation();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-widest">
            <Swords size={14} /> Chapter 03 • The Conflict Algorithm
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            "Now let's discuss our fights."
          </h2>
          <p className="text-xl sm:text-2xl font-serif italic text-amber-300">
            Who starts them?
          </p>
        </div>

        {selectedInitiator !== 'her' ? (
          <div className="glass-panel rounded-3xl p-8 space-y-6 border border-rose-500/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleChoose('me')}
                className="w-full sm:w-48 py-4 px-6 rounded-2xl bg-[#1a0f14] border border-neutral-700 hover:border-neutral-500 text-neutral-300 font-bold text-lg hover:scale-105 transition-all"
              >
                ME (Annaya)
              </button>

              <span className="text-xs font-mono text-neutral-500 uppercase">VS</span>

              <button
                onClick={() => handleChoose('her')}
                className="w-full sm:w-48 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-lg shadow-lg shadow-rose-900/40 hover:scale-105 transition-all"
              >
                HER (Rakshasi) 😈
              </button>
            </div>

            {selectedInitiator === 'me' && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-center gap-2 text-rose-300 text-sm font-semibold animate-shake">
                <XCircle size={18} />
                <span>Wrong answer! Who are you kidding? Tap HER. 😂</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center gap-2 text-amber-300 font-semibold text-xl">
              <CheckCircle size={22} className="text-amber-400" />
              <span>"Obviously." 😂</span>
            </div>

            <div className="space-y-2.5 max-w-xl mx-auto text-left">
              {FIGHT_STEPS.map((item, idx) => {
                const isActive = idx <= activeStepIndex;
                const isCurrent = idx === activeStepIndex;

                return (
                  <div
                    key={item.step}
                    className={`p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isActive
                        ? isCurrent
                          ? 'bg-rose-900/50 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)] scale-[1.02]'
                          : 'bg-[#180e14] border-amber-500/20 text-neutral-200'
                        : 'bg-[#0f090c] border-white/5 opacity-40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                        isActive ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-neutral-400'
                      }`}>
                        {item.step}
                      </span>
                      <div>
                        <p className="font-semibold text-sm text-cream">{item.text}</p>
                        <p className="text-[11px] text-neutral-400">{item.sub}</p>
                      </div>
                    </div>

                    {isCurrent && (
                      <span className="text-xs font-mono text-rose-400 font-bold uppercase animate-pulse">
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {activeStepIndex >= FIGHT_STEPS.length - 1 && (
              <div className="glass-gold rounded-2xl p-6 space-y-4 max-w-xl mx-auto border border-amber-500/40 shadow-2xl animate-fade-in">
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl font-display font-black text-amber-300">
                    "Classic Annaya + Rakshasi behaviour." 😂
                  </p>
                  <p className="text-xs font-mono text-neutral-300">
                    And somehow we are completely normal again later.
                  </p>
                </div>

                <button
                  onClick={restartFight}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#24131b] hover:bg-[#321a25] border border-rose-500/40 text-rose-300 text-sm font-semibold hover:scale-105 transition-transform"
                >
                  <RotateCcw size={15} /> START ANOTHER FIGHT
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
