import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Empty validation
        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        // Login success for any email/password
        setError("");

        // Clear fields
        setEmail("");
        setPassword("");

        alert("Login Successful");
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h2>{isRegister ? "Register" : "Login"}</h2>

                <form onSubmit={handleSubmit}>

                    {isRegister && (
                        <input type="text" placeholder="Enter Name" />
                    )}

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Error Message */}
                    {error && <p className="error">{error}</p>}

                    <button type="submit">
                        {isRegister ? "Register" : "Login"}
                    </button>

                </form>

                <p onClick={() => setIsRegister(!isRegister)}>
                    {isRegister
                        ? "Already have an account? Login"
                        : "Don't have an account? Register"}
                </p>

            </div>
        </div>
    );
};

export default Login;