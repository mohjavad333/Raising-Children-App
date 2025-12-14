import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthMode = "welcome" | "signup" | "login";

export default function Welcome() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignupChange = (field: string, value: string) => {
    setSignupData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!signupData.name.trim()) {
      setError("نام الزامی است");
      return;
    }
    if (!signupData.email.trim()) {
      setError("ایمیل الزامی است");
      return;
    }
    if (!signupData.password) {
      setError("رمز عبور الزامی است");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError("رمز عبور‌ها مطابقت ندارند");
      return;
    }
    if (signupData.password.length < 6) {
      setError("رمز عبور باید حداقل 6 کاراکتر باشد");
      return;
    }

    setIsLoading(true);

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if email already exists
      if (users.some((u: { email: string }) => u.email === signupData.email)) {
        setError("این ایمیل قبلاً ثبت نام کرده است");
        return;
      }

      // Save new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: signupData.name,
        email: signupData.email,
        password: signupData.password, // In production, hash this!
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      // Redirect to parent profile setup
      navigate("/parent-profile");
    }, 800);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginData.email.trim()) {
      setError("ایمیل الزامی است");
      return;
    }
    if (!loginData.password) {
      setError("رمز عبور الزامی است");
      return;
    }

    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find user by email and password
      const user = users.find(
        (u: { email: string; password: string }) =>
          u.email === loginData.email && u.password === loginData.password
      );

      if (!user) {
        setError("ایمیل یا رمز عبور نادرست است");
        return;
      }

      // Save current user session
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Redirect to dashboard
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome Screen */}
        {authMode === "welcome" && (
          <div className="text-center mb-12 animate-fade-in">
            <div className="mb-8 flex justify-center">
              <img
                src="/logo.svg"
                alt="هم‌قدم در رشد فرزند"
                className="w-32 h-32"
              />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              هم‌قدم در رشد فرزند
            </h1>
            <p className="text-slate-600 text-lg mb-12">
              ورود و شروع کار
            </p>

            {/* Auth Options */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setError("");
                }}
                className="w-full py-4 px-6 bg-primary text-white rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg duration-200"
              >
                ثبت‌نام
              </button>
              <button
                onClick={() => {
                  setAuthMode("login");
                  setError("");
                }}
                className="w-full py-4 px-6 bg-white text-primary border-2 border-primary rounded-2xl font-semibold text-lg hover:bg-primary/5 transition-colors shadow-md hover:shadow-lg duration-200"
              >
                ورود
              </button>
            </div>
          </div>
        )}

        {/* Signup Form */}
        {authMode === "signup" && (
          <div className="bg-white rounded-3xl p-8 shadow-xl animate-fade-in">
            <button
              onClick={() => {
                setAuthMode("welcome");
                setError("");
                setSignupData({ name: "", email: "", password: "", confirmPassword: "" });
              }}
              className="mb-6 text-primary font-semibold text-sm hover:underline"
            >
              ← بازگشت
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              ثبت‌نام
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-right">
                {error}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  نام کامل
                </label>
                <input
                  type="text"
                  placeholder="نام خود را وارد کنید"
                  value={signupData.name}
                  onChange={(e) => handleSignupChange("name", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={signupData.email}
                  onChange={(e) => handleSignupChange("email", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  رمز عبور
                </label>
                <input
                  type="password"
                  placeholder="رمز عبور قوی را انتخاب کنید"
                  value={signupData.password}
                  onChange={(e) => handleSignupChange("password", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  تایید رمز عبور
                </label>
                <input
                  type="password"
                  placeholder="رمز عبور را مجدد وارد کنید"
                  value={signupData.confirmPassword}
                  onChange={(e) => handleSignupChange("confirmPassword", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
              >
                {isLoading ? "درحال ثبت‌نام..." : "ثبت‌نام و ورود"}
              </button>
            </form>
          </div>
        )}

        {/* Login Form */}
        {authMode === "login" && (
          <div className="bg-white rounded-3xl p-8 shadow-xl animate-fade-in">
            <button
              onClick={() => {
                setAuthMode("welcome");
                setError("");
                setLoginData({ email: "", password: "" });
              }}
              className="mb-6 text-primary font-semibold text-sm hover:underline"
            >
              ← بازگشت
            </button>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              ورود
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm text-right">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  آدرس ایمیل
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={(e) => handleLoginChange("email", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  رمز عبور
                </label>
                <input
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  value={loginData.password}
                  onChange={(e) => handleLoginChange("password", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary text-right"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 mt-6"
              >
                {isLoading ? "درحال ورود..." : "ورود"}
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
