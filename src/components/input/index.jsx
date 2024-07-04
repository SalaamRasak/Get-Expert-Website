/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";
import Styles from "./input.module.scss";

const FormInput = ({ label, placeholder, type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  //   console.log(...register("email"));

  return (
    <div className={Styles.form_inputs_box}>
      <label>{label}</label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        {...register(label, {
          required: {
            value: true,
            message: "required",
          },
        })}
      />

      {errors[label]?.type === "required" &&
        (label !== "Confirm Password" ? (
          <p role="alert">{label} is required</p>
        ) : (
          <p role="alert">password doesn't match</p>
        ))}
    </div>
  );
};

export default FormInput;
