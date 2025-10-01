import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./css/Login.css";
import Logo from "../assets/img/logo.png";
import LoginBg from "../assets/img/login-bg.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // store error message

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form.email, form.password);

      if (res.access) {
        localStorage.setItem("access", res.access);
        localStorage.setItem("refresh", res.refresh);
        navigate("/gst");
      } else {
        setError(res.message || "Unexpected response from server");
        setTimeout(() => setError(""), 2000); //auto hide in 2s
      }
    } catch (err) {
      let msg = "Something went wrong";
      if (err.data && err.data.message) {
        msg = err.data.message;
      }
      setError(msg);
      setTimeout(() => setError(""), 2000); // auto hide in 2s
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      {/* Logo */}
      <div className="login-logo">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Login Box */}
      <div className="d-flex align-items-center justify-content-center login-container">
        <div className="login-box">
          <div className="text-center mb-4 login-title">Login</div>

          {/* Flash Alert */}
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3 input-group d-flex flex-column">
              <label className="form-label">Email</label>
              <input
                required
                type="email"
                name="email"
                className="form-input-login w-100 form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="mb-3 input-group position-relative">
              <label className="form-label">Password</label>
              <div className="position-relative w-100">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-input-login w-100 pe-5 form-control"
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-end mb-3">
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-100 login-button btn btn-primary"
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}