import React, { createContext, useContext, useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import type { PhotoItem } from '../types';

interface PhotoContextType {
  photos: PhotoItem[];
  updatePhoto: (id: string, updates: Partial<PhotoItem>) => Promise<void>;
  resetPhoto: (id: string) => Promise<void>;
  resetAllPhotos: () => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    slotIndex: 1,
    title: 'Us',
    defaultTitle: 'Us',
    caption: 'Add one of our favourite memories.',
    defaultCaption: 'Add one of our favourite memories.',
    placeholderPrompt: 'PHOTO GOES HERE',
  },
  {
    id: 'photo-2',
    slotIndex: 2,
    title: 'Ghost Game',
    defaultTitle: 'Ghost Game',
    caption: 'Add a funny photo.',
    defaultCaption: 'Add a funny photo.',
    placeholderPrompt: 'PHOTO GOES HERE',
  },
  {
    id: 'photo-3',
    slotIndex: 3,
    title: 'One of our random days',
    defaultTitle: 'One of our random days',
    caption: 'Add a photo from one of our random days.',
    defaultCaption: 'Add a photo from one of our random days.',
    placeholderPrompt: 'PHOTO GOES HERE',
  },
  {
    id: 'photo-4',
    slotIndex: 4,
    title: 'Annaya + Rakshasi',
    defaultTitle: 'Annaya + Rakshasi',
    caption: 'Add a childhood photo.',
    defaultCaption: 'Add a childhood photo.',
    placeholderPrompt: 'PHOTO GOES HERE',
  },
  {
    id: 'photo-5',
    slotIndex: 5,
    title: 'One small memory',
    defaultTitle: 'One small memory',
    caption: 'Add one of our favourite memories.',
    defaultCaption: 'Add one of our favourite memories.',
    placeholderPrompt: 'PHOTO GOES HERE',
  },
  {
    id: 'photo-6',
    slotIndex: 6,
    title: 'One last photo',
    defaultTitle: 'One last photo',
    caption: 'Add the final photo.',
    defaultCaption: 'Add the final photo.',
    placeholderPrompt: 'PHOTO GOES HERE',
  },
];

const DB_KEY = 'rakshasi_memories_v1';

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const stored = await get<PhotoItem[]>(DB_KEY);
        if (stored && Array.isArray(stored) && stored.length > 0) {
          const merged = DEFAULT_PHOTOS.map(def => {
            const match = stored.find(s => s.id === def.id);
            return match ? { ...def, ...match } : def;
          });
          setPhotos(merged);
        } else {
          const localStored = localStorage.getItem(DB_KEY);
          if (localStored) {
            try {
              const parsed = JSON.parse(localStored);
              if (Array.isArray(parsed)) {
                setPhotos(parsed);
              }
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        console.error('Failed to load photos from IndexedDB:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const saveToStorage = async (newPhotos: PhotoItem[]) => {
    setPhotos(newPhotos);
    try {
      await set(DB_KEY, newPhotos);
    } catch (err) {
      console.warn('IndexedDB save failed, trying localStorage:', err);
      try {
        localStorage.setItem(DB_KEY, JSON.stringify(newPhotos));
      } catch (lsErr) {
        console.error('Failed to save to localStorage as well:', lsErr);
      }
    }
  };

  const updatePhoto = async (id: string, updates: Partial<PhotoItem>) => {
    const updated = photos.map(p => (p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p));
    await saveToStorage(updated);
  };

  const resetPhoto = async (id: string) => {
    const updated = photos.map(p => {
      if (p.id === id) {
        const def = DEFAULT_PHOTOS.find(d => d.id === id) || p;
        return {
          ...def,
          imageUrl: undefined,
          updatedAt: Date.now(),
        };
      }
      return p;
    });
    await saveToStorage(updated);
  };

  const resetAllPhotos = async () => {
    await saveToStorage(DEFAULT_PHOTOS);
  };

  return (
    <PhotoContext.Provider
      value={{
        photos,
        updatePhoto,
        resetPhoto,
        resetAllPhotos,
        isLoading,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhotos = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotos must be used within a PhotoProvider');
  }
  return context;
};
