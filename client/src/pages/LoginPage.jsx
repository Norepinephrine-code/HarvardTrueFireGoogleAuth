import React from "react";
import api from "../api/axios";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = React.useState("");
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    
    const navigate = useNavigate();

    async function fetchProtectedRoute() {
        try {
            // const response = await axios.get('/api/me', { withCredentials: true })
            const response = await api.get("/me");
            setEmail(response.data.email)
            setIsAuthenticated(true)
        } catch (error) {
            const authErrorMessage = error.response?.data?.error || 'Something went wrong';
            setEmail("");
            setErrorMessage(authErrorMessage)
            setIsAuthenticated(false)
        }
    }

    async function handleLogout() {
        try {
            // await axios.get('/api/logout', { withCredentials: true })
            await api.get("/logout");
            setIsAuthenticated(false)
            navigate("/login", { replace: true });
        } catch (error) {
            const logoutErrorMessage = error.response?.data?.error || 'Something went wrong'
            setErrorMessage(logoutErrorMessage)
        }
    }

    React.useEffect(() => {
        fetchProtectedRoute();
    }, []);

    if (isAuthenticated) {
        return (
            <>
            <h1>Hi, {email}! You are authenticated!</h1>
            <button onClick={handleLogout}>Logout</button>
            </>
        );
    } else {
        return (
            <>
            <h1>You are not yet logged in!</h1>
            <a href="/api/auth/google">Login with Google</a>
            </>
        );
    }

}

export default LoginPage;