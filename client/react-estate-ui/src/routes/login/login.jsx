import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


function Login() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // For success message
  const navigate = useNavigate(); // To redirect the user
  const [loading, setLoading] = useState(false); // Correct setter function name

  const { updateUser } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    setError(null); // Clear any previous error
    setSuccess(null); // Clear previous success message

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data); // Update the user context with the response data 
      setSuccess("Logged in successfully! Redirecting...");

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false); // Set loading to false 
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required type="text" placeholder="Username" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          {/* Disable the button while loading */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <Link to="/register">{"Don't"} have an account? Register</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
