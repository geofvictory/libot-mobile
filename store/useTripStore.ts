import { create } from 'zustand';

export interface TripItem {
  id: string;
  name: string;
  category: string;
  note: string;
}

interface TripState {
  savedSpots: TripItem[];
  addSpot: (spot: TripItem) => void;
  removeSpot: (id: string) => void;
}

export const useTripStore = create<TripState>((set) => ({
  savedSpots: [],
  addSpot: (spot) => set((state) => ({ savedSpots: [...state.savedSpots, spot] })),
  removeSpot: (id) => set((state) => ({ savedSpots: state.savedSpots.filter((s) => s.id !== id) })),
}));