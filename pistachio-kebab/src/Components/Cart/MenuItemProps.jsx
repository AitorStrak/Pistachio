import React from "react";
import "../styles/MenuItemProps.css";

export function MenuItems() {
  const categories = [
    "Platos populares",
    "Menús",
    "Kebabs",
    "Patatas",
    "Bebidas",
    "Ensaladas",
    "Complementos",
  ];

  return (
    <aside className="category-list">
      <ul>
        {categories.map((category, index) => (
          <button className="category-item" key={index}>
            {category}
          </button>
        ))}
      </ul>
    </aside>
  );
};