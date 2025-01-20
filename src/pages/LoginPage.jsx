import Nav from "../components/Nav";
import Logo from "../components/Logo";
import style from "../styles/login.module.css";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useState } from "react";

function LoginPage() {
    const [showLogin, setshowLogin] = useState(false);

    function toggleLogin() {
        setshowLogin(function (showLogin) {
            return !showLogin;
        });
    }
    return (
        <div className={style.loginPage}>
            <Nav />
            <main className={style.loginSection}>
                <div>
                    <div className={style.imageContainer}>
                        <img
                            // className={style.loginImage}
                            src="./login.jpg"
                            alt="loading.."
                        />
                    </div>

                    <div className={style.formContainer}>
                        <div className="logoBox">
                            <Logo /> <span>TravelBook</span>
                        </div>
                        {showLogin && (
                            <>
                                <LoginForm />
                                <button>do not have account ? signUp </button>
                            </>
                        )}
                        {!showLogin && (
                            <>
                                <SignUpForm />
                                <button onClick={toggleLogin}>
                                    Already have account ? login{" "}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;
