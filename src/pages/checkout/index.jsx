/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./checkout.module.scss";
import {
  fetchData,
  toastError,
  toastSuccess,
  baseUrl,
  Url,
} from "../../utils/utils";
import Loader from "../../components/loader";

import scoutImg from "../../assets/scout.png";
// eslint-disable-next-line no-undef
const stripe = Stripe(
  "pk_test_51P1MzkJpx8hwuYkIXdUUjdVvoDOvnlTv1xt8UVITmIcG2Yce3nX4TOVJhiL1AO6ElxSq6TOtWuWndFPnPQl6Z5Uz00drcHY3nN"
);

const appearance = {
  theme: "stripe",
};

const paymentElementOptions = {
  layout: "tabs",
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [element, setElement] = useState("");
  const [id, setId] = useState("");
  const [times, setTimes] = useState("");
  const [date, setDate] = useState("");
  const [scoutData, setScoutData] = useState({});
  const navigate = useNavigate();

  const getScoutData = async (id) => {
    const data = await fetchData("GET", `get-scout-data/${id}`);
    setScoutData(data.data.scout);
  };

  const init = async (time, rate) => {
    const amount = time * rate;
    if (!amount) {
      return;
    }
    const data = await fetchData("GET", `create-payment-intent/${amount}`);
    const clientSecret = data.data?.data?.clientSecret;
    const elements = stripe.elements({
      appearance,
      clientSecret: clientSecret,
    });
    setElement(elements);
    const paymentElement = elements.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");
    setLoading(false);
  };

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    const times = new URLSearchParams(window.location.search).get("time");
    const date = new URLSearchParams(window.location.search).get("date");
    const rate = new URLSearchParams(window.location.search).get("rate");
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (clientSecret) {
      checkStatus();
      navigate(`/scout/${id}`);

      return;
    }
    const dateData = [date];
    const timesData = times?.split(",");
    setDate(dateData);
    setTimes(timesData);
    getScoutData(id);
    setId(id);
    setLoading(true);
    checkStatus();
    init(dateData.length, rate);
  }, []);

  //   if (secret) {
  //     const elements = stripe.elements({ appearance, clientSecret: secret });
  //     const paymentElement = elements.create("payment", paymentElementOptions);
  //     paymentElement.mount("#payment-element");
  //   }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements: element,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${Url}/checkout?id=${id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      // showMessage(error.message);
      toastError(error.message);
    } else {
      // showMessage("An unexpected error occurred.");
      toastError("An unexpected error occurred.");
    }

    setLoading(false);
  }

  async function checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

    switch (paymentIntent.status) {
      case "succeeded":
        toastSuccess("Payment successful!");
        break;
      case "processing":
        toastSuccess("Your payment is processing.");
        break;
      case "requires_payment_method":
        toastError("Your payment was not successful, please try again.");
        break;
      default:
        toastError("Something went wrong.");
        break;
    }
  }

  return (
    <div className={Styles.checkout_container}>
      {loading ? <Loader /> : null}
      <div className={Styles.form_container}>
        <form id="payment-form" className={Styles.form}>
          <div id="payment-element" className={Styles.form_element}></div>
          <button
            id="submit"
            className={Styles.form_btn}
            onClick={handleSubmit}
          >
            <div className="spinner hidden" id="spinner"></div>
            <span id="button-text">Checkout</span>
          </button>
          <div
            id="payment-message"
            className={` ${Styles.form_message} hidden`}
          ></div>
        </form>
      </div>
      <section className={Styles.checkout_scout}>
        <img
          src={
            scoutData.imageUrl ? `${baseUrl}\\${scoutData.imageUrl}` : scoutImg
          }
          alt="scout image"
        />
        <div className={Styles.scout_details}>
          <h4>{scoutData.name}</h4>
          <p>{scoutData.role}</p>
          <span>{scoutData.company}</span>
          <p className={Styles.scout_details_pricing}>
            {`Booked for ${times.length}hrs on ${date}, Total due = $${
              scoutData.rate * times.length
            }`}
          </p>
        </div>
        <p className={Styles.checkout_text}>
          Anything you'd like your scout to know before your conversation or
          particular topics you'd like to discuss?"
        </p>
        <textarea className={Styles.checkout_text_input} />
      </section>
    </div>
  );
};

export default Checkout;
