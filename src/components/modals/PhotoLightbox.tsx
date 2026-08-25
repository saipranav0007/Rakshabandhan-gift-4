import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';
import type { PhotoItem } from '../../types';
import { useAudio } from '../../context/AudioContext';

interface PhotoLightboxProps {
  photos: PhotoItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onEdit: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onNavigate,
  onEdit,
}) => {
  const { playSfx } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        const prev = (currentIndex - 1 + photos.length) % photos.length;
        onNavigate(prev);
      }
      if (e.key === 'ArrowRight') {
        const next = (currentIndex + 1) % photos.length;
        onNavigate(next);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length, onClose, onNavigate]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in text-cream select-none">
      <div className="flex items-center justify-between z-10">
        <span className="font-mono text-xs text-amber-300/80 bg-[#171014] px-3 py-1 rounded-full border border-amber-500/30">
          Memory {currentIndex + 1} of {photos.length}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSfx('click');
              onEdit(currentPhoto);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs border border-amber-500/40 transition-colors"
          >
            <Edit3 size={14} /> Edit Photo
          </button>

          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          onClick={() => {
            playSfx('click');
            onNavigate((currentIndex - 1 + photos.length) % photos.length);
          }}
          className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-amber-500/20 text-white border border-white/10 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="max-w-4xl max-h-[70vh] flex flex-col items-center justify-center">
          {currentPhoto.imageUrl ? (
            <img
              src={currentPhoto.imageUrl}
              alt={currentPhoto.title}
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-amber-500/30"
            />
          ) : (
            <div className="w-80 h-72 sm:w-96 sm:h-80 rounded-2xl border-2 border-dashed border-amber-500/40 bg-[#160f13] flex flex-col items-center justify-center p-6 text-center shadow-2xl">
              <span className="text-4xl mb-3">📸</span>
              <p className="font-serif text-lg text-amber-300 font-semibold mb-1">{currentPhoto.placeholderPrompt}</p>
              <p className="text-xs text-neutral-400 max-w-xs">{currentPhoto.caption}</p>
              <button
                onClick={() => onEdit(currentPhoto)}
                className="mt-4 px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs border border-amber-500/40 font-medium"
              >
                Upload Photo Now
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            playSfx('click');
            onNavigate((currentIndex + 1) % photos.length);
          }}
          className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-amber-500/20 text-white border border-white/10 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-center max-w-xl mx-auto z-10 bg-[#171014]/90 border border-amber-500/30 rounded-xl px-5 py-3 shadow-lg">
        <h4 className="font-serif text-lg text-amber-300 font-semibold">{currentPhoto.title}</h4>
        <p className="text-xs sm:text-sm text-neutral-300 mt-1">{currentPhoto.caption}</p>
      </div>
    </div>
  );
};
