import React, { useEffect, useState, useContext } from "react";
import "./Singlepro.scss";
import RelatedProducts from "../RelatedProduct/RelatedProducts";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BsFacebook, BsReddit, BsWhatsapp } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../Hooks/useState";
import { API_URL } from "../../Utils/url";
import { Context } from "../../Utils/Context";
import Breadcrumb from "../../SmallComponents/Breadcrumbs/Breadcrumb";
import LoadingSpinner from "../../SmallComponents/loader/Spinner";
import { toast } from "react-toastify";
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  HatenaShareButton,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SinglePro = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState([]);
  const { id } = useParams();
  const { handleAddToCart } = useContext(Context);
  const { products } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);
  const [isLoading, setIsLoading] = useState(true);
  const { handleIconClick, isFavourite, isClicked } = useContext(Context);
  const [inStock, setInStock] = useState(true);

  const [selectedImage, setSelectedImage] = useState(
    products?.data?.[0].attributes?.image?.data?.[0].attributes?.url
  );

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  useEffect(() => {
    console.log(products?.data[0].attributes.inventoryquantity);
    if (products?.data[0].attributes.inventoryquantity < 15) {
      setInStock(false);
    } else {
      setInStock(true);
    }
  }, [products]);

  useEffect(() => {
    if (products?.data?.[0]?.attributes?.image?.data?.length > 0) {
      setSelectedImage(
        products.data[0].attributes.image.data[0].attributes.url
      );
    }
  }, [products]);

  const handleHeartIconClick = (event) => {
    event.stopPropagation(); // Prevent event propagation to parent element
    handleIconClick(products?.data[0]);
  };

  useEffect(() => {
    setIsLoading(true); // Set isLoading to true when the component mounts or when the selected image changes
    const image = new Image();
    image.src = API_URL + selectedImage;
    image.onload = () => {
      setIsLoading(false); // Set isLoading to false when the image has finished loading
    };
  }, [selectedImage]);

  const handleToast = () => {
    handleAddToCart(products?.data[0], quantity, size);
    setQuantity(1);
  };

  if (!products) return;
  const product = products?.data?.[0]?.attributes;

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity === 1 ? 1 : prevQuantity - 1));
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const renderButtons = () => {
    if (!product) {
      return null; // Product data is not available yet
    }

    if (!inStock) {
      return (
        <button className="product-page-button out-of-stock">
          Out of Stock
        </button>
      );
    }

    return (
      <>
        <button className="product-page-button" onClick={handleToast}>
          Add to Cart
        </button>
        <button className="product-page-button">Buy Now</button>
      </>
    );
  };


  const shareurl=  window.location.href;

  return (
    <div className="container">
      <Breadcrumb />
      <div className="card-wrapper">
        <div className="card">
          <div
            className={`product-imgs ${inStock ? "in-stock" : "out-of-stock"}`}
          >
            <div className="img-display">
              <div className="img-showcase">
                {isLoading ? (
                  <span>
                    <LoadingSpinner />
                  </span>
                ) : (
                  <img src={API_URL + selectedImage} alt={product?.title} />
                )}
                {isFavourite ? (
                  <span
                    onClick={handleHeartIconClick}
                    className={`fav-icon ${
                      isClicked ? "favorite-icon-clicked" : ""
                    }`}
                  >
                    <AiFillHeart color="#484f56" />
                  </span>
                ) : (
                  <span
                    onClick={handleHeartIconClick}
                    className={`fav-icon ${
                      isClicked ? "favorite-icon-clicked" : ""
                    }`}
                  >
                    <AiFillHeart color="gray" />
                  </span>
                )}
              </div>
            </div>

            <div className="img-select">
              <div
                className="img-item"
                onClick={() =>
                  setSelectedImage(product?.image?.data[0]?.attributes?.url)
                }
              >
                <img src={API_URL + product?.image?.data[0]?.attributes?.url} />
              </div>
              <div
                className="img-item"
                onClick={() =>
                  setSelectedImage(product?.image?.data[1]?.attributes?.url)
                }
              >
                <img
                  src={API_URL + product?.image?.data[1]?.attributes?.url}
                 
                />
              </div>
              <div
                className="img-item"
                onClick={() =>
                  setSelectedImage(product?.image?.data[2]?.attributes?.url)
                }
              >
                <img
                  src={API_URL + product?.image?.data[2]?.attributes?.url}
                />
              </div>
              <div
                className="img-item"
                onClick={() =>
                  setSelectedImage(product?.image?.data[3]?.attributes?.url)
                }
              >
                <img src={API_URL + product?.image?.data[3]?.attributes?.url} />
              </div>
            </div>
          </div>

          <div className="hero-product-details product-content">
            <div className="product-details details">
              <span className="top-details">
                <p className="type">{product?.type}</p>
                <p className="pro-title">{product?.title}</p>
                <p className="category">
                  Category : {product?.category?.data?.attributes?.name}
                </p>
              </span>
            </div>

            <div class="product-size ">
              <p className="size">Size:</p>
              <div className="size-layout">
                {product?.size?.data?.map((item, i) => (
                  <span
                    key={i}
                    className={`${item.enabled ? "available" : "notavailabe"} `}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={item?.size}
                      id={`size-${i}`}
                      className={`size-input ${
                        !item.enabled ? "disabled" : ""
                      }`}
                      disabled={!item.enabled}
                      onChange={handleSizeChange}
                      style={{margin:"15px 0"}}
                    />
                    <label
                      for="1"
                      htmlFor={`size-${i}`}
                      className={`size ${!item.enabled ? "disabled" : ""}`}
                      style={{ opacity: item.enabled ? 1 : 0.5 }}
                    >
                      {item?.size}
                    </label>
                  </span>
                ))}
              </div>
            </div>
            <div class="product-size ">
              <p className="size">Color:</p>
              <div className="size-layout">
                {product?.color?.data?.map((item, i) => (
                  <span
                    key={i}
                    className={`${
                      item?.enabled ? "available" : "notavailabe"
                    } `}
                  >
                    <input
                      name="size"
                      value="black"
                      id="1"
                      class="size-input "
                    />
                    <label for="1" className="size">
                      {item?.color}
                    </label>
                  </span>
                ))}
              </div>
            </div>
            <div className="product-qty">
              <p className="qty-title">Quantity:</p>
              <span class="counter">
                <span className="operators-block">
                  <button onClick={increment} className="block">
                    +
                  </button>
                  <div class="block">{quantity}</div>
                  <button onClick={decrement} className="block">
                    -
                  </button>
                </span>
              </span>
            </div>
            <div className="share-icons">
              <p style={{margin:"0"}}>Share:</p>
              <div style={{margin:"4px 0 10px 0"}} className="icons" >
              <FacebookShareButton url={shareurl} hashtag={"#almostfamous #men"} >
                <FacebookIcon size={40} round={true}/>
              </FacebookShareButton >
              <WhatsappShareButton url={shareurl}>
                <WhatsappIcon size={40} round={true}/>
              </WhatsappShareButton>
              <LinkedinShareButton url={shareurl}>
              <LinkedinIcon size={40} round={true}/>
              </LinkedinShareButton>
              <RedditShareButton url={shareurl}>
                <RedditIcon size={40} round={true}/>
              </RedditShareButton>
              <PinterestShareButton url={shareurl} media={selectedImage}>
                <PinterestIcon size={40} round={true}/>
              </PinterestShareButton>
              </div>
            </div>
            <span className="buttons details">{renderButtons()}</span>
            <div className="description-details">
              <h4>Description</h4>
              <p>{product?.description} lorem105</p>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts
        productId={id}
        categoryId={product?.category?.data?.id}
      />
    </div>
  );
};

export default SinglePro;
