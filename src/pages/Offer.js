import React from "react";
import { useParams } from "react-router-dom";

const Offer = (props) => {
  const { id } = useParams();
  const { offers, isLoading } = props;
  let offerDisplayed = {};
  let test = {};

  return (
    <div>
      afficher les infos de telle offre {id}
      <div>iMAGE</div>
      {isLoading ? (
        <div>chargement</div>
      ) : (
        <div>
          {offers.forEach((offer) => {
            if (offer._id === id) {
              offerDisplayed = { ...offer };
            }
          })}
          <div className="offer-block">
            <div className="offer-price">{offerDisplayed.product_price}</div>
            {offerDisplayed.product_details.map((product_detail, index) => {
              test = { ...product_detail };
            })}
            <div className="offer-infos">
              <div className="test">
                <div className="key">{test.MARQUE}</div>
                <div className="value"></div>
              </div>
              <div className="offer-attributes"></div>
              <div className="offer-attributes-values">
                <div>
                  <span>Marque</span>
                  <span></span>
                </div>
                <div>Taille</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
