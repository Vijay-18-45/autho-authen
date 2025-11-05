import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import VerifyCode from "./components/VerifyCode";
import ChangePassword from "./components/Changepassword";
import ForgotPassword from "./components/Forgotpassword";
import ResetPassword from "./components/Resetpassword";
import "./index.css";

function App() {
  const [page, setPage] = useState("login");
  const [userEmail, setUserEmail] = useState("");

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setPage("dashboard");
  };

  return (
    <div className="app">
      {page === "login" && (
        <Login
          onSignupClick={() => setPage("signup")}
          onForgotClick={() => setPage("forgot")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {page === "signup" && (
        <Signup
          onLoginClick={() => setPage("login")}
          onVerifyClick={(email) => {
            setUserEmail(email);
            setPage("verify");
          }}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          email={userEmail}
          onLogout={() => setPage("login")}
          onVerifyClick={() => setPage("verify")}
          onChangePasswordClick={() => setPage("change")}
        />
      )}

      {page === "verify" && (
        <VerifyCode email={userEmail} onBack={() => setPage("dashboard")} />
      )}

      {page === "change" && (
        <ChangePassword onBack={() => setPage("dashboard")} />
      )}

      {page === "forgot" && (
        <ForgotPassword
          onNext={(email) => {
            setUserEmail(email);
            setPage("reset");
          }}
          onBack={() => setPage("login")}
        />
      )}

      {page === "reset" && (
        <ResetPassword email={userEmail} onBack={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;
