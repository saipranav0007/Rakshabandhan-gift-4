import React, { useEffect, useState } from 'react';
import { Utensils } from 'lucide-react';

export const FoodMemory: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3600),
      setTimeout(() => setStep(4), 5000),
      setTimeout(() => setStep(5), 6500),
      setTimeout(() => setStep(6), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 bg-[#090608]/90">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full mx-auto space-y-8 relative z-10 text-cream select-none">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300">
          <Utensils size={24} />
        </div>

        {step >= 1 && (
          <p className="text-xl sm:text-2xl font-serif italic text-neutral-300 transition-all duration-1000">
            "One of my favourite memories with you..."
          </p>
        )}

        {step >= 2 && (
          <p className="text-lg sm:text-xl font-light text-neutral-400 transition-all duration-1000">
            It's actually something very simple.
          </p>
        )}

        {step >= 3 && (
          <div className="py-2 transition-all duration-1000">
            <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-amber-300 drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              "I fed you food once."
            </h3>
          </div>
        )}

        {step >= 4 && (
          <p className="text-base sm:text-lg font-mono text-neutral-400 uppercase tracking-widest transition-all duration-700">
            That's it.
          </p>
        )}

        {step >= 5 && (
          <div className="p-6 rounded-3xl bg-[#170e13]/70 border border-amber-500/20 space-y-3 transition-all duration-1000 shadow-xl">
            <p className="text-xl sm:text-2xl font-serif italic text-rose-300">
              "But somehow... It became one of my favourite memories with you."
            </p>
          </div>
        )}

        {step >= 6 && (
          <div className="space-y-2 pt-4 transition-all duration-1000 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <p>"Maybe because the best memories aren't always big."</p>
            <p className="text-amber-200 font-serif italic font-medium">
              "They're just small moments with the people who matter."
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
