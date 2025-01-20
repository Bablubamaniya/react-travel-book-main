import { createContext, useContext, useReducer } from "react";
import { loginUser, signUpByUser } from "../servieces/apiUsers";

const UserContext = createContext();

const initialState = {
    user: null,
    error: null,
    loading: false,
};

const reducer = function (state, action) {
    switch (action.type) {
        case "user/login":
            return { ...state, loading: false, user: action.Payload };
        case "user/signUp":
            return { ...state, loading: false, user: action.Payload };
        case "user/logOut":
            return {...initialState,}
        case "error":
            return { ...state, loading: false, error: action.Payload };
        case "loading":
            return { ...state, loading: false };
        default:
            return new Error(`No action found with the name:"${action.type}"`);
    }
};
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [user, error, loading] = state;

    async function handleSignUp(newUser) {
        try {
            dispatch({ type: "loading" });
            const user = await signUpByUser(newUser);
            dispatch({ type: "user/signup", payload: user });
        } catch (error) {
            dispatch({ type: "error", payload: error.message });
        }
    }

    async function handleLogin(emailAddress, password) {

        try {
            dispatch({ type: "loading" });
            const user = await loginUser(emailAddress,password);
            dispatch({ type: "user/login", payload: user });
        } catch (error) {
            dispatch({ type: "error", payload: error.message });
        }
    }
    function handleLogout(){
        dispatch({type:"user/logOut"});
    }

    return (
        <UserContext.Provider value={{
            user:user,
            error:error,
            loading:loading,
            handleLogin:handleLogin,
            handleSignUp:handleSignUp,
            handleLogout:handleLogout,
        }} >{children}
        </UserContext.Provider>
    )

}

export function useUser(){
    const context = useContext(UserContext);
    if(context===undefined)
        throw new Error("Trying to access ")
}
