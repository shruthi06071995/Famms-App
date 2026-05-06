import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Empty validation
        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        // Dummy login condition
        if (email === "admin@gmail.com" && password === "1234") {
            setError("");
            alert("Login Successful");
        } else {
            setError("Invalid Email or Password");
        }
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