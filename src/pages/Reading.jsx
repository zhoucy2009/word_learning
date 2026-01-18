import React from "react";
import { useApp } from "../AppContext.jsx";
import {
  addToBasket,
  getWordsForCourse,
  selectReadingPassage
} from "../data/logic.js";
import BasketBar from "../components/BasketBar.jsx";

function splitTokens(text) {
  return text.split(/(\s+|[^A-Za-z']+)/).filter((token) => token !== "");
}

function isWordToken(token) {
  return /^[A-Za-z']+$/.test(token);
}

export default function Reading() {
  const { state, refresh } = useApp();
  const courseId = state.user.courseId;
  const ability = state.user.abilityByCourse[courseId] || 0;
  const passage = selectReadingPassage(courseId, ability);
  const wordsForCourse = getWordsForCourse(courseId);
  const lookup = React.useMemo(() => {
    const map = new Map();
    wordsForCourse.forEach((word) => map.set(word.lemma.toLowerCase(), word.id));
    return map;
  }, [wordsForCourse]);

  if (!passage) {
    return <div className="card">No passages available for this course yet.</div>;
  }

  const tokens = splitTokens(passage.text);

  return (
    <div className="stack">
      <div className="card stack">
        <h2>{passage.title}</h2>
        <div className="flex" style={{ flexWrap: "wrap" }}>
          <span className="badge">Source: {passage.sourceLabel}</span>
          <span className="badge">License: {passage.licenseLabel}</span>
        </div>
        <p style={{ lineHeight: 1.9 }}>
          {tokens.map((token, index) => {
            const normalized = token.toLowerCase();
            if (!isWordToken(token)) return <span key={index}>{token}</span>;
            const wordId = lookup.get(normalized);
            const basketId = wordId || `raw:${normalized}`;
            return (
              <span
                key={index}
                className="word-chip"
                draggable
                onDragStart={(event) => {
                  event.dataTransfer.setData("text/plain", basketId);
                }}
                onClick={() => {
                  addToBasket(basketId);
                  refresh();
                }}
                style={{ marginRight: 6 }}
              >
                {token}
              </span>
            );
          })}
        </p>
        <p className="footer">Tip: click or drag any word to the basket.</p>
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const wordId = event.dataTransfer.getData("text/plain");
          if (wordId) {
            addToBasket(wordId);
            refresh();
          }
        }}
      >
        <BasketBar basketIds={state.basket} courseId={courseId} onUpdate={refresh} />
      </div>
    </div>
  );
}
