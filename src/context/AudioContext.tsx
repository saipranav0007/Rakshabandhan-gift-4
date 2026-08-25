import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngine';
import type { BgmMood, SoundEffectType } from '../types';

interface AudioContextType {
  isMuted: boolean;
  volume: number;
  currentMood: BgmMood;
  customAudioUrl: string | null;
  toggleMute: () => void;
  setVolume: (val: number) => void;
  setMood: (mood: BgmMood) => void;
  playSfx: (type: SoundEffectType) => void;
  setCustomAudioUrl: (url: string | null) => void;
  unlockAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.65);
  const [currentMood, setCurrentMood] = useState<BgmMood>('intro');
  const [customAudioUrl, setCustomAudioUrlState] = useState<string | null>(null);

  useEffect(() => {
    const savedMute = localStorage.getItem('rakshasi_audio_muted');
    if (savedMute !== null) {
      const muted = savedMute === 'true';
      setIsMuted(muted);
      audioEngine.setMute(muted);
    }
  }, []);

  const unlockAudio = () => {
    audioEngine.unlock();
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioEngine.setMute(newMuted);
    localStorage.setItem('rakshasi_audio_muted', String(newMuted));
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    audioEngine.setVolume(val);
  };

  const setMood = (mood: BgmMood) => {
    setCurrentMood(mood);
    audioEngine.playMoodBgm(mood);
  };

  const playSfx = (type: SoundEffectType) => {
    audioEngine.playSfx(type);
  };

  const setCustomAudioUrl = (url: string | null) => {
    setCustomAudioUrlState(url);
    audioEngine.setCustomAudioUrl(url);
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        volume,
        currentMood,
        customAudioUrl,
        toggleMute,
        setVolume,
        setMood,
        playSfx,
        setCustomAudioUrl,
        unlockAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
