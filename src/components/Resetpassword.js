import React, { useState } from "react";

const ResetPassword = ({ email, onBack }) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/verify-forgot-password-code`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, providedCode: code, newPassword }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setTimeout(onBack, 1500);
    } catch (err) {
      setMessage("Reset failed!");
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="number"
          placeholder="Verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default ResetPassword;
