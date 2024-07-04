/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Styles from "./auth.module.scss";
import splashImg from "../../assets/unsplash.png";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext.jsx";
import { fetchData, toastError, toastSuccess } from "../../utils/utils.js";
import Loader from "../../components/loader/index.jsx";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import FormInput from "../../components/input/index.jsx";
const serverUrl = "http://localhost:8000";

const Auth = (props) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passRef = useRef("");
  const genderRef = useRef("");
  const ageRef = useRef("");
  const educationRef = useRef("");
  const jobRef = useRef("");
  const methods = useForm();

  const onSubmit = (data) => {};

  const submit = async (_data) => {
    setLoading(true);
    // const email = emailRef.current?.value;
    // const password = passRef.current?.value;
    const gender = genderRef.current?.value;
    // const age = ageRef.current?.value;
    const education = educationRef.current?.value;
    const job = jobRef.current?.value;

    const data = {
      email: _data.Email,
      password: _data.Password,
      age: _data.Age,
      gender,
      education,
      job,
    };
    console.log(data);

    const result = await fetchData(
      "POST",
      props.type === "register" ? "auth/signup" : "auth/login",
      data
    );

    setLoading(false);
    if (result.status === 201 || result.status === 200) {
      if (props.type === "register") {
        toastSuccess("Signed up successfully!");
        return navigate("/login");
      }
      login(result.data.data);
      toastSuccess("Successfully logged in!");
      console.log(result.data.data);
      if (result.data.data.accountType === "admin") {
        navigate("/admin");
        return;
      }
      navigate("/");
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className={Styles.auth_container}>
      <div className={Styles.form_container}>
        <h2>{props.type === "register" ? "Create Account" : "login"}</h2>
        <FormProvider {...methods}>
          <form className={Styles.form} onSubmit={methods.handleSubmit(submit)}>
            <FormInput
              label="Email"
              placeholder="Enter email address"
              type="text"
            />
            <FormInput label="Password" placeholder="" type="Password" />

            {props.type === "register" ? (
              <>
                <FormInput
                  label="Confirm Password"
                  placeholder=""
                  type="password"
                />

                <div className={Styles.form_inputs_box}>
                  <label htmlFor="gender">Gender</label>
                  <select name="gender" ref={genderRef}>
                    <option selected>MALE</option>
                    <option>FEMALE</option>
                  </select>
                </div>
                <FormInput label="Age" placeholder="20" type="number" />
                <div className={Styles.form_inputs_box}>
                  <label htmlFor="education">Education level</label>
                  <select name="education" ref={educationRef}>
                    <option selected>Undergraduate</option>
                    <option>graduate</option>
                  </select>
                </div>
                <div className={Styles.form_inputs_box}>
                  <label htmlFor="job">Job</label>
                  <select name="job" ref={jobRef}>
                    <option selected>Student</option>
                    <option>Employed</option>
                    <option>Unemployed</option>
                  </select>
                </div>
              </>
            ) : null}

            <div className={Styles.form_terms}>
              {/* <FormInput label="" placeholder="" type="checkbox" /> */}

              {/* <input
                type="checkbox"
                {...register("Terms", {
                  required: {
                    value: true,
                    message: "required",
                  },
                })}
              /> */}

              {props.type === "register" ? (
                <p>
                  I agree to <span>Terms of use</span> and <span>Policy</span>
                </p>
              ) : (
                <p>Remember me</p>
              )}
            </div>

            <button type="submit" onClick={onSubmit}>
              continue
            </button>
            {props.type === "register" ? (
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            ) : (
              <p>
                Don't have an account? <a href="/signup">Create account</a>{" "}
              </p>
            )}
          </form>
        </FormProvider>
      </div>
      <figcaption className={Styles.splash_screen}>
        <div className={Styles.splash_screen_overlay}></div>
        <img src={splashImg} alt="splash image" />
        <div className={Styles.splash_screen_texts}>
          <p>welcome to</p>
          <h3>SCOUTING</h3>
          <span>{props.type === "register" ? "Create Account" : "Log in"}</span>
        </div>
      </figcaption>

      {loading ? <Loader /> : null}
    </div>
  );
};

export default Auth;
