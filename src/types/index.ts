export interface PhotoItem {
  id: string;
  slotIndex: number;
  title: string;
  defaultTitle: string;
  caption: string;
  defaultCaption: string;
  placeholderPrompt: string;
  imageUrl?: string;
  updatedAt?: number;
}

export type SoundEffectType = 
  | 'click' 
  | 'card-flip' 
  | 'buzzer-wrong' 
  | 'bell-correct' 
  | 'boing-roast' 
  | 'spooky-reveal' 
  | 'diya-light' 
  | 'rakhi-tie' 
  | 'envelope-open' 
  | 'heart-pop' 
  | 'confetti'
  | 'chime-soft';

export type BgmMood = 
  | 'intro'        // Playful cinematic ambient
  | 'story'        // Light and warm
  | 'ghost'        // Playful spooky
  | 'fights'       // Comedic energetic
  | 'roast'        // Funny quirky
  | 'food'         // Soft emotional ambient
  | 'appreciation' // Warm emotional
  | 'rakhi'        // Cinematic festive emotional
  | 'promise'      // Very soft emotional piano/strings
  | 'final'        // Minimal warm resolution
  | 'silent';

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  mood: BgmMood;
}
