import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./Week.css"


function Wk1({ entries = [] }) {
  const filtered = entries.filter(
    (e) => Number(e.day) >= 1 && Number(e.day) <= 7
  );

  const profit = filtered
    .filter((e) => e.type === "profit")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const expense = filtered
    .filter((e) => e.type === "expense")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const data = [
    { name: "Profit", value: profit },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="week-card">
      <h3>Week 1</h3>

      {profit === 0 && expense === 0 ? (
        <p>No data</p>
      ) : (
        <PieChart width={150} height={150}>
          <Pie data={data} dataKey="value">
            <Cell fill="green" />
            <Cell fill="red" />
          </Pie>
        </PieChart>
      )}
    </div>
  );
}

export default Wk1;