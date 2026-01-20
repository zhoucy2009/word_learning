import React from "react";
import { useApp } from "../AppContext.jsx";
import { getWordById, removeFromMistakes } from "../data/logic.js";

export default function Mistakes() {
  const { state, refresh } = useApp();
  const proMode = state.user.settings.proMode;

  if (!proMode) {
    return (
      <div className="card stack">
        <h2>Mistakes (Pro only)</h2>
        <p>Enable Pro mode to access Mistakes.</p>
      </div>
    );
  }

  return (
    <div className="card stack">
      <h2>Mistakes</h2>
      {state.mistakes.length === 0 ? (
        <p>No mistakes recorded yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Definition</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.mistakes.map((wordId) => {
              const word = getWordById(wordId);
              const label = word
                ? word.lemma
                : wordId.startsWith("raw:")
                  ? wordId.replace("raw:", "")
                  : wordId;
              return (
                <tr key={wordId}>
                  <td>{label}</td>
                  <td>{word ? word.senses.en : "Definition not seeded yet."}</td>
                  <td>
                    <button
                      className="secondary"
                      onClick={() => {
                        removeFromMistakes(wordId);
                        refresh();
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
