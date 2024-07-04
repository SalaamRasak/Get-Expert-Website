import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const baseUrl =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : "https://scouting-backend-6456.onrender.com";

// export const Url =
//   window.location.hostname === "localhost" ||
//   window.location.hostname === "127.0.0.1"
//     ? "http://localhost:5173"
//     : "https://scouting-pink.vercel.app";

export const Url = window.location.origin;

const token = localStorage.getItem("token");

export const fetchData = async (method, endpoint, body) => {
  try {
    const result = await fetch(`${baseUrl}/${endpoint}`, {
      method: method,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
      },
      body: body ? JSON.stringify({ ...body }) : null,
      // body: body,
    });
    const data = await result.json();
    return { data: data, status: result.status };
  } catch (error) {
    console.log(error);
    throw new Error("Could not fetch data!");
  }
};

// const options = {
//   autoClose: 2000,
//   className: "",
//   position: toast.POSITION.TOP_RIGHT,
// };

export const toastError = (message) => {
  toast(message, {
    type: "error",
    style: {
      fontSize: "30px",
    },
  });
};

export const toastSuccess = (message) => {
  toast(message, {
    type: "success",
    style: {
      fontSize: "30px",
    },
  });
};
