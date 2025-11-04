import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Match } from './mock-data';

// User coins and diamonds store
interface UserState {
  coins: number;
  diamonds: number;
  addCoins: (amount: number) => void;
  addDiamonds: (amount: number) => void;
  deductCoins: (amount: number) => void;
  deductDiamonds: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      coins: 1000.0,
      diamonds: 0,
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      addDiamonds: (amount) => set((state) => ({ diamonds: state.diamonds + amount })),
      deductCoins: (amount) => set((state) => ({ coins: Math.max(0, state.coins - amount) })),
      deductDiamonds: (amount) => set((state) => ({ diamonds: Math.max(0, state.diamonds - amount) })),
    }),
    {
      name: 'easybet-user-storage',
    }
  )
);

// Bet selection types
export type BetType = 'home' | 'draw' | 'away';

export interface BetSelection {
  match: Match;
  betType: BetType;
  odds: number;
}

// Bet slip store
interface BetState {
  selections: BetSelection[];
  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: string) => void;
  clearSelections: () => void;
  toggleSelection: (selection: BetSelection) => void;
}

export const useBetStore = create<BetState>((set, get) => ({
  selections: [],

  addSelection: (selection) => set((state) => {
    const existingIndex = state.selections.findIndex(s => s.match.id === selection.match.id);
    if (existingIndex !== -1) {
      const newSelections = [...state.selections];
      newSelections[existingIndex] = selection;
      return { selections: newSelections };
    }
    return { selections: [...state.selections, selection] };
  }),

  removeSelection: (matchId) => set((state) => ({
    selections: state.selections.filter(s => s.match.id !== matchId)
  })),

  clearSelections: () => set({ selections: [] }),

  toggleSelection: (selection) => {
    const state = get();
    const existingIndex = state.selections.findIndex(
      s => s.match.id === selection.match.id
    );

    if (existingIndex !== -1) {
      const existing = state.selections[existingIndex];
      if (existing.betType === selection.betType) {
        state.removeSelection(selection.match.id);
      } else {
        state.addSelection(selection);
      }
    } else {
      state.addSelection(selection);
    }
  },
}));

// User placed bets store
export interface PlacedBet {
  id: string;
  selections: BetSelection[];
  stake: number;
  potentialWin: number;
  totalOdds: number;
  placedAt: string;
  status: 'pending' | 'won' | 'lost';
}

interface UserBetsState {
  bets: PlacedBet[];
  addBet: (bet: PlacedBet) => void;
  updateBetStatus: (betId: string, status: 'won' | 'lost') => void;
  clearAllBets: () => void;
}

export const useUserBetsStore = create<UserBetsState>()(
  persist(
    (set) => ({
      bets: [],
      addBet: (bet) => set((state) => ({ bets: [bet, ...state.bets] })),
      updateBetStatus: (betId, status) => set((state) => ({
        bets: state.bets.map(bet => 
          bet.id === betId ? { ...bet, status } : bet
        )
      })),
      clearAllBets: () => set({ bets: [] }),
    }),
    {
      name: 'easybet-user-bets',
    }
  )
);

// Match status store (for simulating live matches)
interface MatchStatus {
  matchId: string;
  status: 'upcoming' | 'played' | 'finished';
  homeScore?: number;
  awayScore?: number;
}

interface MatchStatusState {
  statuses: MatchStatus[];
  updateMatchStatus: (matchId: string, status: MatchStatus) => void;
  getMatchStatus: (matchId: string) => MatchStatus | undefined;
  clearAllStatuses: () => void;
}

export const useMatchStatusStore = create<MatchStatusState>()(
  persist(
    (set, get) => ({
      statuses: [],
      updateMatchStatus: (matchId, status) => set((state) => {
        const existingIndex = state.statuses.findIndex(s => s.matchId === matchId);
        if (existingIndex !== -1) {
          const newStatuses = [...state.statuses];
          newStatuses[existingIndex] = status;
          return { statuses: newStatuses };
        }
        return { statuses: [...state.statuses, status] };
      }),
      getMatchStatus: (matchId) => {
        return get().statuses.find(s => s.matchId === matchId);
      },
      clearAllStatuses: () => set({ statuses: [] }),
    }),
    {
      name: 'easybet-match-statuses',
    }
  )
);
