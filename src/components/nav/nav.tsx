"use client";

import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";

const Nav = () => {
  return (
    <header className="w-screen fixed top-0 left-0 z-50 bg-background/75 h-14 md:h-20 backdrop-blur-2xl">
      <NavDesktop className="max-md:hidden" />
      <NavMobile className="md:hidden" />
    </header>
  );
};

export default Nav;
