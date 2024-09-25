import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // For success message
  const navigate = useNavigate(); // To redirect the user
  const [loading, setLoading] = useState(false); // Correct setter function name

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    setError(null); // Clear any previous error
    setSuccess(null); // Clear previous success message

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      console.log(res.data);
      setSuccess("Account created successfully! Redirecting...");

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          {/* Disable the button while loading */}
          <button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
