import React, { useState } from "react";
import "./Products.scss";
import InfiniteScroll from "react-infinite-scroll-component"
import Product from "../Product/Product";
import { Link } from "react-router-dom";





const Products = ({ products, headingText }) => {

  return (
    <div className="shell">
      <div className="container">
        <div className="sec-heading">
          <h2>{headingText}</h2>
        </div>
        <div className="main-product">
          {products?.data?.map((item) => (
            <Product key={item?.id} id={item?.id} data={item?.attributes} fav={item} />
          ))}
        </div>
        <div className="view-all-btn">
        {/* <button className="btns type1">
          <span className="btn-txt">View all</span>
        </button> */}

        </div>
      </div>
    </div>
  );
};

export default Products;
