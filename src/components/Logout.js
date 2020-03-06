import React, { useEffect, useState } from "react";
import { updateToken, updateStar, token$ } from "./Store";
import { Redirect } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';


export default function Logout() {
  const [token, setToken] = useState(token$.value);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, []);

  function handleLogout() {
    updateToken(null);
    setToken(null);
    updateStar(null);
  }

  if (!token) {
    return <Redirect to={"/login"} />;
  }

  return (
    <button className="logoutButton" onClick={handleLogout}>
      <FaSignOutAlt />
    </button>

  );
}
