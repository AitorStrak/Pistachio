import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import "../styles/Addings.css";
import { fetchData } from "../Utils/fetchData";
import Swal from "sweetalert2";

function Ingredient({
  imgSrc,
  altText,
  name,
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="ingredient-container">
      <div className="ingredient">
        <div className="image-container">
          <img src={imgSrc} alt={altText} className="ingredient-img" />
        </div>
        <div className="info-container">
          <h2 className="ingredient-name">{name}</h2>
          <div className="quantity-control">
            <button
              className="control-button"
              onClick={onDecrease}
              aria-label={`Decrease ${name}`}
            >
              -
            </button>
            <span className="quantity-adding">{quantity}</span>
            <button
              className="control-button"
              onClick={onIncrease}
              aria-label={`Increase ${name}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Addings() {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const productData = location.state?.product;
  const [addings, setAddings] = useState([]);
  const [initialAddings, setInitialAddings] = useState([]);
  const [selectedAddings, setSelectedAddings] = useState([]);

  useEffect(() => {
    const fetchAddings = async () => {
      const data = await fetchData(
        "http://pc-practicas:8984/api/export-master/?filter=Products",
        "1234567890"
      );
      if (data) {
        const formattedAddings = data.Products.map((adding) => ({
          id: adding.Id,
          name: adding.Name,
          imgSrc:
            adding.imageSrc ||
            "https://cdn.builder.io/api/v1/image/assets/TEMP/34d8b192206a782bb90ec0f97530cde5383cf419e0553cea0690edaa5e699cd7?apiKey=19ca1fee3b3c4f58b9c6c7c164e21a51&",
          altText: adding.Name,
          quantity: 0,
        }));
        setAddings(formattedAddings);
        setInitialAddings(formattedAddings);
      };
    };

    fetchAddings();
  }, []);

  const handleIncrease = (id) => {
    const updatedAddings = addings.map((adding) =>
      adding.id === id ? { ...adding, quantity: adding.quantity + 1 } : adding
    );
    setAddings(updatedAddings);
    updateSelectedAddings(updatedAddings);
  };

  const handleDecrease = (id) => {
    const updatedAddings = addings.map((adding) =>
      adding.id === id && adding.quantity > 0
        ? { ...adding, quantity: adding.quantity - 1 }
        : adding
    );
    setAddings(updatedAddings);
    updateSelectedAddings(updatedAddings);
  };

  const updateSelectedAddings = (addings) => {
    const selected = addings.filter((adding) => adding.quantity > 0);
    setSelectedAddings(selected);
  };

  const handleReset = () => {
    setAddings(initialAddings);
    setSelectedAddings([]);
  };

  const handleCancel = () => {
    navigate(`/selection/${productId}`, { state: { product: productData } });
  };

  const handleSave = () => {
    Swal.fire({
      title: "¡Añadido!",
      text: "Los complementos seleccionados han sido añadidos",
      icon: "success",
    }).then((response) => {
        navigate(`/selection/${productId}`, {
          state: { product: productData },
        });
    });
  };

  if (!productData) {
    return <div>No se ha seleccionado ningún producto</div>;
  };

  const formattedPrice = parseFloat(productData.price).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <>
      <Header />
      <section className="addingContainer">
        <aside className="main-body">
          <section className="content-section">
            <header className="dish-header">
              <img
                src={productData.imageSrc}
                alt={productData.altText}
                className="dish-img"
              />
              <div className="dish-info">
                <h1 className="dish-name">{productData.name}</h1>
                <p className="dish-price">{formattedPrice}</p>
              </div>
              {selectedAddings.length > 0 && (
                <div className="selected-addings">
                  <strong>Tus cambios:</strong>
                  <ul>
                    {selectedAddings.map((adding) => (
                      <li
                        key={adding.id}
                      >{`${adding.name} x${adding.quantity}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </header>
            <button className="reset-button" onClick={handleReset}>
              Restablecer cambios
            </button>
          </section>

          <section className="section-wrapper">
            <div className="ingredient-list">
              {addings.map((adding) => (
                <Ingredient
                  key={adding.id}
                  imgSrc={adding.imgSrc}
                  altText={adding.altText}
                  name={adding.name}
                  quantity={adding.quantity}
                  onIncrease={() => handleIncrease(adding.id)}
                  onDecrease={() => handleDecrease(adding.id)}
                />
              ))}
            </div>
          </section>
          <div className="save-content">
            <button className="cancel-button" onClick={handleCancel}>
              Cancelar cambios
            </button>
            <button className="save-checkout" onClick={handleSave}>
              Guardar cambios
            </button>
          </div>
        </aside>
      </section>
      <Footer />
    </>
  );
};