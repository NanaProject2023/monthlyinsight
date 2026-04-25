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
import Auth from "./components/Auth";

function App() {
  const [entries, setEntries] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

const fetchEntries = async () => {
  try {
    const res = await axios.get("https://monthlyinsight.onrender.com/entries", {
      headers: { Authorization: token },
    });
    setEntries(res.data);
  } catch (err) {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      setToken(null);
    }
    console.error(err);
  }
};
  useEffect(() => {
    if (token){
    fetchEntries();
    }
  }, [token]);

const addEntry = async (entry) => {
  await axios.post("https://monthlyinsight.onrender.com/entries", entry, {
    headers: {
      Authorization: token, 
    },
  });
  fetchEntries();
};

const deleteEntry = async (id) => {
  await axios.delete(`https://monthlyinsight.onrender.com/entries/${id}`, {
    headers: {
      Authorization: token, 
    },
  });
  fetchEntries();
};


  if (!token) {
  return <Auth setToken={setToken} />;
}

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
    
    <button
      id="logout-button"
      onClick={() => {
       localStorage.removeItem("token");
       setToken(null);
       setEntries([]); // 🔥 important
     }}
    >
    Logout
    </button>

    </div>
  );
}

export default App;