import React from "react";
import "./Banner.scss";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useState";
import { API_URL } from "../../Utils/url";

const NewBanner = ({ type,  title, description, image }) => {
  const { products } = useFetch(
    `/api/banners?populate=*&[filters][type]=${type}`
  );

  const navigate = useNavigate();

  const id = products?.data[0]?.attributes?.categories?.data[0]?.id 

  return (
    <div>
      <div className="banner">
        <div className="">
          <div className="slider-container ">
            <div className="slider-item">
             
              <picture>
                <source media="(max-width: 666px)" srcset={API_URL + products?.data[0]?.attributes?.banner_Img_mobile?.data.attributes?.url} />
                <img alt="new fashion summer sale"
                width="960px"
                height="640px"
                className="banner-img" src={API_URL + products?.data[0]?.attributes?.banner_img_desktop?.data?.attributes?.url} />
              </picture>

              <div className="banner-content">
                <h2 className="banner-title">{products?.data[0]?.attributes?.Title}</h2>
                <p className="banner-subtitle">{products?.data[0]?.attributes?.subtitle}</p>
                <p className="banner-text">
                  starting at &#8377; {products?.data[0]?.attributes?.price}
                </p>

                  <button onClick={() => navigate(`/category/${id}`)} href="#" className="btns type1">
                    <span className="btn-txt">Shop now</span>
                  </button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
