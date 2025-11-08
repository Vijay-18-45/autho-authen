

import React, { useState } from "react";

const Login = ({ onSignupClick, onForgotClick, onLoginSuccess }) => {
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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid credentials.");
        return;
      }

      localStorage.setItem("token", data.token);
      onLoginSuccess(email);
    } catch (err) {
      setMessage("Network error. Try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
      <p>
        Don’t have an account?{" "}
        <span className="link" onClick={onSignupClick}>
          Sign Up
        </span>
      </p>
      <p>
        <span className="link" onClick={onForgotClick}>
          Forgot Password?
        </span>
      </p>
    </div>
  );
};

export default Login;

