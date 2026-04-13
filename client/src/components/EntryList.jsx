import React from "react";
import "./EntryList.css";

function EntryList({ entries, deleteEntry }) {
  return (
    <ul className="entry-list">
    
      {entries.map((e) => (
        <li key={e.id}>
          Day {e.day} - {e.title} - ${e.amount} ({e.type})
          <button onClick={() => deleteEntry(e.id)}>X</button>
        </li>
      ))}
    </ul>
    
  );
}

export default EntryList;