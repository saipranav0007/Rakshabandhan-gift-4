import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Dog, GraduationCap, Users, Clock, HelpCircle } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface StoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  punchline: string;
}

const STORIES: StoryCard[] = [
  {
    id: 'school',
    title: 'SCHOOL STORY',
    subtitle: 'Daily Briefing',
    icon: <GraduationCap size={24} className="text-amber-400" />,
    punchline: 'Every single drama that occurred between 8 AM and 3 PM.',
  },
  {
    id: 'friend',
    title: 'FRIEND STORY',
    subtitle: 'Friendship Chronicle',
    icon: <Users size={24} className="text-rose-400" />,
    punchline: 'Who said what, why they said it, and why Annaya needs to know immediately.',
  },
  {
    id: 'best-friend',
    title: 'BEST FRIEND STORY',
    subtitle: 'VIP Updates',
    icon: <MessageCircle size={24} className="text-pink-400" />,
    punchline: 'Exclusive deep-lore that requires 45 minutes of detailed narration.',
  },
  {
    id: 'dog',
    title: 'DOG STORY',
    subtitle: 'Canine Adventures',
    icon: <Dog size={24} className="text-amber-300" />,
    punchline: 'Every cute, funny, or chaotic thing her dog did today.',
  },
  {
    id: 'random',
    title: 'RANDOM STORY',
    subtitle: 'Unfiltered Thoughts',
    icon: <HelpCircle size={24} className="text-indigo-400" />,
    punchline: 'Thoughts with zero context that suddenly become top priority.',
  },
  {
    id: 'waited',
    title: 'SOMETHING THAT COULD HAVE WAITED',
    subtitle: 'Urgent Non-Emergency',
    icon: <Clock size={24} className="text-red-400" />,
    punchline: 'Could have waited 5 business days... but told immediately anyway. 😂',
  },
];

export const StoryMachine: React.FC = () => {
  const { playSfx } = useAudio();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    playSfx('card-flip');
    setRevealed(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-3xl w-full mx-auto space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Chapter 01 • The Daily Broadcast
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-cream">
            The Story Machine
          </h2>
          <p className="text-lg sm:text-xl font-serif italic text-amber-300">
            "Things I know I'll hear from you..."
          </p>
          <p className="text-xs text-neutral-400 font-mono">
            (Tap each card to inspect the daily incoming transmissions)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {STORIES.map(card => {
            const isFlipped = !!revealed[card.id];
            return (
              <div
                key={card.id}
                onClick={() => toggleCard(card.id)}
                className={`relative min-h-[170px] rounded-2xl p-5 cursor-pointer transition-all duration-500 border ${
                  isFlipped
                    ? 'bg-gradient-to-br from-[#23151c] to-[#160d12] border-amber-400/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'bg-[#140d10] border-amber-500/20 hover:border-amber-500/40 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-black/40 border border-white/5">
                    {card.icon}
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    isFlipped ? 'bg-amber-500 text-black font-bold' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {isFlipped ? 'DELIVERED' : 'TAP TO READ'}
                  </span>
                </div>

                <h3 className="font-display font-bold text-sm text-cream tracking-wide">
                  {card.title}
                </h3>
                <p className="text-[11px] font-mono text-amber-400/80 mb-2">
                  {card.subtitle}
                </p>

                {isFlipped ? (
                  <p className="text-xs text-neutral-200 leading-relaxed font-light mt-2 animate-fade-in">
                    {card.punchline}
                  </p>
                ) : (
                  <p className="text-xs text-neutral-500 italic mt-2">
                    Incoming broadcast pending from Rakshasi...
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="glass-gold rounded-2xl p-6 space-y-3 max-w-xl mx-auto border border-amber-500/40 shadow-xl">
          <div className="flex items-center justify-center gap-2 text-amber-300 font-semibold text-lg">
            <CheckCircle2 size={20} className="text-amber-400" />
            <span>Annaya has received the complete report. 😂</span>
          </div>

          <div className="pt-2 border-t border-amber-500/20 space-y-1">
            <p className="text-sm font-serif italic text-neutral-300">
              "And somehow..."
            </p>
            <p className="text-base font-serif italic text-rose-300 font-medium">
              "I still listen."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
