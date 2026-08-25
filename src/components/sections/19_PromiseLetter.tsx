import React, { useEffect, useState } from 'react';
import { Heart, Feather } from 'lucide-react';

const PROMISE_PARAGRAPHS = [
  "No matter what happens,",
  "I promise I will always be there for you.",
  "You can fight with me.",
  "You can get angry with me.",
  "You can start the fight...",
  "and I'll probably continue it. 😂",
  "But whenever you need me,",
  "I'll be there.",
  "You can tell me about your school.",
  "Your friends.",
  "Your dog.",
  "Your random stories.",
  "Your problems.",
  "Whatever it is.",
  "You don't have to think twice before coming to me.",
  "No matter what happens,",
  "I'll always have your back.",
  "That's my promise to you, Rakshasi. ❤️",
  "— Your Annaya"
];

export const PromiseLetter: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(PROMISE_PARAGRAPHS.length);

  useEffect(() => {
    setVisibleCount(3);
    const interval = setInterval(() => {
      setVisibleCount(prev => {
        if (prev < PROMISE_PARAGRAPHS.length) {
          return prev + 2;
        }
        clearInterval(interval);
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 py-16">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center select-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase">
          <Feather size={14} /> Brother's Handwritten Vow
        </div>

        <div className="parchment-bg rounded-3xl p-6 sm:p-12 border-2 border-amber-500/40 shadow-[0_0_80px_rgba(245,158,11,0.15)] text-left relative overflow-hidden">
          <div className="absolute right-6 bottom-6 opacity-5 pointer-events-none text-rose-500">
            <Heart size={220} />
          </div>

          <div className="space-y-4 text-cream relative z-10 font-sans text-base sm:text-xl font-light leading-relaxed">
            {PROMISE_PARAGRAPHS.map((line, idx) => {
              if (idx >= visibleCount) return null;

              const isFunny = line.includes('continue it') || line.includes('😂');
              const isSign = line.includes('— Your Annaya');
              const isTitle = line.includes("That's my promise to you, Rakshasi");

              return (
                <p
                  key={idx}
                  className={`transition-all duration-700 animate-fade-in ${
                    isSign
                      ? 'pt-6 font-serif italic text-2xl sm:text-3xl text-amber-300 font-bold text-right'
                      : isTitle
                      ? 'pt-4 text-xl sm:text-2xl font-serif italic text-rose-400 font-semibold'
                      : isFunny
                      ? 'text-amber-200 font-normal'
                      : 'text-neutral-200'
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
