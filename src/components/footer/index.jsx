import Styles from "./footer.module.scss";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <figcaption className={Styles.footer_figCaption}>
        <img src={logo} alt="logo" />
        <p>Book the most in-demand experts & get advice over a video call</p>
      </figcaption>
      <nav className={Styles.footer_nav}>
        <a>Company</a>
        <a href="/">Home</a>
        <a>About us</a>
        <a>Scouting</a>
        <a>Support</a>
        <a>Contact</a>
        <a>FAQs</a>
        <a>Feedbacks</a>
      </nav>
    </footer>
  );
};

export default Footer;
