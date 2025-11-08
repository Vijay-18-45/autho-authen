import React, { useState } from "react";

const ForgotPassword = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/send-forgot-password-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show readable backend message (Joi message or other)
        setMessage(data.message || "Failed to send reset code.");
        return;
      }

      setMessage("Reset code sent successfully to your email!");
      onNext(email);
    } catch (err) {
      setMessage("Network error. Try again later.");
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Code</button>
      </form>

      <p className="message">{message}</p>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={onBack}
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

export default ForgotPassword;

