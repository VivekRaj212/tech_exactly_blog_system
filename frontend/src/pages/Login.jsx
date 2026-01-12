import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // store access token
      login(res.data.accessToken, res.data.user.role, res.data.user.name);
      navigate("/");

      alert("Login successful");
    } catch (error) {
      console.log("login error: ", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4 text-center mb-4">
          <h1>Login</h1>
        </div>
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <form
            className="border rounded-3 p-4 shadow-sm bg-white"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password */}
            <div className="mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forget Password */}
            <div className="d-flex justify-content-end align-items-center mb-4">
              <a href="#" className="text-decoration-none">
                Forgot password?
              </a>
            </div>
            {/* Sign In */}
            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Sign in
            </button>
            {/* Register */}
            <div className="text-center mb-3">
              <span className="text-muted">Not a member? </span>
              <Link to="/register" className="text-decoration-none">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
