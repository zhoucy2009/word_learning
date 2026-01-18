import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../AppContext.jsx";
import { getCourses, setCourse, setAbility } from "../data/logic.js";

export default function Onboarding() {
  const { state, refresh } = useApp();
  const navigate = useNavigate();
  const courses = getCourses();
  const [courseId, setCourseId] = React.useState(state.user.courseId);
  const [ability, setAbilityValue] = React.useState(
    state.user.abilityByCourse[state.user.courseId] || 300
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setCourse(courseId);
    setAbility(courseId, Number(ability));
    refresh();
    navigate("/");
  };

  return (
    <div className="card stack" style={{ maxWidth: 520 }}>
      <h2>Onboarding</h2>
      <p>Choose a course and set an initial ability rank.</p>
      <form className="stack" onSubmit={handleSubmit}>
        <label className="stack">
          Course
          <select value={courseId} onChange={(event) => setCourseId(event.target.value)}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>
        <label className="stack">
          Placement rank (0-1000)
          <input
            type="range"
            min="0"
            max="1000"
            value={ability}
            onChange={(event) => setAbilityValue(event.target.value)}
          />
          <div className="badge">{ability}</div>
        </label>
        <div className="flex">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
