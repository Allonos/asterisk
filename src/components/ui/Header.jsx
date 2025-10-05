import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Wrapper from "../layouts/wrapper";
import DrawerMenu from "./DrawerMenu";

import HeaderStyles from "./Header.module.css";

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

  const navLinkClasses = ({ isActive }) =>
    `text-base transition-colors duration-200 ease-in-out no-underline ${
      isActive ? "text-[#9B68FD] font-bold" : "text-white font-normal"
    }`;

  return (
    <header className="sticky top-0 z-[1000] backdrop-blur-md bg-black border-b border-gray-400/50">
      <Wrapper>
        {/* Desktop header */}
        <div className="hidden [@media(min-width:901px)]:flex items-center justify-between py-4">
          <Link
            to="/"
            ref={logoRef}
            className="text-white text-2xl font-bold no-underline inline-block"
          >
            {"ASTERISK".split("").map((letter, index) => (
              <span key={index} className="letter font-bold text-[#F2F2F2]">
                {letter}
              </span>
            ))}
          </Link>

          <nav className="flex gap-6 items-center">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <div className="w-px h-5 bg-gray-400" />
            <NavLink to="/data-analysis" className={navLinkClasses}>
              Data Analysis
            </NavLink>
            <div className="w-px h-5 bg-gray-400" />
            <NavLink to="/explore" className={navLinkClasses}>
              Explore
            </NavLink>
            <div className="w-px h-5 bg-gray-400" />
            <NavLink to="/about" className={navLinkClasses}>
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
