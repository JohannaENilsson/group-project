import React from "react";
import Button from "./Button";
import GetUserAccount from "./GetUserAccount.js";


export default function Header() {
  return (
    <header>
      <h1 className="headerTitle">Header</h1>
      <Button />
      <GetUserAccount />
    </header>
  );
}
