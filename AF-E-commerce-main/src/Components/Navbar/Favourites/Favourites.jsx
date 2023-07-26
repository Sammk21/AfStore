import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import "./Favourites.scss";
import FavouriteItems from "./FavouriteItems";
import { Context } from "../../../Utils/Context";
import { GiCat } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const { favouriteProducts } = useContext(Context);

  console.log("products : ", favouriteProducts);

  const navigate = useNavigate();

  return (
    <div className="body">
      <div className="Cart-Container">
        <div class="Header">
          <h3 class="Heading">Favourites</h3>
        </div>

        {!favouriteProducts.length && (
          <div className="empty-cart">
            <GiCat />
            <span>Such an empty here</span>
            <button
              className="button "
              onClick={() => {
                navigate("/");
              }}
            >
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!favouriteProducts.length && <FavouriteItems />}
      </div>
    </div>
  );
};

export default Favourites;
