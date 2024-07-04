import { FormProvider, useForm } from "react-hook-form";

import Styles from "./new.module.scss";
import FormInput from "../../../components/input";
import scoutImg from "../../../assets/scout.png";
import cameraImg from "../../../assets/camera.png";
import { useRef, useState } from "react";
import { toastError, toastSuccess, baseUrl } from "../../../utils/utils";

const token = localStorage.getItem("token");

const New = () => {
  const methods = useForm();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const bioRef = useRef();

  const submit = async (_data) => {
    const data = new FormData();
    const details = {
      firstName: _data["FIRST NAME"],
      lastName: _data["LAST NAME"],
      company: _data["COMPANY"],
      role: _data["ROLE"],
      rate: _data["$Rate/hr"],
      bio: bioRef.current.value,
    };
    data.append("file", file);
    data.append("details", JSON.stringify(details));
    try {
      const result = await fetch(`${baseUrl}/admin/new`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: data,
      });

      // const result = await fetchData("POST", "admin/new", data);
      if (result.status === 201) {
        toastSuccess("Scout add successfully!");
      } else {
        toastError("Server error, could not add scout!");
      }
    } catch (error) {
      toastError(error.message);
    }
  };

  const getFile = (e) => {
    const f = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const i = reader.result;
      setImage(i);
    };
    reader.readAsDataURL(f);
    setFile(f);
  };

  return (
    <section className={Styles.container}>
      <div className={Styles.img_box}>
        <img src={image ? image : scoutImg} alt="scout image" />
        <label className={Styles.img_label} htmlFor="fileInput">
          <img src={cameraImg} alt="camera image" />
          <input
            type="file"
            id="fileInput"
            accept="image/png, image/jpg, image/jpeg"
            onChange={getFile}
          />
        </label>
      </div>
      <FormProvider {...methods}>
        <form
          className={Styles.new_form}
          onSubmit={methods.handleSubmit(submit)}
          encType="multipart/form-data"
        >
          <FormInput label="FIRST NAME" placeholder="GOD" type="text" />
          <FormInput label="LAST NAME" placeholder="MAN" type="text" />
          <FormInput label="COMPANY" placeholder="MICROSOFT" type="text" />
          <FormInput label="ROLE" placeholder="UI/UX DESIGNER" type="text" />
          <FormInput label="$Rate/hr" placeholder="10" type="number" />
          <section className={Styles.new_form_bio}>
            <label htmlFor="bio">BIO</label>
            <textarea name="bio" ref={bioRef} />
          </section>
          <button type="submit" onClick={() => {}}>
            Add Scout
          </button>
        </form>
      </FormProvider>
    </section>
  );
};

export default New;
