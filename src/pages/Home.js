import React from "react";
import Logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { offers, isLoading } = props;

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          <section>
            <div>
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              <button>Commencer à vendre</button>
            </div>
          </section>
          <main>
            <div className="grid-offers">
              {offers.map((offer, index) => (
                <Link to={`/offer/${offer._id}`} key={index}>
                  <div className="offer">
                    <p>{offer.owner.account.username}</p>
                    <img
                      src={offer.product_image.url}
                      alt={`image de l'offre ${offer._id}`}
                    />
                    <p>{offer.product_price}</p>
                    <p>{offer.product_details[1].TAILLE}</p>
                    <p>{offer.product_details[1].MARQUE}</p>
                  </div>
                </Link>
              ))}
              <div className="offer">
                <p>Michel</p>
                <img src={Logo} alt="photo de l'offre avec tel id"></img>
                <p>prix</p>
                <p>taille</p>
                <p>marque</p>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Home;
