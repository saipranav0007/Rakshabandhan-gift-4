import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const RakhiCeremony: React.FC = () => {
  const { playSfx, setMood } = useAudio();
  const [diyaLit, setDiyaLit] = useState(false);
  const [rakhiTied, setRakhiTied] = useState(false);

  const handleLightDiya = () => {
    if (!diyaLit) {
      playSfx('diya-light');
      setDiyaLit(true);
    }
  };

  const handleTieRakhi = () => {
    if (!rakhiTied) {
      playSfx('rakhi-tie');
      setMood('rakhi');
      setRakhiTied(true);

      const end = Date.now() + 2.5 * 1000;
      const colors = ['#f59e0b', '#fbbf24', '#f43f5e', '#e11d48', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 py-16">
      <div className="max-w-2xl w-full mx-auto space-y-10 text-center select-none">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-500/30">
            Sacred Tradition
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            The Rakhi Ceremony
          </h2>
          <p className="text-sm text-neutral-300 font-light">
            A sacred thread of lifelong protection, endless fights, and unconditional love.
          </p>
        </div>

        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#1c1015] via-[#12090e] to-[#0a0608] border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
              STEP 1: LIGHT THE HOLY DIYA
            </span>

            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleLightDiya}
                className="relative group p-6 rounded-full bg-[#180e13] border border-amber-500/30 hover:border-amber-400 transition-all hover:scale-110"
              >
                {diyaLit && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-12 diya-flame rounded-full animate-diya" />
                )}
                <div className={`text-4xl transition-all ${diyaLit ? 'text-amber-400 scale-110 drop-shadow-[0_0_20px_rgba(245,158,11,0.8)]' : 'text-neutral-600'}`}>
                  🪔
                </div>
              </button>

              <p className="text-xs font-mono text-neutral-400 mt-3">
                {diyaLit ? '✨ Holy Diya is burning bright' : 'Tap the Diya to ignite the warm flame'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-500/20 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400">
              STEP 2: TIE THE SACRED RAKHI
            </span>

            <div className="relative py-4 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center w-full max-w-sm">
                <div className={`h-1.5 flex-1 bg-gradient-to-r from-transparent via-rose-500 to-amber-500 rounded-full transition-all duration-700 ${rakhiTied ? 'shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'opacity-40'}`} />

                <div
                  onClick={handleTieRakhi}
                  className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 p-1.5 flex items-center justify-center cursor-pointer transition-all duration-700 ${
                    rakhiTied
                      ? 'bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-400 border-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.8)] scale-110 animate-pulse'
                      : 'bg-[#1e1117] border-amber-500/40 hover:border-amber-400 hover:scale-105'
                  }`}
                >
                  <div className="w-full h-full rounded-full border border-amber-300/40 flex flex-col items-center justify-center text-center p-2 bg-[#12090d]/80">
                    <span className="text-2xl sm:text-3xl">🪢</span>
                    <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-tighter mt-0.5">
                      {rakhiTied ? 'TIED ❤️' : 'TAP TO TIE'}
                    </span>
                  </div>
                </div>

                <div className={`h-1.5 flex-1 bg-gradient-to-l from-transparent via-rose-500 to-amber-500 rounded-full transition-all duration-700 ${rakhiTied ? 'shadow-[0_0_15px_rgba(244,63,94,0.8)]' : 'opacity-40'}`} />
              </div>
            </div>

            {rakhiTied && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/15 to-amber-500/10 border border-amber-500/40 space-y-2 animate-fade-in">
                <div className="flex items-center justify-center gap-2 text-amber-300 font-display font-bold text-xl">
                  <CheckCircle2 size={22} className="text-amber-400" />
                  <span>Rakhi Tied Successfully!</span>
                </div>
                <p className="text-sm font-serif italic text-neutral-200">
                  "May this sacred thread protect you, guide you, and keep our bond unbreakable forever."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
