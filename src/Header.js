import React from "react";
import "./Header.css"; // Assuming you will create a separate CSS file for Header styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>NoteMaster</h1>
      </div>
      <nav className="nav-links"></nav>
    </header>
  );
};

export default Header;
