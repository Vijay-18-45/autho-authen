
import React, { useState } from "react";

const VerifyCode = ({ email, onBack }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/send-verification-code`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Failed to send code!");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/verifyVerificationCode`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, providedCode: code }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Verification failed!");
    }
  };

  return (
    <div className="form-container">
      <h2>Email Verification</h2>
      <p>We’ll send a verification code to: <b>{email}</b></p>
      <button onClick={handleSendCode}>Send Verification Code</button>

      <form onSubmit={handleVerify} style={{ marginTop: "1rem" }}>
        <input
          type="number"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>

      <p className="message">{message}</p>

      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default VerifyCode;
