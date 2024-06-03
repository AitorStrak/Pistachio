import React from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ProductMenu } from "../Cart/ProductMenu";

export function Menu() {
  return (
    <>
      <Header />
      <ProductMenu />
      <Footer />
    </>
  );
}
