import { validPassword } from "../helper";

const baseUrl = `http://localhost:3000`;

export async function getUserByEmail(emailAddress) {
    const response = await fetch(`${baseUrl}/users?email=${emailAddress}`);
    const data = await response.json();
    return data.at(0) || null;
}
export async function loginUser(emailAddress, password) {
    const user = await getUserByEmail(emailAddress);
    if (!user)
        throw new Error("wrong email or password", { cause: "form-error" });
    else {
        if (password === user.password) return user;
        else
            throw new Error("wrong email or password", { cause: "form-error" });
    }
}

export async function signUpByUser({ name, email, password }) {
    if (!name || !email || !password)
        throw new Error("User input fields missing", { cause: "form-error" });
    if (!validPassword(password))
        throw new Error(
            "Password must be 8+ chars with at least 1 uppercase,1 lowecase,and 1 number",
            { cause: "password-error" }
        );
    const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Typpe": "application/json" },
        body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const data = await response.json();
    return data;
}
