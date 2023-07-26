import React from "react";
import "./Footer.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook, BsReddit } from "react-icons/bs"
import useFetch from "../../Hooks/useState";

const Footer = () => {

  const products = useFetch("/api/categories")
  const navigate = useNavigate();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="info">
            <div className="subinfo">
              <h3>Shop</h3>

              {products?.products?.data?.map((category) => (
              <div className="item" key={category.id}>
                <Link className="link" onClick={() => navigate(`/category/${category.id}`)}>
                {category.attributes.name}
                </Link>
              </div>
                ))}
              
              
              
            </div>
            <div className="subinfo">
              <h3>Trending</h3>
              <div className="item">
                <Link className="link" to="/products/1">
                  Jeans
                </Link>
              </div>

              <div className="item">
                <Link className="link" to="/products/2">
                  Oversized T-shits
                </Link>
              </div>

              <div className="item">
                <Link className="link" to="/products/3">
                  Basics
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/products/3">
                  co-ord sets
                </Link>
              </div>
            </div>

            <div className="subinfo">
              <h3>Help</h3>
              <div className="item">
                <Link className="link" to="/products/1">
                  Favourites
                </Link>
              </div>

              <div className="item">
                <Link className="link" to="/tandc">
                  Terms & Conditions
                </Link>
              </div>

              <div className="item">
                <Link className="link" to="/return">
                  Return / Exchange
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/aboutus">
                  About us
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/contact">
                  Contact us
                </Link>
              </div>
              <div className="item">
                <Link className="link" to="/buisness">
                  Join AF Clan
                </Link>
              </div>
              <div className="item">
                <Link  className="link" to="/faq">
                  FaQ
                </Link>
              </div>
            </div>
          </div>

          <div className="message my-3">
            <h5>Find us on</h5>
          </div>
          <div className="icons">
            <Link className=" link" to="/"><AiOutlineInstagram/> </Link>
            <Link className=" link" to="/"> <BsFacebook/> </Link>
            <Link className=" link" to="/"><AiOutlineTwitter/> </Link>
            <Link className=" link" to="/"><BsReddit/> </Link>
          </div>
          <div className="description align-items-center">
            <h4 style={{color:"black"}}>Almost Famous HQ :</h4> 
            <p>Office 
Shop No.3, Indra Vihar, Plot20/21, Sector 20, Kopar Khairane, Navi Mumbai, Maharashtra 400709</p>
          </div>
          <div className="paymentMode">
            <Link className="link">India | rs</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
