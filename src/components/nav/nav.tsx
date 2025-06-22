import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";

const Nav = () => {
  return (
    <header>
      <NavDesktop className="max-md:hidden" />
      <NavMobile className="md:hidden" />
    </header>
  );
};

export default Nav;
