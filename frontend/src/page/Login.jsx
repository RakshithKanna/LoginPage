import React, { useState } from "react";
import { login } from "../services/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }
    setLoading(true);
    try {
      // for now this will call your backend later
      const res = await login({ email, password });
      if (res?.ok) {
        localStorage.setItem("token", res.token);
        alert("Login success!");
      } else {
        setError(res?.message || "Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "6rem auto", padding: 20, border: "1px solid #eee", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 12 }}>Sign in</h2>
      {error && <div style={{ color: "crimson", marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 6 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <label style={{ display: "block", marginBottom: 6 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: "#0b5fff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
