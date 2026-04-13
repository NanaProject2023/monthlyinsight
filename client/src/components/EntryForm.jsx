import React, { useState } from "react";
import "./EntryForm.css"

function EntryForm({ addEntry }) {
  const [day, setDay] = useState(1);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("profit");

  const handleSubmit = () => {
    addEntry({ day, title, amount, type });

    setTitle("");
    setAmount("");
  };

  return (
    <div className="entry-form">
    
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        {[...Array(31)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="profit">Profit</option>
        <option value="expense">Expense</option>
      </select>

      <button onClick={handleSubmit}>Enter</button>
    </div>
    
  );
}

export default EntryForm;