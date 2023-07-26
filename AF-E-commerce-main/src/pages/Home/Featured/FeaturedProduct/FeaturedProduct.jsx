import React from "react";
import "./FeaturedProduct.scss";
import { API_URL } from "../../../../Utils/url";
import { useNavigate } from "react-router-dom";

const FeaturedProduct = ({ data, id }) => {

  const navigate = useNavigate();

  return (
    <div className="product-container" onClick={() => navigate("/product/" + id)}>
      <img
        src={API_URL + data?.thumbnail?.data?.attributes?.url}
        alt="prod img"
      />
      <div className="product-details">
        <span className="name">{data?.title}</span>
        <div className="price-cont">
          <span className="price">&#8377;{data?.price}</span>
          <span className="original-price">&#8377;{data?.original_price}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
