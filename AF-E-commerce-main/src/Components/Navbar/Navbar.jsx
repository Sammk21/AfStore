import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import "./Navbar.css";
import {
  AiOutlineShopping,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdPersonOutline } from "react-icons/md";
import BottonNav from "./BottonNav";
import logo from "../Navbar/logo.png";
import Cart from "../Cart/Cart";
import Search from "./Search/Search";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Context } from "../../Utils/Context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const { cartCount, showCart, setShowCart } = useContext(Context);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? "sticky-header" : ""}`}>
        <nav className="wrapper">
          <div className="topWrapper">
            <div className="left">
              <div className="item">
                <button onClick={() => navigate("/help")} className="link">
                  Help
                </button>
              </div>

              <button className="item link" onClick={() => navigate("/Stores")}>
                FindStores
              </button>

              <div className="item">
                <button onClick={() => navigate("/about")} className="link">
                  AboutUs
                </button>
              </div>
            </div>

            <div className="center">
              <div className="item">
                <button onClick={() => navigate("/")} className="link" to="/">
                  <img className="logo" src={logo} alt="Fereclaurus" />
                </button>
              </div>
            </div>
            <div className="right">
              <div className="icons ">
                <span className="link" onClick={() => setShowSearch(true)}>
                  <AiOutlineSearch className="react-icons" />
                </span>

                <button className="link " onClick={() => navigate("/login")}>
                  <MdPersonOutline className="react-icons" />
                </button>

                <button onClick={() => navigate("/fav")} className="link">
                  <AiOutlineHeart className="react-icons" />
                </button>

                <button
                  className="cartIcon link "
                  onClick={() => setShowCart(true)}
                >
                  <AiOutlineShopping className="react-icons" />
                  <span>({cartCount && <span>{cartCount}</span>})</span>
                </button>

                <span
                  className="link menu"
                  onClick={() => setShowMobileMenu(true)}
                >
                  <AiOutlineMenu className="react-icons" />
                </span>
              </div>
            </div>
          </div>
        </nav>
        <BottonNav />
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
      {showMobileMenu && <MobileMenu setShowMobileMenu={setShowMobileMenu} />}
    </>
  );
};

export default Navbar;
