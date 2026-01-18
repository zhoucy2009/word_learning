import React from "react";
import { useApp } from "../AppContext.jsx";
import {
  buildMcqItem,
  buildSpellingItem,
  getWordById,
  getWordsForCourse,
  recordPractice,
  selectPracticeItems,
  setAbility
} from "../data/logic.js";
import { Link } from "react-router-dom";

export default function Practice() {
  const { state, refresh } = useApp();
  const courseId = state.user.courseId;
  const ability = state.user.abilityByCourse[courseId] || 0;
  const [items, setItems] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [startTime, setStartTime] = React.useState(Date.now());
  const [complete, setComplete] = React.useState(false);
  const [summary, setSummary] = React.useState(null);

  const buildSession = React.useCallback(() => {
    const selected = selectPracticeItems(courseId, ability, 5, state);
    const allWords = getWordsForCourse(courseId);
    const nextItems = selected.map((word, index) =>
      index % 2 === 0 ? buildMcqItem(word, allWords) : buildSpellingItem(word)
    );
    setItems(nextItems);
    setAnswers({});
    setCurrentIndex(0);
    setStartTime(Date.now());
    setComplete(false);
    setSummary(null);
  }, [courseId, ability, state]);

  React.useEffect(() => {
    buildSession();
  }, [buildSession]);

  const current = items[currentIndex];
  const currentAnswer = answers[currentIndex]?.value;
  const currentCorrect =
    currentAnswer !== undefined
      ? current.type === "mcq"
        ? currentAnswer === current.answer
        : currentAnswer.trim().toLowerCase() === current.answer.toLowerCase()
      : null;

  const handleAnswer = (value) => {
    const timeSpent = Date.now() - startTime;
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: { value, timeSpent }
    }));
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setStartTime(Date.now());
    } else {
      const results = items.map((item, index) => {
        const response = answers[index];
        const isCorrect = response
          ? item.type === "mcq"
            ? response.value === item.answer
            : response.value.trim().toLowerCase() === item.answer.toLowerCase()
          : false;
        return {
          wordId: item.wordId,
          isCorrect,
          timeSpent: response ? response.timeSpent : 0
        };
      });
      recordPractice(courseId, items, results);
      const correctWords = results.filter((result) => result.isCorrect);
      const avgDifficulty = correctWords.length
        ? Math.round(
            correctWords
              .map((result) => getWordById(result.wordId)?.difficulty || 0)
              .reduce((sum, value) => sum + value, 0) / correctWords.length
          )
        : ability;
      const nextAbility = Math.round(ability * 0.8 + avgDifficulty * 0.2);
      setAbility(courseId, nextAbility);
      setSummary({
        total: items.length,
        correct: results.filter((result) => result.isCorrect).length
      });
      setComplete(true);
      refresh();
    }
  };

  if (!items.length) {
    return <div className="card">No practice items available yet.</div>;
  }

  if (complete) {
    return (
      <div className="card stack">
        <h2>Practice complete</h2>
        <p>Your ability rank has been updated based on correct answers.</p>
        {summary && (
          <div className="notice">
            Score: {summary.correct} / {summary.total}
          </div>
        )}
        <div className="flex" style={{ flexWrap: "wrap" }}>
          <button onClick={buildSession}>Start new practice</button>
          <Link to="/">
            <button className="secondary">Exit to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card stack">
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <h2>Practice Tests</h2>
        <span className="badge">
          Question {currentIndex + 1} / {items.length}
        </span>
      </div>
      <p>{current.prompt}</p>
      {current.type === "mcq" ? (
        <div className="stack">
          {current.options.map((option) => (
            <button
              key={option}
              className={
                answers[currentIndex]?.value === option ? "secondary" : "ghost"
              }
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <input
          type="text"
          placeholder="Type your answer"
          value={answers[currentIndex]?.value || ""}
          onChange={(event) => handleAnswer(event.target.value)}
        />
      )}
      {currentAnswer !== undefined && (
        <div className={`notice ${currentCorrect ? "" : "danger-note"}`}>
          {currentCorrect ? "Correct!" : `Incorrect. Correct answer: ${current.answer}`}
        </div>
      )}
      <div className="flex" style={{ justifyContent: "space-between" }}>
        <button className="secondary" onClick={buildSession}>
          Reset
        </button>
        <button onClick={handleNext}>
          {currentIndex < items.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
