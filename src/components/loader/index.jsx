import Styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={Styles.loader_container}>
      <div className={Styles.loader}></div>
      <p>jfalkjfajfjeijeajf;</p>
    </div>
  );
};

export const Spinner = () => {
  return (
    <div className={Styles.spinner}>
      <div className={Styles.loader}></div>
    </div>
  );
};

export default Loader;
