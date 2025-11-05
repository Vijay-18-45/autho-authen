import React, { useState } from "react";

const ForgotPassword = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/send-forgot-password-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) onNext(email);
    } catch (err) {
      setMessage("Failed to send code!");
    }
  };

  return (
    <div className="form-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Code</button>
      </form>
      <p className="message">{message}</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default ForgotPassword;
