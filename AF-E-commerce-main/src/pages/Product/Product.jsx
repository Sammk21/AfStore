import React, { useContext, useEffect, useState } from "react";
// import "./Product.scss";
import "./text.scss";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../Utils/url";
import { Context } from "../../Utils/Context";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

const Product = ({ data, id, fav }) => {
  const navigate = useNavigate();

  const [isFavourite, setIsFavourite] = useState(false);
  const { handleIconClick, isClicked, favouriteProducts } = useContext(Context);
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    setIsFavourite(favouriteProducts.some((p) => p?.id === id));
  }, [favouriteProducts, id]);

  const handleHeartIconClick = (event) => {
    event.stopPropagation(); // Prevent event propagation to parent element
    handleIconClick(fav);
  };

  useEffect(() => {
    if (data?.inventoryquantity < 15) {
      setInStock(false);
    } else {
      setInStock(true);
    }
  }, [data]);

  return (

   

   
    <div
      className={`product-card ${inStock ? "in-stock" : "out-of-stock"}`}
      onClick={() => navigate("/product/" + id)}
    >
      <div className="parent">
        <div className="thumbnail">
          <img src={API_URL + data.thumbnail?.data?.attributes?.url} />
          {isFavourite ? (
            <span
              onClick={handleHeartIconClick}
              className={`fav-icon ${isClicked ? "favorite-icon-clicked" : ""}`}
            >
              <AiFillHeart color="#484f56" />
            </span>
          ) : (
            <span
              onClick={handleHeartIconClick}
              className={`fav-icon ${isClicked ? "favorite-icon-clicked" : ""}`}
            >
              <AiFillHeart color="gray" />
            </span>
          )}
        </div>
      </div>
      <div className="prod-details">
        <span className="name">{data?.title}</span>
        <div className="price-cont">
          <span className="price">&#8377;{data?.price}</span>
          <span className="price original-price">
            &#8377;{data?.original_price}
          </span>
        {!inStock && <span className="price out-of-stock-flag" style={{opacity:1, color:"red"}}>Out of Stock</span>}
        </div>
      </div>
    </div>

  );
};

export default Product;
