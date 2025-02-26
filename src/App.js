import React, { useState } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import NoteTaker from "./NoteTaker";

import "./App.css";

const App = () => {
  return (
    <div>
      <Header /> {/* Using the Header component */}
      <NoteTaker /> {/* Using the NoteTaker component */}
    </div>
  );
};

export default App;
