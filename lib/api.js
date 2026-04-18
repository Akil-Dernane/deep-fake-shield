const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  // 1. REGISTER: Create a new user
  register: async (userData) => {
    const res = await fetch(`${API_URL}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return res;
  },

  // 2. HEALTH: Check if Django is actually running
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/health/`);
      return res.ok;
    } catch {
      return false;
    }
  },

  // 3. VERIFY: Check if a token is still valid
  verifyToken: async (token) => {
    const res = await fetch(`${API_URL}/api/auth/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return res.ok;
  },
};
