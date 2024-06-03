import "../styles/Menu.css";
import { MenuItems } from "./MenuItemProps";
import React, { useState, useEffect, useContext } from "react";
import { ProductCard } from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import OrderContext from "../Order/OrderContext";

export function ProductMenu() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addProduct, order } = useContext(OrderContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://pc-practicas:8984/api/export-master/?filter=Products",
          {
            headers: {
              "Api-Token": "1234567890",
              Accept: "application/json",
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }

        const data = await response.json();
        const formattedData = formatData(data);
        setCategories(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de la API", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formatData = (data) => {
    const products = data.Products || [];
  
    const categories = [
      {
        title: "Todos los productos",
        items: [],
      },
    ];
  
    products.forEach((product) => {
      const mainPrice =
        product.Prices && product.Prices.length > 0 && product.Prices[0].MainPrice
          ? parseFloat(product.Prices[0].MainPrice.toString().replace('€', '').replace(',', '.'))
          : 0;
      categories[0].items.push({
        Id: product.Id,
        imageSrc:
          product.imageSrc ||
          "https://cdn.builder.io/api/v1/image/assets/TEMP/34d8b192206a782bb90ec0f97530cde5383cf419e0553cea0690edaa5e699cd7?apiKey=19ca1fee3b3c4f58b9c6c7c164e21a51&",
        altText: product.Name,
        name: product.Name,
        price: mainPrice,
      });
    });
  
    return categories;
  };  

  const handleAddToBasket = (product) => {
    const totalPriceOfProduct = parseFloat(product.price);
    addProduct({ ...product, totalPrice: totalPriceOfProduct, quantity: 1 });
  };

  const handleOrder = () => {
    navigate("/order");
  };

  const totalPrice = order.reduce((acc, product) => {
    const price = typeof product.price === 'number' ? product.price : 0;
    return acc + (price * product.quantity);
  }, 0);

  const totalPriceFormatted = totalPrice.toFixed(2);

  return (
    <>
      <main className="main-container">
        <div className="main-content">
          <aside className="menu-items">
            <MenuItems />
          </aside>
          <section className="menu-category">
            <h2 className="menu-category-title">Todos los productos</h2>
            <div className="menu-category-items">
              {categories.length > 0 &&
                categories[0].items.map((item) => (
                  <Link
                    key={item.Id}
                    to={`/selection/${item.Id}`}
                    state={{ product: item }}
                    className="link-product"
                  >
                    <ProductCard
                      key={item.Id}
                      imageSrc={item.imageSrc}
                      altText={item.altText}
                      name={item.name}
                      price={item.price}
                      onAdd={() => handleAddToBasket(item)}
                    />
                  </Link>
                ))}
            </div>
          </section>
        </div>
        <div className="pay-content">
          <svg
            className="pay-content-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
          </svg>
          <span className="pay-checkout-amount">{totalPriceFormatted} €</span>
          <button className="pay-checkout" onClick={handleOrder}>
            <span className="pay-checkout-icon"></span>
            Revisar y pagar pedido
          </button>
        </div>
      </main>
    </>
  );
};