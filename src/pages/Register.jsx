
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/register.css';

const Register=() => {
    const navigate=useNavigate();

    const [formdata, setFormData]=useState({
        name: '',
        email: '',
        role: 'user',
        password: ''
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
            const res=await fetch('http://localhost:3000/users', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formdata)
            });

            if (!res.ok) {
                throw new Error('Registration failed');
            }

            await res.json();
            alert('Registration successful!');
            navigate('/');
        } catch (err) {
            console.log(err);
            alert('Unable to register. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">

                <div className="register-icon">＋</div>

                <h2 className="register-title">
                    Create Account
                </h2>

                <p className="register-subtitle">
                    Sign up to start managing your expenses.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="register-form-group">
                        <label>Full Name</label>
                        <input
                            className="register-input"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formdata.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-form-group">
                        <label>Email Address</label>
                        <input
                            className="register-input"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formdata.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="register-form-group">
                        <label>Password</label>
                        <input
                            className="register-input"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formdata.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="register-button" type="submit">
                        Create Account
                    </button>
                </form>

                <p className="register-footer">
                    Already have an account?
                    <Link to="/">Sign In</Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
