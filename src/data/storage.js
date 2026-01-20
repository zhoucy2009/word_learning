const STORAGE_KEY = "word_learning_v1";

const defaultState = {
  user: {
    id: "guest",
    courseId: "igcse",
    abilityByCourse: {
      igcse: 320,
      ib: 420,
      ielts: 460,
      toefl: 440,
      gre: 600
    },
    settings: {
      sessionSize: 5,
      definitionLang: "en",
      proMode: false
    },
    lastActiveDate: null
  },
  wordStates: {},
  notes: [],
  mistakes: [],
  basket: [],
  practiceHistory: []
};

export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(defaultState);
  try {
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      user: { ...structuredClone(defaultState.user), ...parsed.user },
      wordStates: parsed.wordStates || {},
      notes: parsed.notes || [],
      mistakes: parsed.mistakes || [],
      basket: parsed.basket || [],
      practiceHistory: parsed.practiceHistory || []
    };
  } catch (err) {
    return structuredClone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
}
