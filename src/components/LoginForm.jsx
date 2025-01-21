// import React from "react";

import { useState } from "react";
import Emoji from "./Emoji";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import FormError from "./FormError";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const { handleLogin, loading, error } = useUser();
    const passwordError = error.type === "password-error";

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin({ emailAddress: email, password: password }, () =>
            navigate("/app")
        );
    }
    return (
        <>
            <h1>
                Get Started <Emoji txt="✈️" />
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} disabled={loading}
                    required />
                </div>

                <div>
                    <label htmlFor="password">Password  {passwordError && <FormError txt={error.message} />}</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} 
                    disabled = {loading} required />
                </div>
                {!passwordError && <FormError txt={error.message} />}
                <button>{loading ? "Login Up..." : "Login"}</button>
            </form>
        </>
    );
}

export default LoginForm;
