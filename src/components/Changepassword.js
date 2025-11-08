import React, { useState } from "react";

const ChangePassword = ({ onBack }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const handleChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!passwordRegex.test(newPassword)) {
      setMessage(
        "Password must contain at least 8 characters, including one uppercase, one lowercase, and one number."
      );
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Password change failed.");
        return;
      }

      setMessage("Password updated successfully!");
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="form-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChange}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>

      <p className="message">{message}</p>

      <button onClick={onBack}>⬅ Back</button>
    </div>
  );
};

export default ChangePassword;

