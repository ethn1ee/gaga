import NavBar from "./nav-bar";
import NavSheet from "./nav-sheet";

const Nav = () => {
  return (
    <div className="@container">
      <NavBar className="@max-2xl:hidden" />
      <NavSheet className="@2xl:hidden" />
    </div>
  );
};

export default Nav;
