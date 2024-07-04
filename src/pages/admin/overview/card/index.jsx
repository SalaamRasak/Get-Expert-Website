import Styles from "./card.module.scss";

// eslint-disable-next-line react/prop-types
const Card = ({ text, amount, img }) => {
  return (
    <div className={Styles.card}>
      <div className={Styles.card_texts}>
        <span>{text}</span>
        <p>{amount}</p>
      </div>
      <img src={img} alt="card image" />
    </div>
  );
};

export default Card;
