import React, { useState } from 'react';
import { Ghost, Eye, ShieldCheck, Play, RotateCcw } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const GhostGame: React.FC = () => {
  const { playSfx, setMood } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [ghostFound, setGhostFound] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [ghostTileIndex, setGhostTileIndex] = useState(4);

  const startMiniGame = () => {
    playSfx('click');
    setMood('ghost');
    setIsPlaying(true);
    setGhostFound(false);
    setAttempts(0);
    setGhostTileIndex(Math.floor(Math.random() * 9));
  };

  const handleTileClick = (idx: number) => {
    if (ghostFound) return;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (idx === ghostTileIndex || nextAttempts >= 3) {
      playSfx('spooky-reveal');
      setGhostFound(true);
    } else {
      playSfx('click');
    }
  };

  const handleReset = () => {
    startMiniGame();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-widest">
            <Ghost size={14} className="animate-bounce" /> Chapter 02 • Sibling Flashback
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            "Do you remember the ghost game?"
          </h2>
          <p className="text-xl sm:text-2xl font-serif italic text-amber-300">
            "Why did we actually think this was a good idea?" 😂
          </p>
          <p className="text-xs text-neutral-400 font-mono">
            Played in the dark with our partner... pure chaotic courage.
          </p>
        </div>

        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#15101a] via-[#0d0a12] to-[#07050a] border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.15)] overflow-hidden">
          {!isPlaying ? (
            <div className="py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 animate-pulse">
                <Ghost size={40} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-serif italic text-neutral-300">
                  Do you dare replay the memory?
                </p>
                <p className="text-xs text-neutral-500">
                  Search the dark room to uncover the friendly spooky spirit
                </p>
              </div>
              <button
                onClick={startMiniGame}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg shadow-indigo-950/60 transition-all hover:scale-105"
              >
                <Play size={18} /> PLAY GHOST GAME
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-300/80 px-2">
                <span className="flex items-center gap-1.5">
                  <Eye size={14} /> Tap around in the dark...
                </span>
                <span>Attempts: {attempts}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-xs sm:max-w-sm mx-auto">
                {Array.from({ length: 9 }).map((_, idx) => {
                  const isGhostHere = ghostFound && (idx === ghostTileIndex || attempts >= 3);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleTileClick(idx)}
                      disabled={ghostFound}
                      className={`h-24 sm:h-28 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center relative overflow-hidden ${
                        isGhostHere
                          ? 'bg-indigo-900/60 border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.5)] scale-105'
                          : 'bg-[#100b14] border-indigo-500/20 hover:border-indigo-400/50 hover:bg-[#1a1222]'
                      }`}
                    >
                      {isGhostHere ? (
                        <div className="flex flex-col items-center animate-bounce">
                          <Ghost size={36} className="text-indigo-200 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                          <span className="text-[10px] font-mono text-indigo-200 mt-1 uppercase font-bold">
                            BOO! 👻
                          </span>
                        </div>
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/20 group-hover:bg-indigo-400/50" />
                      )}
                    </button>
                  );
                })}
              </div>

              {ghostFound && (
                <div className="p-5 rounded-2xl bg-indigo-950/50 border border-indigo-400/40 space-y-3 animate-fade-in">
                  <div className="space-y-1">
                    <p className="text-2xl font-display font-black text-indigo-300">
                      FOUND IT. 👻
                    </p>
                    <p className="text-base font-serif italic text-amber-200">
                      "Just like we somehow survived that game." 😂
                    </p>
                  </div>

                  <div className="pt-2 border-t border-indigo-500/20 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <ShieldCheck size={14} /> Memory unlocked
                    </span>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
                    >
                      <RotateCcw size={12} /> Play Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
