import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// View Mode Store - Controls 3D/2D toggle and current section
interface ViewModeStore {
  mode: '2d' | '3d';
  currentSection: string;
  toggleMode: () => void;
  setMode: (mode: '2d' | '3d') => void;
  setSection: (section: string) => void;
}

export const useViewModeStore = create<ViewModeStore>()(
  persist(
    (set) => ({
      mode: '2d',
      currentSection: 'home',
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === '2d' ? '3d' : '2d',
        })),
      setMode: (mode) => set({ mode }),
      setSection: (section) => set({ currentSection: section }),
    }),
    {
      name: 'view-mode-storage', // localStorage key
    }
  )
);

// User Session Store - Manages authentication state
interface User {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  isGuest: boolean;
}

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: user !== null,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));

// Typing Test Store - Manages typing test state
export interface TypingTestState {
  text: string;
  userInput: string;
  currentIndex: number;
  startTime: number | null;
  endTime: number | null;
  wpm: number;
  accuracy: number;
  errors: number;
  isComplete: boolean;
  isActive: boolean;
}

interface TypingTestStore extends TypingTestState {
  setText: (text: string) => void;
  startTest: () => void;
  handleKeyPress: (key: string) => void;
  resetTest: () => void;
  completeTest: () => void;
}

const INITIAL_STATE: TypingTestState = {
  text: '',
  userInput: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  wpm: 0,
  accuracy: 100,
  errors: 0,
  isComplete: false,
  isActive: false,
};

export const useTypingTestStore = create<TypingTestStore>((set, get) => ({
  ...INITIAL_STATE,

  setText: (text) => set({ text, userInput: '', currentIndex: 0 }),

  startTest: () =>
    set({
      startTime: Date.now(),
      isActive: true,
      isComplete: false,
    }),

  handleKeyPress: (key) => {
    const state = get();

    // Start test on first keypress
    if (!state.startTime) {
      state.startTest();
    }

    // Handle backspace
    if (key === 'Backspace') {
      if (state.currentIndex > 0) {
        set({
          userInput: state.userInput.slice(0, -1),
          currentIndex: state.currentIndex - 1,
        });
      }
      return;
    }

    // Ignore non-character keys
    if (key.length !== 1) return;

    const newInput = state.userInput + key;
    const newIndex = state.currentIndex + 1;
    const isCorrect = key === state.text[state.currentIndex];
    const newErrors = isCorrect ? state.errors : state.errors + 1;

    // Calculate WPM and accuracy
    const timeElapsed = (Date.now() - (state.startTime || Date.now())) / 1000 / 60; // minutes
    const charsTyped = newInput.length;
    const wpm = Math.round((charsTyped / 5) / Math.max(timeElapsed, 0.01));
    const accuracy = Math.round(
      ((charsTyped - newErrors) / charsTyped) * 100
    );

    set({
      userInput: newInput,
      currentIndex: newIndex,
      errors: newErrors,
      wpm,
      accuracy: isNaN(accuracy) ? 100 : accuracy,
    });

    // Complete test if reached end
    if (newIndex >= state.text.length) {
      get().completeTest();
    }
  },

  completeTest: () =>
    set({
      endTime: Date.now(),
      isComplete: true,
      isActive: false,
    }),

  resetTest: () => set({ ...INITIAL_STATE, text: get().text }),
}));
