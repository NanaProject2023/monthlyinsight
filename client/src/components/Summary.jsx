import React from "react";
import "./Summary.css";

function Summary({ entries }) {
  const profits = entries
    .filter(e => e.type === "profit")
    .reduce((acc, e) => acc + Number(e.amount), 0);

  const expenses = entries
    .filter(e => e.type === "expense")
    .reduce((acc, e) => acc + Number(e.amount), 0);

  const total = profits - expenses;

  return (
    <div className="summary">
  <div className="summary-row">
    <div className="summary-item">
      <p>Profit</p>
      <h3>${profits}</h3>
    </div>

    <div className="summary-item">
      <p>Expense</p>
      <h3>${expenses}</h3>
    </div>

    <div className="summary-item">
      <p>Total</p>
      <h2 style={{ color: expenses > profits ? "red" : "green" }}>
        ${total}
      </h2>
    </div>
  </div>
</div>
    
  );
}

export default Summary;