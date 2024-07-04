import Card from "../../components/card";
import Styles from "./scout.module.scss";
import scoutImg from "../../assets/scout.png";
import { fetchData, baseUrl, toastError } from "../../utils/utils";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const defaultAbout =
  "Aliquet libero ut cum id diam parturient sed viverra consectetur.Massa odio arcu nunc proin et viverra gravida vestibulum lectus.Neque ipsum praesent ante amet. Adipiscing amet laoreet gravida sed duis nunc sodales commodo egestas. Turpis rutrum laoreet quam duis mauris dictum pellentesque tortor arcu. In ornare eleifend justo vestibulum vitae praesent cras aliquam. Nibh egestas sit dictumst fusce leo. Facilisi nunc tincidunt risus amet fringilla habitant. Eget felis id feugiat ornare vitae dolor neque libero condimentum. Bibendum erat pulvinar gravida tortor aliquet pulvinar. Accumsan justo urna eget.";

const Scout = () => {
  const [details, setDetails] = useState({});
  const [date, setDate] = useState("");
  const [times, setTime] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const location = window.location.href;
    const id = location.split("scout/")[1];
    (async () => {
      const data = await fetchData("GET", `get-scout-data/${id}`);
      setDetails(data.data.scout);
    })();
  }, []);

  const toggleTime = (e) => {
    const target = e.target;
    // target.className.toggle("select-time");
    target.classList.toggle("select-time");
    if (target.classList.contains("select-time")) {
      setTime((prev) => {
        return [...prev, target.textContent];
      });
    }
  };

  const bookSession = () => {
    if (!isAuthenticated) {
      return toastError("Please login before booking a session.");
    }
    if (!date || times.length === 0) {
      return toastError("Please select both date and time");
    }
    navigate(
      `/checkout?id=${details._id}&time=${times}&date=${date}&rate=${details.rate}`
    );
  };

  return (
    <div className={Styles.scout}>
      <div className={Styles.scout_left}>
        <Card
          name={details.name}
          company={details.company}
          occupation={details.role}
          rate={details.rate}
          img={details.imageUrl ? `${baseUrl}\\${details.imageUrl}` : scoutImg}
        />
        {/* <a href={`/checkout?id=${details._id}&time=${times}&date=${date}`}> */}
        <button onClick={bookSession}>BOOK A SESSION NOW</button>
        {/* </a> */}
      </div>
      <div className={Styles.scout_right}>
        <section id="about-me" className={Styles.scout_about}>
          <h2>ABOUT ME</h2>
          <blockquote>{details.bio ? details.bio : defaultAbout}</blockquote>
        </section>
        <section id="available-time" className={Styles.scout_time_container}>
          <h2>SEE AVAILABLE TIME</h2>
          <input
            type="date"
            value={"2024-03-31"}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
          <div className={Styles.scout_times}>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              8:00 AM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              9:00 AM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              10:00 AM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              11:00 AM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              12:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              1:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              2:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              3:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              4:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              5:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              6:00 PM
            </span>
            <span
              onClick={(e) => {
                toggleTime(e);
              }}
            >
              7:00 PM
            </span>
            {/* <span onClick={(e)=>{toggleTime(e)}} >8:00 PM</span>
            <span onClick={(e)=>{toggleTime(e)}} >8:00 PM</span>
            <span onClick={(e)=>{toggleTime(e)}} >8:00 PM</span>
            <span onClick={(e)=>{toggleTime(e)}} >8:00 PM</span>
            <span onClick={(e)=>{toggleTime(e)}} >8:00 PM</span>
            <span onClick={(e)=>{toggleTime(e)}} >8:00 PM</span> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Scout;
