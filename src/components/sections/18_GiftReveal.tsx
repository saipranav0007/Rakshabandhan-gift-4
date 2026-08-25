import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface GiftRevealProps {
  onOpenPromise: () => void;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ onOpenPromise }) => {
  const { playSfx, setMood } = useAudio();

  const handleOpen = () => {
    playSfx('envelope-open');
    setMood('promise');
    onOpenPromise();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center">
      <div className="max-w-xl w-full mx-auto space-y-8 select-none">
        <div className="space-y-4">
          <p className="text-xl sm:text-2xl font-serif italic text-neutral-300">
            "I could have given you a normal gift."
          </p>
          <p className="text-2xl sm:text-3xl font-display font-bold text-amber-300">
            "But... You already know me." 😂
          </p>
          <div className="pt-2">
            <p className="text-lg sm:text-xl font-light text-neutral-300">
              So I decided to give you something that doesn't need money.
            </p>
            <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-rose-400 mt-2">
              "A promise."
            </h3>
          </div>
        </div>

        <div className="relative py-4 flex flex-col items-center justify-center">
          <div
            onClick={handleOpen}
            className="group relative w-64 h-44 sm:w-80 sm:h-52 rounded-3xl bg-gradient-to-br from-[#2a1720] via-[#1c0f16] to-[#120a0e] border-2 border-amber-400/50 shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 hover:border-amber-300"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-rose-900 border-2 border-amber-300 shadow-xl flex items-center justify-center text-amber-200 group-hover:scale-110 transition-transform">
              <Heart size={28} className="fill-amber-300 text-amber-300" />
            </div>

            <span className="font-mono text-xs text-amber-300 uppercase tracking-widest mt-4">
              To: Rakshasi • From: Annaya
            </span>
          </div>

          <div className="pt-8">
            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white font-semibold text-lg tracking-wide shadow-xl shadow-rose-950/50 hover:brightness-110 transition-all hover:scale-105"
            >
              <Mail size={20} />
              <span>OPEN MY PROMISE</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
