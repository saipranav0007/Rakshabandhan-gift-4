import React, { useState, useEffect, useRef } from 'react';
import { FloatingParticles } from './components/common/FloatingParticles';
import { FloatingMusicPlayer } from './components/common/FloatingMusicPlayer';
import { NavigationStepper } from './components/common/NavigationStepper';

// Sections
import { IntroScreen } from './components/sections/01_IntroScreen';
import { HeroIntroduction } from './components/sections/02_HeroIntroduction';
import { RakshasiProfile } from './components/sections/03_RakshasiProfile';
import { StoryMachine } from './components/sections/04_StoryMachine';
import { StoriesVisualizer } from './components/sections/05_StoriesVisualizer';
import { GhostGame } from './components/sections/06_GhostGame';
import { FightMachine } from './components/sections/07_FightMachine';
import { PigRoast } from './components/sections/08_PigRoast';
import { TeluguRoast } from './components/sections/09_TeluguRoast';
import { RakshasiDiagnosis } from './components/sections/10_RakshasiDiagnosis';
import { SmallMemories } from './components/sections/11_SmallMemories';
import { FoodMemory } from './components/sections/12_FoodMemory';
import { WhatYouMean } from './components/sections/13_WhatYouMean';
import { SupportSection } from './components/sections/14_SupportSection';
import { PhotoGallery } from './components/sections/15_PhotoGallery';
import { RakshaBandhanTransition } from './components/sections/16_RakshaBandhanTransition';
import { RakhiCeremony } from './components/sections/17_RakhiCeremony';
import { GiftReveal } from './components/sections/18_GiftReveal';
import { PromiseLetter } from './components/sections/19_PromiseLetter';
import { FinalHighlight } from './components/sections/20_FinalHighlight';

import { useAudio } from './context/AudioContext';
import type { BgmMood } from './types';

const SECTION_CONFIGS: { id: string; title: string; mood: BgmMood }[] = [
  { id: 'intro', title: 'Intro Screen', mood: 'intro' },
  { id: 'hero', title: 'Manasu & Rakshasi', mood: 'intro' },
  { id: 'profile', title: 'Rakshasi Profile', mood: 'intro' },
  { id: 'stories', title: 'The Story Machine', mood: 'story' },
  { id: 'tell-all', title: 'Tell Annaya Everything', mood: 'story' },
  { id: 'ghost-game', title: 'The Ghost Game', mood: 'ghost' },
  { id: 'fight-machine', title: 'The Fight Machine', mood: 'fights' },
  { id: 'pig-roast', title: 'The Pig Roast', mood: 'roast' },
  { id: 'telugu-roast', title: 'Telugu Family Roast', mood: 'roast' },
  { id: 'diagnosis', title: 'Rakshasi Special Care', mood: 'roast' },
  { id: 'small-memories', title: 'Small Moments', mood: 'appreciation' },
  { id: 'food-memory', title: 'The Food Memory', mood: 'food' },
  { id: 'what-you-mean', title: 'What You Mean to Me', mood: 'appreciation' },
  { id: 'support', title: 'Lifelong Support', mood: 'appreciation' },
  { id: 'photo-gallery', title: 'Photo Memory Gallery', mood: 'story' },
  { id: 'raksha-bandhan', title: 'Raksha Bandhan Wishes', mood: 'rakhi' },
  { id: 'rakhi-ceremony', title: 'Interactive Rakhi Ceremony', mood: 'rakhi' },
  { id: 'gift-reveal', title: 'The Gift Reveal', mood: 'promise' },
  { id: 'promise-letter', title: "Annaya's Promise Letter", mood: 'promise' },
  { id: 'final-highlight', title: 'Final Resolution', mood: 'final' },
];

export const App: React.FC = () => {
  const { setMood } = useAudio();
  const [hasEntered, setHasEntered] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleEnterExperience = () => {
    setHasEntered(true);
    setCurrentSectionIndex(1);
    setTimeout(() => {
      sectionRefs.current[1]?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToSection = (index: number) => {
    setCurrentSectionIndex(index);
    if (index === 0) {
      setHasEntered(false);
    } else {
      setHasEntered(true);
    }
    const targetMood = SECTION_CONFIGS[index]?.mood || 'intro';
    setMood(targetMood);

    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!hasEntered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const index = Number(entry.target.getAttribute('data-section-index'));
            if (!isNaN(index)) {
              setCurrentSectionIndex(index);
              const targetMood = SECTION_CONFIGS[index]?.mood;
              if (targetMood) {
                setMood(targetMood);
              }
            }
          }
        });
      },
      { threshold: [0.4, 0.7] }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasEntered, setMood]);

  return (
    <div className="relative min-h-screen bg-[#0a0708] text-cream selection:bg-rose-500 selection:text-white overflow-x-hidden">
      {/* Floating Canvas Particles */}
      <FloatingParticles />

      {/* Floating Discrete Music Player */}
      <FloatingMusicPlayer />

      {/* Intro Overlay or Main Flow */}
      {!hasEntered && (
        <IntroScreen onEnter={handleEnterExperience} />
      )}

      {/* Main Experience Journey */}
      <main className={`relative z-10 transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Section 00: Intro Anchor */}
        <div ref={(el) => { sectionRefs.current[0] = el; }} data-section-index={0} className="h-0 overflow-hidden" />

        {/* Section 01: Hero */}
        <div ref={(el) => { sectionRefs.current[1] = el; }} data-section-index={1}>
          <HeroIntroduction onNext={() => handleNavigateToSection(2)} />
        </div>

        {/* Section 02: Rakshasi Profile */}
        <div ref={(el) => { sectionRefs.current[2] = el; }} data-section-index={2}>
          <RakshasiProfile />
        </div>

        {/* Section 03: The Story Machine */}
        <div ref={(el) => { sectionRefs.current[3] = el; }} data-section-index={3}>
          <StoryMachine />
        </div>

        {/* Section 04: Tell Annaya Everything */}
        <div ref={(el) => { sectionRefs.current[4] = el; }} data-section-index={4}>
          <StoriesVisualizer />
        </div>

        {/* Section 05: The Ghost Game */}
        <div ref={(el) => { sectionRefs.current[5] = el; }} data-section-index={5}>
          <GhostGame />
        </div>

        {/* Section 06: The Fight Machine */}
        <div ref={(el) => { sectionRefs.current[6] = el; }} data-section-index={6}>
          <FightMachine />
        </div>

        {/* Section 07: The Pig Roast */}
        <div ref={(el) => { sectionRefs.current[7] = el; }} data-section-index={7}>
          <PigRoast />
        </div>

        {/* Section 08: Telugu Roast */}
        <div ref={(el) => { sectionRefs.current[8] = el; }} data-section-index={8}>
          <TeluguRoast />
        </div>

        {/* Section 09: Rakshasi Diagnosis */}
        <div ref={(el) => { sectionRefs.current[9] = el; }} data-section-index={9}>
          <RakshasiDiagnosis />
        </div>

        {/* Section 10: Small Memories */}
        <div ref={(el) => { sectionRefs.current[10] = el; }} data-section-index={10}>
          <SmallMemories />
        </div>

        {/* Section 11: The Food Memory */}
        <div ref={(el) => { sectionRefs.current[11] = el; }} data-section-index={11}>
          <FoodMemory />
        </div>

        {/* Section 12: What You Mean to Me */}
        <div ref={(el) => { sectionRefs.current[12] = el; }} data-section-index={12}>
          <WhatYouMean />
        </div>

        {/* Section 13: Lifelong Support */}
        <div ref={(el) => { sectionRefs.current[13] = el; }} data-section-index={13}>
          <SupportSection />
        </div>

        {/* Section 14: Photo Gallery */}
        <div ref={(el) => { sectionRefs.current[14] = el; }} data-section-index={14}>
          <PhotoGallery />
        </div>

        {/* Section 15: Raksha Bandhan Transition */}
        <div ref={(el) => { sectionRefs.current[15] = el; }} data-section-index={15}>
          <RakshaBandhanTransition />
        </div>

        {/* Section 16: Rakhi Ceremony */}
        <div ref={(el) => { sectionRefs.current[16] = el; }} data-section-index={16}>
          <RakhiCeremony />
        </div>

        {/* Section 17: Gift Reveal */}
        <div ref={(el) => { sectionRefs.current[17] = el; }} data-section-index={17}>
          <GiftReveal onOpenPromise={() => handleNavigateToSection(18)} />
        </div>

        {/* Section 18: Promise Letter */}
        <div ref={(el) => { sectionRefs.current[18] = el; }} data-section-index={18}>
          <PromiseLetter />
        </div>

        {/* Section 19: Final Highlight */}
        <div ref={(el) => { sectionRefs.current[19] = el; }} data-section-index={19}>
          <FinalHighlight onRestart={() => handleNavigateToSection(0)} />
        </div>
      </main>

      {/* Floating Bottom Navigator */}
      {hasEntered && (
        <NavigationStepper
          currentSection={currentSectionIndex}
          totalSections={SECTION_CONFIGS.length}
          sectionTitles={SECTION_CONFIGS.map(s => s.title)}
          onNavigate={handleNavigateToSection}
        />
      )}
    </div>
  );
};
