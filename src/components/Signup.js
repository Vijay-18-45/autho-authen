
import React, { useState } from "react";

const Signup = ({ onLoginClick, onVerifyClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must contain at least 8 characters, including one uppercase, one lowercase, and one number."
      );
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed.");
        return;
      }

      setMessage("Account created! Please verify your email.");
      onVerifyClick(email);
    } catch (err) {
      setMessage("Network error! Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>

      <p className="message">{message}</p>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={onLoginClick}
          style={{
            background: "#ccc",
            color: "#333",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Login
        </button>
      </div>
    </div>
  );
};

export default Signup;



