import React, { useState } from 'react';
import { MessageSquareHeart, Lock } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const TeluguRoast: React.FC = () => {
  const { playSfx } = useAudio();
  const [step, setStep] = useState(1);

  const nextStep = () => {
    playSfx('boing-roast');
    setStep(prev => Math.min(3, prev + 1));
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
            <MessageSquareHeart size={14} /> Telugu Family Special Roast
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-amber-200">
            "One thing I need to tell you..."
          </h2>
          <p className="text-xs text-neutral-400 font-mono">
            Direct inside quote from Annaya's archive
          </p>
        </div>

        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#21121b] via-[#160b12] to-[#0c070a] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative overflow-hidden text-center space-y-6">
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl font-serif italic text-neutral-200 leading-relaxed">
              "Prathi kukka ki oka roju vastundhi..."
            </p>

            {step >= 2 && (
              <p className="text-xl sm:text-2xl font-serif italic text-rose-400 font-semibold animate-fade-in">
                "...niku tappa..."
              </p>
            )}

            {step >= 3 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-400/30 animate-fade-in shadow-lg">
                <p className="text-2xl sm:text-3xl font-display font-black text-amber-300">
                  "enduku antey nuvvu pandhvi eyy." 😂
                </p>
              </div>
            )}
          </div>

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono uppercase tracking-wider transition-all"
            >
              Continue Quote...
            </button>
          ) : (
            <div className="pt-4 border-t border-amber-500/20 flex items-center justify-center gap-2 text-xs font-mono text-neutral-400 animate-fade-in">
              <Lock size={12} className="text-amber-400" />
              <span>Only your Annaya is allowed to say this. 😂</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
