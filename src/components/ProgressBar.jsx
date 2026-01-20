import React from "react";

export default function ProgressBar({ label, value, total }) {
  const safeTotal = total || 1;
  const percent = Math.min(100, Math.round((value / safeTotal) * 100));
  return (
    <div className="progress">
      <div className="progress-label">
        <span>{label}</span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
