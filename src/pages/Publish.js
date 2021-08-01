import axios from "axios";

import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const Publish = (props) => {
  const { token } = props;

  const [file, setFile] = useState();
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const handleFile = (event) => {
    const value = event.target.files[0];
    setPreview(URL.createObjectURL(value));
    setFile(value);
  };
  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value);
  };
  const handleDescritpion = (event) => {
    const value = event.target.value;
    setDescription(value);
  };
  const handleBrand = (event) => {
    const value = event.target.value;
    setBrand(value);
  };
  const handleSize = (event) => {
    const value = event.target.value;
    setSize(value);
  };
  const handleColor = (event) => {
    const value = event.target.value;
    setColor(value);
  };
  const handleCondition = (event) => {
    const value = event.target.value;
    setCondition(value);
  };
  const handleCity = (event) => {
    const value = event.target.value;
    setCity(value);
  };
  const handlePrice = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);

    // post issue pour envoi unique de chaque paire

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // post ISSUE pour éviter console.log
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div className="publish-page">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="publish-product-file-upload">
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input
                      {...getInputProps({
                        id: "file",
                        type: "file",
                        accept: ".png, .jpg, .jpeg, .gif",
                        onChange: handleFile,
                      })}
                    />
                    <p>
                      Glissez-déposez votre image ici ou cliquez pour
                      sélectionner une image
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            {/* <input
            id="file"
            type="file"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleFile}
          /> */}
            {preview ? (
              <div>
                <img src={preview} alt="preview de l'upload" />
              </div>
            ) : null}
          </div>
          <div className="publish-product-info">
            <div className="publish-product-title">
              <div>Titre</div>
              <input
                type="text"
                value={title}
                onChange={handleTitle}
                placeholder="ex: Chemise Sézanne verte"
              />
            </div>
            <div className="publish-product-description">
              <div>Décris ton article</div>
              <input
                type="text"
                value={description}
                onChange={handleDescritpion}
                placeholder="ex: porté quelques fois, taille correctement"
              />
            </div>
          </div>
          <div className="publish-product-details">
            <div className="publish-product-brand">
              <div>Marque</div>
              <input
                type="text"
                value={brand}
                onChange={handleBrand}
                placeholder="ex: Zara"
              />
            </div>
            <div className="publish-product-size">
              <div>Taille</div>
              <input
                type="text"
                value={size}
                onChange={handleSize}
                placeholder="ex: L / 40 /12"
              />
            </div>
            <div className="publish-product-color">
              <div>Couleur</div>
              <input
                type="text"
                value={color}
                onChange={handleColor}
                placeholder="ex: Fushia"
              />
            </div>
            <div className="publish-product-condition">
              <div>Etat</div>
              <input
                type="text"
                value={condition}
                onChange={handleCondition}
                placeholder="ex: Neuf avec étiquette"
              />
            </div>
            <div className="publish-product-city">
              <div>Lieu</div>
              <input
                type="text"
                value={city}
                onChange={handleCity}
                placeholder="ex: Paris"
              />
            </div>
          </div>
          <div className="publish-product-sale">
            <div className="publish-product-price">
              <div>Prix</div>
              <input
                type="text"
                value={price}
                onChange={handlePrice}
                placeholder="0,00 €"
              />
            </div>
            <div className="publish-product-swap">
              <input id="swap" type="checkbox" />
              <label htmlFor="swap">
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </div>
          <div className="publish-button">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/login/" />
  );
};

export default Publish;
