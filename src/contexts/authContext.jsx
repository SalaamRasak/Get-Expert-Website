/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const AuthContext = createContext();
const remainingMilliseconds = 24 * 60 * 60 * 1000;
const initialState = {
  user: null,
  isAuthenticated: false,
};

function setToLocalStorage(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

function deleteFromLocalStorage() {
  localStorage.removeItem("user");
}

function reducer(state, action) {
  switch (action.type) {
    case "login":
      setToLocalStorage(action.payload);

      return { user: action.payload, isAuthenticated: true };
    case "logout":
      deleteFromLocalStorage();
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action type");
  }
}

const AuthProvider = (props) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(user) {
    const expiryDate = new Date().getTime() + remainingMilliseconds;
    const data = { ...user, expiryDate };
    dispatch({ type: "login", payload: data });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
