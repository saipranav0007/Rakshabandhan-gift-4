import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Camera } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { usePhotos } from '../../context/PhotoContext';

interface FinalHighlightProps {
  onRestart: () => void;
}

export const FinalHighlight: React.FC<FinalHighlightProps> = ({ onRestart }) => {
  const { playSfx } = useAudio();
  const { photos } = usePhotos();

  const finalPhoto = photos[5];

  const triggerCelebration = () => {
    playSfx('confetti');
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#ffffff'],
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 py-20 text-center select-none bg-[#0a0708]">
      <div className="max-w-3xl w-full mx-auto space-y-12">
        <div className="space-y-6">
          <p className="text-xl sm:text-2xl font-mono uppercase tracking-[0.25em] text-neutral-400">
            NO MATTER WHAT HAPPENS...
          </p>

          <h1 className="text-4xl sm:text-7xl font-display font-black text-amber-300 drop-shadow-[0_0_40px_rgba(245,158,11,0.5)]">
            I'LL ALWAYS BE YOUR ANNAYA. ❤️
          </h1>

          <div className="p-6 rounded-3xl bg-[#170e13]/80 border border-rose-500/30 space-y-3 max-w-xl mx-auto shadow-2xl">
            <p className="text-lg sm:text-xl font-serif italic text-neutral-300">
              "Even if you start the fight."
            </p>
            <p className="text-xl sm:text-2xl font-serif italic text-rose-400 font-semibold">
              "And I continue it." 😂
            </p>
            <div className="pt-2 border-t border-white/10">
              <p className="text-sm font-mono uppercase tracking-widest text-amber-300">
                That's never going to change.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-3xl sm:text-5xl font-display font-black text-rose-500 tracking-wider">
              HAPPY RAKSHA BANDHAN, RAKSHASI.
            </h2>
          </div>
        </div>

        <div className="max-w-md mx-auto rounded-3xl p-5 bg-[#140e12] border border-amber-500/30 shadow-2xl text-left space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0c080a] border border-white/5 flex items-center justify-center">
            {finalPhoto?.imageUrl ? (
              <img
                src={finalPhoto.imageUrl}
                alt="One last memory"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 text-neutral-500">
                <Camera size={32} />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                  {finalPhoto?.placeholderPrompt || 'FINAL PHOTO'}
                </span>
                <span className="text-xs text-neutral-400">
                  {finalPhoto?.caption || 'Add the final photo.'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1 text-center">
            <p className="font-serif italic text-lg text-amber-200">
              "One last memory."
            </p>
            <p className="text-sm text-neutral-300">
              Until our next fight. 😂❤️
            </p>
            <p className="text-sm font-mono text-rose-400 font-bold pt-1">
              — Annaya
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <button
            onClick={triggerCelebration}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles size={16} /> Celebrate Rakhi 🎉
          </button>

          <button
            onClick={() => {
              playSfx('click');
              onRestart();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#181014] border border-white/10 hover:border-amber-500/40 text-neutral-300 font-semibold text-sm hover:scale-105 transition-transform"
          >
            <RotateCcw size={16} /> Replay Experience
          </button>
        </div>
      </div>
    </section>
  );
};
