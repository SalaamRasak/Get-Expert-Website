/* eslint-disable react/prop-types */
import Styles from "./card.module.scss";

const Card = (props) => {
  return (
    <a href={`/scout/${props.id}`} className={Styles.card}>
      <img src={props.img} alt="scout image" />
      <div className={Styles.card_details}>
        <h4>{props.name}</h4>
        <p>{props.occupation}</p>
        <span>{props.company}</span>
        <p>${props.rate} / hr</p>
      </div>
    </a>
  );
};

export default Card;
