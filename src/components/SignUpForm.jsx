import { useState } from "react";
import { useUser } from "../context/UserContext";
import FormError from "./FormError";
import { useNavigate } from "react-router";

// SignUp form LifeCycle

// Mount
// error = {}
// if(error.message === undefined ) navigate("/app")   ====> True

// Rerender ( handleSignUp -- error )
// error = {message : "errorMessage", type: "errorType"}

// Rerender ( handleSignUp -- success )
// error = {}
// if(error.message === undefined ) navigate("/app")   ====> True

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { handleSignUp, loading, error } = useUser();
    const passwordError = error.type === "password-error";

    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        handleSignUp({ name: name, email: email, password: password }, () =>
            navigate("/app")
        );
        // if (error.message === undefined) navigate("/app");
        // We cann't access updated state immediately, it will be available after rerender
    }

    // if (error.message === undefined) navigate("/app");
    // 1. Mounting Phase
    // 2. Rerender >> handleSignUp(success)

    return (
        <>
            <h1>Create New Accout</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                        {passwordError && <FormError txt={error.message} />}
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        disabled={loading}
                        required
                    />
                </div>

                {!passwordError && <FormError txt={error.message} />}

                <button>{loading ? "Signing up..." : "Sign Up"}</button>
            </form>
        </>
    );
}

export default SignUpForm;