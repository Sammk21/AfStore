import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./BottonNav.scss";
import useFetch from "../../Hooks/useState";
import { fetchDataFromAPI } from "../../Utils/api";


const BottonNav = () => {


 const products = useFetch("/api/categories")

const navigate = useNavigate();



  return (
    <>
      <div className="bottomWrapper">
        <div  className="lists">
          {/* {categories.map((category)=>( */}
          {products?.products?.data?.map((category) => (
          <div className="item" key={category.id} >
            <button className="link"  onClick={() => navigate(`/category/${category.id}`)}>
           {category.attributes.name}
            </button>
          </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottonNav;
