import React, { useState, useEffect } from "react";
import NavBarAndMP from "./components/combineMP/navBarandMP.jsx";
import { useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("Token");
    setIsAuthenticated(!!userToken);
    
    if (!userToken) {
      navigate("/");
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return null;
  }

  return <NavBarAndMP />;
};

export default PrivateRoute;
