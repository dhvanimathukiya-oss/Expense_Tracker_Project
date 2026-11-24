
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/login.css";

const Login=() => {

    const navigate=useNavigate();
    const { setUser }=useAuth();

    const [formdata, setFormData]=useState({
        email: "",
        password: ""
    });

    const handleChange=(e) => {
        const { name, value }=e.target;

        setFormData({
            ...formdata,
            [name]: value
        });
    };

    const handleSubmit=async (e) => {
        e.preventDefault();

        try {
            const email=formdata.email.trim();

            const res=await fetch(
                `http://localhost:3000/users?email=${encodeURIComponent(email)}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }

            const result=await res.json();

            if (
                result.length>0&&
                result[0].email===email&&
                result[0].password===formdata.password
            ) {

                const storeuser=result[0];

                localStorage.setItem(
                    "loginuser",
                    JSON.stringify(storeuser)
                );

                setUser(storeuser);

                if (storeuser.role==="admin") {
                    navigate("/admindash", { replace: true });
                } else {
                    navigate("/userdash", { replace: true });
                }

            } else {
                alert("Invalid Email or Password");
            }

        } catch (err) {
            console.log("Login Error:", err);
            alert("Unable to connect to JSON Server.");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-icon">↗</div>

                <h2 className="login-title">Welcome Back!</h2>

                <p className="login-subtitle">
                    Sign in to manage your expenses.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="login-form-group">
                        <label>Email Address</label>

                        <input
                            className="login-input"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formdata.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label>Password</label>

                        <input
                            className="login-input"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formdata.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="login-button" type="submit">
                        Login to Account
                    </button>

                </form>

                <p className="login-footer">
                    Don't have an account?{" "}
                    <Link to="/reg">Sign Up</Link>
                </p>

            </div>

        </div>
    );
};

export default Login;
