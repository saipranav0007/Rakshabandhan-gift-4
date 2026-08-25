import React from 'react';
import { Sparkles, School, Users, HeartHandshake, Dog, HelpCircle } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const STORY_PILLARS = [
  { name: 'School', icon: <School size={20} />, color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30', text: 'text-amber-300' },
  { name: 'Friends', icon: <Users size={20} />, color: 'from-rose-500/20 to-pink-500/20', border: 'border-rose-500/30', text: 'text-rose-300' },
  { name: 'Best friends', icon: <HeartHandshake size={20} />, color: 'from-fuchsia-500/20 to-purple-500/20', border: 'border-fuchsia-500/30', text: 'text-fuchsia-300' },
  { name: 'Dog', icon: <Dog size={20} />, color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', text: 'text-emerald-300' },
  { name: 'Random things', icon: <HelpCircle size={20} />, color: 'from-sky-500/20 to-indigo-500/20', border: 'border-sky-500/30', text: 'text-sky-300' },
];

export const StoriesVisualizer: React.FC = () => {
  const { playSfx } = useAudio();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-10 text-center">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/20">
            Chapter 01.5 • The Sibling Connection
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-amber-200">
            "Tell Annaya everything."
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            From the big updates to the smallest random thoughts throughout the day.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {STORY_PILLARS.map((pillar) => (
            <div
              key={pillar.name}
              onClick={() => playSfx('heart-pop')}
              className={`group flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r ${pillar.color} border ${pillar.border} shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition-all`}
            >
              <span className={pillar.text}>{pillar.icon}</span>
              <span className={`text-sm sm:text-base font-semibold ${pillar.text}`}>
                {pillar.name}
              </span>
            </div>
          ))}
        </div>

        <div className="glass-panel rounded-3xl p-8 space-y-4 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <p className="text-2xl sm:text-3xl font-display font-semibold text-white">
              "You tell me about your world."
            </p>
            <p className="text-2xl sm:text-3xl font-serif italic text-amber-300 font-medium">
              "And I listen."
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-neutral-400">
            <Sparkles size={14} className="text-amber-400" />
            <span>Always your personal audience, no matter how chaotic</span>
          </div>
        </div>
      </div>
    </section>
  );
};
