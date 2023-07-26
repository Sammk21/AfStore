import React from "react";
import "./Category.scss";
import { API_URL } from "../../../Utils/url";
import { useNavigate } from "react-router-dom";

const Category = ({ data, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="category-container "
      onClick={() => navigate(`/category/${id}`)}
    >
      <img
        src={API_URL + data?.categoryimage?.data?.attributes?.url || ""}
        alt="catimg"
      />
      <div className="category-names">
        <span>{data?.title}</span>
      </div>
    </div>
  );
};

export default Category;
