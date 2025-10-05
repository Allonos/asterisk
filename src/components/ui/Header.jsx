import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import Wrapper from "../layouts/wrapper";

import HeaderStyles from "./Header.module.css";
import DrawerMenu from "./DrawerMenu";

function Header({ startAnimation = false }) {
  const logoRef = useRef(null);
  const animationTriggered = useRef(false);

  useEffect(() => {
    if (!logoRef.current) return;

    const letters = logoRef.current.querySelectorAll(".letter");

    if (startAnimation && !animationTriggered.current) {
      animationTriggered.current = true;
      gsap.set(letters, { opacity: 0 });
      gsap.to(letters, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.15,
        ease: "none",
      });
    } else if (!startAnimation) {
      gsap.set(letters, { opacity: 0 });
    }
  }, [startAnimation]);

  return (
    <header className={HeaderStyles.headerContainer}>
      <Wrapper>
        <div className={HeaderStyles.headerContent}>
          <Link to="/" ref={logoRef} className={HeaderStyles.logo}>
            {"ASTERISK".split("").map((letter, index) => (
              <span
                key={index}
                className="letter"
                style={{ color: "#F2F2F2", fontWeight: "700" }}
              >
                {letter}
              </span>
            ))}
          </Link>

          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <NavLink
              to="/"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#9B68FD" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.2s ease-in-out",
              })}
            >
              Home
            </NavLink>
            <div className={HeaderStyles.divider} />
            <NavLink
              to="/data-analysis"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#9B68FD" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.2s ease-in-out",
              })}
            >
              Data Analysis
            </NavLink>
            <div className={HeaderStyles.divider} />
            <NavLink
              to="/explore"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#9B68FD" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.2s ease-in-out",
              })}
            >
              Explore
            </NavLink>
            <div className={HeaderStyles.divider} />
            <NavLink
              to="/about"
              className="nav-link"
              style={({ isActive }) => ({
                color: isActive ? "#9B68FD" : "white",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                transition: "color 0.2s ease-in-out",
              })}
            >
              About
            </NavLink>
          </nav>
        </div>

        <div className={HeaderStyles.mobileContent}>
          <div className={HeaderStyles.burgerMenu}>
            <DrawerMenu />
          </div>
          <Link to="/" ref={logoRef} className={HeaderStyles.logo}>
            {"ASTERISK".split("").map((letter, index) => (
              <span
                key={index}
                className="letter"
                style={{ color: "#F2F2F2", fontWeight: "700" }}
              >
                {letter}
              </span>
            ))}
          </Link>
        </div>
      </Wrapper>
    </header>
  );
}

export default Header;
