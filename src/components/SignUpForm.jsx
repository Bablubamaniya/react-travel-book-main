// import React from "react";

import { useState } from "react";
import Emoji from "./Emoji";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const [handleSignUp, loading] = useUser();

    const navigate = useNavigate();
   async function handleSubmit(e) {
        e.preventDefault();
       await handleSignUp({ name: name, email: email, password: password });
    //    navigate("/app");

    }
    return (
        <>
            <h1>
                Creat New Account <Emoji txt="✈️" />
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={loading}
                    />
                </div>

                <button>{loading ? "Signing Up..." : "SignUp"}</button>
            </form>
        </>
    );
}

export default SignUpForm;
