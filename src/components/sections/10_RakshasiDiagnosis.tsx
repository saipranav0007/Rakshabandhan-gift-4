import React from 'react';
import { Activity } from 'lucide-react';

const SYMPTOMS = [
  'Starts unnecessary fights',
  'Talks about school nonstop',
  'Talks about friends in immense detail',
  'Talks about her dog 24/7',
  'Annoys Annaya with 100% efficiency',
  'Makes Annaya continue the fight',
  'Somehow survives every single roast',
];

const TREATMENTS = [
  'Feed her food.',
  'Let her talk.',
  'Ignore the drama.',
  'Repeat daily. 😂',
];

export const RakshasiDiagnosis: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-widest">
            <Activity size={14} /> Chapter 05 • Sibling Behavioral Audit
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            "Okay... one serious concern about you."
          </h2>
          <div className="space-y-2">
            <p className="text-lg sm:text-xl font-serif italic text-neutral-300">
              Your mental condition...
            </p>
            <p className="text-3xl sm:text-4xl font-display font-black text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">
              "ABSOLUTELY QUESTIONABLE." 😂
            </p>
          </div>
        </div>

        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#1c1017] via-[#140b10] to-[#0d070b] border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-500/20 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                FACILITY DESIGNATION
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-cream">
                THE RAKSHASI SPECIAL CARE CENTER 😂
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-400 block">PATIENT FILE</span>
              <span className="text-sm font-mono font-bold text-rose-400">PATIENT: MANASU</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#23121b]/80 border border-rose-500/30">
            <span className="text-[10px] font-mono uppercase text-rose-400 block mb-1">
              RECORDED CONDITION:
            </span>
            <p className="font-display font-bold text-base sm:text-lg text-white">
              TOO MUCH RAKSHASI ENERGY ⚡
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-300/80 block">
              Observed Daily Symptoms:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SYMPTOMS.map((symp, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#11090d] border border-white/5 text-neutral-200">
                  <span className="text-amber-400">•</span>
                  <span>{symp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
              RECOMMENDED DAILY TREATMENT:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium text-cream">
              {TREATMENTS.map((treat, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#1a0e14] text-center border border-amber-500/10">
                  {treat}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/20 text-center space-y-2">
            <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
              Diagnosis complete.
            </p>
            <p className="text-xl sm:text-2xl font-display font-black text-rose-400">
              "Unfortunately... She's incurable." 😂❤️
            </p>
            <p className="text-sm font-serif italic text-amber-200 pt-2">
              "But honestly... that's exactly what makes you my Rakshasi."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
