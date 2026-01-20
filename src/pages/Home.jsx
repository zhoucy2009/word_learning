import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../AppContext.jsx";
import { estimateVocabSize, getCourseById, getDailyProgress } from "../data/logic.js";

export default function Home() {
  const { state } = useApp();
  const course = getCourseById(state.user.courseId);
  const ability = state.user.abilityByCourse[state.user.courseId] || 0;
  const progress = getDailyProgress(state, state.user.courseId);
  const proMode = state.user.settings.proMode;

  return (
    <div className="stack">
      <div className="card">
        <h2>Welcome back</h2>
        <p>
          Current course: <strong>{course.name}</strong>. Your estimated vocabulary size
          is <strong>{estimateVocabSize(ability)}</strong> words.
        </p>
        <div className="flex" style={{ flexWrap: "wrap" }}>
          <span className="badge">Today interacted: {progress.interactedToday}</span>
          <span className="badge">Today learned: {progress.learnedToday}</span>
        </div>
      </div>

      <div className="grid grid-3">
        <div className="module">
          <h3>Flashcard Drill</h3>
          <p>Quick sessions to learn and review targeted words.</p>
          <Link to="/flashcards">
            <button>Start Drill</button>
          </Link>
        </div>
        <div className="module">
          <h3>Guided Reading</h3>
          <p>Select words in context and build your basket.</p>
          <Link to="/reading">
            <button>Open Reading</button>
          </Link>
        </div>
        <div className="module">
          <h3>Practice Tests</h3>
          <p>MCQ and spelling practice to cement your knowledge.</p>
          <Link to="/practice">
            <button>Start Practice</button>
          </Link>
        </div>
      </div>

      {proMode && (
        <div className="card pro-banner">
          <h3>Pro mode engaged</h3>
          <p>
            Advanced vocabulary is now blended into sessions, and your ability updates
            consider accuracy and speed for smarter level analysis.
          </p>
        </div>
      )}

      <div className="card footer">
        <p>
          Full loop: flashcards → reading → practice. Progress and ability updates are
          stored locally for guest users.
        </p>
      </div>
    </div>
  );
}
