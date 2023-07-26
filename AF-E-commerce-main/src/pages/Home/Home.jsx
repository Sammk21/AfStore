import React, { useContext, useEffect } from "react";
import Products from "../Products/Products";
import Banner from "../../Components/Banner/Banner";
import Newsletters from "../../Components/Footer/Newsletter/Newsletter";

import "./Home.scss";
import ProductSlider from "../../Components/ProductSlider/ProductSlider";
import { Context } from "../../Utils/Context";
import { fetchDataFromAPI } from "../../Utils/api";
import Featured from "./Featured/Featured";
import { useHistory } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    getProducts();
  },[]);

  const { products, setProducts } = useContext(Context);

  const getProducts = async () => {
    fetchDataFromAPI("/api/products?populate=*")
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  };

  return (
    <div>
      
      <Banner type={"sale"} />
      <div className="main-content">
        <div className="layout">
          <Featured type={"featured"} />
          <Banner type={"offer"} />
          <ProductSlider />
          <Featured type={"trending"}/>
          <Banner  type={"normal"}/>
          <Newsletters />
        </div>
      </div>
    </div>
  );
};

export default Home;
