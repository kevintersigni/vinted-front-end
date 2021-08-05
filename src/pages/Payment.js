import React from "react";

import { useLocation, Redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JL8ouJKJS4feTMI3cNiCxajqHhg0lAQ48ZxiBJJsAju6NxMU3vOdtXk3GPiIXvys2NShxhWzQSlKw7r1NwJDhza00MSCKLUqK"
);

const fee = 4;
const shipping = 8;
const currency = (number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(number);
};

const Payment = (props) => {
  const location = useLocation();
  const { product_name, product_price } = location.state;
  const totalPrice = product_price + fee + shipping;
  const { token } = props;

  return token ? (
    <div className="payment-page">
      <div className="payment-container">
        <div>
          <h4>Résumé de la commande</h4>
          <div className="payment-order">
            <div>Commande</div>
            <span>{currency(product_price)}</span>
          </div>
          <div className="payment-fee">
            <div>Frais de protection acheteur</div>
            <div>{currency(fee)}</div>
          </div>
          <div className="payment-shipping">
            <div>Frais de port</div>
            <div>{currency(shipping)}</div>
          </div>
          <div className="payment-total">
            <div>Total</div>
            <div>{currency(totalPrice)}</div>
          </div>
          <p className="payment-recap-order">
            Il ne vous reste plus qu'un étape pour vous offrir{" "}
            <span>{product_name}</span>. Vous allez payer{" "}
            <span>{currency(totalPrice)}</span> (frais de protection et frais de
            port inclus).
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={totalPrice} description={product_name} />
        </Elements>
      </div>
    </div>
  ) : (
    <Redirect to="/login/" />
  );
};

export default Payment;
