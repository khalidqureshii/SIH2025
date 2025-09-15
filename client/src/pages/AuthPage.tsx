import { useState } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";
import { storeToken, authenticateUser } from "@/store/features/authSlice";
import {LINK} from "@/store/Link";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const endpoint = isLogin
        ? `${LINK}/api/auth/login`
        : `${LINK}/api/auth/register`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Auth failed");

      const data = await res.json();
      console.log("Data -> ", data);

      if (!data.token) {
        throw new Error("No token received from server");
      }

      dispatch(storeToken(data.token));

      await dispatch(authenticateUser(data.token));

      navigate("/");
    } catch (err) {
      console.error("Login/Register error:", err);
      alert(t("auth_page.errors.alert"));
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white">
      {/* Left Panel */}
      <div className="hidden md:flex relative flex-col justify-center items-center w-1/2 text-white p-10 overflow-hidden bg-gradient-to-br from-green-700 to-green-500 rounded-r-3xl shadow-4xl shadow-green-800">
        <img
          src="/images/auth-side-image.jpg"
          alt={t("auth_page.leftPanel.imageAlt")}
          className="absolute inset-0 w-full h-full object-cover blur-[2px] opacity-80"
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <img src="plant.png" className="w-20 h-20" />
            <h1 className="text-3xl font-bold tracking-wide">
              {/* {t("auth_page.leftPanel.title")} */}
              Bhoomiबंधु
            </h1>
          </div>
          <p className="text-lg  leading-relaxed max-w-md">
            {t("auth_page.leftPanel.description")}
          </p>
          <Leaf className="w-24 h-24 mt-8 opacity-80" />
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isLogin
              ? t("auth_page.rightPanel.headings.login")
              : t("auth_page.rightPanel.headings.register")}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t("auth_page.rightPanel.placeholders.username")}
                  className="w-full bg-green-50"
                />
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t("auth_page.rightPanel.placeholders.location")}
                  className="w-full bg-green-50"
                />
              </>
            )}
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("auth_page.rightPanel.placeholders.email")}
              className="w-full bg-green-50"
            />
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("auth_page.rightPanel.placeholders.password")}
              className="w-full bg-green-50"
            />

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow"
            >
              {isLogin
                ? t("auth_page.rightPanel.buttons.login")
                : t("auth_page.rightPanel.buttons.register")}
            </Button>
          </form>

          {/* Switch between login/register */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            {isLogin ? (
              <>
                {t("auth_page.rightPanel.switchAuth.noAccount")}{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-green-700 font-semibold hover:underline"
                >
                  {t("auth_page.rightPanel.switchAuth.register")}
                </button>
              </>
            ) : (
              <>
                {t("auth_page.rightPanel.switchAuth.hasAccount")}{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green-700 font-semibold hover:underline"
                >
                  {t("auth_page.rightPanel.switchAuth.login")}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
