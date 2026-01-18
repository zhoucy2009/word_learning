import React from "react";
import { useApp } from "../AppContext.jsx";
import { getWordById, removeFromNotes } from "../data/logic.js";

export default function Notes() {
  const { state, refresh } = useApp();

  return (
    <div className="card stack">
      <h2>Notes</h2>
      {state.notes.length === 0 ? (
        <p>No saved words yet.</p>
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
            {state.notes.map((wordId) => {
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
                        removeFromNotes(wordId);
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
