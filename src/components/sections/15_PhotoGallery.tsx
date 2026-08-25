import React, { useState } from 'react';
import { Camera, Edit3, ZoomIn } from 'lucide-react';
import { usePhotos } from '../../context/PhotoContext';
import { useAudio } from '../../context/AudioContext';
import type { PhotoItem } from '../../types';
import { PhotoCustomizerModal } from '../modals/PhotoCustomizerModal';
import { PhotoLightbox } from '../modals/PhotoLightbox';

export const PhotoGallery: React.FC = () => {
  const { photos, updatePhoto, resetPhoto } = usePhotos();
  const { playSfx } = useAudio();

  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenEdit = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation();
    playSfx('click');
    setEditingPhoto(photo);
  };

  const handleCardClick = (idx: number) => {
    playSfx('click');
    setLightboxIndex(idx);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 py-20">
      <div className="max-w-5xl w-full mx-auto space-y-10 text-center">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Interactive Scrapbook
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white">
            Photo Memory Gallery
          </h2>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Our polaroid moments. Tap any photo to expand, or tap the edit icon to personalize your photos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handleCardClick(idx)}
              className="group relative rounded-3xl p-4 bg-[#140e12] border border-amber-500/20 hover:border-amber-400/60 shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0c080a] border border-white/5 flex items-center justify-center">
                {photo.imageUrl ? (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 text-neutral-500 group-hover:text-amber-300/80 transition-colors">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-500/30">
                      <Camera size={24} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                      {photo.placeholderPrompt}
                    </span>
                    <span className="text-[11px] text-neutral-400 max-w-[200px] line-clamp-2">
                      {photo.caption}
                    </span>
                  </div>
                )}

                <button
                  onClick={(e) => handleOpenEdit(photo, e)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/70 hover:bg-amber-500 text-neutral-300 hover:text-black border border-white/10 shadow-lg transition-all"
                  title="Upload / Change Photo"
                  aria-label="Upload / Change Photo"
                >
                  <Edit3 size={14} />
                </button>

                <div className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={13} />
                </div>
              </div>

              <div className="pt-4 pb-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-cream group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500">
                    #{idx + 1}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 font-light">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-neutral-500">
          ✨ Stored securely in your browser's persistent memory
        </div>
      </div>

      {editingPhoto && (
        <PhotoCustomizerModal
          photo={editingPhoto}
          isOpen={true}
          onClose={() => setEditingPhoto(null)}
          onSave={updatePhoto}
          onReset={resetPhoto}
        />
      )}

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
          onEdit={(photo) => {
            setLightboxIndex(null);
            setEditingPhoto(photo);
          }}
        />
      )}
    </section>
  );
};
