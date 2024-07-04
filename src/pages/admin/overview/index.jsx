import Card from "./card";
import Styles from "./overview.module.scss";
import cardImg1 from "../../../assets/layer1.png";
import activeImg from "../../../assets/active.png";
import inactiveImg from "../../../assets/inactive.png";
import Scouts from "../scouts";
import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/utils";

const Overview = () => {
  const [active, setActive] = useState([]);
  const [inactive, setInactive] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchData("GET", "admin/get-details");
      setActive(data.data.scouts.active);
      setInactive(data.data.scouts.inactive);
      // console.log(data.data.scouts);
    })();
  }, []);

  return (
    <section className={Styles.overview}>
      <div className={Styles.overview_cards}>
        <Card
          text="Total Scouts"
          amount={active.length + inactive.length}
          img={cardImg1}
        />
        <Card text="Active Scouts" amount={active.length} img={activeImg} />
        <Card
          text="Inactive Scouts"
          amount={inactive.length}
          img={inactiveImg}
        />
      </div>
      <div className={Styles.overview_scouts}>
        <h2>Scouts</h2>
        <button>view all</button>
      </div>
      <Scouts />
    </section>
  );
};

export default Overview;
