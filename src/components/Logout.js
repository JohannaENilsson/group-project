import React, { useEffect, useState } from "react";
import { updateToken, token$ } from "./Store";
import { Redirect } from "react-router-dom";

export default function Logout() {
  const [token, setToken] = useState(token$);

  useEffect(() => {
    const subscription = token$.subscribe(token$);
    return () => subscription.unsubscribe();
  }, []);

  function handleLogout() {
    updateToken(null);
    setToken(null);
  }

  if (!token) {
    return <Redirect to={"/login"} />;
  }

  return (
    <button className="logoutButton" onClick={handleLogout}>
      <i class="fa fa-sign-out"></i>
    </button>

  );
}
