import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MobileMenu.scss";
import { AiOutlineClose } from "react-icons/ai";
import useFetch from "../../Hooks/useState";

const MobileMenu = ({ setShowMobileMenu }) => {


  const products = useFetch("/api/categories")


  const navigate = useNavigate();
  return (
    <div>
      <div className="menu-panel">
        <div
          className="opac-layer"
          onClick={() => setShowMobileMenu(false)}
        ></div>
        <div className="menu-content">
          <div className="top">
            <span
              className="close-btn"
              onClick={() => setShowMobileMenu(false)}
            >
              <span className="link">
                <AiOutlineClose />
              </span>
            </span>
          </div>
          <div className="categories">
          {products?.products?.data?.map((category) => (
            <div className="item" key={category.id}    onClick={() => setShowMobileMenu(false)}>
              <button className="link" onClick={() => navigate(`/category/${category.id}`)}>
                {category.attributes.name}
              </button>
            </div>
            ))}
          </div>

          <div className="about-section">
            <span className="link" onClick={() => navigate("/help")}>
              Help
            </span>
            <span className="link" onClick={() => navigate("/Stores")}>
              Locate us
            </span>
            <span className="link" onClick={() => navigate("/about")}>
              Aboutus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
