import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckoutForm = (props) => {
  const [succeed, setSucceed] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { amount, description } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "id du user ",
      });

      //   console.log(stripeResponse);

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post("http://localhost:3000/payment", {
        stripeToken: stripeToken,
        amount: amount,
        description: description,
      });
      //   console.log(response.data);

      if (response.data.status === "succeeded") {
        setSucceed(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {" "}
      {succeed ? (
        <div className="payment-confirm">
          <span>Paiement effectué</span>
          <FontAwesomeIcon icon="check-circle" className="check-circle-icon" />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Valider</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
