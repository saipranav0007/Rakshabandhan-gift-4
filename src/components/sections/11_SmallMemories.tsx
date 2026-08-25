import React from 'react';
import { Utensils, Ghost, BookOpen, Users, Dog, Swords, MessageSquare } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const MEMORIES = [
  { title: 'THE GHOST GAME', icon: <Ghost size={20} className="text-indigo-300" />, sub: 'The suspense in the dark' },
  { title: 'SCHOOL STORIES', icon: <BookOpen size={20} className="text-amber-300" />, sub: 'Every single daily detail' },
  { title: 'FRIEND STORIES', icon: <Users size={20} className="text-rose-300" />, sub: 'The drama and the laughs' },
  { title: 'DOG STORIES', icon: <Dog size={20} className="text-emerald-300" />, sub: 'Pure canine chaos' },
  { title: 'OUR FIGHTS', icon: <Swords size={20} className="text-pink-300" />, sub: 'Starting it, continuing it' },
  { title: 'THE RANDOM ROASTS', icon: <MessageSquare size={20} className="text-purple-300" />, sub: 'Our inside jokes' },
  { title: 'FEEDING YOU FOOD', icon: <Utensils size={20} className="text-amber-400" />, sub: 'One quiet simple moment' },
];

export const SmallMemories: React.FC = () => {
  const { playSfx } = useAudio();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-3xl w-full mx-auto space-y-10 text-center">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Chapter 06 • The Slow Down
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-cream">
            "Some memories don't need to be huge."
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            The collection of little pieces that make up our bond.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {MEMORIES.map((m, idx) => (
            <div
              key={m.title}
              onClick={() => playSfx('chime-soft')}
              className={`p-5 rounded-2xl bg-gradient-to-br from-[#1b1116]/80 to-[#120a0e]/80 border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:border-amber-400/50 ${
                idx === MEMORIES.length - 1
                  ? 'sm:col-span-2 md:col-span-3 border-amber-500/40 bg-gradient-to-r from-[#24131c] via-[#1c0f16] to-[#120a0e]'
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                  {m.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-cream">{m.title}</h3>
                  <p className="text-xs text-neutral-400">{m.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-gold rounded-3xl p-6 sm:p-8 space-y-2 border border-amber-500/30 shadow-2xl max-w-xl mx-auto">
          <p className="text-xl sm:text-2xl font-serif italic text-amber-200 font-medium">
            "Sometimes the smallest moments become the ones you remember."
          </p>
        </div>
      </div>
    </section>
  );
};
