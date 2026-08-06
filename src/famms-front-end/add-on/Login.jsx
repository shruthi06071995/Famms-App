import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !password || (isRegister && !name)) {

            setError("Please fill all fields");
            return;

        }

        const url = isRegister
            ? "http://localhost:5000/api/users/register"
            : "http://localhost:5000/api/users/login";

        const body = isRegister ? { name, email, password } : { email, password };

        try {

            const res = await fetch(url, {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),

            });

            const data = await res.json();

            if (!res.ok) {

                setError(data.message || "Something went wrong");
                return;
            }


            // Save token + user info in browser storage
            localStorage.setItem("userInfo", JSON.stringify(data));
            window.dispatchEvent(new Event("userInfoChanged"));

            setError("");
            setEmail("");
            setPassword("");
            setName("");

            navigate("/");   // redirect to home after login

        } catch (err) {

            setError("Server error, try again");

        }
    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h2>{isRegister ? "Register" : "Login"}</h2>

                <form onSubmit={handleSubmit}>

                    {isRegister && (

                        <input

                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                        />

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