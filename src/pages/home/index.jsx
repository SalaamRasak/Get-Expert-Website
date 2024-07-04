import Card from "../../components/card";
import Styles from "./home.module.scss";
import scoutImg from "../../assets/scout.png";
import { useEffect, useState } from "react";
import { fetchData, baseUrl } from "../../utils/utils.js";
import { Spinner } from "../../components/loader/index.jsx";

const Home = () => {
  const [scouts, setScouts] = useState([]);
  const [records, setRecords] = useState(null);

  const createCards = (scouts) => {
    const record =
      scouts?.length > 0
        ? scouts.map((sc) => {
            const imageUrl = sc?.imageUrl?.split("public/") || "";
            const image =
              imageUrl && imageUrl?.length > 1 ? imageUrl[1] : imageUrl[0];
            console.log(imageUrl, sc?.imageUrl);

            return (
              <Card
                name={sc.name}
                company={sc.company}
                occupation={sc.role}
                rate={sc.rate}
                img={sc.imageUrl ? `${baseUrl}\\${image}` : scoutImg}
                key={sc._id}
                id={sc._id}
              />
            );
          })
        : [];
    setRecords(record);
  };

  useEffect(() => {
    (async () => {
      // if (scouts.length !== 0 && loaded) {
      //   return;
      // }
      const data = await fetchData("GET", "admin/get-scouts");
      setScouts(data.data.scouts);
      createCards(data.data.scouts);
    })();
  }, []);

  return (
    <section className={Styles.scouts_section}>
      {records === null ? (
        <Spinner />
      ) : records?.length === 0 ? (
        <p className={Styles.empty}>
          There are no scouts available at the moment!
        </p>
      ) : (
        records
      )}
    </section>
  );
};

export default Home;
