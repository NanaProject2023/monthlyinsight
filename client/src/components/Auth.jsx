import { useState } from "react";
import axios from "axios";
import "./Auth.css";

export default function Auth({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const url = isLogin
      ? "https://monthlyinsight.onrender.com/auth/login"
      : "https://monthlyinsight.onrender.com/auth/signup";

    try {
      const res = await axios.post(url, { email, password });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Auth failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin
          ? "Don't have an account? Signup"
          : "Already have an account? Login"}
      </p>
    </div>
  );
}