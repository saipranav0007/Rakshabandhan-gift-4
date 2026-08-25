import React, { useState, useRef } from 'react';
import { X, Upload, Link, Trash2, Check, Image as ImageIcon } from 'lucide-react';
import type { PhotoItem } from '../../types';
import { useAudio } from '../../context/AudioContext';

interface PhotoCustomizerModalProps {
  photo: PhotoItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<PhotoItem>) => Promise<void>;
  onReset: (id: string) => Promise<void>;
}

export const PhotoCustomizerModal: React.FC<PhotoCustomizerModalProps> = ({
  photo,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const { playSfx } = useAudio();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState(photo.title);
  const [caption, setCaption] = useState(photo.caption);
  const [imageUrl, setImageUrl] = useState(photo.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState(photo.imageUrl || '');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    playSfx('click');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1400;
        const MAX_HEIGHT = 1400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setPreviewUrl(compressedDataUrl);
          setImageUrl(compressedDataUrl);
        }
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (val: string) => {
    setImageUrl(val);
    setPreviewUrl(val);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('bell-correct');
    await onSave(photo.id, {
      title: title.trim() || photo.defaultTitle,
      caption: caption.trim() || photo.defaultCaption,
      imageUrl: imageUrl.trim() || undefined,
    });
    onClose();
  };

  const handleReset = async () => {
    playSfx('click');
    await onReset(photo.id);
    setImageUrl('');
    setPreviewUrl('');
    setTitle(photo.defaultTitle);
    setCaption(photo.defaultCaption);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#171014] border border-amber-500/30 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-8 animate-fade-in text-cream">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <ImageIcon size={18} />
            </span>
            <div>
              <h3 className="font-serif text-lg text-amber-300">Edit Photo Slot #{photo.slotIndex}</h3>
              <p className="text-xs text-neutral-400">Scrapbook memory customizer</p>
            </div>
          </div>
          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="text-neutral-400 hover:text-white p-1 rounded-lg"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <div className="flex rounded-lg bg-[#0e0a0c] p-1 mb-3 border border-amber-500/20">
              <button
                type="button"
                onClick={() => {
                  playSfx('click');
                  setActiveTab('upload');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'upload'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Upload size={13} /> Upload File / Camera
              </button>
              <button
                type="button"
                onClick={() => {
                  playSfx('click');
                  setActiveTab('url');
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'url'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Link size={13} /> Image Web URL
              </button>
            </div>

            {activeTab === 'upload' ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-500/30 hover:border-amber-400/60 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-[#0f0a0d]/50 hover:bg-[#1f141a]/50 transition-all min-h-[160px]"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {previewUrl ? (
                  <div className="relative w-full max-h-44 flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-44 w-auto object-contain rounded-lg border border-amber-500/20"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                      <span className="text-xs bg-amber-500 text-black font-semibold px-2.5 py-1 rounded-md">
                        Tap to change image
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
                      <Upload size={22} />
                    </div>
                    <p className="text-sm font-medium text-amber-200">
                      {isProcessing ? 'Processing image...' : 'Tap to choose photo'}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Works on mobile phone gallery, camera, or PC
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={imageUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full bg-[#0e0a0c] border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
                {previewUrl && (
                  <div className="max-h-36 overflow-hidden rounded-lg border border-amber-500/20 flex items-center justify-center bg-black/40">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-36 w-auto object-contain"
                      onError={() => setPreviewUrl('')}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                Memory Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={photo.defaultTitle}
                className="w-full bg-[#0e0a0c] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-cream focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                Story / Note / Caption
              </label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={photo.defaultCaption}
                className="w-full bg-[#0e0a0c] border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-cream focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
            {photo.imageUrl ? (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 size={14} /> Remove Photo
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playSfx('click');
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-xs font-semibold text-white hover:brightness-110 shadow-lg shadow-rose-900/30"
              >
                <Check size={14} /> Save Memory
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
