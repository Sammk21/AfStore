import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductList.scss";
import Dropdown from "../../SmallComponents/Dropdowns/Dropdown";
import useFetch from "../../Hooks/useState";
import Product from "../../pages/Product/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../../SmallComponents/Breadcrumbs/Breadcrumb";
import LoadingSpinner from "../../SmallComponents/loader/Spinner";
import { BsFilter } from "react-icons/bs";
import NewBanner from "../Banner/Banner";
import ProductListBanner from "./ProductListBanner/ProductListBanner";
import FilterMenu from "./Filters/FilterMenu";

const ProductList = () => {
  const { id } = useParams();
  const pageSize = 10;
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState(""); // New state for sorting

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [id]);

  const { products, isLoading } = useFetch(
    `/api/products?populate=*&[filters][category][id]=${id}${selectedFilters.map(
      (item) => `&[filters][sub_categories][id]=${item}`
    )}&pagination[page]=${page}&pagination[pageSize]=${pageSize}${sortOption}`
  );


  useEffect(() => {
    if (products) {
      setData(products?.data);
    }
  }, [products]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const options = [
    { value: "asc", label: "Low to High" },
    { value: "desc", label: "High to Low" },
  ];

  const handleSelectOption = (selectedOption) => {
    setSortOption(`&sort=price:${selectedOption}`);
    setPage(1); // Reset the page to 1 when changing the sort option
  };
  const handleFiltersSelected = (filters) => {
    setSelectedFilters(filters);
  };

  return (
    <>
      <div className="container">
        <div className="product-container">
          <div className="main-content">
            <div className="product-nav">
              <div className="breadcrumb-c">
                <Breadcrumb />
              </div>
              <ProductListBanner />
              <div className="title">
                <h1>
                  {
                    products?.data?.[0]?.attributes?.category?.data?.attributes
                      ?.name
                  }
                </h1>
              </div>

              <div className="helper d-flex align-items-center">
                <span onClick={() => setShowFilterMenu(true)}>
                  <BsFilter />
                </span>
                <div className="sort">
                  <Dropdown
                    placeHolder="Select..."
                    options={options}
                    selectedOption={sortOption}
                    onSelectOption={handleSelectOption}
                  />
                </div>
              </div>
            </div>

            {products && (
              <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={products?.meta?.pagination?.total > data.length}
                endMessage={
                  <div className="d-flex justify-content-center">
                    <p>No more products to load.</p>
                  </div>
                }
              >
                <div className="product-listing">
                  {data.map((item) => (
                    <Product
                      key={item.id}
                      id={item.id}
                      data={item.attributes}
                      fav={item}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            )}
            {isLoading && <LoadingSpinner />}
          </div>
        </div>
      </div>
      {showFilterMenu && (
        <FilterMenu
          categoryid={id}
          setShowFilterMenu={setShowFilterMenu}
          onFiltersSelected={handleFiltersSelected}
        />
      )}
    </>
  );
};

export default ProductList;
