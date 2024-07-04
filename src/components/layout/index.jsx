import { useContext, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../footer";
import Header from "../header";
import Search from "../search";
import Styles from "./layout.module.scss";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const Layout = () => {
  const user = localStorage.getItem("user");
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      login(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <Header />
      <Search />
      <main className={Styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
