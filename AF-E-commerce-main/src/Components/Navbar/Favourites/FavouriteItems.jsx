import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../../Utils/url";
import { Context } from "../../../Utils/Context";
import { AiFillHeart } from "react-icons/ai";

const FavouriteItems = () => {
  const [inStock, setInStock] = useState(true);
  const { favouriteProducts, handleRemoveFromFavourite, handleAddToCart } =
    useContext(Context);

  

    useEffect(() => {
      // Check if any of the favourite products have inventoryquantity < 15
      const hasLowInventoryProduct = favouriteProducts?.some(
        (item) => item.attributes.inventoryquantity < 15
      );
  
      // Update the inStock state based on the condition
      setInStock(!hasLowInventoryProduct);
    }, [favouriteProducts]);



  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fav-container">
      {favouriteProducts?.map((item) => (
        <div class="Cart-Items " key={item.id} style={{ margin: "auto" }}>
          <div class="image-box">
            <picture>
            <source media="(max-width: 666px)" style={{height:"80px"}} />
            <img
              src={API_URL + item.attributes.image.data[0].attributes.url}
              style={{ height: "100px" }}
            />
            </picture>
          </div>
          <div class="about">
            <h4 className="fav-title" style={{ marginLeft: "4px" }}>
              {item.attributes.title}
            </h4>
          </div>
          <div class="prices">
            <div class="amount">Rs:{" "}{item.attributes.price}.00</div>
            <div class="remove">
              <button
                className="Action"
                onClick={() => handleRemoveFromFavourite(item)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="icon" onClick={() => handleRemoveFromFavourite(item)}>
            <AiFillHeart color="#484f56" />
          </div>
          {inStock ? (
            <div class="buyoptions d-flex">
              <span
                onClick={() => {
                  handleAddToCart(item, quantity);
                  setQuantity(1);
                }}
              >
                Add to cart
              </span>
              <span>Buy Now</span>
            </div>
          ) : (
            <div class="buyoptions d-flex">
              <h5 style={{ color: 'red', cursor:"not-allowed", listStyle:"none"}}>Out of Stock</h5>
            </div>
          )}
         
        </div>
      ))}
    </div>
  );
};

export default FavouriteItems;
