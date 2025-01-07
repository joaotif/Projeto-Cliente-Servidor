import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <h1>AUTH CRUD</h1>

      <nav className={styles.navbar}>
        <Link to="/">HOME</Link>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">CADASTRO</Link>
      </nav>
    </header>
  );
}

export default Header;
