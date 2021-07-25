import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();

  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setOffer(results.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div>chargement...</div>
      ) : (
        <div className="offer-page">
          <div className="offer-container">
            <div className="offer-img">
              <img
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
            </div>
            <div className="offer-block">
              <div className="offer-price">{offer.product_price} €</div>
              <ul className="offer-details">
                {offer.product_details.map((detail, index) => {
                  const keys = Object.keys(detail);
                  return (
                    <li key={index}>
                      <span className="offer-details-key">{keys[0]}</span>
                      <span className="offer-details-value">
                        {detail[keys[0]]}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="offer-more">
                <div className="offer-name">{offer.product_name}</div>
                <div className="offer-info">{offer.product_description}</div>
                <div className="offer-owner">
                  {offer.owner.account.username}
                </div>
              </div>
              <button>Acheter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
