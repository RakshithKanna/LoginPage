const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function login(payload) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  // handle non-json or network errors in real app
  return res.json().catch(() => ({ ok: false, message: "Bad response from server" }));
}
