import type { SoundEffectType, BgmMood } from '../types';

class WebAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;
  private currentBgmNodes: {
    oscillators: OscillatorNode[];
    gains: GainNode[];
    masterGain: GainNode;
    intervalId?: number;
  } | null = null;
  private currentMood: BgmMood = 'silent';
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public unlock() {
    this.initCtx();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.currentBgmNodes) {
      this.currentBgmNodes.masterGain.gain.setValueAtTime(
        muted ? 0 : this.volume,
        this.ctx?.currentTime || 0
      );
    }
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentBgmNodes && !this.isMuted && this.ctx) {
      this.currentBgmNodes.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setCustomAudioUrl(url: string | null) {
    this.customAudioUrl = url;
    if (url) {
      this.stopBgm();
      if (!this.customAudio) {
        this.customAudio = new Audio(url);
        this.customAudio.loop = true;
      } else {
        this.customAudio.src = url;
      }
      this.customAudio.volume = this.volume;
      this.customAudio.muted = this.isMuted;
      this.customAudio.play().catch(() => {});
    } else {
      if (this.customAudio) {
        this.customAudio.pause();
        this.customAudio = null;
      }
      this.playMoodBgm(this.currentMood);
    }
  }

  // Play rich synthesized sound effects
  public playSfx(type: SoundEffectType) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (type) {
      case 'click': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
        gain.gain.setValueAtTime(this.volume * 0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
        break;
      }
      case 'card-flip': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(250, t);
        osc.frequency.exponentialRampToValueAtTime(750, t + 0.12);
        gain.gain.setValueAtTime(this.volume * 0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
        break;
      }
      case 'buzzer-wrong': {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(140, t);
        osc2.frequency.setValueAtTime(148, t);
        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.setValueAtTime(this.volume * 0.5, t + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);
        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.35);
        osc2.stop(t + 0.35);
        break;
      }
      case 'bell-correct': {
        [1046.5, 1567.98].forEach((freq, i) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + i * 0.08);
          gain.gain.setValueAtTime(this.volume * 0.45, t + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + i * 0.08);
          osc.stop(t + i * 0.08 + 0.6);
        });
        break;
      }
      case 'boing-roast': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, t);
        osc.frequency.exponentialRampToValueAtTime(160, t + 0.28);
        gain.gain.setValueAtTime(this.volume * 0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
        break;
      }
      case 'spooky-reveal': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.linearRampToValueAtTime(440, t + 0.25);
        osc.frequency.linearRampToValueAtTime(330, t + 0.6);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(this.volume * 0.4, t + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.7);
        break;
      }
      case 'diya-light': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, t);
        osc.frequency.exponentialRampToValueAtTime(587.33, t + 0.35);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(this.volume * 0.5, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.8);
        break;
      }
      case 'rakhi-tie': {
        [392.00, 493.88, 587.33, 783.99].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.07);
          gain.gain.setValueAtTime(this.volume * 0.4, t + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 1.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.07);
          osc.stop(t + idx * 0.07 + 1.2);
        });
        break;
      }
      case 'envelope-open': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(640, t + 0.2);
        gain.gain.setValueAtTime(this.volume * 0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
        break;
      }
      case 'chime-soft': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        gain.gain.setValueAtTime(this.volume * 0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.8);
        break;
      }
      case 'heart-pop':
      case 'confetti': {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.05);
          gain.gain.setValueAtTime(this.volume * 0.35, t + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.05);
          osc.stop(t + idx * 0.05 + 0.5);
        });
        break;
      }
    }
  }

  public playMoodBgm(mood: BgmMood) {
    if (this.currentMood === mood && this.currentBgmNodes) return;
    this.currentMood = mood;
    if (this.customAudioUrl) return;

    this.stopBgm();
    if (mood === 'silent') return;

    this.initCtx();
    if (!this.ctx) return;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.28, this.ctx.currentTime);
    masterGain.connect(this.ctx.destination);

    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    let baseNotes: number[] = [];
    let lfoRate = 0.2;
    let waveType: OscillatorType = 'sine';

    switch (mood) {
      case 'intro':
        baseNotes = [220, 277.18, 329.63];
        waveType = 'sine';
        lfoRate = 0.25;
        break;
      case 'story':
        baseNotes = [261.63, 329.63, 392.00, 523.25];
        waveType = 'sine';
        lfoRate = 0.3;
        break;
      case 'ghost':
        baseNotes = [185.00, 220.00, 277.18];
        waveType = 'triangle';
        lfoRate = 0.6;
        break;
      case 'fights':
        baseNotes = [293.66, 369.99, 440.00];
        waveType = 'sawtooth';
        lfoRate = 0.5;
        break;
      case 'roast':
        baseNotes = [246.94, 311.13, 369.99];
        waveType = 'triangle';
        lfoRate = 0.4;
        break;
      case 'food':
        baseNotes = [196.00, 246.94, 293.66, 392.00];
        waveType = 'sine';
        lfoRate = 0.15;
        break;
      case 'appreciation':
        baseNotes = [220.00, 261.63, 329.63, 440.00];
        waveType = 'sine';
        lfoRate = 0.18;
        break;
      case 'rakhi':
        baseNotes = [146.83, 220.00, 293.66, 440.00];
        waveType = 'sine';
        lfoRate = 0.2;
        break;
      case 'promise':
        baseNotes = [174.61, 220.00, 261.63, 349.23];
        waveType = 'sine';
        lfoRate = 0.1;
        break;
      case 'final':
        baseNotes = [261.63, 329.63, 392.00, 523.25];
        waveType = 'sine';
        lfoRate = 0.15;
        break;
    }

    baseNotes.forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const nodeGain = this.ctx.createGain();

      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      nodeGain.gain.setValueAtTime(0.12 / baseNotes.length, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(lfoRate, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04 / baseNotes.length, this.ctx.currentTime);
      lfo.connect(lfoGain.gain);
      lfo.start();

      osc.connect(nodeGain);
      nodeGain.connect(masterGain);
      osc.start();

      oscillators.push(osc);
      oscillators.push(lfo);
      gains.push(nodeGain);
    });

    this.currentBgmNodes = {
      oscillators,
      gains,
      masterGain,
    };
  }

  public stopBgm() {
    if (this.currentBgmNodes) {
      const { oscillators, intervalId } = this.currentBgmNodes;
      if (intervalId) clearInterval(intervalId);
      oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.currentBgmNodes = null;
    }
  }
}

export const audioEngine = new WebAudioEngine();
