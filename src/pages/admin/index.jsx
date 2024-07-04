import Styles from "./admin.module.scss";
import logo from "../../assets/logo.png";
import { Outlet, NavLink } from "react-router-dom";
const Admin = () => {
  const style = ({ isActive, isPending }) => {
    console.log(isPending);
    return {
      backgroundColor: isActive ? "#ffee93" : null,
    };
  };

  return (
    <>
      <header className={Styles.admin_header}>
        <a href="/">
          <img src={logo} alt="logo image" />
        </a>
        <NavLink to="new">
          <button>+ Add New Scout</button>
        </NavLink>
      </header>
      <div className={Styles.admin_body}>
        <nav className={Styles.admin_sidebar}>
          <NavLink style={style} to="" end>
            Overview
          </NavLink>
          <NavLink style={style} to="scouts">
            Scouts
          </NavLink>
          <NavLink style={style} to="new">
            Add New Scout
          </NavLink>
        </nav>
        <main className={Styles.admin_main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;
