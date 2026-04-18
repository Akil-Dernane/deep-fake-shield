"use client";

import { signIn } from "next-auth/react";
import { authApi } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Fingerprint,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AtSign,
  AlertCircle,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 2. Inline Validation instead of alert
    if (!isLogin && formData.password !== formData.password_confirm) {
      setError({
        password_confirm: [
          "Passwords do not match. System synchronization failed.",
        ],
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          username: formData.username,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid operator credentials. Access denied.");
          setLoading(false);
          return;
        }
      } else {
        const res = await authApi.register(formData);

        if (!res.ok) {
          const data = await res.json();
          // Extract specific error if backend provides it
          setError(data.errors || {});
          setMessage(
            data.message || "Registration failed. Identity already exists.",
          );
          setLoading(false);
          return;
        }

        await signIn("credentials", {
          username: formData.username,
          password: formData.password,
          redirect: false,
        });
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Network protocols interrupted. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setError("");
    setShowPassword(false);
    setFormData({
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-[#adc6ff] to-[#357df1] flex items-center justify-center">
            <Fingerprint className="text-[#002e6a]" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            SENTINEL
          </h1>
          <p className="text-sm text-gray-400">
            {isLogin
              ? "Welcome back, Operator."
              : "Register new system credentials."}
          </p>
        </div>

        {message && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in fade-in zoom-in duration-200">
            <AlertCircle size={16} className="shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* FORM */}
        <form
          onSubmit={handleAuth}
          className="space-y-4 bg-[#222a3d]/60 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          {!isLogin && (
            <>
              {/* NAME ROW */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                    placeholder="John"
                    required
                  />
                  {error.first_name && (
                    <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                      SYSTEM: {error.first_name[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                    placeholder="Doe"
                    required
                  />
                  {error.last_name && (
                    <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                      SYSTEM: {error.last_name[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* USERNAME */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                  Username
                </label>
                <div className="relative">
                  <AtSign
                    className="absolute left-3 top-3 text-gray-500"
                    size={16}
                  />
                  <input
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                    placeholder="johndoe_7"
                    required
                  />
                </div>
                {error.username && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                    SYSTEM: {error.username[0]}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-500"
                    size={16}
                  />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                    placeholder="agent@sentinel.ia"
                    required
                  />
                </div>
                {error.email && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                    SYSTEM: {error.email[0]}
                  </p>
                )}
              </div>
            </>
          )}

          {isLogin && (
            <>
              {/* USERNAME */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                  Username
                </label>
                <div className="relative">
                  <AtSign
                    className="absolute left-3 top-3 text-gray-500"
                    size={16}
                  />
                  <input
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                    placeholder="johndoe_7"
                    required
                  />
                </div>
                {error.username && (
                  <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                    SYSTEM: {error.username[0]}
                  </p>
                )}
              </div>
            </>
          )}

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={16} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error.password && (
              <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                SYSTEM: {error.password[0]}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD (Register Only) */}
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gray-400 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-500"
                  size={16}
                />
                <input
                  id="password_confirm"
                  type={showPassword ? "text" : "password"}
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="w-full pl-10 py-3 bg-[#060e20] rounded-xl text-white text-sm border border-white/5 focus:border-blue-400/50 outline-hidden transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error.password_confirm && (
                <p className="text-[10px] text-red-400 mt-1 ml-1 px-2 py-1 bg-red-500/5 border-l-2 border-red-500/50 animate-pulse">
                  SYSTEM: {error.password_confirm[0]}
                </p>
              )}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading}
            className="w-full py-4 mt-2 rounded-xl bg-linear-to-r from-[#adc6ff] to-[#357df1] text-[#002e6a] font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : isLogin ? (
              "INITIALIZE SESSION"
            ) : (
              "CREATE OPERATOR ACCOUNT"
            )}
          </button>
        </form>

        {/* SWITCH MODES */}
        <button
          onClick={toggleMode}
          className="w-full text-xs text-gray-400 flex justify-center gap-2 hover:text-white transition-colors"
        >
          {isLogin ? "Need a new clearance?" : "Return to login terminal"}
          <span className="text-[#adc6ff] font-bold flex items-center gap-1">
            {isLogin ? "Sign up" : "Login"}
            <ArrowRight size={12} />
          </span>
        </button>
      </div>
    </div>
  );
}
