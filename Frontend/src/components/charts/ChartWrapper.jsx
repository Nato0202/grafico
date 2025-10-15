import React from "react";
import "./index.scss";

export default function ChartWrapper({ title, children }) {
  return (
    <div className="chart-container">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
