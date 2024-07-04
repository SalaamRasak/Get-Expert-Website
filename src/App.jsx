import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { lazy, useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/layout";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Checkout from "./pages/checkout";
import Admin from "./pages/admin";
import Overview from "./pages/admin/scouts";
import Scouts from "./pages/admin/overview";
import New from "./pages/admin/new";
import { AuthContext } from "./contexts/authContext.jsx";

const Scout = lazy(() => import("./pages/scout-page"));
const ComingSoon = lazy(() => import("./pages/coming-soon"));
console.log(window.location.origin);

function App() {
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // logout();
      return;
    }
    const time = new Date().getTime();
    if (user?.expiryDate < time) {
      logout();
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/scout/:id" element={<Scout />} />
        </Route>
        <Route path="/signup" element={<Auth type="register" />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Overview />} />
          <Route path="new" element={<New />} />
          <Route path="scouts" element={<Scouts />} />
        </Route>
        <Route path="/profile" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default App;
