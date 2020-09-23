import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from "../../assets/icons/logo.svg";
import peopleImg from "../../assets/icons/people.svg";
import header from "./Header.module.sass";

function Header() {
  return (
      <header>
      <nav className={header.nav}>
          <Link  to="/"><img className={header.logo} alt="stack overflow" src={logoImg}></img></Link>
          <Link to="/favorites" className={header.btnTeam}> <span style={{marginRight: "5px"}}>Your Team</span> <img alt="stack overflow" src={peopleImg}></img></Link>
      </nav>
      </header>
  );
}

export default Header;
