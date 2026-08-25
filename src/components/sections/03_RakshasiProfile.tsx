import React from 'react';
import { ShieldAlert, Heart, Swords, MessageSquare, Flame, UserCheck } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

interface RakshasiProfileProps {
  onNext?: () => void;
}

export const RakshasiProfile: React.FC<RakshasiProfileProps> = () => {
  const { playSfx } = useAudio();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <div className="max-w-xl w-full mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-400 text-xs font-mono uppercase tracking-widest">
            <ShieldAlert size={14} /> Security Clearance: Classified Sibling Dossier
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-amber-300 tracking-wide">
            THE OFFICIAL RAKSHASI PROFILE
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            ID: RAK-2024-MANASU // AGE: 15 // STATUS: ACTIVE HEADACHE
          </p>
        </div>

        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#1b1116] via-[#140c10] to-[#0c080a] border border-amber-500/30 shadow-[0_0_50px_rgba(244,63,94,0.15)] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="flex items-center justify-between pb-6 border-b border-amber-500/20 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-amber-400/40 flex flex-col items-center justify-center relative shadow-inner">
                <span className="text-3xl sm:text-4xl">😈</span>
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-rose-600 text-[10px] font-bold text-white uppercase tracking-wider">
                  LVL 15
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
                  Target Identity
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  MANASU
                </h3>
                <p className="text-xs font-mono text-rose-400 font-semibold">
                  CALLSIGN: "RAKSHASI" 😈
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-400 block">BROTHER DESIGNATION</span>
              <span className="text-lg sm:text-xl font-display font-bold text-amber-300">
                Annaya (18)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-xs sm:text-sm border-b border-amber-500/20 relative z-10">
            <div className="space-y-1 p-3 rounded-xl bg-[#1b1016]/60 border border-amber-500/10">
              <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                <UserCheck size={12} className="text-amber-400" /> RELATION
              </span>
              <p className="font-semibold text-cream">Younger Sister</p>
            </div>

            <div className="space-y-1 p-3 rounded-xl bg-[#1b1016]/60 border border-amber-500/10">
              <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                <Flame size={12} className="text-rose-400" /> CALLS HER BROTHER
              </span>
              <p className="font-semibold text-amber-300">Annaya</p>
            </div>

            <div className="space-y-1 p-3 rounded-xl bg-[#1b1016]/60 border border-rose-500/20">
              <span className="text-[10px] font-mono uppercase text-rose-400 flex items-center gap-1.5">
                <Swords size={12} /> SPECIALITY
              </span>
              <p className="font-semibold text-rose-300">Starting fights</p>
            </div>

            <div className="space-y-1 p-3 rounded-xl bg-[#1b1016]/60 border border-amber-500/20">
              <span className="text-[10px] font-mono uppercase text-amber-400 flex items-center gap-1.5">
                <Swords size={12} /> SECONDARY SPECIALITY
              </span>
              <p className="font-semibold text-amber-200">Making Annaya continue them</p>
            </div>
          </div>

          <div className="py-5 space-y-3 relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
              <MessageSquare size={12} className="text-amber-400" /> NOTABLE SKILLS & PROTOCOLS
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#140b10] border border-amber-500/10 text-neutral-200">
                • School stories
              </div>
              <div className="p-2.5 rounded-lg bg-[#140b10] border border-amber-500/10 text-neutral-200">
                • Friend stories
              </div>
              <div className="p-2.5 rounded-lg bg-[#140b10] border border-amber-500/10 text-neutral-200">
                • Dog stories
              </div>
              <div className="p-2.5 rounded-lg bg-[#140b10] border border-rose-500/20 text-rose-300 font-medium">
                • Annoying Annaya 😂
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/20 grid grid-cols-2 gap-4 relative z-10">
            <div
              onClick={() => playSfx('boing-roast')}
              className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 block mb-1">
                THREAT LEVEL
              </span>
              <span className="text-xl sm:text-2xl font-black text-rose-400">
                HIGH 😂
              </span>
            </div>

            <div
              onClick={() => playSfx('heart-pop')}
              className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                HEART
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                <span>SOFT</span>
                <Heart size={18} className="fill-rose-500 text-rose-500 inline animate-pulse" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
