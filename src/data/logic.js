import { courses, words, passages, courseWordMap } from "./seed.js";
import { loadState, saveState } from "./storage.js";

export function getCourses() {
  return courses;
}

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId) || courses[0];
}

export function getWordsForCourse(courseId) {
  const ids = courseWordMap[courseId] || [];
  return words.filter((word) => ids.includes(word.id));
}

export function getWordById(wordId) {
  return words.find((word) => word.id === wordId);
}

export function getPassagesForCourse(courseId) {
  return passages.filter((passage) => passage.courseId === courseId);
}

export function getState() {
  return loadState();
}

export function updateState(mutator) {
  const state = loadState();
  mutator(state);
  saveState(state);
  return state;
}

export function getWordState(state, courseId, wordId) {
  if (!state.wordStates[courseId]) state.wordStates[courseId] = {};
  if (!state.wordStates[courseId][wordId]) {
    state.wordStates[courseId][wordId] = {
      status: "unseen",
      mastery: 0,
      lastSeenAt: null
    };
  }
  return state.wordStates[courseId][wordId];
}

export function updateWordState(state, courseId, wordId, updates) {
  const existing = getWordState(state, courseId, wordId);
  state.wordStates[courseId][wordId] = {
    ...existing,
    ...updates
  };
}

export function setCourse(courseId) {
  return updateState((state) => {
    state.user.courseId = courseId;
  });
}

export function setSettings(updates) {
  return updateState((state) => {
    state.user.settings = { ...state.user.settings, ...updates };
  });
}

export function setAbility(courseId, ability) {
  return updateState((state) => {
    state.user.abilityByCourse[courseId] = ability;
  });
}

export function addToBasket(wordId) {
  return updateState((state) => {
    if (!state.basket.includes(wordId)) state.basket.push(wordId);
  });
}

export function removeFromBasket(wordId) {
  return updateState((state) => {
    state.basket = state.basket.filter((id) => id !== wordId);
  });
}

export function clearBasket() {
  return updateState((state) => {
    state.basket = [];
  });
}

export function addToNotes(wordId) {
  return updateState((state) => {
    if (!state.notes.includes(wordId)) state.notes.push(wordId);
  });
}

export function addToMistakes(wordId) {
  return updateState((state) => {
    if (!state.mistakes.includes(wordId)) state.mistakes.push(wordId);
  });
}

export function removeFromNotes(wordId) {
  return updateState((state) => {
    state.notes = state.notes.filter((id) => id !== wordId);
  });
}

export function removeFromMistakes(wordId) {
  return updateState((state) => {
    state.mistakes = state.mistakes.filter((id) => id !== wordId);
  });
}

export function markInteracted(courseId, wordId) {
  return updateState((state) => {
    const current = getWordState(state, courseId, wordId);
    if (current.status === "learned") return;
    updateWordState(state, courseId, wordId, {
      status: "interacted",
      lastSeenAt: new Date().toISOString()
    });
  });
}

export function markLearned(courseId, wordId) {
  return updateState((state) => {
    updateWordState(state, courseId, wordId, {
      status: "learned",
      mastery: 100,
      lastSeenAt: new Date().toISOString()
    });
  });
}

export function recordPractice(courseId, items, results) {
  return updateState((state) => {
    const now = new Date().toISOString();
    state.practiceHistory.push({ courseId, items, results, createdAt: now });
    results.forEach((result) => {
      if (result.isCorrect) {
        updateWordState(state, courseId, result.wordId, {
          status: "learned",
          mastery: 100,
          lastSeenAt: now
        });
      } else {
        if (!state.mistakes.includes(result.wordId)) {
          state.mistakes.push(result.wordId);
        }
        updateWordState(state, courseId, result.wordId, {
          status: "interacted",
          lastSeenAt: now
        });
      }
    });
  });
}

export function getDailyProgress(state, courseId) {
  const today = new Date().toISOString().slice(0, 10);
  const wordStates = state.wordStates[courseId] || {};
  let interactedToday = 0;
  let learnedToday = 0;
  Object.values(wordStates).forEach((entry) => {
    if (!entry.lastSeenAt) return;
    if (!entry.lastSeenAt.startsWith(today)) return;
    if (entry.status === "learned") learnedToday += 1;
    if (entry.status === "interacted") interactedToday += 1;
  });
  return { interactedToday, learnedToday };
}

export function estimateVocabSize(abilityRank) {
  return Math.round(abilityRank * 3);
}

export function selectFlashcardWords(courseId, abilityRank, size, state) {
  const candidates = getWordsForCourse(courseId)
    .map((word) => ({ word, state: getWordState(state, courseId, word.id) }))
    .filter((entry) => entry.state.status !== "learned");
  const filtered = candidates.filter((entry) =>
    Math.abs(entry.word.difficulty - abilityRank) <= 80
  );
  const pool = filtered.length ? filtered : candidates;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size).map((entry) => entry.word);
}

export function selectReadingPassage(courseId, abilityRank) {
  const pool = getPassagesForCourse(courseId);
  if (!pool.length) return null;
  const sorted = [...pool].sort(
    (a, b) => Math.abs(a.difficulty - abilityRank) - Math.abs(b.difficulty - abilityRank)
  );
  return sorted[0];
}

export function selectPracticeItems(courseId, abilityRank, size, state) {
  const now = new Date();
  const recentThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const allWords = getWordsForCourse(courseId);
  const candidates = allWords.filter((word) => {
    const entry = getWordState(state, courseId, word.id);
    return entry.status === "interacted" || entry.status === "learned";
  });
  const recent = candidates.filter((word) => {
    const entry = getWordState(state, courseId, word.id);
    if (!entry.lastSeenAt) return false;
    return new Date(entry.lastSeenAt) >= recentThreshold;
  });
  const older = candidates.filter((word) => !recent.includes(word));
  const targetRecent = Math.round(size * 0.7);
  const targetOlder = size - targetRecent;

  const pick = (list, count) =>
    [...list].sort(() => Math.random() - 0.5).slice(0, count);

  const selected = [...pick(recent, targetRecent), ...pick(older, targetOlder)];
  if (selected.length < size) {
    const remaining = candidates.filter((word) => !selected.includes(word));
    selected.push(...pick(remaining, size - selected.length));
  }
  if (!selected.length) {
    const fallback = getWordsForCourse(courseId)
      .filter((word) => Math.abs(word.difficulty - abilityRank) <= 120)
      .slice(0, size);
    selected.push(...fallback);
  }
  return selected;
}

export function buildMcqItem(word, allWords) {
  const options = [word];
  const pool = allWords.filter((candidate) => candidate.id !== word.id);
  while (options.length < 4 && pool.length) {
    const choice = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    options.push(choice);
  }
  const shuffled = [...options].sort(() => Math.random() - 0.5);
  return {
    type: "mcq",
    wordId: word.id,
    prompt: `Choose the best definition for "${word.lemma}"`,
    options: shuffled.map((item) => item.senses.en),
    answer: word.senses.en
  };
}

export function buildSpellingItem(word) {
  return {
    type: "spelling",
    wordId: word.id,
    prompt: `Type the word that matches: ${word.senses.en}`,
    answer: word.lemma
  };
}
