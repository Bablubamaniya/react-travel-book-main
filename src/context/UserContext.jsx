import { createContext, useContext, useReducer } from "react";
import { loginUser, signUpByUser } from "../servieces/apiUsers";

const UserContext = createContext();

const initialState = {
    user: null,
    error: {},
    loading: false,
};

const reducer = function (state, action) {
    switch (action.type) {
        case "user/login":
            return { ...state, loading: false, user: action.payload };
        case "user/signUp":
            return { ...state, loading: false, user: action.payload };
        case "user/logOut":
            return { ...initialState };
        case "error":
            return {
                ...state,
                loading: false,
                error: {
                    type: action.payload.type,
                    message: action.payload.message,
                },
            };
        case "loading":
            return { ...state, loading: false };
        default:
            return new Error(`No action found with the name:"${action.type}"`);
    }
};
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, error, loading } = state;

    async function handleSignUp(newUser, action = () => {}) {
        try {
            dispatch({ type: "loading" });
            const user = await signUpByUser(newUser);
            dispatch({ type: "user/signUp", payload: user });
            action();
        } catch (error) {
            dispatch({
                type: "error",
                payload: { type: error.cause, message: error.message },
            });
        }
    }

    async function handleLogin({ emailAddress, password }, action = () => {}) {
        try {
            dispatch({ type: "loading" });
            const user = await loginUser(emailAddress, password);
            dispatch({ type: "user/login", payload: user });
            action();
        } catch (error) {
            dispatch({
                type: "error",
                payload: { type: error.cause, message: error.message },
            });
        }
    }
    function handleLogout() {
        dispatch({ type: "user/logOut" });
    }

    return (
        <UserContext.Provider
            value={{
                user: user,
                error: error,
                loading: loading,
                handleLogin: handleLogin,
                handleSignUp: handleSignUp,
                handleLogout: handleLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined)
        throw new Error("trying to access context outside the provider ");
    return context;
}
