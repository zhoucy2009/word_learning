import React from "react";
import {
  addToMistakes,
  addToNotes,
  clearBasket,
  getDefinitionByToken,
  getWordDefinition,
  getWordById,
  markInteracted,
  removeFromBasket
} from "../data/logic.js";

export default function BasketBar({ basketIds, courseId, onUpdate, proMode }) {
  const [mode, setMode] = React.useState("en");
  const [translated, setTranslated] = React.useState(false);

  const formatLabel = (wordId) =>
    wordId.startsWith("raw:") ? wordId.replace("raw:", "") : wordId;

  const getFallbackDefinition = (wordId) => {
    if (!wordId.startsWith("raw:")) return null;
    const token = wordId.replace("raw:", "");
    return getDefinitionByToken(token, proMode);
  };

  React.useEffect(() => {
    if (!basketIds.length) {
      setTranslated(false);
    }
  }, [basketIds]);

  const handleTranslate = (nextMode) => {
    if (!basketIds.length) return;
    basketIds.forEach((wordId) => {
      markInteracted(courseId, wordId);
    });
    setMode(nextMode);
    setTranslated(true);
    onUpdate();
  };

  const handleAddNotes = () => {
    basketIds.forEach((wordId) => addToNotes(wordId));
    onUpdate();
  };

  const handleAddMistakes = () => {
    basketIds.forEach((wordId) => addToMistakes(wordId));
    onUpdate();
  };

  return (
    <div className="basket">
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <strong>Basket</strong>
        <button
          className="secondary"
          onClick={() => {
            clearBasket();
            onUpdate();
          }}
        >
          Clear
        </button>
      </div>
      <div className="flex" style={{ flexWrap: "wrap", marginTop: 12 }}>
        {basketIds.length === 0 ? (
          <span>Add words from the passage.</span>
        ) : (
          basketIds.map((wordId) => {
            const word = getWordById(wordId);
            const label = word ? word.lemma : formatLabel(wordId);
            return (
              <span
                key={wordId}
                className="word-chip"
                onClick={() => {
                  removeFromBasket(wordId);
                  onUpdate();
                }}
              >
                {label} ✕
              </span>
            );
          })
        )}
      </div>
      <div className="flex" style={{ marginTop: 12, flexWrap: "wrap" }}>
        <button onClick={() => handleTranslate("en")}>Translate EN</button>
        <button onClick={() => handleTranslate("zh")}>Translate ZH</button>
        <button onClick={() => handleTranslate("both")}>Translate EN+ZH</button>
        <button className="secondary" onClick={handleAddNotes}>
          Add to Notes
        </button>
        <button className="secondary" onClick={handleAddMistakes}>
          Add to Mistakes
        </button>
      </div>
      {translated && basketIds.length > 0 && (
        <div className="stack" style={{ marginTop: 12 }}>
          {basketIds.map((wordId) => {
            const word = getWordById(wordId);
            const label = word ? word.lemma : formatLabel(wordId);
            const fallback = word ? null : getFallbackDefinition(wordId);
            return (
              <div key={wordId} className="card" style={{ padding: 12 }}>
                <strong>{label}</strong>
                {word ? (
                  <>
                    {mode !== "zh" && <div>EN: {getWordDefinition(word, proMode).en}</div>}
                    {mode !== "en" && <div>ZH: {getWordDefinition(word, proMode).zh}</div>}
                  </>
                ) : fallback ? (
                  <>
                    {mode !== "zh" && <div>EN: {fallback.en}</div>}
                    {mode !== "en" && <div>ZH: {fallback.zh}</div>}
                  </>
                ) : (
                  <div>Definition not available.</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
