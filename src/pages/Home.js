import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as qs from "qs";

const Home = (props) => {
  const { sort, title, range } = props;

  const [offers, setOffers] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = qs.stringify({
        title: title,
        priceMin: range[0],
        priceMax: range[1],
        sort: sort ? "price-asc" : "price-desc",
      });
      const results = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?${queryParams}`
      );
      setOffers(results.data.offers);
      setIsLoading(false);
    };
    fetchData();
  }, [title, range, sort]);

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <section className="hero">
            <div className="box-home">
              <div>Prêts à faire du tri dans vos placards ?</div>
              <Link to="/publish">
                <button>Commencer à vendre</button>
              </Link>
            </div>
          </section>
          <main>
            <div className="grid-offers">
              {offers.map((offer, index) => (
                <Link
                  className="card-offer"
                  to={`/offer/${offer._id}`}
                  key={index}
                >
                  <div className="offer">
                    <p className="offer-username">
                      {offer.owner.account.username}
                    </p>
                    <img
                      src={offer.product_image.url}
                      alt={`couv de l'offre ${offer._id}`}
                    />
                    <div className="offer-detail">
                      <span className="offer-price">
                        {offer.product_price} €
                      </span>
                      {offer.product_details.map((detail, index) => {
                        const keys = Object.keys(detail);

                        return (
                          <>
                            {keys[0] === "MARQUE" ? (
                              <span
                                className="offer-detail-element"
                                key={index}
                              >
                                {detail[keys[0]]}
                              </span>
                            ) : (
                              keys[0] === "TAILLE" && (
                                <span
                                  className="offer-detail-element"
                                  key={index}
                                >
                                  {detail[keys[0]]}
                                </span>
                              )
                            )}
                          </>
                        );
                      })}

                      {/* <span className="offer-detail-taille">
                        {offer.product_details[1].TAILLE}
                      </span>
                      <span className="offer-detail-marque">
                        {offer.product_details[1].MARQUE}
                      </span> */}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
