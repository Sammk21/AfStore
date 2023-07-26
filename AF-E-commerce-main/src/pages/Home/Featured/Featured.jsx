import React, { useContext, useEffect } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { Context } from "../../../Utils/Context";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";
import useFetch from "../../../Hooks/useState";
import LoadingSpinner from "../../../SmallComponents/loader/Spinner";

const Featured = ({ type }) => {



  const { products } = useFetch(
    `/api/products?populate=*&[filters][type][$eq]=${type}`
  );


  if (!products) {
    // Data is still loading, show a loading spinner or placeholder
    return <div className="d-flex justify-content-center"><LoadingSpinner/></div>;
  }

 

  const settings = {
    nextArrow: <GrNext />,
    prevArrow: <GrPrevious />,

    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1
    
    ,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
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
          <h3>{type}</h3>
        </div>
        <Slider {...settings}>
        {products?.data?.map((product) => (
          <FeaturedProduct
            key={product?.id}
            id={product?.id}
            data={product?.attributes}
          />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Featured;
