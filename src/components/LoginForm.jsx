// import React from "react";

import Emoji from "./Emoji";

function LoginForm() {
    return (
        <>
            <h1>Get Started <Emoji txt="✈️"/></h1>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>

                <button>Login</button>
            </form>
        </>
    );
}

export default LoginForm;
