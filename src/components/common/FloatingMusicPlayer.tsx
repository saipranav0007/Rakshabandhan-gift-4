import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Settings, X, Check } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const FloatingMusicPlayer: React.FC = () => {
  const { isMuted, volume, currentMood, toggleMute, setVolume, setCustomAudioUrl, customAudioUrl, playSfx } = useAudio();
  const [showConfig, setShowConfig] = useState(false);
  const [inputUrl, setInputUrl] = useState(customAudioUrl || '');

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('click');
    setCustomAudioUrl(inputUrl.trim() ? inputUrl.trim() : null);
    setShowConfig(false);
  };

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case 'intro': return 'Ambient Cinematic';
      case 'story': return 'Warm & Nostalgic';
      case 'ghost': return 'Playful Spooky';
      case 'fights': return 'Chaotic Comedy';
      case 'roast': return 'Playful Teasing';
      case 'food': return 'Soft Emotional';
      case 'appreciation': return 'Warm Bond';
      case 'rakhi': return 'Sacred Festive';
      case 'promise': return 'Emotional Promise';
      case 'final': return 'Celebration';
      default: return 'Synthesizer';
    }
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Main Audio Pill */}
        <div className="flex items-center gap-2 bg-[#140e11]/85 border border-amber-500/30 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-xs transition-all hover:border-amber-400">
          <button
            onClick={() => {
              playSfx('click');
              toggleMute();
            }}
            className="text-amber-400 hover:text-amber-300 transition-colors p-1"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Equalizer animation */}
          <div className="flex items-end gap-0.5 h-3.5 px-1">
            <span className={`w-0.5 bg-rose-400 rounded-full transition-all duration-300 ${!isMuted ? 'animate-[bounce_0.8s_infinite] h-3' : 'h-1 opacity-40'}`} />
            <span className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${!isMuted ? 'animate-[bounce_1.2s_infinite] h-3.5' : 'h-1.5 opacity-40'}`} />
            <span className={`w-0.5 bg-amber-300 rounded-full transition-all duration-300 ${!isMuted ? 'animate-[bounce_0.6s_infinite] h-2' : 'h-1 opacity-40'}`} />
          </div>

          <span className="hidden sm:inline-block font-mono text-[11px] text-amber-200/80 max-w-[110px] truncate">
            {customAudioUrl ? 'Custom Audio' : getMoodLabel(currentMood)}
          </span>

          {/* Settings button */}
          <button
            onClick={() => {
              playSfx('click');
              setShowConfig(true);
            }}
            className="text-neutral-400 hover:text-amber-200 transition-colors p-1"
            title="Audio Options & Custom Track"
            aria-label="Audio Options"
          >
            <Settings size={13} />
          </button>
        </div>
      </div>

      {/* Audio Config Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181115] border border-amber-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl text-cream">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 font-medium">
                <Music size={18} />
                <span>Audio & Music Settings</span>
              </div>
              <button
                onClick={() => setShowConfig(false)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close settings"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1.5">
                  Volume ({Math.round(volume * 100)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#24171d]/80 border border-amber-500/20">
                <p className="text-xs text-amber-200/90 font-medium mb-1">
                  🎵 Active Mode: {customAudioUrl ? 'Custom Audio URL' : 'Dynamic Synthesizer'}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  The website dynamically modulates background harmonies and sound effects to match each scene (Spooky ghost bells, funny buzzers, warm acoustic pads, sacred diya chimes).
                </p>
              </div>

              <form onSubmit={handleSaveCustom} className="space-y-2">
                <label className="block text-xs uppercase tracking-wider text-amber-300/80">
                  Custom Audio URL (Optional MP3 / Audio Stream)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/your-song.mp3"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full bg-[#0e0a0c] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
                <div className="flex gap-2 justify-end pt-2">
                  {customAudioUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setInputUrl('');
                        setCustomAudioUrl(null);
                        setShowConfig(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
                    >
                      Reset to Synth
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-xs font-medium text-white hover:brightness-110 shadow-md"
                  >
                    <Check size={14} /> Save Audio
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
