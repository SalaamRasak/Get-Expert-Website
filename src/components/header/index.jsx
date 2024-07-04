import styles from "./header.module.scss";
import logo from "../../assets/logo.png";
import profileIcon from "../../assets/profile1.png";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../utils/utils.js";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <a href="/">
        <img src={logo} alt="logo image" />
      </a>
      <div className={styles.header_nav}>
        <a href="/">Home</a>
        <span>Scouting</span>
      </div>
      <div
        className={`${styles.header_btns} ${isAuthenticated ? "hidden" : null}`}
      >
        <a href="/signup">Sign up</a>
        <a href="/login">Log in</a>
      </div>
      <div
        className={`${styles.logout_container} ${
          !isAuthenticated ? "hidden" : null
        }`}
      >
        <a
          href={
            user?.accountType === "admin"
              ? "admin"
              : `profile?id=${user?.userId}`
          }
        >
          <img src={profileIcon} alt="profile-icon" />
        </a>
        <button
          className={styles.header_logout}
          onClick={() => {
            logout();
            navigate("/login");
            toastSuccess("logged out successfully!");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
