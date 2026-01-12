import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful. Please login.");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="container min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4 text-center mb-4">
          <h1>Registration</h1>
        </div>
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <form
            className="border rounded-3 p-4 shadow-sm bg-white"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            {/* Sign In */}
            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
              Register
            </button>

            {/* Navigate to Sigin */}
            <div className="text-center mb-3">
              <span className="text-muted">Already a member? </span>
              <Link to="/login" className="text-decoration-none">Login</Link>
            </div>
          </form>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form> */}
    </>
  );
};

export default Register;
