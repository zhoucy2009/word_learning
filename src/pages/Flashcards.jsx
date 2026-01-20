import React from "react";
import { useApp } from "../AppContext.jsx";
import { selectFlashcardWords } from "../data/logic.js";
import FlashcardDeck from "../components/FlashcardDeck.jsx";

export default function Flashcards() {
  const { state, refresh } = useApp();
  const courseId = state.user.courseId;
  const ability = state.user.abilityByCourse[courseId] || 0;
  const sessionSize = state.user.settings.sessionSize;
  const definitionLang = state.user.settings.definitionLang;
  const proMode = state.user.settings.proMode;
  const [sessionWords, setSessionWords] = React.useState(() =>
    selectFlashcardWords(courseId, ability, sessionSize, state, proMode)
  );

  React.useEffect(() => {
    setSessionWords(selectFlashcardWords(courseId, ability, sessionSize, state, proMode));
  }, [courseId, ability, sessionSize, proMode]);

  return (
    <div className="stack">
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <h2>Flashcard Drill</h2>
        <button
          className="secondary"
          onClick={() =>
            setSessionWords(selectFlashcardWords(courseId, ability, sessionSize, state, proMode))
          }
        >
          New Session
        </button>
      </div>
      <FlashcardDeck
        words={sessionWords}
        courseId={courseId}
        onSessionChange={() => {}}
        onStateChange={refresh}
        state={state}
        definitionLang={definitionLang}
        proMode={proMode}
        onRestart={() =>
          setSessionWords(selectFlashcardWords(courseId, ability, sessionSize, state, proMode))
        }
      />
      <div className="notice">
        <p>
          Rule: a word becomes learned when you select “I know this” or answer it
          correctly in practice. Flipping marks it as interacted.
        </p>
      </div>
    </div>
  );
}
