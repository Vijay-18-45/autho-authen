
import React, { useState } from "react";

const ResetPassword = ({ email, onBack }) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/verify-forgot-password-code`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, providedCode: code, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
      
        if (data.message?.includes("Password must")) {
          setMessage(
            "Password must contain at least 8 characters, including one uppercase, one lowercase, and one number."
          );
        } else if (data.message?.includes("email")) {
          setMessage("Please enter a valid email address.");
        } else {
          setMessage(data.message || "Password reset failed.");
        }
        return;
      }

      setMessage("Password has been reset successfully!");
      setTimeout(onBack, 1500);
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="form-container">
      <h2>Reset Password</h2>
      <p>Reset for: <b>{email}</b></p>
      <form onSubmit={handleReset}>
        <input
          type="number"
          placeholder="Enter reset code"
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
      
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
