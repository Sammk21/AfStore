import React from "react";
import "./ProductListBanner.scss";

const ProductListBanner = () => {
  return (
    <div>
      <div className="Banner-container">
        <div className="bannerImage">
          <picture>
            <source media="(max-width: 666px)" src="" />
            <img
              alt="new fashion summer sale"
              width="960px"
              height="450px"
              className="banner-img"
              src="https://image.hm.com/content/dam/global_campaigns/season_07/divided/5077g/5077G-3x2-music-merch.jpg?imwidth=2160"
            />
          </picture>
        </div>
        <div className="banner-details">
          <div className="description">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
              repudiandae a excepturi, quas eos facilis totam repellendus quo!
              Minima ipsa voluptatum commodi nam id voluptatem quam? Atque
              maiores voluptate natus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListBanner;
