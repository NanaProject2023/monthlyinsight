import React, { useEffect, useState } from "react";
import axios from "axios";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import Summary from "./components/Summary";
import Wk1 from "./components/Wk1";
import Wk2 from "./components/Wk2";
import Wk3 from "./components/Wk3";
import Wk4 from "./components/Wk4";
import AllWks from "./components/AllWks";

function App() {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const res = await axios.get("http://localhost:5000/entries");
    setEntries(res.data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async (entry) => {
    await axios.post("http://localhost:5000/entries", entry);
    fetchEntries();
  };

  const deleteEntry = async (id) => {
    await axios.delete(`http://localhost:5000/entries/${id}`);
    fetchEntries();
  };

  return (
    <div className="container">
      <h1 id="app-title">Monthly Insight</h1>

      <Summary entries={entries} />

      <EntryForm addEntry={addEntry} />

      <EntryList entries={entries} deleteEntry={deleteEntry} />

      <div className="weeks-grid">
      <Wk1 entries={entries} />
      <Wk2 entries={entries} />
      <Wk3 entries={entries} />
      <Wk4 entries={entries} />
      <AllWks entries={entries} />
    </div>
    </div>
  );
}

export default App;