import React, { useState } from "react";

const AuthModal = ({ isOpen, onClose, user, setUser, onLogout }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin
      ? "http://127.0.0.1:8000/auth/jwt/create/"
      : "http://127.0.0.1:8000/auth/users/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          // 1. УБРАЛИ ALERT
          // 2. Сохраняем токен и имя
          localStorage.setItem("token", data.access);
          localStorage.setItem("username", formData.username);

          // 3. Обновляем состояние приложения -> Модалка сама перерисуется
          setUser(formData.username);
        } else {
          // Если регистрация успешна - сразу пробуем войти (или просим войти)
          alert("Регистрация успешна! Теперь войдите."); // Тут алерт можно оставить как подсказку, или убрать
          setIsLogin(true);
        }
      } else {
        // Красивый вывод ошибок (убираем скобки JSON)
        const errorMsg = Object.values(data).flat().join(", ");
        setError(errorMsg || "Ошибка данных");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-fade">
      <div className="bg-[#1e1e1e] w-full max-w-md rounded-[30px] p-8 md:p-12 relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <i className="fi fi-rr-cross text-xl"></i>
        </button>

        {/* --- ЛОГИКА ОТОБРАЖЕНИЯ --- */}

        {user ? (
          // ВАРИАНТ 1: ПОЛЬЗОВАТЕЛЬ УЖЕ ВОШЕЛ
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fi fi-rr-user text-4xl text-white"></i>
            </div>
            <h2 className="text-white text-3xl font-bold mb-2">
              Hello, {user}!
            </h2>
            <p className="text-[#787878] mb-8">
              You are successfully logged in.
            </p>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full bg-red-500/10 text-red-500 border border-red-500/50 font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              Log Out
            </button>
          </div>
        ) : (
          // ВАРИАНТ 2: ФОРМА ВХОДА (Если не вошел)
          <>
            <h2 className="text-white text-3xl font-bold mb-8 text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {error && (
              <div className="bg-red-500/20 text-red-200 p-3 rounded-lg text-sm text-center mb-4 border border-red-500/20">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Djoser требует username */}
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#252525] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all"
                required
              />

              {!isLogin && (
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#252525] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all"
                />
              )}

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#252525] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all"
                required
              />

              <button className="w-full bg-white text-black font-bold py-3 rounded-xl mt-4 hover:bg-gray-200 transition-all active:scale-95">
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-[#787878] text-sm hover:text-white transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
