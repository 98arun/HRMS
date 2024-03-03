import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUser,
  signInUser,
  storeUserData,
} from "../firebaseService";
import { useProfile } from "../contexts/Profile.Context";

const Login = () => {
  const { profile } = useProfile();

  console.log("Login:", profile);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    roleType: "",
  });
  const [isSignUpActive, setIsSignUpActive] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const handleMethodChange = () => {
    setIsSignUpActive(!isSignUpActive);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const { email, password, roleType } = formData;
    if (!email || !password || !roleType) return;
    try {
      const user = await createUser(email, password);
      await storeUserData(user.uid, {
        email: email,
        role: roleType,
      });
      toast.success(`User created successfully.`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    if (!email || !password) return;
    try {
      await signInUser(email, password);
      toast.success(`User login successfully.`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form className="mt-5" style={{ width: "50%", margin: "auto" }}>
        {isSignUpActive ? <h2>Sign Up</h2> : <h2>Login</h2>}
        {error && <p>{error}</p>}
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {isSignUpActive && (
          <div className="mb-3">
            <label className="form-label">Employee Role:</label>
            <select
              className="form-select"
              name="roleType"
              value={formData.roleType}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee Role</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
            </select>
          </div>
        )}
        {isSignUpActive ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignUp}
            style={{ background: "white", color: "#0d6efd" }}
          >
            Sign Up
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignIn}
            style={{ background: "white", color: "#0d6efd" }}
          >
            Login
          </button>
        )}
        {isSignUpActive ? (
          <a
            className="link-primary mt-3"
            style={{ cursor: "pointer", paddingLeft: "15px" }}
            onClick={handleMethodChange}
          >
            Login?
          </a>
        ) : (
          <a
            className="link-primary mt-3"
            style={{ cursor: "pointer", paddingLeft: "15px" }}
            onClick={handleMethodChange}
          >
            Create an account
          </a>
        )}
      </form>
    </div>
  );
};

export default Login;
