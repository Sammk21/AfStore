import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import Category from "../../pages/Home/Category/Category";
import { Context } from "../../Utils/Context";
import { fetchDataFromAPI } from "../../Utils/api";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "./ProductSlider.scss";
import { GrNext, GrPrevious } from "react-icons/gr";
import useFetch from "../../Hooks/useState";
import LoadingSpinner from "../../SmallComponents/loader/Spinner";
const ProductSlider = () => {
 

  const { categories, setCategories } = useContext(Context);


  const {products} = useFetch("/api/categories?populate=*");
  setCategories(products); 

    if (!categories) {
    // Data is still loading, show a loading spinner or placeholder
    return <div className="d-flex justify-content-center"><LoadingSpinner/></div>;
  }

  // Set the categories in the context once the data is available
  if (!categories.data) {
    setCategories(products);
  }

  const settings = {
    nextArrow: <GrNext/>,
    prevArrow: <GrPrevious/>,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
    <div className="container">
    <div className="title">
      <h3>Categories</h3>
    </div>
      <Slider {...settings}>
        {categories?.data?.map((category) => (
          <Category
            key={category?.id}
            id={category?.id}
            data={category?.attributes}
          />
        ))}
      </Slider>
    </div>
    </>
  );
};

export default ProductSlider;
