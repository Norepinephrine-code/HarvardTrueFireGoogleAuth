import React from "react";
import axios from "axios";
import "../styles/homePage.css";
import HomeCard from "../components/HomeCard";
import { Button } from "reactstrap";
import { PiInstagramLogoFill } from "react-icons/pi";

export function HomePage() {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLogoutMessage, setIsLogoutMessage] = React.useState(false);

  async function fetchProtectedRoute() {
    try {
      const res = await axios.get('/api/me', { withCredentials: true });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      const errCode = error.response.status;
      const msg = error?.response?.data?.error || 'Unexpected error occured';
      console.error(`Error ${errCode}: ${msg}`);
      setIsAuthenticated(false);
      return false;
    }
  }

  React.useEffect(()=> {
    fetchProtectedRoute();
  },[])

  async function handleLogout() {
      try {
          await axios.get('/api/logout', { withCredentials: true })
          setIsAuthenticated(false);
          setIsLogoutMessage(true);

      } catch (error) {
          const logoutErrorMessage = error.response?.data?.error || 'Something went wrong'
          console.error(logoutErrorMessage)
      }
  }

  return (

    <div className="home-page d-flex flex-column justify-content-center align-items-center text-center">
      <HomeCard />

    {isAuthenticated && (
      <Button
        className="mt-4 logout-btn"
        onClick={handleLogout}
      >
        Sign out of Google
      </Button>
    )}

    {isLogoutMessage && (
      <h2 className="logout-msg">You have been successfully logged out.</h2>
    )}
    
    </div>

  );
}

export default HomePage;
