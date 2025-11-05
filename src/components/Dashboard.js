import React from "react";

const Dashboard = ({ email, onLogout, onVerifyClick, onChangePasswordClick }) => {
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div className="dashboard">
      <h2>Welcome 🎉</h2>
      <p>Logged in as: {email}</p>
      <button onClick={onVerifyClick}>Verify Email</button>
      <button onClick={onChangePasswordClick}>Change Password</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
