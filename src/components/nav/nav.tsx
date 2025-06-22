import NavDesktop from "./nav-desktop";
import NavMobile from "./nav-mobile";

const Nav = () => {
  return (
    <div className="@container">
      <NavDesktop className="@max-2xl:hidden" />
      <NavMobile className="@2xl:hidden" />
    </div>
  );
};

export default Nav;
