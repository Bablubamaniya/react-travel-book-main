// import React from "react";

import Emoji from "./Emoji";

function SignUpForm() {
    return (
        <>
            <h1>Creat New Account <Emoji txt="✈️"/></h1>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>

                <button>SignUp</button>
            </form>
        </>
    );
}

export default SignUpForm;
