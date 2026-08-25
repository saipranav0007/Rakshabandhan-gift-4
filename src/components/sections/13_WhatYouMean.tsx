import React from 'react';

export const WhatYouMean: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/20">
            Chapter 07 • Sibling Truth
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-light text-neutral-400">
            "Okay..."
          </h2>
          <h3 className="text-3xl sm:text-5xl font-display font-black text-amber-300">
            "Jokes apart."
          </h3>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-6 border border-amber-500/30 shadow-2xl relative text-left">
          <div className="space-y-3 text-base sm:text-lg text-cream font-light leading-relaxed">
            <p>You tell me about your world.</p>
            <p>You tell me about school.</p>
            <p>You tell me about your friends.</p>
            <p>You tell me about your dog.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1c0f16]/90 border border-rose-500/20 space-y-1.5 text-sm sm:text-base text-rose-300 font-medium">
            <p>We fight.</p>
            <p>You annoy me.</p>
            <p>I annoy you.</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-amber-500/20">
            <p className="text-2xl sm:text-3xl font-display font-bold text-white">
              "But you're still my little sister."
            </p>
            <p className="text-lg sm:text-xl font-serif italic text-amber-300 font-semibold">
              "And that means more than all the stupid fights."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
